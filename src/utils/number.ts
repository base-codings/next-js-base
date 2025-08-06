import { toBig } from '@/libs'

export function caculateSlippage(amount: string, slippagePercentage: string, type: 'min_received' | 'max_pay'): string {
  if (type === 'min_received') {
    const amountTemp = toBig(amount || '0')
    const slippage = toBig(slippagePercentage || '0').div(100)
    const minReceived = amountTemp.mul(toBig(1).sub(slippage)).toString()
    return minReceived
  } else if (type === 'max_pay') {
    const amountTemp = toBig(amount || '0')
    const slippage = toBig(slippagePercentage || '0').div(100)
    const maxPay = amountTemp.mul(toBig(1).add(slippage)).toString()
    return maxPay
  }
  return '0'
}
