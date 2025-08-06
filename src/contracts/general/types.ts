export interface PoolAsset {
  address: `0x${string}`
  rate: string
  virtual_balance: string
  balance: string // user balance
  pool_balance: string // pool balance
  weight: {
    current: string
    target: string
    lower: string
    upper: string
  }
  name: string
  symbol: string
  decimals: number
  index: number
}

/* 
  NOTE: The `weight` field is an array of bigints to accommodate the new structure.
  Each element in the array represents a different weight value for the asset.
  * 1. weight (uint256)
    Current weight of the asset in the pool
    Expressed in 18 decimals (e.g., 0.5 = 500_000_000_000_000_000)
    This is the active weight being used for calculations
    If a weight ramp is active, this value is gradually changing toward the target
  * 2. target (uint256)
    Target weight that the asset should reach
    Also in 18 decimals
    During a weight ramp, the current weight moves toward this target
    If no ramp is active (ramp_last_time == 0), this equals the current weight
  * 3. lower (uint256)
    Lower band width - safety limit for how much the asset's weight can decrease
    Expressed as distance from current weight (18 decimals)
    If lower = 0.1, the asset's weight cannot go below current_weight - 0.1
    Used in _check_bands() to prevent operations that would make the pool too imbalanced
  * 4. upper (uint256)
    Upper band width - safety limit for how much the asset's weight can increase
    Expressed as distance from current weight (18 decimals)
    If upper = 0.1, the asset's weight cannot go above current_weight + 0.1
    Also used in _check_bands() for safety
*/

export interface ITokenInfo {
  address: `0x${string}`
  balance: string // user balance
  name: string
  symbol: string
  decimals: number
}
