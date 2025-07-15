import React, { useState, useEffect } from 'react'
import { Search, TrendingUp, Droplets, Zap, ExternalLink } from 'lucide-react'

interface TrendingToken {
  symbol: string
  name: string
  price: string
  change24h: string
  volume24h: string
  marketCap: string
  liquidityChange: string
  whaleActivity: number
  trend: 'up' | 'down'
  chain: string
}

interface WalletActivity {
  address: string
  label: string
  action: 'buy' | 'sell'
  token: string
  amount: string
  value: string
  time: string
}

const mockTrendingTokens: TrendingToken[] = [
  {
    symbol: 'MONAD',
    name: 'Monad',
    price: '$0.0234',
    change24h: '+156.7%',
    volume24h: '$45.2M',
    marketCap: '$12.4M',
    liquidityChange: '+$2.1M',
    whaleActivity: 8,
    trend: 'up',
    chain: 'Monad'
  },
  {
    symbol: 'ALPHA',
    name: 'Alpha Token',
    price: '$1.23',
    change24h: '+89.3%',
    volume24h: '$23.1M',
    marketCap: '$8.7M',
    liquidityChange: '+$1.5M',
    whaleActivity: 5,
    trend: 'up',
    chain: 'Monad'
  },
  {
    symbol: 'BETA',
    name: 'Beta Coin',
    price: '$0.456',
    change24h: '+67.8%',
    volume24h: '$18.9M',
    marketCap: '$6.2M',
    liquidityChange: '+$890K',
    whaleActivity: 3,
    trend: 'up',
    chain: 'Monad'
  }
]

const mockWalletActivity: WalletActivity[] = [
  {
    address: '0x742d...35Cc',
    label: 'Whale #1',
    action: 'buy',
    token: 'MONAD',
    amount: '2.1M',
    value: '$49.1K',
    time: '2m ago'
  },
  {
    address: '0x8f3a...92Bb',
    label: 'Smart Money',
    action: 'buy',
    token: 'ALPHA',
    amount: '40K',
    value: '$49.2K',
    time: '5m ago'
  },
  {
    address: '0x1a2b...78Dd',
    label: 'DeFi Fund',
    action: 'sell',
    token: 'BETA',
    amount: '108K',
    value: '$49.2K',
    time: '8m ago'
  }
]

export const OnchainAlphaScanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'trending' | 'wallets' | 'liquidity'>('trending')
  const [searchTerm, setSearchTerm] = useState('')
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsScanning(true)
      setTimeout(() => setIsScanning(false), 1000)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const filteredTokens = mockTrendingTokens.filter(token =>
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Search className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">Onchain Alpha Scanner</h2>
          {isScanning && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600">Scanning...</span>
            </div>
          )}
        </div>
        
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tokens..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('trending')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'trending' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Trending Tokens
        </button>
        <button
          onClick={() => setActiveTab('wallets')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'wallets' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Whale Activity
        </button>
        <button
          onClick={() => setActiveTab('liquidity')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'liquidity' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Liquidity Flows
        </button>
      </div>

      {activeTab === 'trending' && (
        <div className="space-y-4">
          {filteredTokens.map((token, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{token.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{token.symbol}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{token.chain}</span>
                    </div>
                    <p className="text-sm text-gray-600">{token.name}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{token.price}</p>
                  <div className="flex items-center space-x-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{token.change24h}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">24h Volume</p>
                  <p className="font-medium text-gray-900">{token.volume24h}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Market Cap</p>
                  <p className="font-medium text-gray-900">{token.marketCap}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Liquidity Change</p>
                  <p className="font-medium text-green-600">{token.liquidityChange}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Whale Activity</p>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-yellow-500" />
                    <span className="font-medium text-gray-900">{token.whaleActivity} trades</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'wallets' && (
        <div className="space-y-4">
          {mockWalletActivity.map((activity, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.action === 'buy' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {activity.action === 'buy' ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-red-600 rotate-180" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-gray-900">{activity.label}</p>
                      <button className="text-gray-400 hover:text-gray-600">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">{activity.address}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-semibold ${activity.action === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                    {activity.action.toUpperCase()} {activity.token}
                  </p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="font-medium text-gray-900">{activity.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Value</p>
                  <p className="font-medium text-gray-900">{activity.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'liquidity' && (
        <div className="space-y-4">
          <div className="text-center py-8">
            <Droplets className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Liquidity Flow Analysis</h3>
            <p className="text-gray-600">Real-time tracking of liquidity movements across Monad DEXs</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900">Net Inflows</h4>
                <p className="text-2xl font-bold text-blue-600">+$12.4M</p>
                <p className="text-sm text-blue-700">Last 24h</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900">Active Pools</h4>
                <p className="text-2xl font-bold text-green-600">156</p>
                <p className="text-sm text-green-700">Monad DEXs</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900">Top Pool</h4>
                <p className="text-2xl font-bold text-purple-600">MONAD/ETH</p>
                <p className="text-sm text-purple-700">$8.9M TVL</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
