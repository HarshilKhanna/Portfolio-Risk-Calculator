import { PortfolioAsset } from '../types';

export const calculateRiskMetrics = (
  assets: PortfolioAsset[],
  historicalData: { [symbol: string]: number[] }
) => {
  const calculateReturns = (prices: number[]) => {
    return prices.slice(1).map((price, i) => 
      (price - prices[i]) / prices[i]
    );
  };

  const calculatePortfolioReturns = () => {
    const weights = assets.map(asset => 
      asset.value / assets.reduce((sum, a) => sum + a.value, 0)
    );
    
    const returns = Object.values(historicalData).map(prices => 
      calculateReturns(prices)
    );

    return returns[0].map((_, i) => 
      returns.reduce((sum, assetReturns, j) => 
        sum + assetReturns[i] * weights[j], 0
      )
    );
  };

  const portfolioReturns = calculatePortfolioReturns();
  const avgReturn = portfolioReturns.reduce((a, b) => a + b) / portfolioReturns.length;
  const volatility = Math.sqrt(
    portfolioReturns.reduce((sq, n) => sq + Math.pow(n - avgReturn, 2), 0) / 
    portfolioReturns.length
  );

  const riskFreeRate = 0.02; // 2% assumed risk-free rate
  const sharpeRatio = (avgReturn - riskFreeRate) / volatility;

  // Calculate Value at Risk (VaR) at 95% confidence level
  const sortedReturns = [...portfolioReturns].sort((a, b) => a - b);
  const varIndex = Math.floor(portfolioReturns.length * 0.05);
  const var95 = -sortedReturns[varIndex];

  return {
    sharpeRatio,
    beta: 1.0, // This should be calculated against market returns
    alpha: avgReturn - riskFreeRate,
    volatility,
    var: var95,
    maxDrawdown: calculateMaxDrawdown(portfolioReturns)
  };
};

const calculateMaxDrawdown = (returns: number[]) => {
  let maxDrawdown = 0;
  let peak = returns[0];
  
  returns.forEach(return_ => {
    if (return_ > peak) {
      peak = return_;
    }
    const drawdown = (peak - return_) / peak;
    maxDrawdown = Math.max(maxDrawdown, drawdown);
  });

  return maxDrawdown;
};