import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Wifi, Coffee, Utensils, Tv, MapPin } from "lucide-react";

interface PropertyCardProps {
  id?: string;
  name?: string;
  image?: string;
  price?: number;
  rating?: number;
  location?: string;
  amenities?: string[];
  description?: string;
  onBookNow?: (id: string) => void;
}

const PropertyCard = ({
  id = "property-1",
  name = "Neo Tokyo Suites",
  image = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  price = 299,
  rating = 4.8,
  location = "Night City, Downtown",
  amenities = ["wifi", "breakfast", "restaurant", "tv"],
  description = "Ultra-modern rooms with panoramic city views, featuring smart home technology and customizable ambient lighting.",
  onBookNow = () => console.log("Book now clicked"),
}: PropertyCardProps) => {
  const amenityIcons: Record<string, React.ReactNode> = {
    wifi: <Wifi className="h-4 w-4" />,
    breakfast: <Coffee className="h-4 w-4" />,
    restaurant: <Utensils className="h-4 w-4" />,
    tv: <Tv className="h-4 w-4" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full bg-black/40 backdrop-blur-md border-[1px] border-teal-500/30 hover:border-teal-400/60 transition-all duration-300 shadow-lg hover:shadow-teal-500/20 relative">
        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNNTQgMjJjMC0xMi0xMC0xOC0xOC0xOGMtOCAwLTEyIDYtMTIgNnMtNCAwLTQgNmMwIDYgNCAxMiA0IDEycy00IDYtNCAxMmMwIDYgNCA2IDQgNnM0IDYgMTIgNmM4IDAgMTgtNiAxOC0xOGMwLTYtNC0xMi00LTEyUzU0IDI4IDU0IDIyeiBNMzAgMjRjLTIuMjEgMC00LTEuNzktNC00YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDRDMzQgMjIuMjEgMzIuMjEgMjQgMzAgMjR6IiBmaWxsPSIjMzFlNmVkIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=')] bg-repeat" />

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <Badge
            variant="outline"
            className="absolute top-3 right-3 bg-black/50 backdrop-blur-md border-violet-500/50 text-violet-300"
          >
            ${price}/night
          </Badge>
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white tracking-tight">
              {name}
            </h3>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="h-4 w-4 fill-yellow-400" />
              <span className="text-sm">{rating}</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-400 mb-3">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{location}</span>
          </div>

          <p className="text-sm text-gray-300 mb-4 line-clamp-2">
            {description}
          </p>

          <div className="flex gap-2 mb-2">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-1.5 bg-gray-800/50 rounded-md border border-teal-500/30"
                title={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
              >
                {amenityIcons[amenity]}
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            onClick={() => onBookNow(id)}
            className="w-full bg-gradient-to-r from-violet-600 to-teal-500 hover:from-violet-500 hover:to-teal-400 text-white border-none shadow-lg shadow-violet-700/20 hover:shadow-violet-700/40 transition-all duration-300"
          >
            Book Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;
