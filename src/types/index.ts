export interface StockData {
    symbol: string;
    longName: string;
    regularMarketPrice: number;
    logoUrl?: string;
    regularMarketChangePercent: number;
  }
  
  export interface PortfolioAsset extends StockData {
    quantity: number;
    value: number;
    costBasis?: number;
  }
  
  export interface RiskMetrics {
    sharpeRatio: number;
    beta: number;
    alpha: number;
    volatility: number;
    var: number; // Value at Risk
    maxDrawdown: number;
  }
  
  export interface SimulationResult {
    projectedValues: number[];
    confidenceIntervals: {
      upper95: number;
      lower95: number;
      median: number;
    };
    metrics: {
      expectedReturn: number;
      volatility: number;
      maxDrawdown: number;
    };
  }