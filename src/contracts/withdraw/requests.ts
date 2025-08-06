import POOL_ABI from '@/assets/abis/Pool.json'

import { WithdrawPayload } from './types'
import { contractConfig } from '@/configs/contracts'
import { parseUnits } from 'viem'
import { Toast } from '@/components/common'
import { waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { wagmiConfig } from '@/configs/wagmi'
import { toast } from 'sonner'
import { CommonTranslationKey, TranslationFunction } from '@/types/translation'
import { envConfig } from '@/utils'
import { ITokenInfo, PoolAsset } from '../general'
import { toBig } from '@/libs'
import getMessageError from '@/utils/onchain/get-message-error'

export const withdrawRequest = async (
  { isBalance, selectedToken, lpAmount, amountsMinReceive }: WithdrawPayload,
  t: TranslationFunction<CommonTranslationKey>,
  appTokenInfo?: ITokenInfo,
  listTokens?: PoolAsset[],
  address?: string,
): Promise<string | undefined> => {
  if (!address) {
    throw new Error(t('message.user_must_connected'))
  }

  // check balances enough

  if (Number(lpAmount) > Number(appTokenInfo?.balance || '0')) {
    Toast.error({
      label: t('message.failed'),
      description: t('message.insufficient_balance', { symbol: appTokenInfo?.symbol || 'Token' }),
    })
    return undefined
  }

  if (Number(lpAmount) <= 0) {
    Toast.error({
      label: t('message.failed'),
      description: t('message.enter_amount'),
    })
    return undefined
  }

  const id = Toast.loading({
    label: t('withdraw.withdrawing_title'),
    description: t('withdraw.withdrawing_description'),
  })

  try {
    const lpAmountParsed = parseUnits(
      toBig(lpAmount).toFixed(appTokenInfo?.decimals || 18),
      appTokenInfo?.decimals || 18,
    )

    let args = []

    if (isBalance) {
      const minAmounts = Object.keys(amountsMinReceive).map((address) => {
        const token = listTokens?.find((token) => token.address === address)
        const minAmount = amountsMinReceive[address] || '0'
        return parseUnits(toBig(minAmount).toFixed(token?.decimals || 18), token?.decimals || 18)
      })
      args = [lpAmountParsed, minAmounts]
    } else {
      const token = listTokens?.[selectedToken]
      const minAmount = parseUnits(
        toBig(amountsMinReceive[token?.address || ''] || '0').toFixed(token?.decimals || 18),
        token?.decimals || 18,
      )
      args = [selectedToken, lpAmountParsed, minAmount]
    }

    const withdrawTx = await writeContract(wagmiConfig, {
      address: contractConfig.POOL,
      abi: POOL_ABI,
      functionName: isBalance ? 'remove_liquidity' : 'remove_liquidity_single',
      args: args,
      account: address as `0x${string}`,
      chainId: envConfig.CHAIN_ID,
    })

    const withdrawReceipt = await waitForTransactionReceipt(wagmiConfig, {
      hash: withdrawTx,
    })

    toast.dismiss(id)

    if (withdrawReceipt?.status === 'reverted') {
      Toast.error({
        label: t('withdraw.withdraw_failed_title'),
        description: t('withdraw.withdraw_failed_description'),
      })
      return undefined
    }

    Toast.success({
      label: t('withdraw.withdraw_success_title'),
      description: t('withdraw.withdraw_success_description'),
    })

    return withdrawTx
  } catch (error) {
    console.error('Withdraw failed', error)
    toast.dismiss(id)
    Toast.error({
      label: t('withdraw.withdraw_failed_title'),
      description: getMessageError(error, t('withdraw.withdraw_failed_description')),
    })
    return undefined
  }
}
