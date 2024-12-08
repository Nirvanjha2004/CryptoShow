import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { CryptoData } from '../types/crypto';

interface CryptoCardProps {
  data: CryptoData;
}

export function CryptoCard({ data }: CryptoCardProps) {
  const priceChange = data.price_change_percentage_24h;
  const isPriceUp = priceChange > 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img src={data.image} alt={data.name} className="w-10 h-10" />
          <div>
            <h3 className="text-xl font-bold">{data.name}</h3>
            <p className="text-gray-500 uppercase">{data.symbol}</p>
          </div>
        </div>
        <div className={`flex items-center ${isPriceUp ? 'text-green-500' : 'text-red-500'}`}>
          {isPriceUp ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          <span className="ml-1">{Math.abs(priceChange).toFixed(2)}%</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500">Current Price</p>
          <p className="text-lg font-semibold">${data.current_price.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-500">Market Cap</p>
          <p className="text-lg font-semibold">${data.market_cap.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-500">24h High</p>
          <p className="text-lg font-semibold">${data.high_24h.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-500">24h Low</p>
          <p className="text-lg font-semibold">${data.low_24h.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}