import React, { useState } from 'react'
import { Link, MessageSquare, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

interface SignalSummary {
  id: string
  source: string
  url: string
  summary: string
  sentiment: 'bullish' | 'bearish' | 'neutral'
  confidence: number
  keyPoints: string[]
  tokens: string[]
  timestamp: Date
}

export const SignalSummarizer: React.FC = () => {
  const [url, setUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [summaries, setSummaries] = useState<SignalSummary[]>([])

  const processSignal = async () => {
    if (!url.trim()) return

    setIsProcessing(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const mockSummary: SignalSummary = {
      id: Date.now().toString(),
      source: url.includes('twitter.com') ? 'Twitter' : url.includes('t.me') ? 'Telegram' : 'Discord',
      url,
      summary: 'Strong bullish signal on $MONAD with technical breakout above key resistance. Multiple whale wallets accumulating. Expected target: $0.045-$0.052.',
      sentiment: 'bullish',
      confidence: 87,
      keyPoints: [
        'Technical breakout above $0.028 resistance',
        'Whale accumulation detected (3 wallets >$100K)',
        'Volume spike +234% in last 4h',
        'Social sentiment turning positive',
        'DEX liquidity increasing (+$2.1M)'
      ],
      tokens: ['MONAD', 'ETH'],
      timestamp: new Date()
    }
    
    setSummaries(prev => [mockSummary, ...prev])
    setUrl('')
    setIsProcessing(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <MessageSquare className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900">Signal Summarizer</h2>
        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">AI Powered</span>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste Twitter/X link, Telegram post, or Discord message..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={processSignal}
            disabled={!url.trim() || isProcessing}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? 'Processing...' : 'Analyze'}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Supports Twitter/X posts, Telegram channels, Discord messages, and CT alpha calls
        </p>
      </div>

      {isProcessing && (
        <div className="bg-purple-50 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-purple-700">Analyzing signal and extracting key insights...</span>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {summaries.map((summary) => (
          <div key={summary.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Link className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{summary.source}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-500">
                  {summary.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  summary.sentiment === 'bullish' ? 'bg-green-100 text-green-800' :
                  summary.sentiment === 'bearish' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {summary.sentiment}
                </span>
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-gray-600">Confidence:</span>
                  <span className="font-medium text-gray-900">{summary.confidence}%</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">AI Summary</h3>
              <p className="text-gray-700">{summary.summary}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Key Points</h4>
              <ul className="space-y-1">
                {summary.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Mentioned tokens:</span>
                {summary.tokens.map((token, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    ${token}
                  </span>
                ))}
              </div>
              
              <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                View Original
              </button>
            </div>
          </div>
        ))}

        {summaries.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No signals analyzed yet</h3>
            <p className="text-gray-600">Paste a Twitter/X link, Telegram post, or Discord message to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}
