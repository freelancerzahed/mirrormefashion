"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Phone, Video, MoreVertical, Search, ArrowLeft, Smile, Paperclip, MessageCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

// Mock data for conversations
const initialConversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey! How are you doing?",
    timestamp: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the recommendation!",
    timestamp: "1h ago",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "See you tomorrow!",
    timestamp: "3h ago",
    unread: 1,
    online: true,
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "That sounds great!",
    timestamp: "1d ago",
    unread: 0,
    online: false,
  },
]

// Generate more mock messages for pagination testing
const generateMockMessages = (conversationId: number, page = 0) => {
  const messagesPerPage = 20
  const baseMessages = [
    { content: "Hey! How are you doing?", isOwn: false },
    { content: "I'm doing great! Just working on some new projects. How about you?", isOwn: true },
    { content: "That's awesome! I'd love to hear more about your projects sometime.", isOwn: false },
    { content: "Let's catch up soon. Are you free this weekend?", isOwn: true },
    { content: "I'm free on Saturday afternoon.", isOwn: false },
    { content: "Perfect! Let's meet at the coffee shop downtown.", isOwn: true },
    { content: "Sounds great! See you there at 2 PM?", isOwn: false },
    { content: "Yes, 2 PM works perfectly for me.", isOwn: true },
    { content: "Looking forward to it! 😊", isOwn: false },
    { content: "Me too! Have a great rest of your day.", isOwn: true },
  ]

  const messages = []
  for (let i = 0; i < messagesPerPage; i++) {
    const baseIndex = i % baseMessages.length
    const messageTime = new Date(Date.now() - (page * messagesPerPage + i) * 60000) // Each message 1 minute apart
    messages.unshift({
      id: page * messagesPerPage + i + 1,
      senderId: baseMessages[baseIndex].isOwn ? "current" : conversationId,
      senderName: baseMessages[baseIndex].isOwn ? "You" : "Sarah Johnson",
      content: baseMessages[baseIndex].content,
      timestamp: messageTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: baseMessages[baseIndex].isOwn,
    })
  }
  return messages
}

