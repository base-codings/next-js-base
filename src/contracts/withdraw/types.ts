export interface WithdrawPayload {
  isBalance: boolean
  selectedToken: number
  lpAmount: string
  amountsMinReceive: Record<string, string>
}
