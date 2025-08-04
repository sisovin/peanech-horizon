import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Settings,
  Edit3,
  Plus,
  Trash2,
  Eye,
  Save,
  Upload,
  Palette,
  Layout,
  MessageSquare,
  Star,
  FileText,
  Menu,
  Image,
  Globe,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

interface WebsiteCustomizationProps {
  className?: string;
}

const WebsiteCustomization = ({
  className = "",
}: WebsiteCustomizationProps) => {
  const [activeTab, setActiveTab] = useState("homepage");
  const [isEditingBlock, setIsEditingBlock] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "The Future of Cyberpunk Hotels",
      excerpt:
        "Exploring how technology is reshaping the hospitality industry...",
      author: "Admin",
      date: "2024-01-15",
      status: "published",
    },
    {
      id: 2,
      title: "Top 10 Neon Destinations",
      excerpt: "Discover the most electrifying places to stay in Night City...",
      author: "Admin",
      date: "2024-01-10",
      status: "draft",
    },
  ]);
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Alex Chen",
      rating: 5,
      comment:
        "Absolutely incredible experience! The cyberpunk atmosphere was perfect.",
      property: "Neo Tokyo Suites",
      date: "2024-01-12",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "The holographic amenities blew my mind. Will definitely return!",
      property: "Quantum Luxury Resort",
      date: "2024-01-08",
    },
  ]);
  const [contactMessages, setContactMessages] = useState([
    {
      id: 1,
      name: "Marcus Rodriguez",
      email: "marcus@example.com",
      subject: "Booking Inquiry",
      message: "I'd like to know more about your premium suites...",
      date: "2024-01-14",
      status: "unread",
    },
  ]);

  const [siteSettings, setSiteSettings] = useState({
    siteName: "NEON HORIZON",
    tagline: "The future of hospitality",
    logo: "",
    primaryColor: "#31e6ed",
    secondaryColor: "#9d4edd",
    contactEmail: "info@neonhorizon.com",
    contactPhone: "+1 (555) 123-4567",
    address: "123 Cyber Street, Night City",
    socialMedia: {
      twitter: "@neonhorizon",
      instagram: "@neonhorizon",
      facebook: "neonhorizon",
    },
    policies: {
      privacy: "Our privacy policy ensures your data is secure...",
      terms: "Terms and conditions for booking...",
      cancellation: "Cancellation policy details...",
    },
  });

  const homepageBlocks = [
    {
      id: "hero",
      name: "Hero Section",
      type: "hero",
      content: {
        title: "NEON HORIZON",
        subtitle:
          "Discover extraordinary stays in a world where luxury meets technology",
        backgroundImage:
          "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80",
        ctaText: "Explore Now",
      },
    },
    {
      id: "features",
      name: "Features Section",
      type: "features",
      content: {
        title: "Why Choose Neon Horizon",
        features: [
          {
            icon: "🏨",
            title: "Luxury Accommodations",
            description: "Premium rooms with cutting-edge technology",
          },
          {
            icon: "🤖",
            title: "AI Concierge",
            description: "24/7 intelligent assistance",
          },
          {
            icon: "🌐",
            title: "Virtual Reality",
            description: "Immersive entertainment experiences",
          },
        ],
      },
    },
    {
      id: "testimonials",
      name: "Testimonials",
      type: "testimonials",
      content: {
        title: "What Our Guests Say",
        showRatings: true,
        maxTestimonials: 3,
      },
    },
    {
      id: "cta",
      name: "Call to Action",
      type: "cta",
      content: {
        title: "Ready for the Future?",
        description: "Book your cyberpunk experience today",
        buttonText: "Book Now",
        backgroundColor: "gradient",
      },
    },
  ];

  const handleBlockEdit = (block) => {
    setSelectedBlock(block);
    setIsEditingBlock(true);
  };

  const handleSaveBlock = (updatedBlock) => {
    // In a real app, this would save to a database
    console.log("Saving block:", updatedBlock);
    setIsEditingBlock(false);
    setSelectedBlock(null);
  };

  const handleDeleteBlogPost = (id) => {
    setBlogPosts(blogPosts.filter((post) => post.id !== id));
  };

  const handleDeleteTestimonial = (id) => {
    setTestimonials(
      testimonials.filter((testimonial) => testimonial.id !== id),
    );
  };

  const handleMarkMessageRead = (id) => {
    setContactMessages(
      contactMessages.map((msg) =>
        msg.id === id ? { ...msg, status: "read" } : msg,
      ),
    );
  };

  return (
    <div className={`bg-[#0c0c14] text-white p-6 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#31e6ed] to-[#9d4edd]">
          Website Customization
        </h2>
        <p className="text-gray-400">
          Customize your website appearance, content, and settings
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-900/50 border border-gray-800">
          <TabsTrigger
            value="homepage"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#31e6ed] data-[state=active]:to-[#9d4edd] data-[state=active]:text-white"
          >
            <Layout className="w-4 h-4 mr-2" />
            Homepage
          </TabsTrigger>
          <TabsTrigger
            value="blog"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#31e6ed] data-[state=active]:to-[#9d4edd] data-[state=active]:text-white"
          >
            <FileText className="w-4 h-4 mr-2" />
            Blog
          </TabsTrigger>
          <TabsTrigger
            value="testimonials"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#31e6ed] data-[state=active]:to-[#9d4edd] data-[state=active]:text-white"
          >
            <Star className="w-4 h-4 mr-2" />
            Reviews
          </TabsTrigger>
          <TabsTrigger
            value="messages"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#31e6ed] data-[state=active]:to-[#9d4edd] data-[state=active]:text-white"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#31e6ed] data-[state=active]:to-[#9d4edd] data-[state=active]:text-white"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Homepage Blocks */}
        <TabsContent value="homepage" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Layout className="w-5 h-5 mr-2 text-[#31e6ed]" />
                Homepage Blocks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {homepageBlocks.map((block, index) => (
                  <motion.div
                    key={block.id}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-8 bg-gradient-to-b from-[#31e6ed] to-[#9d4edd] rounded"></div>
                      <div>
                        <h4 className="font-medium text-white">{block.name}</h4>
                        <p className="text-sm text-gray-400 capitalize">
                          {block.type} block
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBlockEdit(block)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button className="mt-4 bg-gradient-to-r from-[#31e6ed] to-[#9d4edd] hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Add New Block
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blog Management */}
        <TabsContent value="blog" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <FileText className="w-5 h-5 mr-2 text-[#31e6ed]" />
                Blog Posts
              </CardTitle>
              <Button className="bg-gradient-to-r from-[#31e6ed] to-[#9d4edd] hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{post.title}</h4>
                      <p className="text-sm text-gray-400 mt-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>By {post.author}</span>
                        <span>{post.date}</span>
                        <span
                          className={`px-2 py-1 rounded ${
                            post.status === "published"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {post.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
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
                        onClick={() => handleDeleteBlogPost(post.id)}
                        className="border-red-600 text-red-400 hover:bg-red-700/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testimonials Management */}
        <TabsContent value="testimonials" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Star className="w-5 h-5 mr-2 text-[#31e6ed]" />
                Customer Testimonials
              </CardTitle>
              <Button className="bg-gradient-to-r from-[#31e6ed] to-[#9d4edd] hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-white">
                            {testimonial.name}
                          </h4>
                          <div className="flex">
                            {Array.from({ length: testimonial.rating }).map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 text-yellow-400 fill-yellow-400"
                                />
                              ),
                            )}
                          </div>
                        </div>
                        <p className="text-gray-300 mb-2">
                          &quot;{testimonial.comment}&quot;
                        </p>
                        <div className="text-sm text-gray-500">
                          <span>{testimonial.property}</span> •{" "}
                          <span>{testimonial.date}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleDeleteTestimonial(testimonial.id)
                          }
                          className="border-red-600 text-red-400 hover:bg-red-700/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Messages */}
        <TabsContent value="messages" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-[#31e6ed]" />
                Contact Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contactMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    className={`p-4 rounded-lg border ${
                      message.status === "unread"
                        ? "bg-blue-500/10 border-blue-500/30"
                        : "bg-gray-800/50 border-gray-700"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-white">
                            {message.name}
                          </h4>
                          <span className="text-sm text-gray-400">
                            ({message.email})
                          </span>
                          {message.status === "unread" && (
                            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded">
                              New
                            </span>
                          )}
                        </div>
                        <h5 className="text-[#31e6ed] mb-2">
                          {message.subject}
                        </h5>
                        <p className="text-gray-300 mb-2">{message.message}</p>
                        <div className="text-sm text-gray-500">
                          {message.date}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {message.status === "unread" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkMessageRead(message.id)}
                            className="border-blue-600 text-blue-400 hover:bg-blue-700/20"
                          >
                            Mark Read
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General Settings */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-[#31e6ed]" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="siteName" className="text-gray-300">
                    Site Name
                  </Label>
                  <Input
                    id="siteName"
                    value={siteSettings.siteName}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        siteName: e.target.value,
                      })
                    }
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="tagline" className="text-gray-300">
                    Tagline
                  </Label>
                  <Input
                    id="tagline"
                    value={siteSettings.tagline}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        tagline: e.target.value,
                      })
                    }
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="logo" className="text-gray-300">
                    Logo Upload
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300"
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Separator className="bg-gray-700" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryColor" className="text-gray-300">
                      Primary Color
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={siteSettings.primaryColor}
                        onChange={(e) =>
                          setSiteSettings({
                            ...siteSettings,
                            primaryColor: e.target.value,
                          })
                        }
                        className="w-12 h-9 p-1 bg-gray-800/50 border-gray-700"
                      />
                      <Input
                        value={siteSettings.primaryColor}
                        onChange={(e) =>
                          setSiteSettings({
                            ...siteSettings,
                            primaryColor: e.target.value,
                          })
                        }
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondaryColor" className="text-gray-300">
                      Secondary Color
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={siteSettings.secondaryColor}
                        onChange={(e) =>
                          setSiteSettings({
                            ...siteSettings,
                            secondaryColor: e.target.value,
                          })
                        }
                        className="w-12 h-9 p-1 bg-gray-800/50 border-gray-700"
                      />
                      <Input
                        value={siteSettings.secondaryColor}
                        onChange={(e) =>
                          setSiteSettings({
                            ...siteSettings,
                            secondaryColor: e.target.value,
                          })
                        }
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-[#31e6ed]" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label
                    htmlFor="contactEmail"
                    className="text-gray-300 flex items-center"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={siteSettings.contactEmail}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        contactEmail: e.target.value,
                      })
                    }
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="contactPhone"
                    className="text-gray-300 flex items-center"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Phone
                  </Label>
                  <Input
                    id="contactPhone"
                    value={siteSettings.contactPhone}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        contactPhone: e.target.value,
                      })
                    }
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="address"
                    className="text-gray-300 flex items-center"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={siteSettings.address}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        address: e.target.value,
                      })
                    }
                    className="bg-gray-800/50 border-gray-700 text-white"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Policies */}
            <Card className="bg-gray-900/50 border-gray-800 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-[#31e6ed]" />
                  Policies & Legal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="privacy" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
                    <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
                    <TabsTrigger value="terms">Terms of Service</TabsTrigger>
                    <TabsTrigger value="cancellation">
                      Cancellation Policy
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="privacy" className="mt-4">
                    <Textarea
                      value={siteSettings.policies.privacy}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          policies: {
                            ...siteSettings.policies,
                            privacy: e.target.value,
                          },
                        })
                      }
                      className="bg-gray-800/50 border-gray-700 text-white min-h-[200px]"
                      placeholder="Enter your privacy policy..."
                    />
                  </TabsContent>
                  <TabsContent value="terms" className="mt-4">
                    <Textarea
                      value={siteSettings.policies.terms}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          policies: {
                            ...siteSettings.policies,
                            terms: e.target.value,
                          },
                        })
                      }
                      className="bg-gray-800/50 border-gray-700 text-white min-h-[200px]"
                      placeholder="Enter your terms of service..."
                    />
                  </TabsContent>
                  <TabsContent value="cancellation" className="mt-4">
                    <Textarea
                      value={siteSettings.policies.cancellation}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          policies: {
                            ...siteSettings.policies,
                            cancellation: e.target.value,
                          },
                        })
                      }
                      className="bg-gray-800/50 border-gray-700 text-white min-h-[200px]"
                      placeholder="Enter your cancellation policy..."
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Save Settings */}
          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-[#31e6ed] to-[#9d4edd] hover:opacity-90">
              <Save className="w-4 h-4 mr-2" />
              Save All Settings
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Block Edit Dialog */}
      <Dialog open={isEditingBlock} onOpenChange={setIsEditingBlock}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit {selectedBlock?.name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Customize the content and appearance of this block.
            </DialogDescription>
          </DialogHeader>
          {selectedBlock && (
            <div className="space-y-4">
              {selectedBlock.type === "hero" && (
                <>
                  <div>
                    <Label htmlFor="heroTitle" className="text-gray-300">
                      Title
                    </Label>
                    <Input
                      id="heroTitle"
                      defaultValue={selectedBlock.content.title}
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="heroSubtitle" className="text-gray-300">
                      Subtitle
                    </Label>
                    <Textarea
                      id="heroSubtitle"
                      defaultValue={selectedBlock.content.subtitle}
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="heroImage" className="text-gray-300">
                      Background Image URL
                    </Label>
                    <Input
                      id="heroImage"
                      defaultValue={selectedBlock.content.backgroundImage}
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="heroCta" className="text-gray-300">
                      Call to Action Text
                    </Label>
                    <Input
                      id="heroCta"
                      defaultValue={selectedBlock.content.ctaText}
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                </>
              )}
              {selectedBlock.type === "features" && (
                <>
                  <div>
                    <Label htmlFor="featuresTitle" className="text-gray-300">
                      Section Title
                    </Label>
                    <Input
                      id="featuresTitle"
                      defaultValue={selectedBlock.content.title}
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Features</Label>
                    <div className="space-y-3">
                      {selectedBlock.content.features.map((feature, index) => (
                        <div key={index} className="grid grid-cols-3 gap-2">
                          <Input
                            placeholder="Icon (emoji)"
                            defaultValue={feature.icon}
                            className="bg-gray-800/50 border-gray-700 text-white"
                          />
                          <Input
                            placeholder="Title"
                            defaultValue={feature.title}
                            className="bg-gray-800/50 border-gray-700 text-white"
                          />
                          <Input
                            placeholder="Description"
                            defaultValue={feature.description}
                            className="bg-gray-800/50 border-gray-700 text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditingBlock(false)}
              className="border-gray-600 text-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleSaveBlock(selectedBlock)}
              className="bg-gradient-to-r from-[#31e6ed] to-[#9d4edd]"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebsiteCustomization;
