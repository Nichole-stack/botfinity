import React, { useState, useRef, useEffect } from 'react'
import { X, Send, Bot, User, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'ai',
    content: 'Hello! I\'m your AI trading copilot. I can help you with market analysis, trading strategies, and portfolio optimization. What would you like to know?',
    timestamp: new Date(),
    suggestions: [
      'Analyze my portfolio risk',
      'Find arbitrage opportunities',
      'Suggest DCA strategy for ETH',
      'Check market sentiment'
    ]
  }
]

export const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(inputValue),
        timestamp: new Date(),
        suggestions: getRandomSuggestions()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (input: string): string => {
    const responses = [
      'Based on current market conditions, I recommend a cautious approach. ETH is showing strong support at $2,300 with potential upside to $2,500.',
      'I\'ve analyzed your portfolio and noticed high correlation between your holdings. Consider diversifying into different sectors.',
      'Market sentiment is currently bullish with fear & greed index at 72. This might be a good time to take some profits.',
      'I detected unusual whale activity in SOL. Large transfers to exchanges suggest potential selling pressure.',
      'Your DCA strategy for ETH is performing well with 23% returns. Consider increasing allocation during dips below $2,200.'
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const getRandomSuggestions = (): string[] => {
    const allSuggestions = [
      'Show me gas optimization tips',
      'Analyze DeFi yield opportunities',
      'Check for arbitrage on DEXs',
      'Monitor whale movements',
      'Set up price alerts',
      'Review my trading performance',
      'Find undervalued tokens',
      'Explain market indicators'
    ]
    return allSuggestions.sort(() => 0.5 - Math.random()).slice(0, 3)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  if (!isOpen) return null

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white border-l border-gray-200 shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Copilot</h3>
            <p className="text-xs text-green-600">Online • Analyzing markets</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-blue-600' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              
              {message.suggestions && (
                <div className="mt-2 space-y-1">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left text-xs text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded px-2 py-1 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button className="flex flex-col items-center p-2 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <TrendingUp className="w-4 h-4 text-green-600 mb-1" />
            <span className="text-xs text-green-700">Bullish</span>
          </button>
          <button className="flex flex-col items-center p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
            <AlertTriangle className="w-4 h-4 text-red-600 mb-1" />
            <span className="text-xs text-red-700">Risk Alert</span>
          </button>
          <button className="flex flex-col items-center p-2 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
            <Lightbulb className="w-4 h-4 text-yellow-600 mb-1" />
            <span className="text-xs text-yellow-700">Insight</span>
          </button>
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about trading..."
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
