import React from "react";
import { motion } from "framer-motion";
import SearchForm from "./SearchForm";
import ResultsGrid from "./ResultsGrid";
import BookingReports from "./BookingReports";
import BookingCalendar from "./BookingCalendar";
import WebsiteCustomization from "./WebsiteCustomization";

const Home = () => {
  const [searchPerformed, setSearchPerformed] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("search");
  const [searchParams, setSearchParams] = React.useState({
    dateRange: {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 3)),
    },
    guests: 2,
    rooms: 1,
    filters: [],
  });

  // Circuit pattern SVG for background
  const CircuitPattern = () => (
    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="circuit"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 50 H100 M50 0 V100 M25 25 L75 75 M75 25 L25 75"
              stroke="#31e6ed"
              strokeWidth="0.5"
              fill="none"
            />
            <circle cx="50" cy="50" r="3" fill="#9d4edd" />
            <circle cx="25" cy="25" r="2" fill="#31e6ed" />
            <circle cx="75" cy="75" r="2" fill="#31e6ed" />
            <circle cx="75" cy="25" r="2" fill="#9d4edd" />
            <circle cx="25" cy="75" r="2" fill="#9d4edd" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  );

  // Particle effect component
  const ParticleEffect = () => {
    const particles = Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-cyan-500"
        style={{
          width: Math.random() * 4 + 1,
          height: Math.random() * 4 + 1,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: Math.random() * 0.5 + 0.1,
        }}
        animate={{
          y: [
            Math.random() * window.innerHeight,
            Math.random() * window.innerHeight - 200,
          ],
          opacity: [0.1, 0.5, 0.1],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: Math.random() * 20 + 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ));

    return (
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles}
      </div>
    );
  };

  const handleSearch = (params) => {
    setSearchParams(params);
    setSearchPerformed(true);
    // In a real app, this would trigger an API call to fetch results
  };

  return (
    <div className="min-h-screen bg-[#0c0c14] text-white relative overflow-hidden">
      {/* Background elements */}
      <CircuitPattern />
      <ParticleEffect />

      {/* Main content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero section */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#31e6ed] to-[#9d4edd]">
            NEON HORIZON
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Discover extraordinary stays in a world where luxury meets
            technology
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="flex space-x-1 bg-gray-900/50 backdrop-blur-sm rounded-lg p-1 border border-gray-800">
            {[
              { id: "search", label: "Search & Book" },
              { id: "reports", label: "Reports" },
              { id: "calendar", label: "Calendar" },
              { id: "customize", label: "Customize" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#31e6ed] to-[#9d4edd] text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === "search" && (
          <>
            {/* Search form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-16"
            >
              <SearchForm onSearch={handleSearch} />
            </motion.div>

            {/* Results grid - only shown after search */}
            {searchPerformed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2 text-[#31e6ed]">
                    Search Results
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-[#31e6ed] to-[#9d4edd]"></div>
                </div>
                <ResultsGrid searchParams={searchParams} />
              </motion.div>
            )}

            {/* Featured section - only shown before search */}
            {!searchPerformed && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2 text-[#31e6ed]">
                    Featured Destinations
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-[#31e6ed] to-[#9d4edd]"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((item) => (
                    <motion.div
                      key={item}
                      className="relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm"
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 0 15px rgba(49, 230, 237, 0.3)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="aspect-video relative">
                        <img
                          src={`https://images.unsplash.com/photo-${item === 1 ? "1566073771259-6a8506099945" : item === 2 ? "1582719508461-905c673771fd" : "1566665797739-1674de7a421a"}?w=800&q=80`}
                          alt="Featured destination"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="text-xl font-bold text-white">
                            {item === 1
                              ? "Neo Tokyo Suites"
                              : item === 2
                                ? "Quantum Luxury Resort"
                                : "Cyber Heights Hotel"}
                          </h3>
                          <div className="flex items-center mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                className="w-4 h-4 text-yellow-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="ml-2 text-sm text-gray-300">
                              (120+ reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-400">
                            Starting from
                          </span>
                          <span className="text-xl font-bold text-[#31e6ed]">
                            ${item * 100 + 99}
                          </span>
                        </div>
                        <button className="w-full py-2 bg-gradient-to-r from-[#31e6ed] to-[#9d4edd] rounded-md font-medium hover:opacity-90 transition-opacity">
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BookingReports />
          </motion.div>
        )}

        {/* Calendar Tab */}
        {activeTab === "calendar" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BookingCalendar />
          </motion.div>
        )}

        {/* Customize Tab */}
        {activeTab === "customize" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WebsiteCustomization />
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-800 py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#31e6ed] to-[#9d4edd]">
                NEON HORIZON
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                The future of hospitality
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-[#31e6ed] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#31e6ed] transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#31e6ed] transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Neon Horizon Hotels. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
