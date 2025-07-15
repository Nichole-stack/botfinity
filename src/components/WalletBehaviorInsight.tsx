import React, { useState } from 'react'
import { Eye, Bell, TrendingUp, TrendingDown, Copy, ExternalLink, Plus } from 'lucide-react'

interface WalletInsight {
  address: string
  label: string
  type: 'whale' | 'influencer' | 'smart_money' | 'fund'
  totalValue: string
  recentActivity: {
    action: 'buy' | 'sell'
    token: string
    amount: string
    value: string
    time: string
    profit?: string
  }[]
  performance: {
    winRate: number
    avgReturn: string
    totalTrades: number
  }
  isTracking: boolean
  notifications: boolean
}

const mockWallets: WalletInsight[] = [
  {
    address: '0x742d35Cc6634C0532925a3b8D0C9964E8d8b4b5C',
    label: 'Monad Whale #1',
    type: 'whale',
    totalValue: '$2.4M',
    recentActivity: [
      { action: 'buy', token: 'MONAD', amount: '2.1M', value: '$49.1K', time: '2m ago', profit: '+$12.3K' },
      { action: 'sell', token: 'ALPHA', amount: '150K', value: '$184.5K', time: '1h ago', profit: '+$45.2K' },
      { action: 'buy', token: 'BETA', amount: '89K', value: '$40.4K', time: '3h ago' }
    ],
    performance: { winRate: 87, avgReturn: '+23.4%', totalTrades: 156 },
    isTracking: true,
    notifications: true
  },
  {
    address: '0x8f3a92Bb7f4c8d2e1a5b6c9d0e2f3a4b5c6d7e8f',
    label: 'Smart Money Fund',
    type: 'fund',
    totalValue: '$890K',
    recentActivity: [
      { action: 'buy', token: 'GAMMA', amount: '45K', value: '$67.5K', time: '15m ago' },
      { action: 'buy', token: 'DELTA', amount: '120K', value: '$96K', time: '45m ago', profit: '+$8.9K' }
    ],
    performance: { winRate: 73, avgReturn: '+18.7%', totalTrades: 89 },
    isTracking: false,
    notifications: false
  },
  {
    address: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    label: 'CT Influencer',
    type: 'influencer',
    totalValue: '$456K',
    recentActivity: [
      { action: 'sell', token: 'EPSILON', amount: '200K', value: '$78K', time: '30m ago', profit: '+$23.1K' },
      { action: 'buy', token: 'ZETA', amount: '67K', value: '$45.6K', time: '2h ago' }
    ],
    performance: { winRate: 65, avgReturn: '+15.2%', totalTrades: 234 },
    isTracking: true,
    notifications: false
  }
]

export const WalletBehaviorInsight: React.FC = () => {
  const [wallets, setWallets] = useState<WalletInsight[]>(mockWallets)
  const [newWalletAddress, setNewWalletAddress] = useState('')
  const [showAddWallet, setShowAddWallet] = useState(false)

  const toggleTracking = (address: string) => {
    setWallets(prev => prev.map(wallet => 
      wallet.address === address 
        ? { ...wallet, isTracking: !wallet.isTracking }
        : wallet
    ))
  }

  const toggleNotifications = (address: string) => {
    setWallets(prev => prev.map(wallet => 
      wallet.address === address 
        ? { ...wallet, notifications: !wallet.notifications }
        : wallet
    ))
  }

  const addWallet = () => {
    if (!newWalletAddress.trim()) return
    
    const newWallet: WalletInsight = {
      address: newWalletAddress,
      label: 'New Wallet',
      type: 'whale',
      totalValue: 'Analyzing...',
      recentActivity: [],
      performance: { winRate: 0, avgReturn: '0%', totalTrades: 0 },
      isTracking: true,
      notifications: false
    }
    
    setWallets(prev => [newWallet, ...prev])
    setNewWalletAddress('')
    setShowAddWallet(false)
  }

  const getTypeColor = (type: WalletInsight['type']) => {
    switch (type) {
      case 'whale': return 'bg-blue-100 text-blue-800'
      case 'influencer': return 'bg-purple-100 text-purple-800'
      case 'smart_money': return 'bg-green-100 text-green-800'
      case 'fund': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Eye className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">Wallet Behavior Insight</h2>
        </div>
        
        <button
          onClick={() => setShowAddWallet(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Track Wallet</span>
        </button>
      </div>

      {showAddWallet && (
        <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newWalletAddress}
              onChange={(e) => setNewWalletAddress(e.target.value)}
              placeholder="Enter wallet address (0x...)"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              onClick={addWallet}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => setShowAddWallet(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {wallets.map((wallet) => (
          <div key={wallet.address} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{wallet.label}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(wallet.type)}`}>
                      {wallet.type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-sm text-gray-600">{wallet.address.slice(0, 10)}...{wallet.address.slice(-8)}</p>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{wallet.totalValue}</p>
                  <p className="text-sm text-gray-600">Portfolio Value</p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleTracking(wallet.address)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      wallet.isTracking 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {wallet.isTracking ? 'Tracking' : 'Track'}
                  </button>
                  
                  <button
                    onClick={() => toggleNotifications(wallet.address)}
                    className={`p-2 rounded-lg transition-colors ${
                      wallet.notifications 
                        ? 'bg-yellow-100 text-yellow-600' 
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Win Rate</span>
                    <span className="font-medium text-gray-900">{wallet.performance.winRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Return</span>
                    <span className="font-medium text-green-600">{wallet.performance.avgReturn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Trades</span>
                    <span className="font-medium text-gray-900">{wallet.performance.totalTrades}</span>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
                <div className="space-y-2">
                  {wallet.recentActivity.slice(0, 3).map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          activity.action === 'buy' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {activity.action === 'buy' ? (
                            <TrendingUp className="w-3 h-3 text-green-600" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {activity.action.toUpperCase()} {activity.amount} {activity.token}
                          </p>
                          <p className="text-xs text-gray-600">{activity.time}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{activity.value}</p>
                        {activity.profit && (
                          <p className="text-xs text-green-600">{activity.profit}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {wallet.isTracking && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-700">
                    Actively monitoring for new trades and position changes
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
