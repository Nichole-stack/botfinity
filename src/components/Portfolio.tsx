import React from 'react'
import { TrendingUp, TrendingDown, DollarSign, Percent, Eye, EyeOff } from 'lucide-react'

const holdings = [
  { token: 'ETH', amount: '12.5', value: '$29,265.38', change: '+12.5%', allocation: 45.2, trend: 'up' },
  { token: 'BTC', amount: '0.75', value: '$32,675.92', change: '-2.1%', allocation: 25.6, trend: 'down' },
  { token: 'SOL', amount: '245.8', value: '$24,268.85', change: '+8.3%', allocation: 18.9, trend: 'up' },
  { token: 'MATIC', amount: '5,420', value: '$4,715.40', change: '+5.7%', allocation: 7.3, trend: 'up' },
  { token: 'AVAX', amount: '89.2', value: '$3,051.73', change: '-1.8%', allocation: 3.0, trend: 'down' },
]

const transactions = [
  { type: 'buy', token: 'ETH', amount: '2.5', price: '$2,341.23', date: '2024-01-15', hash: '0x1a2b3c...' },
  { type: 'sell', token: 'SOL', amount: '45.2', price: '$98.76', date: '2024-01-14', hash: '0x4d5e6f...' },
  { type: 'buy', token: 'MATIC', amount: '1,250', price: '$0.87', date: '2024-01-13', hash: '0x7g8h9i...' },
  { type: 'sell', token: 'AVAX', amount: '12.8', price: '$34.21', date: '2024-01-12', hash: '0xjklmno...' },
]

export const Portfolio: React.FC = () => {
  const [hideBalances, setHideBalances] = React.useState(false)
  
  const totalValue = holdings.reduce((sum, holding) => sum + parseFloat(holding.value.replace('$', '').replace(',', '')), 0)

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Total Portfolio Value</p>
            <button
              onClick={() => setHideBalances(!hideBalances)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              {hideBalances ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {hideBalances ? '••••••' : `$${totalValue.toLocaleString()}`}
          </p>
          <div className="flex items-center space-x-1 text-green-600 mt-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+8.7%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-600 mb-2">24h Change</p>
          <p className="text-2xl font-bold text-green-600">
            {hideBalances ? '••••••' : '+$5,247.89'}
          </p>
          <p className="text-sm text-gray-500 mt-1">+4.2% from yesterday</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-600 mb-2">Total Assets</p>
          <p className="text-2xl font-bold text-gray-900">{holdings.length}</p>
          <p className="text-sm text-gray-500 mt-1">Across 3 networks</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-600 mb-2">Best Performer</p>
          <p className="text-2xl font-bold text-gray-900">ETH</p>
          <div className="flex items-center space-x-1 text-green-600 mt-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+12.5%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Holdings */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Holdings</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm font-medium text-gray-500 border-b">
                    <th className="pb-3">Asset</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Value</th>
                    <th className="pb-3">24h Change</th>
                    <th className="pb-3">Allocation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {holdings.map((holding, index) => (
                    <tr key={index} className="text-sm">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{holding.token.slice(0, 2)}</span>
                          </div>
                          <span className="font-medium text-gray-900">{holding.token}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-600">
                        {hideBalances ? '••••' : holding.amount}
                      </td>
                      <td className="py-4 font-medium text-gray-900">
                        {hideBalances ? '••••••' : holding.value}
                      </td>
                      <td className="py-4">
                        <div className={`flex items-center space-x-1 ${holding.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {holding.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span className="font-medium">{holding.change}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${holding.allocation}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-600">{holding.allocation}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Portfolio Allocation */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Allocation</h3>
            <div className="space-y-4">
              {holdings.map((holding, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{holding.token.slice(0, 1)}</span>
                    </div>
                    <span className="font-medium text-gray-900">{holding.token}</span>
                  </div>
                  <span className="text-sm text-gray-600">{holding.allocation}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
            <img
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop"
              alt="Portfolio Performance Chart"
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">7d Return</span>
                <span className="text-green-600 font-medium">+12.5%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">30d Return</span>
                <span className="text-green-600 font-medium">+28.3%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">All Time</span>
                <span className="text-green-600 font-medium">+156.7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm font-medium text-gray-500 border-b">
                <th className="pb-3">Type</th>
                <th className="pb-3">Token</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Transaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((tx, index) => (
                <tr key={index} className="text-sm">
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tx.type === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {tx.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 font-medium text-gray-900">{tx.token}</td>
                  <td className="py-3 text-gray-600">{tx.amount}</td>
                  <td className="py-3 text-gray-600">{tx.price}</td>
                  <td className="py-3 text-gray-500">{tx.date}</td>
                  <td className="py-3">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      {tx.hash}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
