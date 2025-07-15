import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { Wallet, ExternalLink, AlertCircle } from 'lucide-react'
import { MONAD_CHAIN_CONFIG } from '../config/monad'

interface WalletState {
  address: string | null
  chainId: number | null
  balance: string | null
  isConnected: boolean
  isConnecting: boolean
}

export const WalletConnectEthers: React.FC = () => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    chainId: null,
    balance: null,
    isConnected: false,
    isConnecting: false,
  })

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkConnection()
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [])

  const checkConnection = async () => {
    if (!window.ethereum) return

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await provider.listAccounts()
      
      if (accounts.length > 0) {
        const network = await provider.getNetwork()
        const balance = await provider.getBalance(accounts[0].address)
        
        setWallet({
          address: accounts[0].address,
          chainId: Number(network.chainId),
          balance: ethers.formatEther(balance),
          isConnected: true,
          isConnecting: false,
        })
      }
    } catch (err) {
      console.error('Error checking connection:', err)
    }
  }

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setWallet({
        address: null,
        chainId: null,
        balance: null,
        isConnected: false,
        isConnecting: false,
      })
    } else {
      checkConnection()
    }
  }

  const handleChainChanged = () => {
    checkConnection()
  }

  const addMonadNetwork = async () => {
    if (!window.ethereum) return

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [MONAD_CHAIN_CONFIG],
      })
    } catch (err) {
      console.error('Error adding Monad network:', err)
      setError('Failed to add Monad network')
    }
  }

  const switchToMonad = async () => {
    if (!window.ethereum) return

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: MONAD_CHAIN_CONFIG.chainId }],
      })
    } catch (err: any) {
      if (err.code === 4902) {
        // Chain not added, add it first
        await addMonadNetwork()
      } else {
        console.error('Error switching to Monad:', err)
        setError('Failed to switch to Monad network')
      }
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed')
      return
    }

    setWallet(prev => ({ ...prev, isConnecting: true }))
    setError(null)

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      
      // Request account access
      await provider.send('eth_requestAccounts', [])
      
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      const network = await provider.getNetwork()
      const balance = await provider.getBalance(address)

      setWallet({
        address,
        chainId: Number(network.chainId),
        balance: ethers.formatEther(balance),
        isConnected: true,
        isConnecting: false,
      })

      // Check if we're on Monad, if not, prompt to switch
      if (Number(network.chainId) !== 23294) {
        await switchToMonad()
      }
    } catch (err: any) {
      console.error('Error connecting wallet:', err)
      setError(err.message || 'Failed to connect wallet')
      setWallet(prev => ({ ...prev, isConnecting: false }))
    }
  }

  const disconnectWallet = () => {
    setWallet({
      address: null,
      chainId: null,
      balance: null,
      isConnected: false,
      isConnecting: false,
    })
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const isMonadNetwork = wallet.chainId === 23294

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Wallet className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Wallet Connection (Ethers.js)</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      {!wallet.isConnected ? (
        <div className="text-center py-8">
          <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Your Wallet</h3>
          <p className="text-gray-600 mb-6">Connect your MetaMask wallet to start trading on Monad</p>
          
          <button
            onClick={connectWallet}
            disabled={wallet.isConnecting}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {wallet.isConnecting ? 'Connecting...' : 'Connect MetaMask'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Connected Address</p>
              <div className="flex items-center space-x-2">
                <p className="font-mono text-gray-900">{formatAddress(wallet.address!)}</p>
                <button
                  onClick={() => navigator.clipboard.writeText(wallet.address!)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <button
              onClick={disconnectWallet}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Disconnect
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Chain ID</p>
              <div className="flex items-center space-x-2">
                <p className="font-semibold text-gray-900">{wallet.chainId}</p>
                {!isMonadNetwork && (
                  <button
                    onClick={switchToMonad}
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
                {parseFloat(wallet.balance!).toFixed(4)} MON
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
