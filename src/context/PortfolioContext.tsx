'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { financeAPI } from '../services/financeAPI';

const USD_TO_INR = 83.34;

// Types
interface PortfolioAsset {
  symbol: string;
  longName: string;
  quantity: number;
  purchasePrice: number; // In INR
  currentPrice: number; // In USD (will be converted to INR when displaying)
  regularMarketChangePercent: number;
  value: number; // In USD (will be converted to INR when displaying)
  costBasis: number; // In INR
  type: string;
  purchaseDate: string;
  lastUpdated: string;
}

interface PortfolioMetrics {
  totalInvested: number;
  totalGain: number;
  totalGainPercent: number;
}

interface PortfolioContextType {
  assets: PortfolioAsset[];
  addAsset: (symbol: string, quantity: number, purchasePrice: number) => Promise<void>;
  removeAsset: (symbol: string) => void;
  updateQuantity: (symbol: string, quantity: number) => void;
  clearPortfolio: () => void;
  totalValue: number;
  metrics: PortfolioMetrics;
  isLoading: boolean;
  error: string | null;
  editAsset: (symbol: string, updates: Partial<PortfolioAsset>) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio';

// First, let's define the Finnhub API response type
interface FinnhubQuoteResponse {
  c: number;    // Current price
  d: number;    // Change
  dp: number;   // Percent change
  h: number;    // High price of the day
  l: number;    // Low price of the day
  o: number;    // Open price
  pc: number;   // Previous close price
}

// First, add this interface to match the API response
interface StockDataResponse {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
}

const defaultPortfolio: PortfolioAsset[] = [
  {
    symbol: "AAPL",
    longName: "Apple Inc.",
    type: "Equity",
    quantity: 2,
    purchasePrice: 18777,
    currentPrice: 218.27,
    regularMarketChangePercent: -0.03,
    value: 37542,
    costBasis: 18777,
    purchaseDate: "2024-01-01",
    lastUpdated: new Date().toISOString()
  },
  {
    symbol: "AMZN",
    longName: "Amazon.com Inc.",
    type: "Equity",
    quantity: 2,
    purchasePrice: 16786,
    currentPrice: 196.21,
    regularMarketChangePercent: 0.52,
    value: 33748,
    costBasis: 16786,
    purchaseDate: "2024-01-01",
    lastUpdated: new Date().toISOString()
  },
  {
    symbol: "TSLA",
    longName: "Tesla Inc.",
    type: "Equity",
    quantity: 5,
    purchasePrice: 21293,
    currentPrice: 248.71,
    regularMarketChangePercent: 0.45,
    value: 106945,
    costBasis: 21293,
    purchaseDate: "2024-01-01",
    lastUpdated: new Date().toISOString()
  },
  {
    symbol: "MSFT",
    longName: "Microsoft Corporation",
    type: "Equity",
    quantity: 2,
    purchasePrice: 33646,
    currentPrice: 391.26,
    regularMarketChangePercent: 0.01,
    value: 67297,
    costBasis: 33646,
    purchaseDate: "2024-01-01",
    lastUpdated: new Date().toISOString()
  }
];

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  // Initialize with defaultPortfolio
  const [assets, setAssets] = useState<PortfolioAsset[]>(defaultPortfolio);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load assets from localStorage on mount
  useEffect(() => {
    const savedAssets = localStorage.getItem('portfolio');
    if (savedAssets) {
      // If there's saved data, use it
      setAssets(JSON.parse(savedAssets));
    }
    // If no saved data, we'll keep the defaultPortfolio that we initialized with
    setIsLoading(false);
  }, []);

