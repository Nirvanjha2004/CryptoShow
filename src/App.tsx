import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { CryptoCard } from './components/CryptoCard';
import { ErrorMessage } from './components/ErrorMessage';
import { Coins } from 'lucide-react';
import type { CryptoData } from './types/crypto';
import * as api from './services/api';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // First search for the crypto
      const searchResult = await api.searchCrypto(query);
      if (!searchResult.coins?.length) {
        throw new Error('No cryptocurrency found with that name');
      }

      // Get detailed data for the first result
      const coinId = searchResult.coins[0].id;
      const detailedData = await api.getCryptoData(coinId);
      
      const formattedData: CryptoData = {
        id: detailedData.id,
        symbol: detailedData.symbol,
        name: detailedData.name,
        image: detailedData.image.large,
        current_price: detailedData.market_data.current_price.usd,
        market_cap: detailedData.market_data.market_cap.usd,
        price_change_percentage_24h: detailedData.market_data.price_change_percentage_24h,
        total_volume: detailedData.market_data.total_volume.usd,
        high_24h: detailedData.market_data.high_24h.usd,
        low_24h: detailedData.market_data.low_24h.usd,
      };

      setCryptoData(formattedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Coins className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Crypto Dashboard
          </h1>
          <p className="text-gray-600">
            Search for any cryptocurrency to see its current market data
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {error && (
          <div className="mb-8">
            <ErrorMessage message={error} />
          </div>
        )}

        {cryptoData && (
          <div className="animate-fade-in">
            <CryptoCard data={cryptoData} />
          </div>
        )}

        {!cryptoData && !error && !isLoading && (
          <div className="text-center text-gray-500 mt-12">
            <p>Enter a cryptocurrency name to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;