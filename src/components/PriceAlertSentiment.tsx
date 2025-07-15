import React, { useState } from 'react'
import { Bell, TrendingUp, AlertTriangle, Plus, X } from 'lucide-react'

interface PriceAlert {
  id: string
  token: string
  type: 'price_above' | 'price_below' | 'resistance_break' | 'support_break' | 'sentiment_spike'
  value: string
  currentValue: string
  status: 'active' | 'triggered' | 'expired'
  createdAt: Date
  triggeredAt?: Date
}

interface SentimentData {
  token: string
  score: number
  change24h: number
  sources: {
    twitter: number
    telegram: number
    discord: number
    reddit: number
  }
  trend: 'rising' | 'falling' | 'stable'
}

const mockAlerts: PriceAlert[] = [
  {
    id: '1',
    token: 'MONAD',
    type: 'price_above',
    value: '$0.030',
    currentValue: '$0.0234',
    status: 'active',
    createdAt: new Date(Date.now() - 3600000)
  },
  {
    id: '2',
    token: 'ALPHA',
    type: 'resistance_break',
    value: '$1.50',
    currentValue: '$1.23',
    status: 'active',
    createdAt: new Date(Date.now() - 7200000)
  },
  {
    id: '3',
    token: 'BETA',
    type: 'sentiment_spike',
    value: '80',
    currentValue: '67',
    status: 'triggered',
    createdAt: new Date(Date.now() - 1800000),
    triggeredAt: new Date(Date.now() - 900000)
  }
]

const mockSentimentData: SentimentData[] = [
  {
    token: 'MONAD',
    score: 78,
    change24h: +12,
    sources: { twitter: 156, telegram: 89, discord: 45, reddit: 23 },
    trend: 'rising'
  },
  {
    token: 'ALPHA',
    score: 65,
    change24h: -5,
    sources: { twitter: 89, telegram: 67, discord: 34, reddit: 12 },
    trend: 'falling'
  },
  {
    token: 'BETA',
    score: 82,
    change24h: +18,
    sources: { twitter: 234, telegram: 123, discord: 78, reddit: 45 },
    trend: 'rising'
  }
]

export const PriceAlertSentiment: React.FC = () => {
  const [alerts, setAlerts] = useState<PriceAlert[]>(mockAlerts)
  const [showCreateAlert, setShowCreateAlert] = useState(false)
  const [newAlert, setNewAlert] = useState({
    token: '',
    type: 'price_above' as PriceAlert['type'],
    value: ''
  })

  const createAlert = () => {
    if (!newAlert.token || !newAlert.value) return

    const alert: PriceAlert = {
      id: Date.now().toString(),
      token: newAlert.token.toUpperCase(),
      type: newAlert.type,
      value: newAlert.value,
      currentValue: '$0.00', // Would be fetched from API
      status: 'active',
      createdAt: new Date()
    }

    setAlerts(prev => [alert, ...prev])
    setNewAlert({ token: '', type: 'price_above', value: '' })
    setShowCreateAlert(false)
  }

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  const getAlertTypeLabel = (type: PriceAlert['type']) => {
    switch (type) {
      case 'price_above': return 'Price Above'
      case 'price_below': return 'Price Below'
      case 'resistance_break': return 'Resistance Break'
      case 'support_break': return 'Support Break'
      case 'sentiment_spike': return 'Sentiment Spike'
      default: return type
    }
  }

  const getSentimentColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="space-y-6">
      {/* Price Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Bell className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-900">Price Alerts</h2>
          </div>
          
          <button
            onClick={() => setShowCreateAlert(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Alert</span>
          </button>
        </div>

        {showCreateAlert && (
          <div className="mb-6 p-4 bg-orange-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                value={newAlert.token}
                onChange={(e) => setNewAlert(prev => ({ ...prev, token: e.target.value }))}
                placeholder="Token (e.g., MONAD)"
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              
              <select
                value={newAlert.type}
                onChange={(e) => setNewAlert(prev => ({ ...prev, type: e.target.value as PriceAlert['type'] }))}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="price_above">Price Above</option>
                <option value="price_below">Price Below</option>
                <option value="resistance_break">Resistance Break</option>
                <option value="support_break">Support Break</option>
                <option value="sentiment_spike">Sentiment Spike</option>
              </select>
              
              <input
                type="text"
                value={newAlert.value}
                onChange={(e) => setNewAlert(prev => ({ ...prev, value: e.target.value }))}
                placeholder="Value (e.g., $0.030 or 80)"
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              
              <div className="flex space-x-2">
                <button
                  onClick={createAlert}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowCreateAlert(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className={`border rounded-lg p-4 ${
              alert.status === 'triggered' ? 'border-green-300 bg-green-50' :
              alert.status === 'expired' ? 'border-gray-300 bg-gray-50' :
              'border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    alert.status === 'triggered' ? 'bg-green-100' :
                    alert.status === 'expired' ? 'bg-gray-100' :
                    'bg-orange-100'
                  }`}>
                    {alert.status === 'triggered' ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <Bell className="w-5 h-5 text-orange-600" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{alert.token}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {getAlertTypeLabel(alert.type)}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        alert.status === 'triggered' ? 'bg-green-100 text-green-800' :
                        alert.status === 'expired' ? 'bg-gray-100 text-gray-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {alert.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Target: {alert.value} • Current: {alert.currentValue}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {alert.triggeredAt ? 
                      `Triggered ${alert.triggeredAt.toLocaleTimeString()}` :
                      `Created ${alert.createdAt.toLocaleTimeString()}`
                    }
                  </span>
                  <button
                    onClick={() => deleteAlert(alert.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Sentiment Index */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <AlertTriangle className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">AI Sentiment Index</h2>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Real-time</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockSentimentData.map((data, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{data.token}</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(data.score)}`}>
                  {data.score}/100
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Sentiment Score</span>
                  <span className={`text-sm font-medium ${
                    data.change24h > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {data.change24h > 0 ? '+' : ''}{data.change24h}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${data.score}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">Sources</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Twitter:</span>
                    <span className="font-medium">{data.sources.twitter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Telegram:</span>
                    <span className="font-medium">{data.sources.telegram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discord:</span>
                    <span className="font-medium">{data.sources.discord}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reddit:</span>
                    <span className="font-medium">{data.sources.reddit}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
