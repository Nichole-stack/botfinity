import React, { useState } from 'react'
import { Bot, MessageSquare, TrendingUp, Zap, Target, Shield, Mic, VolumeX } from 'lucide-react'
import { TradeAssistant } from './TradeAssistant'
import { TradingInterface } from './TradingInterface'
import { AIAssistant } from './AIAssistant'

export const AITradingCopilot: React.FC = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)

  const features = [
    {
      icon: TrendingUp,
      title: 'Predictive Entry/Exit Points',
      description: 'AI-powered analysis of optimal trade timing using technical indicators and market sentiment',
      status: 'active'
    },
    {
      icon: Shield,
      title: 'Token Risk Score',
      description: 'Real-time risk assessment based on liquidity, volatility, and smart contract analysis',
      status: 'active'
    },
    {
      icon: Target,
      title: 'Narrative Heatmap',
      description: 'Track trending narratives and their impact on token performance across social platforms',
      status: 'active'
    },
    {
      icon: Bot,
      title: 'AI-Powered Trade Journal',
      description: 'Automated trade logging with performance insights and strategy recommendations',
      status: 'active'
    },
    {
      icon: Mic,
      title: 'Voice-to-Trade Query',
      description: 'Natural language trading commands and market analysis through voice interface',
      status: 'beta'
    }
  ]

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive)
    if (!isVoiceActive) {
      // Simulate voice activation
      setTimeout(() => setIsVoiceActive(false), 3000)
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">AI Trading Copilot</h1>
                <p className="text-blue-100">Your intelligent trading companion powered by GPT-4o</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Live Market Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">Real-time Insights</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={toggleVoice}
              className={`p-4 rounded-xl transition-all duration-300 ${
                isVoiceActive 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {isVoiceActive ? <VolumeX className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setIsAIAssistantOpen(true)}
              className="p-4 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
            >
              <MessageSquare className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isVoiceActive && (
          <div className="mt-6 p-4 bg-white/10 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Listening... Try saying "What's the best entry for SOL?"</span>
            </div>
          </div>
        )}
      </div>

      {/* Core Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      feature.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {feature.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Trade Assistant */}
      <TradeAssistant />

      {/* Trading Interface */}
      <TradingInterface />

      {/* AI Assistant Sidebar */}
      <AIAssistant 
        isOpen={isAIAssistantOpen} 
        onClose={() => setIsAIAssistantOpen(false)} 
      />
    </div>
  )
}