  // Save assets to localStorage when they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('portfolio', JSON.stringify(assets));
    }
  }, [assets, isLoading]);

  // Update prices periodically
  useEffect(() => {
    const updatePrices = async () => {
      if (assets.length === 0) return;
      
      setIsLoading(true);
      try {
        const updatedAssets = await Promise.all(
          assets.map(async (asset) => {
            try {
              const data = await financeAPI.getStockData(asset.symbol);
              return {
                ...asset,
                currentPrice: data.price,
                regularMarketChangePercent: data.changePercent,
                value: data.price * asset.quantity,
              };
            } catch (error) {
              console.error(`Error updating ${asset.symbol}:`, error);
              return asset;
            }
          })
        );

        setAssets(updatedAssets);
      } catch (error) {
        console.error('Error updating prices:', error);
      } finally {
        setIsLoading(false);
      }
    };

    updatePrices();
    const interval = setInterval(updatePrices, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const addAsset = useCallback(async (symbol: string, quantity: number, purchasePrice: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const cleanSymbol = symbol.includes('(') ? 
        symbol.split('(')[1].replace(')', '').trim() : 
        symbol;

      if (assets.some(asset => asset.symbol === cleanSymbol)) {
        throw new Error('Asset already exists in portfolio');
      }

      const stockData = await financeAPI.getStockData(cleanSymbol);
      const currentPriceInINR = stockData.price * USD_TO_INR;

      const newAsset: PortfolioAsset = {
        symbol: cleanSymbol,
        longName: cleanSymbol,
        quantity,
        purchasePrice, // This is already in INR from the input
        currentPrice: stockData.price, // Keep in USD
        regularMarketChangePercent: stockData.changePercent,
        value: currentPriceInINR * quantity, // Calculate value in INR
        costBasis: purchasePrice,
        type: 'Equity',
        purchaseDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString()
      };

      const updatedAssets = [...assets, newAsset];
      setAssets(updatedAssets);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio', JSON.stringify(updatedAssets));
      }
    } catch (error) {
      console.error('Error adding asset:', error);
      setError(error instanceof Error ? error.message : 'Failed to add asset');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [assets]);

  const removeAsset = (symbol: string) => {
    const updatedAssets = assets.filter(asset => asset.symbol !== symbol);
    setAssets(updatedAssets);
    localStorage.setItem('portfolio', JSON.stringify(updatedAssets));
  };

  const updateQuantity = (symbol: string, quantity: number) => {
    const updatedAssets = assets.map(asset => 
      asset.symbol === symbol 
        ? { ...asset, quantity, value: asset.currentPrice * quantity }
        : asset
    );
    setAssets(updatedAssets);
    localStorage.setItem('portfolio', JSON.stringify(updatedAssets));
  };

  const calculatePortfolioMetrics = (): PortfolioMetrics => {
    const totalInvested = assets.reduce((sum: number, asset: PortfolioAsset) => 
      sum + (asset.purchasePrice * asset.quantity), 0
    );
    
    const totalValue = assets.reduce((sum: number, asset: PortfolioAsset) => 
      sum + asset.value, 0
    );

    const totalGain = totalValue - totalInvested;
    const totalGainPercent = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;

    return {
      totalInvested,
      totalGain,
      totalGainPercent
    };
  };

  const clearPortfolio = () => {
    setAssets([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('portfolio');
    }
  };

  const editAsset = useCallback((symbol: string, updates: Partial<PortfolioAsset>) => {
    setIsLoading(true);
    try {
      const updatedAssets = assets.map(asset => {
        if (asset.symbol === symbol) {
          const updatedAsset = {
            ...asset,
            ...updates,
            // Recalculate value based on new quantity or price
            value: (updates.quantity || asset.quantity) * asset.currentPrice,
            // Update timestamp
            lastUpdated: new Date().toISOString()
          };
          return updatedAsset;
        }
        return asset;
      });

      setAssets(updatedAssets);
      localStorage.setItem('portfolio', JSON.stringify(updatedAssets));
    } catch (error) {
      console.error('Error editing asset:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [assets]);

  const metrics = calculatePortfolioMetrics();
  const totalValue = assets.reduce((sum: number, asset: PortfolioAsset) => 
    sum + asset.value, 0
  );

  return (
    <PortfolioContext.Provider value={{
      assets,
      addAsset,
      removeAsset,
      updateQuantity,
      clearPortfolio,
      totalValue,
      metrics,
      isLoading,
      error,
      editAsset,
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
};

export default PortfolioContext;