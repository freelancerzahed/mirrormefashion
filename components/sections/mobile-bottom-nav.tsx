"use client"

import { Home, MessageCircle, ShoppingBag, Menu } from "lucide-react"

interface MobileBottomNavProps {
  currentSection: string
  onSectionChange: (section: string) => void
}

export default function MobileBottomNav({ currentSection, onSectionChange }: MobileBottomNavProps) {
  const navItems = [
    {
      id: "hero",
      name: "Home",
      icon: Home,
    },
    {
      id: "features",
      name: "Features",
      icon: MessageCircle,
    },
    {
      id: "chat",
      name: "AI Stylist",
      icon: MessageCircle,
    },
    {
      id: "shop",
      name: "Shop",
      icon: ShoppingBag,
    },
    {
      id: "menu",
      name: "Menu",
      icon: Menu,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 px-2 py-1 z-50 safe-area-inset-bottom">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                isActive
                  ? "text-primary-600 bg-primary-50 scale-105"
                  : "text-gray-500 hover:text-primary-600 hover:bg-gray-50"
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? "animate-bounce" : ""}`} />
              <span className="text-xs font-medium truncate">{item.name}</span>
              {isActive && <div className="w-1 h-1 bg-primary-600 rounded-full mt-1 animate-pulse"></div>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
