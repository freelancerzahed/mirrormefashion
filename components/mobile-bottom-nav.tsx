"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Home, ShoppingBag, Heart, ShoppingCart, User } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"

const bottomNavItems = [
  {
    icon: Home,
    label: "Home",
    href: "/dashboard",
    color: "text-blue-600",
  },
  {
    icon: ShoppingBag,
    label: "Shop",
    href: "/shop",
    color: "text-primary-600",
  },
  {
    icon: Heart,
    label: "Wishlist",
    href: "/wishlist",
    color: "text-red-600",
    showWishlistBadge: true,
  },
  {
    icon: ShoppingCart,
    label: "Cart",
    href: "/cart",
    color: "text-green-600",
    showCartBadge: true,
  },
  {
    icon: User,
    label: "Profile",
    href: "/profile",
    color: "text-purple-600",
  },
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { state } = useCart()
  const { wishlist } = useWishlist()
  const wishlistItemCount = wishlist.length

  const cartItemCount = state.itemCount

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-2 md:hidden">
      <div className="flex items-center justify-around">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href
          let badgeCount = 0
          if (item.showCartBadge) {
            badgeCount = cartItemCount
          } else if (item.showWishlistBadge) {
            badgeCount = wishlistItemCount
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 min-w-0 ${
                isActive ? "bg-primary-50 text-primary-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="relative">
                <div className={`p-1.5 rounded-lg ${isActive ? "bg-primary-100" : "bg-transparent"}`}>
                  <item.icon className={`h-5 w-5 ${isActive ? item.color : "text-gray-600"}`} />
                </div>
                {badgeCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-primary-600 hover:bg-primary-600">
                    {badgeCount}
                  </Badge>
                )}
              </div>
              <span
                className={`text-xs font-medium truncate max-w-12 ${isActive ? "text-primary-700" : "text-gray-600"}`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
