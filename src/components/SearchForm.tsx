import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users, Filter } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SearchFormProps {
  onSearch?: (searchParams: {
    dateRange: DateRange | undefined;
    guests: number;
    rooms: number;
    amenities: string[];
  }) => void;
}

const SearchForm = ({ onSearch = () => {} }: SearchFormProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 3)),
  });

  const [guests, setGuests] = useState<number>(2);
  const [rooms, setRooms] = useState<number>(1);
  const [amenities, setAmenities] = useState<string[]>([]);

  const handleSearch = () => {
    onSearch({
      dateRange,
      guests,
      rooms,
      amenities,
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-black/40 backdrop-blur-md border-[1px] border-teal-500/30 shadow-lg shadow-teal-500/20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=20')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-teal-500/5"></div>

      <CardContent className="relative z-10 p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-2/5">
            <label className="block text-sm font-medium text-teal-400 mb-1">
              Check-in / Check-out
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start border-teal-500/30 bg-black/50 hover:bg-black/70 text-white hover:text-teal-400 transition-all duration-300"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-teal-400" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span className="text-muted-foreground">Select dates</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-black/90 border-teal-500/30"
                align="start"
              >
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  className="text-white"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full md:w-1/5">
            <label className="block text-sm font-medium text-teal-400 mb-1">
              Guests
            </label>
            <Select
              value={guests.toString()}
              onValueChange={(value) => setGuests(parseInt(value))}
            >
              <SelectTrigger className="border-teal-500/30 bg-black/50 hover:bg-black/70 text-white hover:text-teal-400 transition-all duration-300">
                <SelectValue>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-teal-400" />
                    {guests} {guests === 1 ? "Guest" : "Guests"}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-teal-500/30 text-white">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/5">
            <label className="block text-sm font-medium text-teal-400 mb-1">
              Rooms
            </label>
            <Select
              value={rooms.toString()}
              onValueChange={(value) => setRooms(parseInt(value))}
            >
              <SelectTrigger className="border-teal-500/30 bg-black/50 hover:bg-black/70 text-white hover:text-teal-400 transition-all duration-300">
                <SelectValue>
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 text-teal-400" />
                    {rooms} {rooms === 1 ? "Room" : "Rooms"}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-teal-500/30 text-white">
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Room" : "Rooms"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/5 flex items-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full border-teal-500/30 bg-black/50 hover:bg-black/70 text-white hover:text-teal-400 transition-all duration-300"
                  >
                    <Filter className="mr-2 h-4 w-4 text-teal-400" />
                    Filters
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-black/90 border-teal-500/30 text-white">
                  <p>Room filters coming soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <Button
            onClick={handleSearch}
            className="bg-gradient-to-r from-violet-600 to-teal-500 hover:from-violet-700 hover:to-teal-600 text-white font-bold py-2 px-8 rounded-md shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all duration-300"
          >
            Search Hotels
          </Button>
        </div>

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 to-teal-500 opacity-80"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-teal-500 to-violet-600 opacity-80"></div>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
