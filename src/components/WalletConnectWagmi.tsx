import React from 'react'
import { useAccount, useConnect, useDisconnect, useBalance, useChainId, useSwitchChain } from 'wagmi'
import { Wallet, ExternalLink, AlertCircle } from 'lucide-react'
import { monadTestnet } from '../config/monad'

export const WalletConnectWagmi: React.FC = () => {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({ address })
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const isMonadNetwork = chainId === monadTestnet.id

  const handleSwitchToMonad = () => {
    switchChain({ chainId: monadTestnet.id })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Wallet className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900">Wallet Connection (Wagmi)</h2>
      </div>

      {!isConnected ? (
        <div className="text-center py-8">
          <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Your Wallet</h3>
          <p className="text-gray-600 mb-6">Connect your MetaMask wallet to start trading on Monad</p>
          
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              disabled={isPending}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? 'Connecting...' : `Connect ${connector.name}`}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Connected Address</p>
              <div className="flex items-center space-x-2">
                <p className="font-mono text-gray-900">{formatAddress(address!)}</p>
                <button
                  onClick={() => navigator.clipboard.writeText(address!)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <button
              onClick={() => disconnect()}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Disconnect
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Chain ID</p>
              <div className="flex items-center space-x-2">
                <p className="font-semibold text-gray-900">{chainId}</p>
                {!isMonadNetwork && (
                  <button
                    onClick={handleSwitchToMonad}
                    className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full hover:bg-orange-200 transition-colors"
                  >
                    Switch to Monad
                  </button>
                )}
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Balance</p>
              <p className="font-semibold text-gray-900">
                {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '0.0000 MON'}
              </p>
            </div>
          </div>

          {!isMonadNetwork && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span className="text-yellow-700 text-sm">
                  You're not connected to Monad Testnet. Switch networks to use all features.
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
