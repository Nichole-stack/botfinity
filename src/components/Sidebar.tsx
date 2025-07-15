import React from 'react'
import { BarChart3, TrendingUp, Wallet, Activity, Bot, ChevronLeft } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  activeView: string
  onViewChange: (view: 'dashboard' | 'trading' | 'portfolio' | 'analytics') => void
  onToggle: () => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'trading', label: 'Trading', icon: TrendingUp },
  { id: 'portfolio', label: 'Portfolio', icon: Wallet },
  { id: 'analytics', label: 'Analytics', icon: Activity },
]

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeView, onViewChange, onToggle }) => {
  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-10 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {isOpen && (
            <div className="flex items-center space-x-2">
              <Bot className="w-8 h-8 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">Botfinity</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className={`w-4 h-4 text-gray-600 transition-transform ${!isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as any)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {isOpen && (
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Bot className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-900">AI Insights</span>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Market volatility detected. Consider DCA strategy for ETH.
            </p>
            <button className="text-xs text-blue-600 font-medium hover:text-blue-700">
              View Details →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
