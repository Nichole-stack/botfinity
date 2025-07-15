import React, { useState } from 'react'
import { Zap, TrendingUp, Shield, Target, Play, Pause, Settings, BarChart3 } from 'lucide-react'

export const StrategyPanel: React.FC = () => {
  const [activeStrategy, setActiveStrategy] = useState('momentum')

  const strategies = [
    {
      id: 'momentum',
      name: 'Momentum Scalping',
      description: 'High-frequency trading based on price momentum and volume spikes',
      status: 'active',
      pnl: '+$2,847.32',
      winRate: '68.5%',
      trades: 127,
      risk: 'medium',
      timeframe: '1m-5m',
      pairs: ['ETH/USDC', 'MATIC/ETH'],
      performance: '+15.2%'
    },
    {
      id: 'arbitrage',
      name: 'DEX Arbitrage',
      description: 'Cross-DEX price differences exploitation using Monad\'s parallel execution',
      status: 'active',
      pnl: '+$1,234.56',
      winRate: '89.2%',
      trades: 45,
      risk: 'low',
      timeframe: 'Real-time',
      pairs: ['UNI/USDC', 'LINK/ETH'],
      performance: '+8.7%'
    },
    {
      id: 'whale_following',
      name: 'Whale Following',
      description: 'Mirror trades from identified whale wallets with smart position sizing',
      status: 'paused',
      pnl: '+$892.14',
      winRate: '72.1%',
      trades: 23,
      risk: 'high',
      timeframe: 'Event-driven',
      pairs: ['ETH/USDC', 'AAVE/ETH'],
      performance: '+12.4%'
    },
    {
      id: 'mean_reversion',
      name: 'Mean Reversion',
      description: 'Statistical arbitrage based on price deviation from moving averages',
      status: 'inactive',
      pnl: '+$456.78',
      winRate: '61.3%',
      trades: 89,
      risk: 'medium',
      timeframe: '15m-1h',
      pairs: ['MATIC/USDC', 'UNI/ETH'],
      performance: '+5.9%'
    }
  ]

  const strategyDetails = strategies.find(s => s.id === activeStrategy)

  const riskMetrics = [
    { label: 'Max Drawdown', value: '-3.2%', status: 'good' },
    { label: 'Sharpe Ratio', value: '2.14', status: 'excellent' },
    { label: 'Win/Loss Ratio', value: '2.8:1', status: 'good' },
    { label: 'Avg Trade Duration', value: '4.2m', status: 'normal' }
  ]

  return (
    <div className="space-y-6">
      {/* Strategy Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {strategies.map((strategy) => (
          <div
            key={strategy.id}
            onClick={() => setActiveStrategy(strategy.id)}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              activeStrategy === strategy.id
                ? 'bg-purple-500/20 border-purple-500/50'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Zap className="h-4 w-4 text-purple-300" />
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                strategy.status === 'active' ? 'bg-green-500/20 text-green-300' :
                strategy.status === 'paused' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-gray-500/20 text-gray-300'
              }`}>
                {strategy.status}
              </span>
            </div>
            <h4 className="text-white font-medium mb-1">{strategy.name}</h4>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{strategy.description}</p>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">P&L:</span>
                <span className="text-green-400">{strategy.pnl}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Win Rate:</span>
                <span className="text-white">{strategy.winRate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strategy Details */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">{strategyDetails?.name}</h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-all">
                <Play className="h-4 w-4 text-green-300" />
              </button>
              <button className="p-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg transition-all">
                <Pause className="h-4 w-4 text-yellow-300" />
              </button>
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all">
                <Settings className="h-4 w-4 text-gray-300" />
              </button>
            </div>
          </div>

          <p className="text-gray-300 mb-6">{strategyDetails?.description}</p>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-gray-400 text-sm">Total P&L</p>
              <p className="text-green-400 font-semibold">{strategyDetails?.pnl}</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-gray-400 text-sm">Win Rate</p>
              <p className="text-white font-semibold">{strategyDetails?.winRate}</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-gray-400 text-sm">Total Trades</p>
              <p className="text-white font-semibold">{strategyDetails?.trades}</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-gray-400 text-sm">Performance</p>
              <p className="text-green-400 font-semibold">{strategyDetails?.performance}</p>
            </div>
          </div>

          {/* Strategy Configuration */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Configuration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Risk Level</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                  <option value="low">Low Risk</option>
                  <option value="medium" selected>Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Position Size</label>
                <input
                  type="number"
                  defaultValue="5"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Stop Loss %</label>
                <input
                  type="number"
                  defaultValue="2"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Take Profit %</label>
                <input
                  type="number"
                  defaultValue="5"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>
          </div>

          {/* Trading Pairs */}
          <div className="mt-6">
            <h4 className="text-white font-medium mb-3">Active Trading Pairs</h4>
            <div className="flex flex-wrap gap-2">
              {strategyDetails?.pairs.map((pair, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                >
                  {pair}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Risk Metrics</h3>
          <div className="space-y-4">
            {riskMetrics.map((metric, index) => (
              <div key={index} className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-400 text-sm">{metric.label}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    metric.status === 'excellent' ? 'bg-green-400' :
                    metric.status === 'good' ? 'bg-blue-400' :
                    metric.status === 'normal' ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`}></span>
                </div>
                <p className="text-white font-medium">{metric.value}</p>
              </div>
            ))}
          </div>

          {/* AI Recommendations */}
          <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">AI Recommendation</span>
            </div>
            <p className="text-sm text-gray-300">
              Consider reducing position size by 20% due to increased market volatility. 
              Current risk-adjusted returns are optimal at 3-4% position sizing.
            </p>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="mt-6">
            <h4 className="text-white font-medium mb-3">Performance Chart</h4>
            <div className="h-32 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 text-purple-400 mx-auto mb-1" />
                <p className="text-gray-400 text-sm">Real-time performance tracking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
