"use client"

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
