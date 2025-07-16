import React from 'react'
import { TrendingUp, TrendingDown, DollarSign, Activity, AlertTriangle, Zap, BarChart3, Target } from 'lucide-react'

const portfolioStats = [
  { label: 'Total Portfolio', value: '$127,543.21', change: '+12.5%', trend: 'up' },
  { label: '24h P&L', value: '+$3,247.89', change: '+2.6%', trend: 'up' },
  { label: 'Active Positions', value: '8', change: '+2', trend: 'up' },
  { label: 'Win Rate', value: '73.2%', change: '+5.1%', trend: 'up' },
]

const activePositions = [
  { token: 'ETH', amount: '2.5', value: '$5,853.08', entry: '$2,200.00', current: '$2,341.23', pnl: '+$353.08', pnlPercent: '+6.4%' },
  { token: 'SOL', amount: '45.2', value: '$4,464.55', entry: '$85.50', current: '$98.76', pnl: '+$599.76', pnlPercent: '+15.5%' },
  { token: 'MATIC', amount: '1,250', value: '$1,087.50', entry: '$0.92', current: '$0.87', pnl: '-$62.50', pnlPercent: '-5.4%' },
  { token: 'AVAX', amount: '12.8', value: '$437.89', entry: '$38.50', current: '$34.21', pnl: '-$54.91', pnlPercent: '-11.1%' },
]

const recentTrades = [
  { token: 'ETH', action: 'BUY', amount: '0.5', price: '$2,341.23', time: '2 min ago', profit: '+$23.41', status: 'completed' },
  { token: 'SOL', action: 'SELL', amount: '10.2', price: '$98.76', time: '15 min ago', profit: '+$156.78', status: 'completed' },
  { token: 'MATIC', action: 'BUY', amount: '500', price: '$0.87', time: '1h ago', profit: '-$12.50', status: 'completed' },
  { token: 'AVAX', action: 'SELL', amount: '5.8', price: '$34.21', time: '2h ago', profit: '+$89.34', status: 'completed' },
]

const aiInsights = [
  { 
    type: 'opportunity', 
    token: 'ETH', 
    confidence: 87, 
    message: 'Strong accumulation pattern detected. Consider increasing position.',
    action: 'BUY'
  },
  { 
    type: 'warning', 
    token: 'BTC', 
    confidence: 72, 
    message: 'Approaching resistance level at $45,000. Consider taking profits.',
    action: 'SELL'
  },
  { 
    type: 'neutral', 
    token: 'SOL', 
    confidence: 65, 
    message: 'Consolidation phase expected. Hold current position.',
    action: 'HOLD'
  },
]

export const TradingDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioStats.map((stat, index) => (
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
        {/* AI Insights */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
            </div>
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{insight.token}</span>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        insight.type === 'opportunity' ? 'bg-green-100 text-green-800' :
                        insight.type === 'warning' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {insight.action}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{insight.confidence}%</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{insight.message}</p>
                  <button className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    insight.action === 'BUY' ? 'bg-green-600 hover:bg-green-700 text-white' :
                    insight.action === 'SELL' ? 'bg-red-600 hover:bg-red-700 text-white' :
                    'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}>
                    {insight.action === 'HOLD' ? 'Monitor' : `${insight.action} ${insight.token}`}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Positions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Active Positions</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Manage All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm font-medium text-gray-500 border-b">
                    <th className="pb-3">Token</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Value</th>
                    <th className="pb-3">Entry Price</th>
                    <th className="pb-3">Current Price</th>
                    <th className="pb-3">P&L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {activePositions.map((position, index) => (
                    <tr key={index} className="text-sm">
                      <td className="py-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{position.token.slice(0, 1)}</span>
                          </div>
                          <span className="font-medium text-gray-900">{position.token}</span>
                        </div>
                      </td>
                      <td className="py-3 text-gray-600">{position.amount}</td>
                      <td className="py-3 font-medium text-gray-900">{position.value}</td>
                      <td className="py-3 text-gray-600">{position.entry}</td>
                      <td className="py-3 text-gray-600">{position.current}</td>
                      <td className="py-3">
                        <div className={`${position.pnl.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          <div className="font-medium">{position.pnl}</div>
                          <div className="text-xs">{position.pnlPercent}</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Trades */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Trades</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All Trades
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
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentTrades.map((trade, index) => (
                <tr key={index} className="text-sm">
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{trade.token.slice(0, 1)}</span>
                      </div>
                      <span className="font-medium text-gray-900">{trade.token}</span>
                    </div>
                  </td>
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
                  <td className="py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {trade.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Portfolio Performance</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">1D</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">7D</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">30D</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">1Y</button>
          </div>
        </div>
        <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Portfolio performance chart</p>
            <p className="text-sm text-gray-400">Real-time data visualization</p>
          </div>
        </div>
      </div>
    </div>
  )
}
