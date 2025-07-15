import React from 'react'
import { TrendingUp, Target, Zap, AlertTriangle, BarChart3, PieChart } from 'lucide-react'

const performanceMetrics = [
  { label: 'Total Return', value: '+156.7%', period: 'All Time', trend: 'up' },
  { label: 'Sharpe Ratio', value: '2.34', period: '90 Days', trend: 'up' },
  { label: 'Max Drawdown', value: '-12.5%', period: '30 Days', trend: 'down' },
  { label: 'Win Rate', value: '73.2%', period: 'Last 100 Trades', trend: 'up' },
]

const aiInsights = [
  {
    type: 'opportunity',
    title: 'DeFi Yield Farming',
    description: 'High APY opportunities detected in Uniswap V3 pools',
    confidence: 87,
    impact: 'High'
  },
  {
    type: 'risk',
    title: 'Market Volatility',
    description: 'Increased correlation between major assets suggests higher risk',
    confidence: 92,
    impact: 'Medium'
  },
  {
    type: 'trend',
    title: 'Layer 2 Adoption',
    description: 'Growing transaction volume on Polygon and Arbitrum',
    confidence: 78,
    impact: 'High'
  }
]

const tradingStats = [
  { metric: 'Total Trades', value: '1,247', change: '+23' },
  { metric: 'Profitable Trades', value: '913', change: '+18' },
  { metric: 'Average Hold Time', value: '4.2 days', change: '-0.3' },
  { metric: 'Best Trade', value: '+$2,847', change: 'ETH' },
]

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">{metric.label}</p>
              <div className={`p-1 rounded ${metric.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                <TrendingUp className={`w-4 h-4 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600 rotate-180'}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
            <p className="text-sm text-gray-500">{metric.period}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Insights */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">AI Market Insights</h3>
            </div>
            
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1 rounded ${
                        insight.type === 'opportunity' ? 'bg-green-100' :
                        insight.type === 'risk' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        {insight.type === 'opportunity' ? <Target className="w-4 h-4 text-green-600" /> :
                         insight.type === 'risk' ? <AlertTriangle className="w-4 h-4 text-red-600" /> :
                         <TrendingUp className="w-4 h-4 text-blue-600" />}
                      </div>
                      <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        insight.impact === 'High' ? 'bg-red-100 text-red-800' :
                        insight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {insight.impact}
                      </span>
                      <span className="text-sm text-gray-500">{insight.confidence}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trading Statistics */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Trading Stats</h3>
            </div>
            
            <div className="space-y-4">
              {tradingStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{stat.metric}</p>
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{stat.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <PieChart className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Risk Analysis</h3>
            </div>
            
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop"
              alt="Risk Analysis Chart"
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Portfolio Risk Score</span>
                <span className="text-sm font-medium text-yellow-600">Medium</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Diversification</span>
                <span className="text-sm font-medium text-green-600">Good</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Volatility</span>
                <span className="text-sm font-medium text-red-600">High</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance</h3>
          <img
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop"
            alt="Portfolio Performance Chart"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">1M</p>
              <p className="font-semibold text-green-600">+12.5%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">3M</p>
              <p className="font-semibold text-green-600">+28.7%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">1Y</p>
              <p className="font-semibold text-green-600">+156.7%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Correlation</h3>
          <img
            src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=500&h=300&fit=crop"
            alt="Market Correlation Heatmap"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">BTC Correlation</span>
              <span className="text-sm font-medium">0.78</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Market Beta</span>
              <span className="text-sm font-medium">1.23</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Alpha</span>
              <span className="text-sm font-medium text-green-600">0.15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
