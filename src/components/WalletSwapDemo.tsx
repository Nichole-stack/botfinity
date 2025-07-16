import React, { useState } from 'react'
import { Wallet, ArrowUpDown, Settings, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react'

const tokens = [
  { symbol: 'ETH', name: 'Ethereum', balance: '2.5431', price: '$2,341.23', logo: '🔷' },
  { symbol: 'USDC', name: 'USD Coin', balance: '1,250.00', price: '$1.00', logo: '💵' },
  { symbol: 'SOL', name: 'Solana', balance: '45.2', price: '$98.76', logo: '🌞' },
  { symbol: 'MATIC', name: 'Polygon', balance: '1,250', price: '$0.87', logo: '🔮' },
  { symbol: 'AVAX', name: 'Avalanche', balance: '12.8', price: '$34.21', logo: '🏔️' },
]

export const WalletSwapDemo: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [fromToken, setFromToken] = useState('ETH')
  const [toToken, setToToken] = useState('USDC')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [slippage, setSlippage] = useState('0.5')
  const [isSwapping, setIsSwapping] = useState(false)

  const handleConnect = () => {
    setIsConnected(true)
  }

  const handleSwap = () => {
    setIsSwapping(true)
    setTimeout(() => {
      setIsSwapping(false)
      // Reset form
      setFromAmount('')
      setToAmount('')
    }, 3000)
  }

  const swapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const calculateToAmount = (amount: string) => {
    if (!amount) return ''
    const fromPrice = tokens.find(t => t.symbol === fromToken)?.price.replace('$', '') || '0'
    const toPrice = tokens.find(t => t.symbol === toToken)?.price.replace('$', '') || '0'
    const result = (parseFloat(amount) * parseFloat(fromPrice)) / parseFloat(toPrice)
    return result.toFixed(6)
  }

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    setToAmount(calculateToAmount(value))
  }

  return (
    <div className="space-y-6">
      {/* Wallet Connection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Wallet className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Wallet & Swap</h2>
          </div>
          {!isConnected ? (
            <button
              onClick={handleConnect}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Connected</span>
            </div>
          )}
        </div>

        {isConnected && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tokens.map((token, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{token.logo}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{token.symbol}</p>
                    <p className="text-sm text-gray-500">{token.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{token.balance}</p>
                  <p className="text-sm text-gray-500">{token.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Swap Interface */}
      {isConnected && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Swap Tokens</h3>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {/* From Token */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">From</label>
                <span className="text-sm text-gray-500">
                  Balance: {tokens.find(t => t.symbol === fromToken)?.balance}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => handleFromAmountChange(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 text-2xl font-bold bg-transparent border-none outline-none"
                />
                <select
                  value={fromToken}
                  onChange={(e) => setFromToken(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {tokens.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapTokens}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <ArrowUpDown className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* To Token */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">To</label>
                <span className="text-sm text-gray-500">
                  Balance: {tokens.find(t => t.symbol === toToken)?.balance}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  value={toAmount}
                  readOnly
                  placeholder="0.00"
                  className="flex-1 text-2xl font-bold bg-transparent border-none outline-none text-gray-600"
                />
                <select
                  value={toToken}
                  onChange={(e) => setToToken(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {tokens.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Slippage Settings */}
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Slippage Tolerance</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  className="w-16 px-2 py-1 text-sm border border-yellow-200 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <span className="text-sm text-yellow-800">%</span>
              </div>
            </div>

            {/* Swap Button */}
            <button
              onClick={handleSwap}
              disabled={!fromAmount || isSwapping}
              className={`w-full py-4 rounded-lg font-medium transition-colors ${
                !fromAmount || isSwapping
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSwapping ? (
                <div className="flex items-center justify-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Swapping...</span>
                </div>
              ) : (
                `Swap ${fromToken} for ${toToken}`
              )}
            </button>
          </div>

          {/* Transaction Details */}
          {fromAmount && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Transaction Details</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rate</span>
                  <span className="text-gray-900">1 {fromToken} = {(parseFloat(calculateToAmount('1')) || 0).toFixed(6)} {toToken}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Network Fee</span>
                  <span className="text-gray-900">~$2.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price Impact</span>
                  <span className="text-green-600">0.12%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recent Transactions */}
      {isConnected && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {[
              { type: 'Swap', from: 'ETH', to: 'USDC', amount: '0.5', time: '2 min ago', status: 'completed' },
              { type: 'Swap', from: 'USDC', to: 'SOL', amount: '500', time: '1h ago', status: 'completed' },
              { type: 'Swap', from: 'SOL', to: 'MATIC', amount: '10', time: '3h ago', status: 'completed' },
            ].map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <ArrowUpDown className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {tx.type} {tx.amount} {tx.from} → {tx.to}
                    </p>
                    <p className="text-sm text-gray-500">{tx.time}</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  {tx.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
