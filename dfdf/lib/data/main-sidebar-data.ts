import {
  User, Bell, MessageCircle, ImageIcon, Users, BarChart3, Settings, HelpCircle,
  MessageSquare, Home, ShoppingBag, Heart, CreditCard, Store, BookOpen, Info,
  Mail, Shield, FileText, Sparkles
} from "lucide-react"

import type { SidebarSection } from "@/types/main-sidebar"

// NOTE: Cart is rendered via a custom component flag (custom: true)
export const sidebarData: SidebarSection[] = [
  {
    type: "quickAccess",
    title: "Quick Access",
    showTitle: true,
    items: [
      { icon: Home, label: "Dashboard", href: "/dashboard", color: "text-blue-600" },
      { icon: Bell, label: "Notifications", href: "/notifications", badge: 5, color: "text-orange-600" },
      { icon: MessageCircle, label: "Messages", href: "/messages", badge: 3, color: "text-green-600" },
      { icon: MessageCircle, label: "Cart", href: "/cart", custom: true },
    ],
  },
  {
    type: "section",
    title: "Social & Community",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    collapsible: true,
    items: [
      { icon: User, label: "My Profile", href: "/profile" },
      { icon: Users, label: "All Profiles", href: "/profiles" },
      { icon: Users, label: "Friends", href: "/friends" },
    ],
  },
  {
    type: "section",
    title: "Shopping",
    icon: Store,
    color: "text-red-600",
    bgColor: "bg-red-50",
    collapsible: true,
    items: [
      { icon: Store, label: "Shop", href: "/shop" },
      { icon: ShoppingBag, label: "Products", href: "/products" },
      { icon: Heart, label: "Wishlist", href: "/wishlist" },
      { icon: CreditCard, label: "Checkout", href: "/checkout" },
    ],
  },
  {
    type: "section",
    title: "Personal Tools",
    icon: Sparkles,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    collapsible: true,
    items: [
      { icon: ImageIcon, label: "Media", href: "/media" },
      { icon: BarChart3, label: "Body Shape", href: "/body-shape" },
      { icon: BarChart3, label: "Recommendations", href: "/recommendations" },
    ],
  },
  {
    type: "section",
    title: "Information",
    icon: BookOpen,
    color: "text-gray-600",
    collapsible: true,
    items: [
      { icon: BookOpen, label: "Blog", href: "/blog" },
      { icon: Info, label: "About", href: "/about" },
      { icon: Mail, label: "Contact", href: "/contact" },
    ],
  },
  {
    type: "section",
    title: "Support & Settings",
    icon: Settings,
    color: "text-gray-600",
    collapsible: true,
    items: [
      { icon: Settings, label: "Settings", href: "/settings" },
      { icon: HelpCircle, label: "Help & Support", href: "/help" },
      { icon: MessageSquare, label: "Send Feedback", href: "/feedback" },
    ],
  },
  {
    type: "legal",
    title: "Legal",
    showTitle: false,
    items: [
      { icon: Shield, label: "Privacy Policy", href: "/privacy" },
      { icon: FileText, label: "Terms of Service", href: "/terms" },
    ],
  },
]
