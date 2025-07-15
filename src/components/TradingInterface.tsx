import React, { useState } from 'react'
import { Search, TrendingUp, TrendingDown, Zap, Target, Shield } from 'lucide-react'

const topTokens = [
  { symbol: 'ETH', name: 'Ethereum', price: '$2,341.23', change: '+2.5%', volume: '$1.2B', trend: 'up' },
  { symbol: 'BTC', name: 'Bitcoin', price: '$43,567.89', change: '-1.2%', volume: '$890M', trend: 'down' },
  { symbol: 'SOL', name: 'Solana', price: '$98.76', change: '+5.7%', volume: '$456M', trend: 'up' },
  { symbol: 'MATIC', name: 'Polygon', price: '$0.87', change: '+3.2%', volume: '$234M', trend: 'up' },
  { symbol: 'AVAX', name: 'Avalanche', price: '$34.21', change: '-0.8%', volume: '$178M', trend: 'down' },
]

const strategies = [
  { name: 'DCA Strategy', description: 'Dollar-cost averaging for ETH', risk: 'Low', apy: '12.5%' },
  { name: 'Momentum Trading', description: 'Follow strong price movements', risk: 'High', apy: '28.3%' },
  { name: 'Mean Reversion', description: 'Buy dips, sell peaks', risk: 'Medium', apy: '18.7%' },
]

export const TradingInterface: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState('ETH')
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market')
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy')

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Token List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top Tokens</h3>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tokens..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm font-medium text-gray-500 border-b">
                    <th className="pb-3">Token</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">24h Change</th>
                    <th className="pb-3">Volume</th>
                    <th className="pb-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {topTokens.map((token, index) => (
                    <tr key={index} className="text-sm hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{token.symbol.slice(0, 2)}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{token.symbol}</p>
                            <p className="text-gray-500">{token.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 font-medium text-gray-900">{token.price}</td>
                      <td className="py-4">
                        <div className={`flex items-center space-x-1 ${token.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {token.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span className="font-medium">{token.change}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-600">{token.volume}</td>
                      <td className="py-4">
                        <button
                          onClick={() => setSelectedToken(token.symbol)}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Trade
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Trading Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Trade</h3>
            
            <div className="space-y-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setTradeType('buy')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    tradeType === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setTradeType('sell')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    tradeType === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Sell
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Token</label>
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {topTokens.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol} - {token.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setOrderType('market')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    orderType === 'market' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Market
                </button>
                <button
                  onClick={() => setOrderType('limit')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    orderType === 'limit' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Limit
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {orderType === 'limit' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
                tradeType === 'buy' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
              }`}>
                {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedToken}
              </button>
            </div>
          </div>

          {/* AI Strategies */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">AI Strategies</h3>
            </div>
            
            <div className="space-y-3">
              {strategies.map((strategy, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{strategy.name}</h4>
                    <span className="text-sm font-medium text-green-600">{strategy.apy}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{strategy.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      strategy.risk === 'Low' ? 'bg-green-100 text-green-800' :
                      strategy.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {strategy.risk} Risk
                    </span>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