export default function MessagesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const processedIncomingUser = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Get user parameters from URL
  const incomingUser = searchParams.get("user")
  const incomingName = searchParams.get("name")
  const incomingAvatar = searchParams.get("avatar")

  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const [conversationsList, setConversationsList] = useState(initialConversations)
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [hasMoreMessages, setHasMoreMessages] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Auto-scroll to bottom function
  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior })
    }
  }, [])

  // Load messages for a conversation
  const loadMessages = useCallback(async (conversationId: number, page = 0, append = false) => {
    setIsLoadingMessages(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const newMessages = generateMockMessages(conversationId, page)

    if (append) {
      setMessages((prev) => [...newMessages, ...prev])
    } else {
      setMessages(newMessages)
      setIsInitialLoad(true)
    }

    // Check if there are more messages (simulate end of messages after 5 pages)
    setHasMoreMessages(page < 4)
    setIsLoadingMessages(false)
  }, [])

  // Handle scroll to load more messages
  const handleScroll = useCallback(
    (event: any) => {
      const element = event.currentTarget
      const scrollTop = element.scrollTop
      const threshold = 100

      if (scrollTop < threshold && hasMoreMessages && !isLoadingMessages && selectedConversation) {
        const nextPage = currentPage + 1
        setCurrentPage(nextPage)
        loadMessages(selectedConversation.id, nextPage, true)
      }
    },
    [currentPage, hasMoreMessages, isLoadingMessages, selectedConversation, loadMessages],
  )

  // Auto-scroll to bottom when new messages are added (only for new messages, not when loading history)
  useEffect(() => {
    if (!isLoadingMessages && !isInitialLoad) {
      scrollToBottom()
    }
    if (isInitialLoad) {
      // Scroll to bottom immediately for initial load
      setTimeout(() => {
        scrollToBottom("auto")
        setIsInitialLoad(false)
      }, 100)
    }
  }, [messages, isLoadingMessages, isInitialLoad, scrollToBottom])

  useEffect(() => {
    // Only process incoming user once and if we haven't processed it yet
    if (incomingUser && incomingName && !processedIncomingUser.current) {
      processedIncomingUser.current = true

      // Use the current state value directly instead of depending on it
      setConversationsList((currentList) => {
        const existingConversation = currentList.find((conv) =>
          conv.name.toLowerCase().includes(incomingUser.toLowerCase()),
        )

        if (existingConversation) {
          // Select existing conversation
          setSelectedConversation(existingConversation)
          setCurrentPage(0)
          loadMessages(existingConversation.id, 0)
        } else {
          // Create new conversation
          const newConversation = {
            id: Date.now(),
            name: decodeURIComponent(incomingName),
            avatar: incomingAvatar ? decodeURIComponent(incomingAvatar) : "/placeholder.svg?height=40&width=40",
            lastMessage: "Start a conversation...",
            timestamp: "now",
            unread: 0,
            online: true,
          }

          setSelectedConversation(newConversation)
          setMessages([])
          setCurrentPage(0)
          setHasMoreMessages(false)

          return [newConversation, ...currentList]
        }

        return currentList
      })

      // Clear URL parameters after processing
      router.replace("/messages", { scroll: false })
    }
  }, [incomingUser, incomingName, incomingAvatar, router, loadMessages])

  // Reset the processed flag when there are no incoming parameters
  useEffect(() => {
    if (!incomingUser && !incomingName) {
      processedIncomingUser.current = false
    }
  }, [incomingUser, incomingName])

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message = {
        id: Date.now(),
        senderId: "current",
        senderName: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      }

      setMessages((prev) => [...prev, message])
      setNewMessage("")
      setIsInitialLoad(false) // This will trigger auto-scroll

      // Update the conversation's last message
      setConversationsList((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id ? { ...conv, lastMessage: newMessage, timestamp: "now" } : conv,
        ),
      )
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleConversationSelect = (conversation: any) => {
    setSelectedConversation(conversation)
    setCurrentPage(0)
    setHasMoreMessages(true)
    setIsInitialLoad(true)

    // Load messages for the selected conversation
    if (conversation.id <= 4) {
      // Original conversations have messages
      loadMessages(conversation.id, 0)
    } else {
      setMessages([]) // New conversations start empty
      setHasMoreMessages(false)
      setIsLoadingMessages(false)
    }
  }

  return (
    <div className="pb-4 md:p-6 md:pb-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[calc(100vh-8rem)] md:h-[600px]">
        <div className="flex h-full">
          {/* Conversation List - Hidden on mobile when chat is active */}
          <div
            className={`w-full md:w-80 border-r border-gray-200 flex flex-col ${selectedConversation ? "hidden md:flex" : "flex"}`}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Messages</h2>
                <Button variant="ghost" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </div>

            {/* Conversations */}
            <ScrollArea className="flex-1">
              <div className="p-2">
                {conversationsList.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation?.id === conversation.id
                        ? "bg-primary-50 border border-primary-200"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleConversationSelect(conversation)}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <Badge className="bg-primary-600 text-white text-xs">{conversation.unread}</Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${selectedConversation ? "flex" : "hidden md:flex"}`}>
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Back button for mobile */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setSelectedConversation(null)}
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {selectedConversation.online && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedConversation.name}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedConversation.online ? "Online" : "Last seen 2h ago"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                     
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 pb-4 p-2  md:pb-4" onScroll={handleScroll} ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {/* Show welcome message for new conversations */}
                    {messages.length === 0 && !isLoadingMessages && (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <MessageCircle className="h-8 w-8 text-primary-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Start a conversation</h3>
                        <p className="text-gray-500">Send a message to {selectedConversation.name}</p>
                      </div>
                    )}

                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
                            message.isOwn ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.isOwn ? "text-primary-100" : "text-gray-500"}`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Invisible element to scroll to */}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder={`Message ${selectedConversation.name}...`}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pr-10"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-primary-600 hover:bg-primary-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
                  <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
