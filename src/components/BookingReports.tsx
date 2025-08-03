import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Download,
} from "lucide-react";

interface BookingReportsProps {
  className?: string;
}

const BookingReports = ({ className = "" }: BookingReportsProps) => {
  const [reportType, setReportType] = useState("revenue");
  const [timeRange, setTimeRange] = useState("month");

  // Mock data for charts
  const mockData = {
    revenue: {
      current: "$45,231",
      change: "+12.5%",
      data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
    },
    bookings: {
      current: "1,234",
      change: "+8.2%",
      data: [45, 52, 38, 65, 58, 72, 69],
    },
    occupancy: {
      current: "78.5%",
      change: "+5.1%",
      data: [65, 72, 68, 78, 75, 82, 79],
    },
  };

  const SimpleChart = ({ data, color }: { data: number[]; color: string }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    return (
      <div className="flex items-end space-x-1 h-20">
        {data.map((value, index) => {
          const height = range > 0 ? ((value - min) / range) * 60 + 10 : 35;
          return (
            <motion.div
              key={index}
              className={`w-8 rounded-t ${color}`}
              style={{ height: `${height}px` }}
              initial={{ height: 0 }}
              animate={{ height: `${height}px` }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            />
          );
        })}
      </div>
    );
  };

  const reportCards = [
    {
      title: "Total Revenue",
      value: mockData.revenue.current,
      change: mockData.revenue.change,
      icon: DollarSign,
      data: mockData.revenue.data,
      color: "bg-gradient-to-t from-[#31e6ed] to-[#31e6ed]/70",
    },
    {
      title: "Total Bookings",
      value: mockData.bookings.current,
      change: mockData.bookings.change,
      icon: Calendar,
      data: mockData.bookings.data,
      color: "bg-gradient-to-t from-[#9d4edd] to-[#9d4edd]/70",
    },
    {
      title: "Occupancy Rate",
      value: mockData.occupancy.current,
      change: mockData.occupancy.change,
      icon: Users,
      data: mockData.occupancy.data,
      color: "bg-gradient-to-t from-teal-500 to-teal-400",
    },
  ];

  return (
    <div className={`bg-[#0c0c14] text-white p-6 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#31e6ed] to-[#9d4edd]">
              Booking Reports
            </h2>
            <p className="text-gray-400">
              Detailed analytics and insights for your bookings
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-[180px] bg-gray-900/50 border-gray-700 text-white">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="revenue">Revenue Report</SelectItem>
                <SelectItem value="bookings">Booking Report</SelectItem>
                <SelectItem value="occupancy">Occupancy Report</SelectItem>
                <SelectItem value="customer">Customer Report</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px] bg-gray-900/50 border-gray-700 text-white">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>

            <DatePickerWithRange className="" />

            <Button className="bg-gradient-to-r from-[#31e6ed] to-[#9d4edd] hover:opacity-90">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {reportCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    {card.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {card.value}
                      </div>
                      <p className="text-xs text-green-400 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {card.change} from last period
                      </p>
                    </div>
                  </div>
                  <SimpleChart data={card.data} color={card.color} />
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-[#31e6ed]" />
              Detailed Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Revenue Breakdown */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  Revenue Breakdown
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Room Bookings",
                      value: "$32,450",
                      percentage: 72,
                    },
                    { label: "Services", value: "$8,920", percentage: 20 },
                    {
                      label: "Food & Beverage",
                      value: "$2,680",
                      percentage: 6,
                    },
                    { label: "Other", value: "$1,181", percentage: 2 },
                  ].map((item, index) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{item.label}</span>
                        <span className="text-white font-medium">
                          {item.value}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-[#31e6ed] to-[#9d4edd] h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{
                            delay: 0.5 + index * 0.1,
                            duration: 0.8,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Performing Properties */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  Top Performing Properties
                </h4>
                <div className="space-y-3">
                  {[
                    {
                      name: "Neo Tokyo Suites",
                      bookings: 156,
                      revenue: "$18,450",
                    },
                    {
                      name: "Quantum Luxury Resort",
                      bookings: 134,
                      revenue: "$15,230",
                    },
                    {
                      name: "Cyber Heights Hotel",
                      bookings: 98,
                      revenue: "$11,551",
                    },
                  ].map((property, index) => (
                    <motion.div
                      key={property.name}
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <div>
                        <div className="text-white font-medium">
                          {property.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {property.bookings} bookings
                        </div>
                      </div>
                      <div className="text-[#31e6ed] font-bold">
                        {property.revenue}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default BookingReports;
