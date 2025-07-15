import React from 'react'
import { Eye, TrendingUp, TrendingDown, AlertCircle, ExternalLink } from 'lucide-react'

export const WalletMonitor: React.FC = () => {
  const whaleWallets = [
    {
      address: '0x742d35Cc6634C0532925a3b8D4C9db4C4C9db4C4',
      label: 'Whale #1',
      balance: '15,234 ETH',
      value: '$35.7M',
      change24h: '+2.3%',
      positive: true,
      lastActivity: '15m ago',
      type: 'accumulating'
    },
    {
      address: '0x8ba1f109551bD432803012645Hac189451b934ec',
      label: 'DeFi Whale',
      balance: '8,945 ETH',
      value: '$20.9M',
      change24h: '-1.8%',
      positive: false,
      lastActivity: '2h ago',
      type: 'distributing'
    },
    {
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      label: 'Uniswap Treasury',
      balance: '45,678 UNI',
      value: '$284.5K',
      change24h: '+5.2%',
      positive: true,
      lastActivity: '45m ago',
      type: 'holding'
    }
  ]

  const recentTransactions = [
    {
      hash: '0xabc123...',
      from: '0x742d35...C4C9db4C4',
      to: 'Binance',
      token: 'ETH',
      amount: '500',
      value: '$1.17M',
      type: 'withdrawal',
      time: '5m ago',
      impact: 'bearish'
    },
    {
      hash: '0xdef456...',
      from: 'Coinbase',
      to: '0x8ba1f1...1b934ec',
      token: 'USDC',
      amount: '2.5M',
      value: '$2.5M',
      type: 'deposit',
      time: '12m ago',
      impact: 'bullish'
    },
    {
      hash: '0xghi789...',
      from: '0x1f9840...01F984',
      to: 'Uniswap V3',
      token: 'UNI',
      amount: '10,000',
      value: '$62.3K',
      type: 'stake',
      time: '28m ago',
      impact: 'neutral'
    }
  ]

  const alerts = [
    {
      type: 'whale_movement',
      message: 'Large ETH holder moved 1,000 ETH to exchange',
      severity: 'high',
      time: '3m ago'
    },
    {
      type: 'unusual_volume',
      message: 'Unusual trading volume detected in MATIC/USDC',
      severity: 'medium',
      time: '8m ago'
    },
    {
      type: 'new_whale',
      message: 'New whale wallet identified with 5,000+ ETH',
      severity: 'low',
      time: '15m ago'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Whale Wallets */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Whale Wallets</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400">Live Monitoring</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {whaleWallets.map((wallet, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Eye className="h-4 w-4 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{wallet.label}</p>
                    <p className="text-gray-400 text-sm font-mono">{wallet.address}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-400 text-xs">Balance</p>
                  <p className="text-white font-medium">{wallet.balance}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Value</p>
                  <p className="text-white font-medium">{wallet.value}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">24h Change</p>
                  <p className={`font-medium ${
                    wallet.positive ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {wallet.change24h}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Status</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    wallet.type === 'accumulating' ? 'bg-green-500/20 text-green-300' :
                    wallet.type === 'distributing' ? 'bg-red-500/20 text-red-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {wallet.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Large Transactions</h3>
          <div className="space-y-3">
            {recentTransactions.map((tx, index) => (
              <div key={index} className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${
                      tx.impact === 'bullish' ? 'bg-green-400' :
                      tx.impact === 'bearish' ? 'bg-red-400' : 'bg-yellow-400'
                    }`}></span>
                    <span className="text-white font-medium">{tx.amount} {tx.token}</span>
                    <span className="text-gray-400">({tx.value})</span>
                  </div>
                  <span className="text-gray-400 text-sm">{tx.time}</span>
                </div>
                <div className="text-sm text-gray-300">
                  <span className="font-mono">{tx.from}</span>
                  <span className="mx-2">→</span>
                  <span className="font-mono">{tx.to}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    tx.type === 'withdrawal' ? 'bg-red-500/20 text-red-300' :
                    tx.type === 'deposit' ? 'bg-green-500/20 text-green-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {tx.type}
                  </span>
                  <button className="text-gray-400 hover:text-white">
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Smart Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="p-3 bg-white/5 rounded-lg border-l-4 border-l-yellow-400">
                <div className="flex items-start space-x-3">
                  <AlertCircle className={`h-4 w-4 mt-0.5 ${
                    alert.severity === 'high' ? 'text-red-400' :
                    alert.severity === 'medium' ? 'text-yellow-400' :
                    'text-blue-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-white text-sm">{alert.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        alert.severity === 'high' ? 'bg-red-500/20 text-red-300' :
                        alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {alert.severity}
                      </span>
                      <span className="text-gray-400 text-xs">{alert.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
