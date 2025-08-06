import TOKEN_ABI from '@/assets/abis/Token.json'
import POOL_ABI from '@/assets/abis/Pool.json'

import { multicall } from '@/utils/onchain/multicall'
import { DepositPayload } from './types'
import { contractConfig } from '@/configs/contracts'
import { AbiFunction, formatUnits, parseEther, parseUnits } from 'viem'
import { Toast } from '@/components/common'
import { waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { wagmiConfig } from '@/configs/wagmi'
import { toast } from 'sonner'
import { sleep } from '@/utils/fn'
import { CommonTranslationKey, TranslationFunction } from '@/types/translation'
import { envConfig } from '@/utils'
import getMessageError from '@/utils/onchain/get-message-error'

export const depositRequest = async (
  { tokens, amountMinReceived }: DepositPayload,
  t: TranslationFunction<CommonTranslationKey>,
  address?: string,
): Promise<string | undefined> => {
  if (!address) {
    throw new Error(t('message.user_must_connected'))
  }

  // check balances enough
  const hasInsufficient = tokens.some((token) => {
    const amount = Number(token?.amount || '0')
    const balance = Number(token.balance || '0')
    if (amount > balance) {
      Toast.error({
        label: t('message.failed'),
        description: t('message.insufficient_balance', { symbol: token.symbol }),
      })
      return true
    }
    return false
  })

  if (hasInsufficient) return undefined

  if (tokens.every((token) => Number(token.amount) === 0)) {
    Toast.error({
      label: t('message.failed'),
      description: t('message.enter_amount'),
    })
    return undefined
  }

  const dataApproves = await multicall<{
    allowance: bigint
  }>(
    tokens.map((token) => ({
      address: token.address,
      reference: token.address,
      abi: TOKEN_ABI as AbiFunction[],
      functions: [
        {
          function: 'allowance',
          args: [address, contractConfig.POOL],
        },
      ],
    })),
  )

  for (const token of tokens) {
    const allowance = formatUnits(
      dataApproves.find((item) => item.reference === token.address)?.allowance?.result || BigInt(0),
      token.decimals,
    )

    // If allowance is less than the amount, we need to approve the token
    if (Number(allowance) < Number(token.amount)) {
      const id = Toast.loading({
        label: t('message.approving_title', { symbol: token.symbol }),
        description: t('message.approving_description', { symbol: token.symbol }),
      })

      try {
        const approveTx = await writeContract(wagmiConfig, {
          address: token.address,
          abi: TOKEN_ABI as AbiFunction[],
          functionName: 'approve',
          args: [contractConfig.POOL, parseUnits(Number(token.amount).toFixed(token.decimals), token.decimals)],
        })
        if (!approveTx) {
          throw new Error(t('message.approving_failed', { symbol: token.symbol }))
        }

        const transactionReceipt = await waitForTransactionReceipt(wagmiConfig, {
          hash: approveTx,
        })

        if (transactionReceipt?.status === 'reverted') {
          throw new Error(t('message.approve_reverted', { symbol: token.symbol }))
        }
        toast.dismiss(id)
        Toast.success({
          label: t('message.approved_title', { symbol: token.symbol }),
          description: t('message.approved_description', { symbol: token.symbol }),
        })
        await sleep(500)
      } catch (error) {
        toast.dismiss(id)
        Toast.error({
          label: t('message.approving_failed', { symbol: token.symbol }),
          description: getMessageError(error) || t('message.approving_failed_description', { symbol: token.symbol }),
        })
        return undefined
      } finally {
      }
    }
  }

  const id = Toast.loading({
    label: t('deposit.depositing_title'),
    description: t('deposit.depositing_description'),
  })

  try {
    const depostTx = await writeContract(wagmiConfig, {
      address: contractConfig.POOL,
      abi: POOL_ABI,
      functionName: 'add_liquidity',
      args: [
        tokens.map((token) => parseUnits(Number(token.amount).toFixed(token.decimals), token.decimals)),
        parseEther(amountMinReceived || '0'),
      ],
      account: address as `0x${string}`,
      chainId: envConfig.CHAIN_ID,
    })

    const depositReceipt = await waitForTransactionReceipt(wagmiConfig, {
      hash: depostTx,
    })

    toast.dismiss(id)

    if (depositReceipt?.status === 'reverted') {
      Toast.error({
        label: t('deposit.deposit_failed_title'),
        description: t('deposit.deposit_failed_description'),
      })
      return undefined
    }

    Toast.success({
      label: t('deposit.deposit_success_title'),
      description: t('deposit.deposit_success_description'),
    })

    return depostTx
  } catch (error) {
    console.error('Deposit failed', error)
    toast.dismiss(id)
    Toast.error({
      label: t('deposit.deposit_failed_title'),
      description: getMessageError(error, t('deposit.deposit_failed_description')),
    })
    return undefined
  }
}
