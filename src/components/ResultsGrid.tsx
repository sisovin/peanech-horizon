import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface Property {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  location: string;
  amenities: string[];
  description: string;
}

interface ResultsGridProps {
  properties?: Property[];
  isLoading?: boolean;
}

const ResultsGrid = ({
  properties = mockProperties,
  isLoading = false,
}: ResultsGridProps) => {
  const [sortBy, setSortBy] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  // Calculate pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty,
  );
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="w-full bg-black bg-opacity-90 min-h-screen p-6 md:p-8 lg:p-10">
      {/* Results header with count and sorting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-teal-500/30 pb-4">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            <span className="text-teal-400">{properties.length}</span>{" "}
            Properties Found
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Showing results {indexOfFirstProperty + 1}-
            {Math.min(indexOfLastProperty, properties.length)} of{" "}
            {properties.length}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] border-violet-500/50 bg-black/60 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-violet-500/50 text-white">
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="h-[450px] rounded-lg bg-gray-900/50 animate-pulse"
              />
            ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {currentProperties.map((property) => (
            <motion.div key={property.id} variants={itemVariants}>
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {properties.length > propertiesPerPage && (
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "text-teal-400 hover:text-teal-300"
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, and pages around current page
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => handlePageChange(page)}
                      className={
                        page === currentPage
                          ? "bg-teal-500 text-black"
                          : "text-white hover:text-teal-400"
                      }
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              // Show ellipsis for gaps
              if (page === 2 && currentPage > 3) {
                return (
                  <PaginationEllipsis
                    key="ellipsis-1"
                    className="text-gray-500"
                  />
                );
              }
              if (page === totalPages - 1 && currentPage < totalPages - 2) {
                return (
                  <PaginationEllipsis
                    key="ellipsis-2"
                    className="text-gray-500"
                  />
                );
              }

              return null;
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "text-teal-400 hover:text-teal-300"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

// Mock data for development
const mockProperties: Property[] = [
  {
    id: "1",
    name: "Neon Heights Hotel",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    price: 299,
    rating: 4.8,
    location: "Night City Downtown",
    amenities: [
      "Free WiFi",
      "Rooftop Bar",
      "AI Concierge",
      "Holographic Entertainment",
    ],
    description:
      "Experience luxury with panoramic city views and cutting-edge technology in every room.",
  },
  {
    id: "2",
    name: "Quantum Suites",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    price: 450,
    rating: 4.9,
    location: "Tech District",
    amenities: [
      "Neural Interface",
      "Antigravity Spa",
      "Biometric Security",
      "Drone Room Service",
    ],
    description:
      "The ultimate futuristic experience with rooms that adapt to your mood and preferences.",
  },
  {
    id: "3",
    name: "Neon Oasis Resort",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    price: 350,
    rating: 4.7,
    location: "Synthetic Gardens",
    amenities: [
      "Holographic Beach",
      "Mood Lighting",
      "Cybernetic Bar",
      "Memory Recording",
    ],
    description:
      "An urban oasis with simulated natural environments and cutting-edge relaxation technology.",
  },
  {
    id: "4",
    name: "Digital Dreams Hostel",
    image:
      "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=800&q=80",
    price: 120,
    rating: 4.2,
    location: "Hacker District",
    amenities: [
      "Shared Neural Network",
      "VR Gaming Lounge",
      "Capsule Beds",
      "Tech Repair Shop",
    ],
    description:
      "Budget-friendly accommodation for digital nomads with high-speed connections to the net.",
  },
  {
    id: "5",
    name: "Skyline Tower",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    price: 550,
    rating: 4.9,
    location: "Corporate Zone",
    amenities: [
      "Executive AI Assistant",
      "Secure Comms Room",
      "Augmented Reality Office",
      "Helipad",
    ],
    description:
      "Luxury accommodations for corporate executives with unparalleled security and privacy features.",
  },
  {
    id: "6",
    name: "Retro Fusion Inn",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    price: 275,
    rating: 4.5,
    location: "Old Town District",
    amenities: [
      "Vintage Tech Museum",
      "Analog Bar",
      "Digital-Analog Hybrid Rooms",
      "Vinyl Music Library",
    ],
    description:
      "Where retro aesthetics meet modern technology for a unique nostalgic experience.",
  },
  {
    id: "7",
    name: "Circuit Breaker Motel",
    image:
      "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800&q=80",
    price: 180,
    rating: 3.9,
    location: "Industrial Zone",
    amenities: [
      "Self-Repair Kits",
      "Tech Trading Post",
      "Automated Check-in",
      "Charging Stations",
    ],
    description:
      "No-frills accommodation with all the tech essentials for the practical traveler.",
  },
  {
    id: "8",
    name: "Hologram Heights",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    price: 420,
    rating: 4.7,
    location: "Entertainment District",
    amenities: [
      "Immersive Room Themes",
      "Reality Shifting",
      "Dream Recording",
      "Celebrity AI Hosts",
    ],
    description:
      "Every stay is a new reality with rooms that transform into any environment you desire.",
  },
  {
    id: "9",
    name: "Subwave Underground",
    image:
      "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=800&q=80",
    price: 210,
    rating: 4.3,
    location: "Subterranean Level",
    amenities: [
      "Sound Isolation",
      "Private Network",
      "Blackout Options",
      "Anonymous Check-in",
    ],
    description:
      "For those who prefer to stay off the grid while enjoying modern comforts.",
  },
];

export default ResultsGrid;
