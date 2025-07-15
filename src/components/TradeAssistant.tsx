import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, TrendingUp, AlertTriangle, DollarSign, Activity } from 'lucide-react'

interface TradeQuery {
  id: string
  query: string
  response: {
    analysis: string
    technicalAnalysis: {
      support: string
      resistance: string
      trend: 'bullish' | 'bearish' | 'neutral'
    }
    sentiment: {
      score: number
      sources: string[]
    }
    onchainFlow: {
      volume24h: string
      whaleActivity: string
      liquidityChange: string
    }
    recommendation: string
    riskLevel: 'low' | 'medium' | 'high'
  }
  timestamp: Date
}

export const TradeAssistant: React.FC = () => {
  const [query, setQuery] = useState('')
  const [queries, setQueries] = useState<TradeQuery[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [queries])

  const analyzeQuery = async (userQuery: string): Promise<TradeQuery['response']> => {
    // Simulate AI analysis - in production, this would call GPT-4o/Claude
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const mockResponses = {
      'JUP': {
        analysis: 'Jupiter ($JUP) is showing strong accumulation patterns with increasing DEX volume. Recent whale activity suggests institutional interest.',
        technicalAnalysis: {
          support: '$0.85 - $0.92',
          resistance: '$1.15 - $1.22',
          trend: 'bullish' as const
        },
        sentiment: {
          score: 78,
          sources: ['Twitter: 156 mentions (+23%)', 'Telegram: 89 signals', 'Discord: 45 alpha calls']
        },
        onchainFlow: {
          volume24h: '$12.4M (+34%)',
          whaleActivity: '3 large buys (>$100K) in last 4h',
          liquidityChange: '+$2.1M net inflow'
        },
        recommendation: 'Good entry zone between $0.88-$0.95. Consider DCA approach with 2-3% position size.',
        riskLevel: 'medium' as const
      },
      default: {
        analysis: 'Based on current market conditions and onchain data, here\'s my analysis of the requested token.',
        technicalAnalysis: {
          support: '$1.45 - $1.52',
          resistance: '$1.85 - $1.92',
          trend: 'neutral' as const
        },
        sentiment: {
          score: 65,
          sources: ['Social sentiment: Neutral', 'DEX activity: Moderate', 'Whale tracking: Low activity']
        },
        onchainFlow: {
          volume24h: '$5.2M',
          whaleActivity: 'Minimal large transactions',
          liquidityChange: 'Stable liquidity'
        },
        recommendation: 'Wait for clearer signals or consider small position with tight stops.',
        riskLevel: 'medium' as const
      }
    }

    const token = userQuery.match(/\$([A-Z]+)/)?.[1]
    return mockResponses[token as keyof typeof mockResponses] || mockResponses.default
  }

  const handleSubmit = async () => {
    if (!query.trim()) return

    const newQuery: TradeQuery = {
      id: Date.now().toString(),
      query,
      response: await analyzeQuery(query),
      timestamp: new Date()
    }

    setIsAnalyzing(true)
    const response = await analyzeQuery(query)
    setIsAnalyzing(false)

    setQueries(prev => [...prev, { ...newQuery, response }])
    setQuery('')
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Bot className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Trade Assistant</h2>
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">GPT-4o Powered</span>
      </div>

      <div className="space-y-6 max-h-96 overflow-y-auto mb-6">
        {queries.map((item) => (
          <div key={item.id} className="space-y-4">
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-xs">
                <p className="text-sm">{item.query}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">AI Analysis</span>
              </div>
              
              <p className="text-sm text-gray-700">{item.response.analysis}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Technical Analysis</span>
                  </h4>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Support:</span> {item.response.technicalAnalysis.support}</p>
                    <p><span className="font-medium">Resistance:</span> {item.response.technicalAnalysis.resistance}</p>
                    <p className="flex items-center space-x-1">
                      <span className="font-medium">Trend:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.response.technicalAnalysis.trend === 'bullish' ? 'bg-green-100 text-green-800' :
                        item.response.technicalAnalysis.trend === 'bearish' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.response.technicalAnalysis.trend}
                      </span>
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 flex items-center space-x-1">
                    <Activity className="w-4 h-4" />
                    <span>Sentiment Score</span>
                  </h4>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${item.response.sentiment.score}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">{item.response.sentiment.score}/100</span>
                    </div>
                    {item.response.sentiment.sources.map((source, idx) => (
                      <p key={idx} className="text-xs text-gray-600">{source}</p>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 flex items-center space-x-1">
                  <DollarSign className="w-4 h-4" />
                  <span>Onchain Flow</span>
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium">24h Volume</p>
                    <p className="text-gray-600">{item.response.onchainFlow.volume24h}</p>
                  </div>
                  <div>
                    <p className="font-medium">Whale Activity</p>
                    <p className="text-gray-600">{item.response.onchainFlow.whaleActivity}</p>
                  </div>
                  <div>
                    <p className="font-medium">Liquidity</p>
                    <p className="text-gray-600">{item.response.onchainFlow.liquidityChange}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                    item.response.riskLevel === 'high' ? 'text-red-600' :
                    item.response.riskLevel === 'medium' ? 'text-yellow-600' :
                    'text-green-600'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">Recommendation</p>
                    <p className="text-sm text-gray-700 mt-1">{item.response.recommendation}</p>
                    <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${
                      item.response.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                      item.response.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.response.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isAnalyzing && (
          <div className="flex justify-start">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Analyzing market data...</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="What's the best entry for $JUP?"
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSubmit}
          disabled={!query.trim() || isAnalyzing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
