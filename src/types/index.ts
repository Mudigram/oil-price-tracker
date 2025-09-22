export interface Commodity {
  code: string;
  name: string;
  price: number;
  change: number;
  percent_change: number;
  currency: string;
  unit: string;
  timestamp: string;
}

export interface UserPreferences {
  watchlist: string[];
  alerts: PriceAlert[];
  theme: "light" | "dark";
}

export interface PriceAlert {
  id: string;
  commodity_code: string;
  target_price: number;
  condition: "above" | "below";
  is_active: boolean;
}
