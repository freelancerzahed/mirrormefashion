"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Send, Bot, Sparkles, User, CheckCircle } from "lucide-react"

interface UserResponses {
  gender: string
  name: string
  age_range: string
  height: number
  weight: number
  bmi: string
  shoeSize: {
    size: number
    category: string
  }
  braSize: {
    vol: string
    band: string
  }
}

interface ChatbotProps {
  onComplete: (responses: UserResponses) => void
  onReset?: () => void
  isMobile?: boolean
}

interface Message {
  sender: "user" | "bot"
  text: string
  timestamp: Date
  suggestions?: string[]
  showAgeSelector?: boolean
}

export default function EnhancedChatbot({ onComplete, onReset, isMobile = false }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi there! I'm Sophia, your AI-powered Virtual Fashion Stylist! 👋 I'm here to help you discover fashion that perfectly fits and flatters your unique body type. Let's start with a simple question:",
      timestamp: new Date(),
      suggestions: ["female", "male", "non-binary"],
    },
  ])

  const [userInput, setUserInput] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [isTyping, setIsTyping] = useState(false)
  const [selectedAge, setSelectedAge] = useState("")
  const [userResponses, setUserResponses] = useState<UserResponses>({
    gender: "",
    name: "",
    age_range: "",
    height: 0,
    weight: 0,
    bmi: "",
    shoeSize: { size: 0, category: "" },
    braSize: { vol: "", band: "" },
  })

  const handleReset = () => {
    setMessages([
      {
        sender: "bot",
        text: "Hi there! I'm Sophia, your AI-powered Virtual Fashion Stylist! 👋 I'm here to help you discover fashion that perfectly fits and flatters your unique body type. Let's start with a simple question:",
        timestamp: new Date(),
        suggestions: ["female", "male", "non-binary"],
      },
    ])
    setUserInput("")
    setCurrentQuestion(1)
    setIsTyping(false)
    setSelectedAge("")
    setUserResponses({
      gender: "",
      name: "",
      age_range: "",
      height: 0,
      weight: 0,
      bmi: "",
      shoeSize: { size: 0, category: "" },
      braSize: { vol: "", band: "" },
    })

    // Call the onReset callback to notify parent component
    if (onReset) {
      onReset()
    }
  }

  const chatBodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    try {
      // First try with the messages end ref
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        })
        return
      }

      // Fallback to manual scrolling
      if (chatBodyRef.current) {
        const scrollHeight = chatBodyRef.current.scrollHeight
        const height = chatBodyRef.current.clientHeight
        const maxScrollTop = scrollHeight - height
        chatBodyRef.current.scrollTo({
          top: maxScrollTop,
          behavior: "smooth",
        })
      }
    } catch (error) {
      console.error("Scroll error:", error)
    }
  }, [])

  // Auto scroll when messages change
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom()
    }, 100)
    return () => clearTimeout(timer)
  }, [messages, scrollToBottom])

  // Auto scroll when typing state changes
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        scrollToBottom()
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isTyping, scrollToBottom])

  useEffect(() => {
    if (inputRef.current && currentQuestion !== 3) {
      inputRef.current.focus()
    }
  }, [currentQuestion])

  const addMessage = (
    sender: "user" | "bot",
    text: string | string[],
    suggestions?: string[],
    showAgeSelector?: boolean,
  ) => {
    const newMessages = Array.isArray(text)
      ? text.map((t, index) => ({
          sender,
          text: t,
          timestamp: new Date(),
          suggestions: index === text.length - 1 ? suggestions : undefined,
          showAgeSelector: index === text.length - 1 ? showAgeSelector : false,
        }))
      : [{ sender, text, timestamp: new Date(), suggestions, showAgeSelector }]

    setMessages((prev) => [...prev, ...newMessages])
  }

  const updateUserResponse = (key: keyof UserResponses, value: any) => {
    setUserResponses((prev) => ({ ...prev, [key]: value }))
  }

  const simulateTyping = (callback: () => void, delay = 1000) => {
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      callback()
      setTimeout(scrollToBottom, 100)
    }, delay)
  }

  const processGenderInput = (input: string) => {
    const validGenders = ["male", "female", "nonbinary", "non-binary", "non binary"]
    const gender = input.toLowerCase().trim()

    if (validGenders.includes(gender)) {
      const normalizedGender = gender.includes("non") ? "non-binary" : gender
      updateUserResponse("gender", normalizedGender)
      setCurrentQuestion(2)

      const genderResponses = {
        female:
          "Perfect! As a woman, I'll help you find styles that celebrate your femininity and enhance your natural beauty. 💃",
        male: "Great! I'll help you discover fashion that showcases your style and fits your body perfectly. 👔",
        "non-binary":
          "Wonderful! I'm here to help you express your unique style in whatever way feels authentic to you. ✨",
      }

      return [
        genderResponses[normalizedGender as keyof typeof genderResponses],
        "Now, what's your full name? I'd love to personalize our conversation! 😊",
      ]
    }

    return "I want to make sure I understand you correctly! Please tell me if you identify as female, male, or non-binary. This helps me provide the most relevant fashion advice for you. 💫"
  }
