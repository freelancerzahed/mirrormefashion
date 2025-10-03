"use client"

<<<<<<< HEAD
interface ClosetItemCardProps {
  item: { id: number; name?: string; description?: string; image?: string }
}

const ClosetItemCard = ({ item }: ClosetItemCardProps) => (
  <div className="group">
    <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <img
            src={item?.image || "/placeholder.svg"}
            alt={item?.name || "Closet Item"}
            className="w-12 h-12 object-cover rounded"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2 text-lg">{item?.name || "Unnamed Item"}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{item?.description || "No description available."}</p>
        </div>
      </div>
    </div>
  </div>
)

export default ClosetItemCard
=======
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface ClosetItemCardProps {
  name: string
  description: string
  image: string
}

const ClosetItemCard = ({ name, description, image }: ClosetItemCardProps) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm border-0">
    <div className="flex items-start gap-4 p-4">
      <div className="flex-shrink-0">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name || "Closet Item"}
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 mb-1 text-base truncate">
          {name || "Unnamed Item"}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {description || "No description available."}
        </p>
      </div>
    </div>
  </Card>
)

export default ClosetItemCard
>>>>>>> 9098284 (body data update backend added)
