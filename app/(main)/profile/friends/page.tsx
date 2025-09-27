"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserPlus, UserMinus, Check, X, Users, UserX } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import FriendSuggestions from "@/components/friend-suggestions" // Import FriendSuggestions
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

interface Friend {
  id: string
  name: string
  username: string
  avatar: string
  status: "friend" | "pending" | "sent" | "not_friend"
}

const mockFriends: Friend[] = [
  {
    id: "1",
    name: "Alice Johnson",
    username: "alicej",
    avatar: "/placeholder.svg?height=100&width=100",
    status: "friend",
  },
  {
    id: "2",
    name: "Bob Williams",
    username: "bobw",
    avatar: "/placeholder.svg?height=100&width=100",
    status: "friend",
  },
  {
    id: "3",
    name: "Charlie Brown",
    username: "charlieb",
    avatar: "/placeholder.svg?height=100&width=100",
    status: "pending",
  }, // Request received
  {
    id: "4",
    name: "Diana Prince",
    username: "dianap",
    avatar: "/placeholder.svg?height=100&width=100",
    status: "sent",
  }, // Request sent
  { id: "5", name: "Eve Adams", username: "evea", avatar: "/placeholder.svg?height=100&width=100", status: "friend" },
  {
    id: "6",
    name: "Frank Green",
    username: "frankg",
    avatar: "/placeholder.svg?height=100&width=100",
    status: "not_friend",
  },
  {
    id: "7",
    name: "Grace Hall",
    username: "graceh",
    avatar: "/placeholder.svg?height=100&width=100",
    status: "friend",
  },
  {
    id: "8",
    name: "Harry King",
    username: "harryk",
    avatar: "/placeholder.svg?height=100&width=100",
    status: "not_friend",
  },
]

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | "friends" | "pending" | "sent" | "suggestions">("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setFriends(mockFriends)
      setLoading(false)
    }, 500) // Simulate fetch delay
    return () => clearTimeout(timer)
  }, [])

  const filteredFriends = friends.filter((friend) => {
    const matchesSearch =
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "friends") return matchesSearch && friend.status === "friend"
    if (activeTab === "pending") return matchesSearch && friend.status === "pending"
    if (activeTab === "sent") return matchesSearch && friend.status === "sent"
    if (activeTab === "suggestions") return matchesSearch && friend.status === "not_friend" // For suggestions, show non-friends
    return false
  })

  const handleAddFriend = (id: string) => {
    setFriends((prev) => prev.map((f) => (f.id === id && f.status === "not_friend" ? { ...f, status: "sent" } : f)))
  }

  const handleAcceptRequest = (id: string) => {
    setFriends((prev) => prev.map((f) => (f.id === id && f.status === "pending" ? { ...f, status: "friend" } : f)))
  }

  const handleDeclineRequest = (id: string) => {
    setFriends((prev) => prev.map((f) => (f.id === id && f.status === "pending" ? { ...f, status: "not_friend" } : f)))
  }

  const handleCancelRequest = (id: string) => {
    setFriends((prev) => prev.map((f) => (f.id === id && f.status === "sent" ? { ...f, status: "not_friend" } : f)))
  }

  const handleUnfriend = (id: string) => {
    if (window.confirm("Are you sure you want to unfriend this person?")) {
      setFriends((prev) => prev.map((f) => (f.id === id && f.status === "friend" ? { ...f, status: "not_friend" } : f)))
    }
  }

  const getTabCount = (status: Friend["status"] | "all" | "suggestions") => {
    if (status === "all") return friends.length
    if (status === "suggestions") return friends.filter((f) => f.status === "not_friend").length
    return friends.filter((f) => f.status === status).length
  }

  const tabs = [
    { value: "all", label: "All", count: getTabCount("all") },
    { value: "friends", label: "Friends", count: getTabCount("friends") },
    { value: "pending", label: "Pending", count: getTabCount("pending") },
    { value: "sent", label: "Sent", count: getTabCount("sent") },
    { value: "suggestions", label: "Suggestions", count: getTabCount("suggestions") },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <div className="max-w-5xl mx-auto space-y-6 p-4 md:p-6 pb-24 md:pb-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 md:p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Friends & Connections</h1>
              <p className="text-primary-100 text-sm md:text-base">Manage your social network</p>
            </div>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-300 h-5 w-5" />
              <Input
                placeholder="Search friends or people..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-primary-200 focus:bg-white/20 focus:border-white/40"
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="hidden md:grid w-full grid-cols-5 bg-white shadow-sm border border-primary-100">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-primary-600 data-[state=active]:text-white text-primary-600 hover:bg-primary-50"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="friends"
              className="data-[state=active]:bg-primary-600 data-[state=active]:text-white text-primary-600 hover:bg-primary-50"
            >
              Friends
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-primary-600 data-[state=active]:text-white text-primary-600 hover:bg-primary-50"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="sent"
              className="data-[state=active]:bg-primary-600 data-[state=active]:text-white text-primary-600 hover:bg-primary-50"
            >
              Sent
            </TabsTrigger>
            <TabsTrigger
              value="suggestions"
              className="data-[state=active]:bg-primary-600 data-[state=active]:text-white text-primary-600 hover:bg-primary-50"
            >
              Suggestions
            </TabsTrigger>
          </TabsList>

          <div className="md:hidden bg-white shadow-sm border border-primary-100 rounded-lg p-2">
            <Swiper spaceBetween={8} slidesPerView="auto" freeMode={true} className="w-full">
              {tabs.map((tab) => (
                <SwiperSlide key={tab.value} className="!w-auto">
                  <button
                    onClick={() => setActiveTab(tab.value as any)}
                    className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      activeTab === tab.value
                        ? "bg-primary-600 text-white shadow-sm"
                        : "text-primary-600 hover:bg-primary-50"
                    }`}
                  >
                    {tab.label}
                    {tab.count > 0 && (
                      <span
                        className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                          activeTab === tab.value ? "bg-white/20 text-white" : "bg-primary-100 text-primary-600"
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <TabsContent value={activeTab} className="space-y-4 mt-6">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse border-primary-100">
                    <CardContent className="p-4 flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full bg-primary-100" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4 bg-primary-100" />
                        <Skeleton className="h-3 w-1/2 bg-primary-100" />
                      </div>
                      <Skeleton className="h-8 w-20 rounded-md bg-primary-100" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredFriends.length === 0 ? (
              <Card className="border-primary-200 bg-gradient-to-br from-primary-50 to-white">
                <CardContent className="p-8 text-center text-primary-600">
                  <Users className="mx-auto h-16 w-16 mb-4 text-primary-400" />
                  <p className="text-xl font-semibold mb-2">No results found</p>
                  <p className="text-sm text-primary-500">Try adjusting your search or filters.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFriends.map((friend, index) => (
                  <Card
                    key={friend.id}
                    className="border-primary-100 hover:shadow-lg transition-all duration-200 hover:border-primary-200 bg-white"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 100}ms forwards`,
                    }}
                  >
                    <CardContent className="p-4 flex items-center space-x-4">
                      <Link href={`/profile/${friend.username}`} passHref>
                        <Avatar className="h-12 w-12 cursor-pointer ring-2 ring-primary-100 hover:ring-primary-200 transition-all">
                          <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-primary-100 text-primary-700">
                            {friend.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex-1">
                        <Link href={`/profile/${friend.username}`} passHref>
                          <p className="font-semibold text-sm hover:underline cursor-pointer text-gray-800 hover:text-primary-600 transition-colors">
                            {friend.name}
                          </p>
                        </Link>
                        <p className="text-xs text-primary-500">@{friend.username}</p>
                      </div>
                      <div>
                        {friend.status === "friend" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUnfriend(friend.id)}
                            className="border-primary-200 text-primary-600 hover:bg-primary-50 hover:border-primary-300"
                          >
                            <UserMinus className="h-4 w-4 mr-2" /> Unfriend
                          </Button>
                        )}
                        {friend.status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleAcceptRequest(friend.id)}
                              className="bg-primary-600 hover:bg-primary-700 text-white"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeclineRequest(friend.id)}
                              className="border-primary-200 text-primary-600 hover:bg-primary-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        {friend.status === "sent" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelRequest(friend.id)}
                            className="border-primary-200 text-primary-600 hover:bg-primary-50 hover:border-primary-300"
                          >
                            <UserX className="h-4 w-4 mr-2" /> Cancel Request
                          </Button>
                        )}
                        {friend.status === "not_friend" && (
                          <Button
                            size="sm"
                            onClick={() => handleAddFriend(friend.id)}
                            className="bg-primary-600 hover:bg-primary-700 text-white"
                          >
                            <UserPlus className="h-4 w-4 mr-2" /> Add Friend
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Friend Suggestions section */}
        <div className="mt-8">
          <FriendSuggestions onAddFriend={handleAddFriend} />
        </div>
      </div>
    </div>
  )
}
