import { Button } from "@/components/ui/button"
import { ShoppingBag, Users } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Shop & Connect</h1>
        <p className="text-xl mb-8 opacity-90">
          Discover amazing products from creators you love. Follow, shop, and connect in one place.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button asChild size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Browse Products
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-primary-600 bg-transparent"
          >
            <Link href="/profiles">
              <Users className="mr-2 h-5 w-5" />
              Explore Creators
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
