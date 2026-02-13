
interface StockResult {
  symbol: string;
  name: string;
  type: string;
  exchange?: string;
}

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
}

const USD_TO_INR = 86;
const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

// Common stock symbols and names for instant suggestions
const COMMON_STOCKS: StockResult[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'Equity', exchange: 'NASDAQ' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'Equity', exchange: 'NASDAQ' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'Equity', exchange: 'NASDAQ' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'Equity', exchange: 'NASDAQ' },
  { symbol: 'META', name: 'Meta Platforms Inc.', type: 'Equity', exchange: 'NASDAQ' },
  { symbol: 'TSLA', name: 'Tesla Inc.', type: 'Equity', exchange: 'NASDAQ' },
  { symbol: 'NFLX', name: 'Netflix Inc.', type: 'Equity', exchange: 'NASDAQ' },
  // Indian stocks with correct symbols
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries Ltd.', type: 'Equity', exchange: 'NSE' },
  { symbol: 'TCS.NS', name: 'Tata Consultancy Services Ltd.', type: 'Equity', exchange: 'NSE' },
  { symbol: 'INFY.NS', name: 'Infosys Ltd.', type: 'Equity', exchange: 'NSE' },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank Ltd.', type: 'Equity', exchange: 'NSE' },
];

// Add Indian stock indices
const INDIAN_STOCKS: StockResult[] = [
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries Ltd.', type: 'Equity', exchange: 'NSE' },
  { symbol: 'TCS.NS', name: 'Tata Consultancy Services Ltd.', type: 'Equity', exchange: 'NSE' },
  { symbol: 'INFY.NS', name: 'Infosys Ltd.', type: 'Equity', exchange: 'NSE' },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank Ltd.', type: 'Equity', exchange: 'NSE' },
  { symbol: 'ICICIBANK.NS', name: 'ICICI Bank Ltd.', type: 'Equity', exchange: 'NSE' },
  { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever Ltd.', type: 'Equity', exchange: 'NSE' },
  { symbol: 'SBIN.NS', name: 'State Bank of India', type: 'Equity', exchange: 'NSE' },
  { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel Ltd.', type: 'Equity', exchange: 'NSE' },
  { symbol: 'ITC.NS', name: 'ITC Ltd.', type: 'Equity', exchange: 'NSE' },
  { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank Ltd.', type: 'Equity', exchange: 'NSE' },
];

// Combine with existing COMMON_STOCKS
const ALL_STOCKS: StockResult[] = [...COMMON_STOCKS, ...INDIAN_STOCKS];

const generateMockData = (symbol: string) => ({
  symbol,
  price: 100 + Math.random() * 100,
  change: (Math.random() * 10 - 5).toFixed(2),
  changePercent: (Math.random() * 10 - 5).toFixed(2),
  lastUpdated: new Date().toISOString(),
});

export const financeAPI = {
  // Search for stocks
  searchStocks: async (query: string): Promise<StockResult[]> => {
    query = query.toLowerCase().trim();
    
    if (query.length < 2) return [];

    // First, search local stock list for instant results
    const localResults = ALL_STOCKS.filter(stock => 
      stock.symbol.toLowerCase().includes(query) || 
      stock.name.toLowerCase().includes(query)
    );

    try {
      // Then fetch from API in parallel
      const response = await fetch(
        `https://finnhub.io/api/v1/search?q=${query}&token=${FINNHUB_API_KEY}`
      );
      
      if (!response.ok) {
        console.warn('API request failed, using local results');
        return localResults;
      }

      const data = await response.json();
      
      // Combine API results with local results
      const apiResults: StockResult[] = (data.result || [])
        .filter((item: any) => item.type === 'Common Stock')
        .map((item: any) => ({
          symbol: item.symbol,
          name: item.description || item.symbol,
          type: 'Equity',
          exchange: item.primaryExchange || 'Unknown'
        }));

      // Combine and remove duplicates
      const combinedResults = [...localResults, ...apiResults]
        .filter((stock, index, self) => 
          index === self.findIndex(s => s.symbol === stock.symbol)
        );

      // Prioritize Indian stocks (.NS suffix) and sort results
      return combinedResults
        .sort((a, b) => {
          // Prioritize exact matches
          const aExactMatch = a.symbol.toLowerCase() === query || a.name.toLowerCase() === query;
          const bExactMatch = b.symbol.toLowerCase() === query || b.name.toLowerCase() === query;
          if (aExactMatch && !bExactMatch) return -1;
          if (!aExactMatch && bExactMatch) return 1;

          // Then prioritize Indian stocks
          const aIndian = a.symbol.endsWith('.NS');
          const bIndian = b.symbol.endsWith('.NS');
          if (aIndian && !bIndian) return -1;
          if (!aIndian && bIndian) return 1;

          // Then sort by symbol length (shorter first)
          return a.symbol.length - b.symbol.length;
        })
        .slice(0, 10); // Limit to 10 results

    } catch (error) {
      console.error('Search error:', error);
      return localResults; // Now localResults matches the StockResult type
    }
  },

  // Get real-time stock data
  getStockData: async (symbol: string): Promise<StockData> => {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${symbol}`);
      }

      const data = await response.json();
      const priceInUSD = data.c || 0;
      const priceInINR = priceInUSD * USD_TO_INR;

      return {
        symbol,
        price: priceInUSD,
        change: data.d || 0,
        changePercent: data.dp || 0,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }
  },

  getMockStockData: (symbol: string): StockData => {
    return {
      symbol: symbol,
      price: 100 + Math.random() * 100,
      change: Number((Math.random() * 10 - 5).toFixed(2)),
      changePercent: Number((Math.random() * 10 - 5).toFixed(2)),
      lastUpdated: new Date().toISOString()
    };
  }
};