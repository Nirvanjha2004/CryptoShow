const BASE_URL = 'https://api.coingecko.com/api/v3';

export async function searchCrypto(query: string) {
  const response = await fetch(
    `${BASE_URL}/search?query=${encodeURIComponent(query)}`
  );
  if (!response.ok) throw new Error('Failed to search cryptocurrency');
  return response.json();
}

export async function getCryptoData(id: string) {
  const response = await fetch(
    `${BASE_URL}/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`
  );
  if (!response.ok) throw new Error('Failed to fetch cryptocurrency data');
  return response.json();
}

export async function getCryptoChart(id: string, days: number = 7) {
  const response = await fetch(
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  );
  if (!response.ok) throw new Error('Failed to fetch chart data');
  return response.json();
}