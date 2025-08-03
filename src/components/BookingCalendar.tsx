import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  FileText,
  Eye,
  Download,
  Filter,
  Plus,
} from "lucide-react";
import { format, addDays, isSameDay } from "date-fns";

interface BookingCalendarProps {
  className?: string;
}

const BookingCalendar = ({ className = "" }: BookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [viewMode, setViewMode] = useState("calendar");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock booking data
  const mockBookings = [
    {
      id: "BK001",
      guestName: "Alex Chen",
      property: "Neo Tokyo Suites",
      checkIn: new Date(),
      checkOut: addDays(new Date(), 3),
      status: "confirmed",
      amount: 450,
      invoiceId: "INV-2024-001",
    },
    {
      id: "BK002",
      guestName: "Sarah Johnson",
      property: "Quantum Luxury Resort",
      checkIn: addDays(new Date(), 1),
      checkOut: addDays(new Date(), 5),
      status: "pending",
      amount: 680,
      invoiceId: "INV-2024-002",
    },
    {
      id: "BK003",
      guestName: "Marcus Rodriguez",
      property: "Cyber Heights Hotel",
      checkIn: addDays(new Date(), 2),
      checkOut: addDays(new Date(), 4),
      status: "confirmed",
      amount: 320,
      invoiceId: "INV-2024-003",
    },
    {
      id: "BK004",
      guestName: "Emma Wilson",
      property: "Neo Tokyo Suites",
      checkIn: addDays(new Date(), -2),
      checkOut: addDays(new Date(), 1),
      status: "checked-in",
      amount: 520,
      invoiceId: "INV-2024-004",
    },
  ];

  const getBookingsForDate = (date: Date) => {
    return mockBookings.filter(
      (booking) =>
        isSameDay(booking.checkIn, date) ||
        isSameDay(booking.checkOut, date) ||
        (booking.checkIn <= date && booking.checkOut >= date),
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "checked-in":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const filteredBookings =
    filterStatus === "all"
      ? mockBookings
      : mockBookings.filter((booking) => booking.status === filterStatus);

  const selectedDateBookings = selectedDate
    ? getBookingsForDate(selectedDate)
    : [];

  return (
    <div className={`bg-[#0c0c14] text-white p-6 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#31e6ed] to-[#9d4edd]">
              Booking Calendar
            </h2>
            <p className="text-gray-400">
              Manage bookings and invoices with calendar overview
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-[150px] bg-gray-900/50 border-gray-700 text-white">
                <SelectValue placeholder="View mode" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="calendar">Calendar View</SelectItem>
                <SelectItem value="list">List View</SelectItem>
                <SelectItem value="timeline">Timeline View</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px] bg-gray-900/50 border-gray-700 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="checked-in">Checked In</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-gradient-to-r from-[#31e6ed] to-[#9d4edd] hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CalendarDays className="w-5 h-5 mr-2 text-[#31e6ed]" />
                Booking Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border-0"
                classNames={{
                  months:
                    "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption:
                    "flex justify-center pt-1 relative items-center text-white",
                  caption_label: "text-sm font-medium text-white",
                  nav_button:
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-white border border-gray-700",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell:
                    "text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal text-white hover:bg-gray-700 rounded-md",
                  day_selected:
                    "bg-gradient-to-r from-[#31e6ed] to-[#9d4edd] text-white hover:bg-gradient-to-r hover:from-[#31e6ed] hover:to-[#9d4edd]",
                  day_today: "bg-gray-700 text-white",
                  day_outside: "text-gray-600 opacity-50",
                  day_disabled: "text-gray-600 opacity-50",
                }}
                components={{
                  DayContent: ({ date }) => {
                    const bookingsForDate = getBookingsForDate(date);
                    const hasBookings = bookingsForDate.length > 0;

                    return (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <span>{date.getDate()}</span>
                        {hasBookings && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                            <div className="w-1 h-1 bg-[#31e6ed] rounded-full"></div>
                          </div>
                        )}
                      </div>
                    );
                  },
                }}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Selected Date Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">
                {selectedDate
                  ? format(selectedDate, "MMMM d, yyyy")
                  : "Select a date"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateBookings.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      className="p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">
                          {booking.guestName}
                        </span>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>{booking.property}</div>
                        <div>
                          {format(booking.checkIn, "MMM d")} -{" "}
                          {format(booking.checkOut, "MMM d")}
                        </div>
                        <div className="text-[#31e6ed] font-medium">
                          ${booking.amount}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No bookings for this date</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Invoice Management */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-[#31e6ed]" />
                Invoice Management
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#31e6ed] to-[#9d4edd] hover:opacity-90"
              >
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700 hover:bg-gray-800/50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-medium text-white">
                        {booking.invoiceId}
                      </div>
                      <div className="text-sm text-gray-400">
                        {booking.guestName} • {booking.property}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                    <div className="text-right">
                      <div className="font-medium text-[#31e6ed]">
                        ${booking.amount}
                      </div>
                      <div className="text-xs text-gray-400">
                        {format(booking.checkIn, "MMM d")} -{" "}
                        {format(booking.checkOut, "MMM d")}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default BookingCalendar;
