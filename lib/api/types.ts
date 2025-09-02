// General API Response Structure
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  timestamp: string
  requestId: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// API Error Structure
export interface ApiError {
  code: string
  message: string
  details?: any
  statusCode: number
}

// User Types
export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  password: string // Note: In a real app, this would be hashed and never exposed directly
  createdAt: string
  updatedAt: string
}

export interface UserProfile {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  avatar?: string
  bio?: string
  location?: string
  website?: string
  followers: number
  following: number
  postsCount: number
  createdAt: string
  updatedAt: string
}

export type CreateUserRequest = Omit<User, "id" | "createdAt" | "updatedAt">
export type UpdateUserRequest = Partial<Omit<User, "id" | "email" | "username" | "createdAt" | "updatedAt">>

// Login Request Type
export interface LoginRequest {
  email: string
  password: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number | null
  currency: string
  category: string
  subcategory?: string
  brand: string
  images: string[]
  sizes: string[]
  colors: string[]
  tags: string[]
  inStock: boolean
  stockQuantity: number
  rating: number
  reviewCount: number
  createdAt: string
  updatedAt?: string
}

export interface CreateProductRequest {
  name: string
  description: string
  price: number
  originalPrice?: number
  currency: string
  category: string
  subcategory?: string
  brand: string
  images: string[]
  sizes: string[]
  colors: string[]
  tags: string[]
  stockQuantity: number
}

export interface UpdateProductRequest {
  name?: string
  description?: string
  price?: number
  originalPrice?: number
  category?: string
  subcategory?: string
  brand?: string
  images?: string[]
  sizes?: string[]
  colors?: string[]
  tags?: string[]
  inStock?: boolean
  stockQuantity?: number
}

export interface ProductFilters {
  category?: string
  subcategory?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  sizes?: string[]
  colors?: string[]
  tags?: string[]
  inStock?: boolean
  sortBy?: "price" | "rating" | "createdAt" | "name"
  sortOrder?: "asc" | "desc"
}

export interface Post {
  id: string
  userId: string
  username: string
  avatarUrl?: string
  imageUrl: string
  caption: string
  likes: number
  comments: number
  shares: number
  createdAt: string
}

export interface CreatePostRequest {
  userId: string
  imageUrl: string
  caption: string
}

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface WishlistItem {
  productId: string
  name: string
  price: number
  image: string
}

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatarUrl: string
  content: string
  timestamp: string
  isRead: boolean
}

export interface Notification {
  id: string
  userId: string
  type: "like" | "comment" | "follow" | "mention" | "order" | "system"
  message: string
  isRead: boolean
  createdAt: string
  link?: string
}

export interface BodyMeasurement {
  id: string
  userId: string
  date: string
  heightCm?: number
  weightKg?: number
  chestCm?: number
  waistCm?: number
  hipsCm?: number
  bicepCm?: number
  thighCm?: number
  bodyFatPercentage?: number
}

export interface CreateBodyMeasurementRequest {
  userId: string
  heightCm?: number
  weightKg?: number
  chestCm?: number
  waistCm?: number
  hipsCm?: number
  bicepCm?: number
  thighCm?: number
  bodyFatPercentage?: number
}

export interface Order {
  id: string
  userId: string
  orderDate: string
  totalAmount: number
  currency: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  items: {
    productId: string
    name: string
    quantity: number
    price: number
  }[]
  shippingAddress: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  paymentMethod: string
}

export interface CreateOrderRequest {
  userId: string
  items: {
    productId: string
    name: string
    quantity: number
    price: number
  }[]
  shippingAddress: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  paymentMethod: string
}
