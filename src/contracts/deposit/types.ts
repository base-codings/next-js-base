import { PoolAsset } from '../general'

export interface DepositPayload {
  tokens: (PoolAsset & {
    amount: string
  })[]
  amountMinReceived: string
}
