import React, { useState } from 'react'
import { ArrowUpDown, Settings, Info } from 'lucide-react'

interface Token {
  symbol: string
  name: string
  address: string
  decimals: number
  logoUrl?: string
}

const MONAD_TOKENS: Token[] = [
  {
    symbol: 'MON',
    name: 'Monad',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
  },
  {
    symbol: 'WMON',
    name: 'Wrapped Monad',
    address: '0x1111111111111111111111111111111111111111',
    decimals: 18,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0x2222222222222222222222222222222222222222',
    decimals: 6,
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0x3333333333333333333333333333333333333333',
    decimals: 6,
  },
  {
    symbol: 'WETH',
    name: 'Wrapped Ethereum',
    address: '0x4444444444444444444444444444444444444444',
    decimals: 18,
  },
  {
    symbol: 'ALPHA',
    name: 'Alpha Token',
    address: '0x5555555555555555555555555555555555555555',
    decimals: 18,
  },
]

export const SwapInterface: React.FC = () => {
  const [tokenIn, setTokenIn] = useState<Token>(MONAD_TOKENS[0])
  const [tokenOut, setTokenOut] = useState<Token>(MONAD_TOKENS[2])
  const [amountIn, setAmountIn] = useState('')
  const [amountOut, setAmountOut] = useState('')
  const [slippage, setSlippage] = useState('0.5')
  const [isSwapping, setIsSwapping] = useState(false)

  const handleSwapTokens = () => {
    const temp = tokenIn
    setTokenIn(tokenOut)
    setTokenOut(temp)
    
    // Swap amounts too
    const tempAmount = amountIn
    setAmountIn(amountOut)
    setAmountOut(tempAmount)
  }

  const calculateEstimatedOutput = (inputAmount: string) => {
    if (!inputAmount || isNaN(parseFloat(inputAmount))) return ''
    
    // Mock exchange rate calculation (in real app, this would call DEX API)
    const mockRate = tokenIn.symbol === 'MON' ? 0.023 : 43.48 // MON to USDC rate
    const estimated = parseFloat(inputAmount) * mockRate
    return estimated.toFixed(6)
  }

  const handleAmountInChange = (value: string) => {
    setAmountIn(value)
    setAmountOut(calculateEstimatedOutput(value))
  }

  const handleSwap = async () => {
    if (!amountIn || !tokenIn || !tokenOut) return

    setIsSwapping(true)

    // Simulate swap transaction
    console.log('=== SWAP SIMULATION ===')
    console.log('Token In:', {
      symbol: tokenIn.symbol,
      name: tokenIn.name,
      address: tokenIn.address,
      amount: amountIn,
    })
    console.log('Token Out:', {
      symbol: tokenOut.symbol,
      name: tokenOut.name,
      address: tokenOut.address,
      estimatedAmount: amountOut,
    })
    console.log('Slippage Tolerance:', `${slippage}%`)
    console.log('Transaction Details:', {
      type: 'swap',
      network: 'Monad Testnet',
      timestamp: new Date().toISOString(),
    })

    // Simulate transaction delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSwapping(false)
    
    // Reset form after successful swap
    setAmountIn('')
    setAmountOut('')
    
    alert(`Swap simulated successfully!\nSwapped ${amountIn} ${tokenIn.symbol} for ~${amountOut} ${tokenOut.symbol}`)
  }

  const TokenSelector: React.FC<{
    selectedToken: Token
    onSelect: (token: Token) => void
    label: string
  }> = ({ selectedToken, onSelect, label }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={selectedToken.address}
        onChange={(e) => {
          const token = MONAD_TOKENS.find(t => t.address === e.target.value)
          if (token) onSelect(token)
        }}
        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      >
        {MONAD_TOKENS.map((token) => (
          <option key={token.address} value={token.address}>
            {token.symbol} - {token.name}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">Swap Interface</h2>
        </div>
        
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Token In */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <TokenSelector
            selectedToken={tokenIn}
            onSelect={setTokenIn}
            label="From"
          />
          
          <div className="mt-3">
            <input
              type="number"
              value={amountIn}
              onChange={(e) => handleAmountInChange(e.target.value)}
              placeholder="0.0"
              className="w-full p-3 text-lg border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>Balance: 0.0000 {tokenIn.symbol}</span>
            <button className="text-blue-600 hover:text-blue-700">Max</button>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwapTokens}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowUpDown className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Token Out */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <TokenSelector
            selectedToken={tokenOut}
            onSelect={setTokenOut}
            label="To"
          />
          
          <div className="mt-3">
            <input
              type="number"
              value={amountOut}
              readOnly
              placeholder="0.0"
              className="w-full p-3 text-lg border border-gray-200 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>Balance: 0.0000 {tokenOut.symbol}</span>
            <span>Estimated</span>
          </div>
        </div>

        {/* Slippage Settings */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Slippage Tolerance</span>
            <div className="flex items-center space-x-1">
              <Info className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          
          <div className="flex space-x-2">
            {['0.1', '0.5', '1.0'].map((value) => (
              <button
                key={value}
                onClick={() => setSlippage(value)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  slippage === value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {value}%
              </button>
            ))}
            <input
              type="number"
              value={slippage}
              onChange={(e) => setSlippage(e.target.value)}
              className="w-16 px-2 py-1 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
              step="0.1"
              min="0.1"
              max="50"
            />
          </div>
        </div>

        {/* Swap Details */}
        {amountIn && amountOut && (
          <div className="p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Exchange Rate</span>
              <span className="font-medium">1 {tokenIn.symbol} = {(parseFloat(amountOut) / parseFloat(amountIn)).toFixed(6)} {tokenOut.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price Impact</span>
              <span className="font-medium text-green-600">{'< 0.01%'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Minimum Received</span>
              <span className="font-medium">{(parseFloat(amountOut) * (1 - parseFloat(slippage) / 100)).toFixed(6)} {tokenOut.symbol}</span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          disabled={!amountIn || !amountOut || isSwapping}
          className="w-full py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSwapping ? 'Swapping...' : `Swap ${tokenIn.symbol} for ${tokenOut.symbol}`}
        </button>

        {/* Network Info */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <span className="text-blue-700 text-sm font-medium">
              Trading on Monad Testnet
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
