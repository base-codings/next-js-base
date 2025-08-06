import { PoolAsset } from '../general'

export interface SwapPayload {
  tokenIn: PoolAsset
  tokenOut: PoolAsset
  amount: string
  amountEstimated: string
  slippagePercentage: string
  swapType: 'in' | 'out'
}
