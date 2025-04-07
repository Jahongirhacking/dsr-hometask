export enum PriceStatus {
  Neutral = "neutral",
  Bullish = "bullish",
  Bearish = "bearish",
}

export interface IPrice {
  USD?: number;
  status?: PriceStatus;
}
