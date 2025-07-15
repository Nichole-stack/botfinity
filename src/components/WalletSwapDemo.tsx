import React, { useState } from 'react'
import { Wallet, ArrowUpDown, AlertCircle, CheckCircle } from 'lucide-react'
import { SwapInterface } from './SwapInterface'

export const WalletSwapDemo: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [balance, setBalance] = useState('0.0000')

  const connectWallet = async () => {
    setIsConnecting(true)
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockAddress = '0x742d35Cc6634C0532925a3b8D4C9db96590c4C5d'
      setWalletAddress(mockAddress)
      setBalance('1.2345')
      setIsConnected(true)
      
      console.log('Wallet connected:', mockAddress)
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress('')
    setBalance('0.0000')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Wallet & Swap</h1>
            <p className="text-blue-100">Connect your wallet and start trading on Monad</p>
          </div>
          <ArrowUpDown className="w-12 h-12 text-blue-200" />
        </div>
      </div>

      {/* Wallet Connection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Wallet className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Wallet Connection</h2>
          </div>
          
          {isConnected && (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Connected</span>
            </div>
          )}
        </div>

        {!isConnected ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Connect Your Wallet</h3>
            <p className="text-gray-600 mb-6">Connect your MetaMask wallet to start trading</p>
            
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-green-900">Wallet Connected</h4>
                  <p className="text-green-700 text-sm mt-1">
                    Address: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">MON Balance</div>
                <div className="text-2xl font-bold text-gray-900">{balance}</div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Network</div>
                <div className="text-lg font-semibold text-blue-600">Monad Testnet</div>
              </div>
            </div>

            <button
              onClick={disconnectWallet}
              className="w-full py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              Disconnect Wallet
            </button>
          </div>
        )}
      </div>

      {/* Network Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600 mb-1">Chain ID</div>
            <div className="font-semibold text-blue-900">23294</div>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-sm text-purple-600 mb-1">RPC URL</div>
            <div className="font-semibold text-purple-900 text-xs">rpc.testnet.monad.xyz</div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-green-600 mb-1">Status</div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-semibold text-green-900">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Swap Interface */}
      {isConnected ? (
        <SwapInterface />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Wallet Required</h3>
            <p className="text-gray-600">Please connect your wallet to access the swap interface</p>
          </div>
        </div>
      )}
    </div>
  )
}