const processNameInput = (input: string) => {
  const nameParts = input.trim().split(" ").filter(Boolean)
  const firstName = nameParts[0]

  if (!firstName) {
    return "I didn’t catch your name 🤔 Could you please type it again?"
  }

  // Always save the full input, even if it's one word
  updateUserResponse("name", input)
  setCurrentQuestion(3)

  return [
    `It's wonderful to meet you, ${firstName}! 🌟`,
    `Now ${firstName}, I need to know your age range to give you the best style recommendations. Please select from the options below:`,
  ]
}


  const processAgeInput = (ageValue: string) => {
    if (ageValue) {
      updateUserResponse("age_range", ageValue)
      setCurrentQuestion(4)

      const ageResponses = {
        "Under 19":
          "Amazing! Youth fashion is so exciting with endless possibilities to experiment and find your style! 🎨",
        "19 - 39":
          "Perfect! This is such a dynamic time for fashion - from professional wear to weekend casual, we'll find your perfect looks! 💼✨",
        "40 - 64":
          "Wonderful! Mature fashion is about confidence, quality, and timeless elegance. Let's find styles that make you feel fabulous! 👑",
        "Over 65":
          "How inspiring! Fashion has no age limit, and I'm excited to help you find styles that make you feel vibrant and confident! 🌺",
      }

      return [
        ageResponses[ageValue as keyof typeof ageResponses],
        "Now, let's talk measurements! Please tell me your height. You can use inches (like 65in), centimeters (like 165cm), or feet and inches (like 5'5\"). 📏",
      ]
    }

    return "Please select your age range from the options above so I can provide age-appropriate style recommendations! 🎯"
  }

  const processHeightInput = (input: string) => {
    let measurement: number

    try {
      if (input.includes("cm") || input.includes("cent")) {
        const num = Number.parseFloat(input.replace(/[^\d.]/g, ""))
        measurement = num / 2.54 // convert to inches
      } else if (input.includes("'")) {
        const parts = input.split("'")
        const feet = Number.parseFloat(parts[0])
        const inches = Number.parseFloat(parts[1]?.replace(/[^\d.]/g, "") || "0")
        measurement = feet * 12 + inches
      } else {
        measurement = Number.parseFloat(input.replace(/[^\d.]/g, ""))
      }

      if (measurement >= 58 && measurement <= 95) {
        updateUserResponse("height", measurement)
        setCurrentQuestion(5)

        const heightCategory = measurement < 63 ? "petite" : measurement > 70 ? "tall" : "average"
        const heightResponses = {
          petite:
            "Perfect! Petite styling is all about proportions and finding pieces that enhance your frame beautifully! 🌸",
          average: "Great! You have wonderful flexibility with most fashion styles and proportions! 🌟",
          tall: "Fantastic! Tall fashion is so elegant - you can rock both dramatic and classic looks amazingly! 👗",
        }

        return [
          heightResponses[heightCategory],
          "Now for your weight - this helps me understand your body type better. Please include the unit (like 130 lbs or 60 kg). Remember, every body is beautiful! 💪✨",
        ]
      }
    } catch (error) {
      // Handle parsing errors
    }

    return "I need your height to provide accurate fit recommendations! Please try formats like '5'6\"', '165cm', or '66in'. What's your height? 📐"
  }

  const processWeightInput = (input: string) => {
    const match = input.match(/(\d+(?:\.\d+)?)\s*(lbs?|kgs?|pounds?|kilos?)/i)

    if (!match) {
      return "Please include the unit with your weight (like '130 lbs' or '60 kg') so I can calculate your measurements accurately! ⚖️"
    }

    let weight = Number.parseFloat(match[1])
    const unit = match[2].toLowerCase()

    if (unit.includes("kg") || unit.includes("kilo")) {
      weight = weight * 2.205 // convert to pounds
    }

    if (weight < 90 || weight > 400) {
      return "I want to make sure I have the right information. Could you please double-check your weight? I work with weights between 90-400 lbs (40-180 kg). 🤗"
    }

    updateUserResponse("weight", weight)
    const bmi = calculateBMI(weight, userResponses.height)
    updateUserResponse("bmi", bmi)
    setCurrentQuestion(6)

    return [
      "Thank you! That helps me understand your body type better. 📊",
      "Now for shoe sizing - this affects how outfits look from head to toe! Please tell me your U.S. shoe size and category. For example: '8.5 womens', '10 mens', or '4.5 kids'. 👠👞",
    ]
  }

  const calculateBMI = (weight: number, height: number) => {
    const bmi = (weight * 0.45) / (height * 0.025 * height * 0.025)
    return bmi.toFixed(1)
  }

  const processShoeSizeInput = (input: string) => {
    const match = input.match(/([\d.]+)\s*([a-zA-Z]+)/)

    if (!match) {
      return "I need both the size and category! Try formats like '8.5 womens', '10 mens', or '5 kids'. What's your shoe size? 👟"
    }

    const size = Number.parseFloat(match[1])
    const category = match[2].toLowerCase()

    let validCategory = ""
    if (["kid", "kids"].includes(category)) validCategory = "kids"
    else if (["women", "woman", "womens", "womans"].includes(category)) validCategory = "womens"
    else if (["men", "mens", "man", "mans"].includes(category)) validCategory = "mens"
    else
      return "Please specify 'kids', 'womens', or 'mens' for the shoe category. For example: '8 womens' or '10 mens'. 👠"

    // Validate size ranges
    const sizeRanges = {
      kids: [3.5, 7],
      womens: [4, 15.5],
      mens: [6, 24],
    }

    const [minSize, maxSize] = sizeRanges[validCategory as keyof typeof sizeRanges]
    if (size < minSize || size > maxSize) {
      return `That size seems unusual for ${validCategory} shoes. Could you double-check? ${validCategory} sizes typically range from ${minSize} to ${maxSize}. 🤔`
    }

    updateUserResponse("shoeSize", { size, category: validCategory })
    setCurrentQuestion(7)

    return [
      `Perfect! Size ${size} ${validCategory} - that helps with proportion planning! 👍`,
      "Last question! For the most accurate fit recommendations, what's your bra size? Please use the format like '32C', '36DD', etc. This stays completely private and helps with clothing fit! 👙",
    ]
  }

  const processBraSizeInput = (input: string) => {
    const match = input.match(/(\d+)([A-Z]+)/i)

    if (!match) {
      return "Please use the standard format like '32C', '36B', or '38DD'. What's your bra size? This helps ensure perfect fit recommendations! 📏"
    }

    const vol = match[1]
    const band = match[2].toUpperCase()

    // Validate band size
    const validBands = ["A", "B", "C", "D", "DD", "DDD", "E", "F", "G", "H", "I", "J", "K", "AA", "AAA"]
    if (!validBands.includes(band)) {
      return "I don't recognize that cup size. Please use standard sizes like A, B, C, D, DD, DDD, etc. What's your bra size? 🤗"
    }

    // Validate volume
    const volNum = Number.parseInt(vol)
    if (volNum < 28 || volNum > 48) {
      return "That band size seems unusual. Most band sizes are between 28-48. Could you double-check your bra size? 📐"
    }

    // Update the userResponses state first
    const updatedResponses = {
      ...userResponses,
      braSize: { vol, band },
    }

    setUserResponses(updatedResponses)

    // Complete the conversation with the updated responses
    setTimeout(() => {
      onComplete(updatedResponses)
    }, 2000)

    return [
      `Excellent! ${vol}${band} - I now have all the information I need! 🎉`,
      "Thank you for sharing those details with me. I'm now creating your personalized body profile...",
      "🎨 ✨ Creating your virtual body model... ✨ 🎨",
      "Ready! Let's move to the next step where you can fine-tune your 3D body model to perfectly match your unique shape! This will help me give you the most accurate fashion recommendations possible! 🌟",
    ]
  }

  const getBotResponse = (input: string) => {
    switch (currentQuestion) {
      case 1:
        return processGenderInput(input)
      case 2:
        return processNameInput(input)
      case 3:
        return processAgeInput(input)
      case 4:
        return processHeightInput(input)
      case 5:
        return processWeightInput(input)
      case 6:
        return processShoeSizeInput(input)
      case 7:
        return processBraSizeInput(input)
      default:
        return "I'm not sure how to help with that. Let's continue with our styling questions! 🤔"
    }
  }

  const handleSend = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }

    if (!userInput.trim()) {
      return
    }

    addMessage("user", userInput)
    const currentInput = userInput
    setUserInput("")

    simulateTyping(
      () => {
        const botResponse = getBotResponse(currentInput)
        const suggestions = getSuggestions(currentQuestion + 1)
        const showAgeSelector = currentQuestion === 2
        addMessage("bot", botResponse, suggestions, showAgeSelector)
      },
      Math.random() * 1000 + 500,
    )
  }

  const handleAgeSelection = (age: string) => {
    setSelectedAge(age)
    addMessage("user", `${age} years of age`)

    simulateTyping(() => {
      const botResponse = processAgeInput(age)
      const suggestions = getSuggestions(4)
      addMessage("bot", botResponse, suggestions)
    }, 500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setUserInput(suggestion)
    setTimeout(() => handleSend(), 100)
  }

  const getSuggestions = (questionNumber: number): string[] => {
    switch (questionNumber) {
      case 1:
        return ["female", "male", "non-binary"]
      case 4:
        return ["5'4\"", "5'6\"", "5'8\"", "165cm", "170cm"]
      case 5:
        return ["120 lbs", "140 lbs", "160 lbs", "60 kg", "70 kg"]
      case 6:
        return ["8 womens", "9 womens", "10 mens", "11 mens"]
      case 7:
        return ["32B", "34C", "36D", "38DD"]
      default:
        return []
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const renderAgeSelection = () => (
    <div className="bg-gradient-to-r from-primary-50 to-primary-50 p-4 rounded-xl border border-primary-200 my-4 animate-fadeIn">
      <p className="font-semibold text-primary-600 mb-3 text-center text-sm">Please select your age range:</p>
      <div className="grid grid-cols-2 gap-2">
        {["Under 19", "19 - 39", "40 - 64", "Over 65"].map((age) => (
          <button
            key={age}
            onClick={() => handleAgeSelection(age)}
            className="flex items-center justify-center p-2 bg-white border-2 border-primary-200 hover:border-primary-600 hover:bg-primary-50 transition-all duration-200 font-medium text-gray-700 hover:text-primary-600 text-sm rounded-lg"
          >
            {age}
          </button>
        ))}
      </div>
    </div>
  )

  const renderSuggestions = (suggestions: string[]) => (
    <div className="flex flex-wrap gap-2 mt-3 animate-fadeIn">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => handleSuggestionClick(suggestion)}
          className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm hover:bg-primary-200 transition-colors duration-200 border border-primary-200"
        >
          {suggestion}
        </button>
      ))}
    </div>
  )

  // Mobile layout with fixed height
  if (isMobile) {
    return (
      <div
        className="bg-white rounded-3xl shadow-2xl w-full h-[600px] flex flex-col overflow-hidden border border-gray-100"
        style={{ touchAction: "manipulation" }}
      >
        {/* Header - Mobile */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-4 text-white flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Sophia AI"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Sophia AI</h3>
              <p className="text-primary-200 text-sm flex items-center">
                <Bot className="w-4 h-4 mr-1" />
                Virtual Fashion Stylist
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleReset}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200 group"
                title="Reset conversation"
              >
                <svg
                  className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </div>
          </div>
        </div>

        {/* Chat Body - Mobile with fixed height */}
        <div
          ref={chatBodyRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white chatbot-scrollbar-mobile"
          style={{ height: "400px" }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-slideIn`}
            >
              <div className={`max-w-[85%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                {message.sender === "bot" && (
                  <div className="flex items-center mb-2">
                    <User className="w-3 h-3 text-primary-600 mr-1" />
                    <span className="text-xs text-gray-500 font-medium">Sophia AI</span>
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl shadow-sm ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-br-md"
                      : "bg-white text-gray-800 rounded-bl-md border border-gray-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  {message.showAgeSelector && renderAgeSelection()}
                  {message.suggestions && message.suggestions.length > 0 && renderSuggestions(message.suggestions)}
                </div>
                <p
                  className={`text-xs mt-1 ${message.sender === "user" ? "text-right text-gray-400" : "text-left text-gray-500"}`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-slideIn">
              <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-sm border border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">Sophia is typing...</span>
                </div>
              </div>
            </div>
          )}

          {/* Invisible div to scroll to */}
          <div ref={messagesEndRef} className="h-1" />
        </div>

        {/* Input Area - Mobile */}
        <form onSubmit={handleSend} className="p-4 border-t bg-gray-50 flex-shrink-0">
          <div className="flex space-x-3">
            <Input
              ref={inputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your response here..."
              className="flex-1 border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rounded-xl h-12 px-4 text-sm"
              disabled={isTyping || currentQuestion === 3}
            />
            <Button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 px-6 h-12 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              disabled={isTyping || currentQuestion === 3}
            >
              <Send className="w-4 h-4 text-white" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500">Press Enter to send</p>
            <div className="flex items-center text-xs text-gray-500">
              <CheckCircle className="w-3 h-3 mr-1" />
              <span>Secure & Private</span>
            </div>
          </div>
        </form>

        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
          
          .animate-slideIn {
            animation: slideIn 0.4s ease-out;
          }

          .chatbot-scrollbar-mobile {
            scrollbar-width: thin;
            scrollbar-color: rgb(220 38 38) #f1f5f9;
          }

          .chatbot-scrollbar-mobile::-webkit-scrollbar {
            width: 12px;
          }
          
          .chatbot-scrollbar-mobile::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 10px;
            margin: 4px;
          }
          
          .chatbot-scrollbar-mobile::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, rgb(220 38 38), rgb(185 28 28));
            border-radius: 10px;
            border: 2px solid #f1f5f9;
          }
          
          .chatbot-scrollbar-mobile::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, rgb(185 28 28), rgb(153 27 27));
          }
          
          .chatbot-scrollbar-mobile::-webkit-scrollbar-corner {
            background: #f1f5f9;
          }
        `}</style>
      </div>
    )
  }

  // Desktop layout with flexible height
  return (
    <div
      className="bg-white rounded-3xl shadow-2xl w-full h-full flex flex-col overflow-hidden border border-gray-100"
      style={{ touchAction: "manipulation" }}
    >
      {/* Header - Desktop */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-3 text-white flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Sophia AI"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-base">Sophia AI</h3>
            <p className="text-primary-200 text-xs flex items-center">
              <Bot className="w-3 h-3 mr-1" />
              Virtual Fashion Stylist
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleReset}
              className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200 group"
              title="Reset conversation"
            >
              <svg
                className="w-3.5 h-3.5 text-white group-hover:rotate-180 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
        </div>
      </div>

      {/* Chat Body - Desktop with flexible height */}
      <div
        ref={chatBodyRef}
        className="flex-1 overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-gray-50 to-white min-h-0 chatbot-scrollbar-desktop"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-slideIn`}
          >
            <div className={`max-w-[85%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
              {message.sender === "bot" && (
                <div className="flex items-center mb-1">
                  <User className="w-3 h-3 text-primary-600 mr-1" />
                  <span className="text-xs text-gray-500 font-medium">Sophia AI</span>
                </div>
              )}
              <div
                className={`p-3 rounded-2xl shadow-sm ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-br-md"
                    : "bg-white text-gray-800 rounded-bl-md border border-gray-200"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                {message.showAgeSelector && renderAgeSelection()}
                {message.suggestions && message.suggestions.length > 0 && renderSuggestions(message.suggestions)}
              </div>
              <p
                className={`text-xs mt-1 ${message.sender === "user" ? "text-right text-gray-400" : "text-left text-gray-500"}`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-slideIn">
            <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">Sophia is typing...</span>
              </div>
            </div>
          </div>
        )}

        {/* Invisible div to scroll to */}
        <div ref={messagesEndRef} className="h-1" />
      </div>

      {/* Input Area - Desktop */}
      <form onSubmit={handleSend} className="p-3 border-t bg-gray-50 flex-shrink-0">
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your response here..."
            className="flex-1 border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rounded-xl h-10 px-3 text-sm"
            disabled={isTyping || currentQuestion === 3}
          />
          <Button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 px-4 h-10 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            disabled={isTyping || currentQuestion === 3}
          >
            <Send className="w-4 h-4 text-white" />
          </Button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-500">Press Enter to send</p>
          <div className="flex items-center text-xs text-gray-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            <span>Secure & Private</span>
          </div>
        </div>
      </form>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }

        .chatbot-scrollbar-desktop {
          scrollbar-width: thin;
          scrollbar-color: rgb(220 38 38) #f1f5f9;
        }

        .chatbot-scrollbar-desktop::-webkit-scrollbar {
          width: 8px;
        }
        
        .chatbot-scrollbar-desktop::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
          margin: 4px;
        }
        
        .chatbot-scrollbar-desktop::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgb(220 38 38), rgb(185 28 28));
          border-radius: 10px;
          border: 1px solid #f1f5f9;
        }
        
        .chatbot-scrollbar-desktop::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgb(185 28 28), rgb(153 27 27));
        }
        
        .chatbot-scrollbar-desktop::-webkit-scrollbar-corner {
          background: #f1f5f9;
        }
      `}</style>
    </div>
  )
}
