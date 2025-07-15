import React from 'react'
import { TrendingUp, TrendingDown, DollarSign, Activity, AlertTriangle, Zap } from 'lucide-react'

const stats = [
  { label: 'Portfolio Value', value: '$127,543.21', change: '+12.5%', trend: 'up' },
  { label: '24h P&L', value: '+$3,247.89', change: '+2.6%', trend: 'up' },
  { label: 'Active Positions', value: '8', change: '+2', trend: 'up' },
  { label: 'Success Rate', value: '73.2%', change: '+5.1%', trend: 'up' },
]

const recentTrades = [
  { token: 'ETH', action: 'BUY', amount: '2.5', price: '$2,341.23', time: '2 min ago', profit: '+$234.12' },
  { token: 'SOL', action: 'SELL', amount: '45.2', price: '$98.76', time: '15 min ago', profit: '+$1,234.56' },
  { token: 'MATIC', action: 'BUY', amount: '1,250', price: '$0.87', time: '1h ago', profit: '-$45.23' },
  { token: 'AVAX', action: 'SELL', amount: '12.8', price: '$34.21', time: '2h ago', profit: '+$567.89' },
]

const aiSignals = [
  { type: 'bullish', token: 'ETH', confidence: 87, message: 'Strong accumulation pattern detected' },
  { type: 'bearish', token: 'BTC', confidence: 72, message: 'Resistance level approaching' },
  { type: 'neutral', token: 'SOL', confidence: 65, message: 'Consolidation phase expected' },
]

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`flex items-center space-x-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="text-sm font-medium">{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Signals */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">AI Signals</h3>
            </div>
            <div className="space-y-4">
              {aiSignals.map((signal, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{signal.token}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        signal.type === 'bullish' ? 'bg-green-100 text-green-800' :
                        signal.type === 'bearish' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {signal.type}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{signal.confidence}%</span>
                  </div>
                  <p className="text-sm text-gray-600">{signal.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Trades */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Trades</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm font-medium text-gray-500 border-b">
                    <th className="pb-3">Token</th>
                    <th className="pb-3">Action</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Time</th>
                    <th className="pb-3">P&L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentTrades.map((trade, index) => (
                    <tr key={index} className="text-sm">
                      <td className="py-3 font-medium text-gray-900">{trade.token}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          trade.action === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {trade.action}
                        </span>
                      </td>
                      <td className="py-3 text-gray-600">{trade.amount}</td>
                      <td className="py-3 text-gray-600">{trade.price}</td>
                      <td className="py-3 text-gray-500">{trade.time}</td>
                      <td className={`py-3 font-medium ${trade.profit.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {trade.profit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop"
              alt="Market Chart"
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h4 className="font-semibold text-gray-900">DeFi Pulse</h4>
            <p className="text-sm text-gray-600">Total Value Locked: $45.2B</p>
          </div>
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop"
              alt="Trading Volume"
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h4 className="font-semibold text-gray-900">24h Volume</h4>
            <p className="text-sm text-gray-600">$12.8B across all DEXs</p>
          </div>
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=200&fit=crop"
              alt="Gas Tracker"
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h4 className="font-semibold text-gray-900">Gas Tracker</h4>
            <p className="text-sm text-gray-600">Monad: ~0.001 ETH</p>
          </div>
        </div>
      </div>
    </div>
  )
}
