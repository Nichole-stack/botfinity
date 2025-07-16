import React, { useState } from 'react'
import { Bot, Mic, Send, TrendingUp, AlertTriangle, Target, Brain, Zap } from 'lucide-react'

const aiSuggestions = [
  "What's the best entry point for ETH right now?",
  "Analyze SOL's price action for the next 24 hours",
  "Should I take profits on my MATIC position?",
  "Find high-potential altcoins under $1",
  "Set up a DCA strategy for BTC"
]

const marketInsights = [
  {
    type: 'bullish',
    token: 'ETH',
    confidence: 87,
    message: 'Strong accumulation pattern detected. RSI oversold, potential bounce incoming.',
    timeframe: '4h'
  },
  {
    type: 'bearish',
    token: 'BTC',
    confidence: 72,
    message: 'Approaching key resistance at $45,000. Volume declining, watch for rejection.',
    timeframe: '1d'
  },
  {
    type: 'neutral',
    token: 'SOL',
    confidence: 65,
    message: 'Consolidating in range. Wait for breakout confirmation above $105.',
    timeframe: '6h'
  }
]

const tradingSignals = [
  {
    token: 'MATIC',
    action: 'BUY',
    price: '$0.85',
    target: '$0.95',
    stopLoss: '$0.80',
    confidence: 78,
    reasoning: 'Polygon ecosystem growth + technical breakout'
  },
  {
    token: 'AVAX',
    action: 'SELL',
    price: '$34.50',
    target: '$32.00',
    stopLoss: '$36.00',
    confidence: 82,
    reasoning: 'Overbought conditions + resistance rejection'
  }
]

export const AITradingCopilot: React.FC = () => {
  const [message, setMessage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      message: "Hello! I'm your AI Trading Copilot. I can help you analyze markets, find trading opportunities, and optimize your strategies. What would you like to explore today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newUserMessage = {
      type: 'user',
      message: message,
      timestamp: new Date().toLocaleTimeString()
    }

    const aiResponse = {
      type: 'ai',
      message: "I'm analyzing the market data for your query. Based on current trends and technical indicators, here's what I found...",
      timestamp: new Date().toLocaleTimeString()
    }

    setChatHistory(prev => [...prev, newUserMessage, aiResponse])
    setMessage('')
  }

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion)
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice input functionality would be implemented here
  }

  return (
    <div className="space-y-6">
      {/* AI Chat Interface */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">AI Trading Copilot</h2>
            <p className="text-sm text-gray-500">Your intelligent trading assistant</p>
          </div>
        </div>

        {/* Chat History */}
        <div className="h-96 overflow-y-auto mb-4 space-y-4 bg-gray-50 rounded-lg p-4">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                chat.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}>
                <p className="text-sm">{chat.message}</p>
                <p className={`text-xs mt-1 ${chat.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {chat.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me about market analysis, trading strategies, or specific tokens..."
              className="w-full p-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={toggleVoiceInput}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
                isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
              } hover:bg-opacity-80 transition-colors`}
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {aiSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Insights */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Market Insights</h3>
          </div>
          <div className="space-y-4">
            {marketInsights.map((insight, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">{insight.token}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      insight.type === 'bullish' ? 'bg-green-100 text-green-800' :
                      insight.type === 'bearish' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {insight.type}
                    </span>
                    <span className="text-xs text-gray-500">{insight.timeframe}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{insight.confidence}%</span>
                </div>
                <p className="text-sm text-gray-600">{insight.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trading Signals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900">AI Trading Signals</h3>
          </div>
          <div className="space-y-4">
            {tradingSignals.map((signal, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">{signal.token}</span>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      signal.action === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {signal.action}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{signal.confidence}%</span>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
                  <div>
                    <p className="text-gray-500">Entry</p>
                    <p className="font-medium">{signal.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Target</p>
                    <p className="font-medium text-green-600">{signal.target}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Stop Loss</p>
                    <p className="font-medium text-red-600">{signal.stopLoss}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{signal.reasoning}</p>
                
                <button className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  signal.action === 'BUY' 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}>
                  Execute {signal.action} Order
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Features Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Copilot Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Market Analysis</h4>
              <p className="text-sm text-gray-600">Real-time technical analysis</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Entry/Exit Points</h4>
              <p className="text-sm text-gray-600">Optimal timing predictions</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Risk Assessment</h4>
              <p className="text-sm text-gray-600">Token risk scoring</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
