import TOKEN_ABI from '@/assets/abis/Token.json'
import POOL_ABI from '@/assets/abis/Pool.json'

import { wagmiConfig } from '@/configs/wagmi'
import { SwapPayload } from './types'
import { Toast } from '@/components/common'
import { CommonTranslationKey, TranslationFunction } from '@/types/translation'
import { caculateSlippage } from '@/utils/number'
import { readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { contractConfig } from '@/configs/contracts'
import { AbiFunction, formatUnits, parseUnits } from 'viem'
import { toast } from 'sonner'
import { sleep } from '@/utils/fn'
import { envConfig } from '@/utils'
import getMessageError from '@/utils/onchain/get-message-error'

/** SWAP TYPE
 * - in: User is swapping tokens with swap_exact_in
 * - out: User is swapping tokens with swap_exact_out
 */

export const swapRequest = async (
  { tokenIn, tokenOut, amount, amountEstimated, slippagePercentage, swapType }: SwapPayload,
  t: TranslationFunction<CommonTranslationKey>,
  address?: string,
): Promise<string | undefined> => {
  if (!address) {
    throw new Error(t('message.user_must_connected'))
  }

  const token = swapType === 'in' ? tokenIn : tokenOut
  const token2 = swapType === 'in' ? tokenOut : tokenIn

  if (Number(amount) > Number(tokenIn?.balance || '0')) {
    Toast.error({
      label: t('message.failed'),
      description: t('message.insufficient_balance', { symbol: tokenIn?.symbol }),
    })
    return
  }

  const slippageValue = caculateSlippage(
    amountEstimated,
    slippagePercentage,
    swapType === 'in' ? 'min_received' : 'max_pay',
  )

  const allowance = await readContract(wagmiConfig, {
    address: tokenIn?.address,
    abi: TOKEN_ABI,
    functionName: 'allowance',
    args: [address, contractConfig.POOL],
  })

  const allowanceFormatted = formatUnits(BigInt(String(allowance || '0')), tokenIn?.decimals)

  const amountParsed = parseUnits(Number(amount).toFixed(token?.decimals), token?.decimals)
  const slippageValueParsed = parseUnits(Number(slippageValue).toFixed(token2?.decimals || 18), token2?.decimals)

  if (Number(allowanceFormatted) < Number(swapType === 'in' ? amount : slippageValue)) {
    const id = Toast.loading({
      label: t('message.approving_title', { symbol: tokenIn.symbol }),
      description: t('message.approving_description', { symbol: tokenIn.symbol }),
    })

    try {
      const approveTx = await writeContract(wagmiConfig, {
        address: tokenIn.address,
        abi: TOKEN_ABI as AbiFunction[],
        functionName: 'approve',
        args: [contractConfig.POOL, swapType === 'in' ? amountParsed : slippageValueParsed],
      })
      if (!approveTx) {
        throw new Error(t('message.approving_failed', { symbol: tokenIn.symbol }))
      }

      const transactionReceipt = await waitForTransactionReceipt(wagmiConfig, {
        hash: approveTx,
      })

      if (transactionReceipt?.status === 'reverted') {
        throw new Error(t('message.approve_reverted', { symbol: tokenIn.symbol }))
      }
      toast.dismiss(id)
      Toast.success({
        label: t('message.approved_title', { symbol: tokenIn.symbol }),
        description: t('message.approved_description', { symbol: tokenIn.symbol }),
      })
      await sleep(500)
    } catch (error) {
      console.error('Approval failed', error)
      toast.dismiss(id)
      Toast.error({
        label: t('message.approving_failed', { symbol: token.symbol }),
        description: getMessageError(error) || t('message.approving_failed_description', { symbol: token.symbol }),
      })
      return undefined
    }
  }

  const id = Toast.loading({
    label: t('swap.swapping_title'),
    description: t('swap.swapping_description', { tokenIn: tokenIn.symbol, tokenOut: tokenOut.symbol }),
  })

  try {
    const swapTx = await writeContract(wagmiConfig, {
      address: contractConfig.POOL,
      abi: POOL_ABI,
      functionName: swapType === 'in' ? 'swap' : 'swap_exact_out',
      args: [tokenIn?.index, tokenOut?.index, amountParsed, slippageValueParsed],
      account: address as `0x${string}`,
      chainId: envConfig.CHAIN_ID,
    })

    const swapReceipt = await waitForTransactionReceipt(wagmiConfig, {
      hash: swapTx,
    })

    toast.dismiss(id)

    if (swapReceipt?.status === 'reverted') {
      Toast.error({
        label: t('swap.swap_failed_title'),
        description: t('swap.swap_failed_description'),
      })
      return undefined
    }

    Toast.success({
      label: t('swap.swap_success_title'),
      description: t('swap.swap_success_description'),
    })

    return swapTx
  } catch (error) {
    console.error('Swap failed', error)
    toast.dismiss(id)
    Toast.error({
      label: t('swap.swap_failed_title'),
      description: getMessageError(error) || t('swap.swap_failed_description'),
    })
    return undefined
  }
}
