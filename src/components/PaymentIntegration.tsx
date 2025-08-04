import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
  CreditCard,
  DollarSign,
  Settings,
  Plus,
  Edit3,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  AlertTriangle,
  Download,
  RefreshCw,
  Shield,
  Key,
  Globe,
  Smartphone,
} from "lucide-react";
import { format } from "date-fns";

interface PaymentIntegrationProps {
  className?: string;
}

const PaymentIntegration = ({ className = "" }: PaymentIntegrationProps) => {
  const [activeTab, setActiveTab] = useState("gateways");
  const [isAddingGateway, setIsAddingGateway] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState(null);

  // Mock payment gateway configurations
  const [paymentGateways, setPaymentGateways] = useState([
    {
      id: "aba-payway",
      name: "ABA PayWay",
      type: "aba",
      status: "active",
      logo: "🏦",
      description: "Cambodia's leading digital payment platform",
      config: {
        merchantId: "MERCHANT_001",
        apiKey: "aba_live_***************",
        secretKey: "***************",
        environment: "production",
        currency: "USD",
        webhookUrl: "https://api.neonhorizon.com/webhooks/aba",
      },
      fees: {
        percentage: 2.5,
        fixed: 0.3,
        currency: "USD",
      },
      features: ["QR Code", "Mobile Banking", "Card Payment", "Wallet"],
      lastSync: new Date(),
    },
    {
      id: "bakong-nbc",
      name: "Bakong NBC",
      type: "bakong",
      status: "active",
      logo: "🏛️",
      description: "National Bank of Cambodia's digital payment system",
      config: {
        merchantId: "NBC_MERCHANT_001",
        apiKey: "bakong_live_***************",
        secretKey: "***************",
        environment: "production",
        currency: "KHR",
        webhookUrl: "https://api.neonhorizon.com/webhooks/bakong",
      },
      fees: {
        percentage: 1.5,
        fixed: 0,
        currency: "KHR",
      },
      features: ["QR Code", "Bank Transfer", "Mobile Payment"],
      lastSync: new Date(),
    },
    {
      id: "stripe",
      name: "Stripe",
      type: "stripe",
      status: "inactive",
      logo: "💳",
      description: "International payment processing platform",
      config: {
        publishableKey: "pk_live_***************",
        secretKey: "sk_live_***************",
        webhookSecret: "whsec_***************",
        environment: "production",
        currency: "USD",
      },
      fees: {
        percentage: 2.9,
        fixed: 0.3,
        currency: "USD",
      },
      features: ["Credit Cards", "Digital Wallets", "Bank Transfers"],
      lastSync: new Date(Date.now() - 86400000), // 1 day ago
    },
  ]);

  // Mock transaction data
  const [transactions, setTransactions] = useState([
    {
      id: "TXN_001",
      bookingId: "BK001",
      gateway: "ABA PayWay",
      amount: 450.0,
      currency: "USD",
      status: "completed",
      method: "QR Code",
      customer: "Alex Chen",
      date: new Date(),
      fees: 11.55,
      reference: "ABA_REF_123456",
    },
    {
      id: "TXN_002",
      bookingId: "BK002",
      gateway: "Bakong NBC",
      amount: 2720000,
      currency: "KHR",
      status: "pending",
      method: "Bank Transfer",
      customer: "Sarah Johnson",
      date: new Date(Date.now() - 3600000),
      fees: 40800,
      reference: "BAKONG_REF_789012",
    },
    {
      id: "TXN_003",
      bookingId: "BK003",
      gateway: "ABA PayWay",
      amount: 320.0,
      currency: "USD",
      status: "failed",
      method: "Mobile Banking",
      customer: "Marcus Rodriguez",
      date: new Date(Date.now() - 7200000),
      fees: 0,
      reference: "ABA_REF_345678",
      error: "Insufficient funds",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "inactive":
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "inactive":
      case "failed":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === "KHR") {
      return `${amount.toLocaleString()} ៛`;
    }
    return `$${amount.toFixed(2)}`;
  };

  const handleToggleGateway = (gatewayId: string) => {
    setPaymentGateways((gateways) =>
      gateways.map((gateway) =>
        gateway.id === gatewayId
          ? {
              ...gateway,
              status: gateway.status === "active" ? "inactive" : "active",
            }
          : gateway,
      ),
    );
  };

  const handleDeleteGateway = (gatewayId: string) => {
    setPaymentGateways((gateways) =>
      gateways.filter((gateway) => gateway.id !== gatewayId),
    );
  };

  const totalTransactions = transactions.length;
  const completedTransactions = transactions.filter(
    (t) => t.status === "completed",
  ).length;
  const totalRevenue = transactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => {
      if (t.currency === "USD") return sum + t.amount;
      if (t.currency === "KHR") return sum + t.amount / 4000; // Rough conversion
      return sum;
    }, 0);
  const totalFees = transactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => {
      if (t.currency === "USD") return sum + t.fees;
      if (t.currency === "KHR") return sum + t.fees / 4000; // Rough conversion
      return sum;
    }, 0);

  return (
    <div className={`bg-[#0c0c14] text-white p-6 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#31e6ed] to-[#9d4edd]">
              Payment Integration
            </h2>
            <p className="text-gray-400">
              Manage payment gateways, transactions, and financial settings
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync All
            </Button>
            <Button className="bg-gradient-to-r from-[#31e6ed] to-[#9d4edd] hover:opacity-90">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Total Transactions",
            value: totalTransactions.toString(),
            icon: CreditCard,
            color: "text-[#31e6ed]",
          },
          {
            title: "Completed",
            value: completedTransactions.toString(),
            icon: CheckCircle,
            color: "text-green-400",
          },
          {
            title: "Total Revenue",
            value: `$${totalRevenue.toFixed(2)}`,
            icon: DollarSign,
            color: "text-[#9d4edd]",
          },
          {
            title: "Total Fees",
            value: `$${totalFees.toFixed(2)}`,
            icon: TrendingUp,
            color: "text-yellow-400",
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">{stat.title}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>
                        {stat.value}
                      </p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-900/50 border border-gray-800">
          <TabsTrigger
            value="gateways"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#31e6ed] data-[state=active]:to-[#9d4edd] data-[state=active]:text-white"
          >
            <Settings className="w-4 h-4 mr-2" />
            Payment Gateways
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#31e6ed] data-[state=active]:to-[#9d4edd] data-[state=active]:text-white"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Transactions
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#31e6ed] data-[state=active]:to-[#9d4edd] data-[state=active]:text-white"
          >
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Payment Gateways Tab */}
        <TabsContent value="gateways" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Settings className="w-5 h-5 mr-2 text-[#31e6ed]" />
                Payment Gateways
              </CardTitle>
              <Button
                onClick={() => setIsAddingGateway(true)}
                className="bg-gradient-to-r from-[#31e6ed] to-[#9d4edd] hover:opacity-90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Gateway
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentGateways.map((gateway, index) => (
                  <motion.div
                    key={gateway.id}
                    className="p-6 bg-gray-800/50 rounded-lg border border-gray-700"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{gateway.logo}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">
                              {gateway.name}
                            </h3>
                            <Badge className={getStatusColor(gateway.status)}>
                              {getStatusIcon(gateway.status)}
                              <span className="ml-1 capitalize">
                                {gateway.status}
                              </span>
                            </Badge>
                          </div>
                          <p className="text-gray-400 mb-3">
                            {gateway.description}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                Merchant ID
                              </p>
                              <p className="text-white font-mono text-sm">
                                {gateway.config.merchantId}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Environment
                              </p>
                              <p className="text-white capitalize">
                                {gateway.config.environment}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Currency</p>
                              <p className="text-white">
                                {gateway.config.currency}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Fees</p>
                              <p className="text-white">
                                {gateway.fees.percentage}% +{" "}
                                {formatCurrency(
                                  gateway.fees.fixed,
                                  gateway.fees.currency,
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-2">
                              Supported Features
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {gateway.features.map((feature) => (
                                <Badge
                                  key={feature}
                                  variant="outline"
                                  className="border-gray-600 text-gray-300"
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="text-sm text-gray-500">
                            Last synced:{" "}
                            {format(
                              gateway.lastSync,
                              "MMM d, yyyy 'at' h:mm a",
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={gateway.status === "active"}
                          onCheckedChange={() =>
                            handleToggleGateway(gateway.id)
                          }
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedGateway(gateway)}
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
                          onClick={() => handleDeleteGateway(gateway.id)}
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

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-[#31e6ed]" />
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-center">
                        {getStatusIcon(transaction.status)}
                        <Badge
                          className={`${getStatusColor(transaction.status)} text-xs mt-1`}
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-white">
                            {transaction.id}
                          </span>
                          <span className="text-sm text-gray-400">
                            • {transaction.bookingId}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {transaction.customer} • {transaction.gateway} •{" "}
                          {transaction.method}
                        </div>
                        <div className="text-xs text-gray-500">
                          {format(transaction.date, "MMM d, yyyy 'at' h:mm a")}
                        </div>
                        {transaction.error && (
                          <div className="text-xs text-red-400 mt-1">
                            Error: {transaction.error}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-white">
                        {formatCurrency(
                          transaction.amount,
                          transaction.currency,
                        )}
                      </div>
                      {transaction.fees > 0 && (
                        <div className="text-sm text-gray-400">
                          Fee:{" "}
                          {formatCurrency(
                            transaction.fees,
                            transaction.currency,
                          )}
                        </div>
                      )}
                      <div className="text-xs text-gray-500 mt-1">
                        Ref: {transaction.reference}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-[#31e6ed]" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">
                      Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-gray-500">
                      Add extra security to payment operations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">
                      Webhook Verification
                    </Label>
                    <p className="text-sm text-gray-500">
                      Verify webhook signatures
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">IP Whitelist</Label>
                    <p className="text-sm text-gray-500">
                      Restrict API access by IP
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Transaction Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Email alerts for large transactions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Key className="w-5 h-5 mr-2 text-[#31e6ed]" />
                  API Keys
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300">Production API Key</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      type="password"
                      value="pk_live_***************"
                      readOnly
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">Test API Key</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      type="password"
                      value="pk_test_***************"
                      readOnly
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#31e6ed] to-[#9d4edd] hover:opacity-90">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate Keys
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Gateway Dialog */}
      <Dialog open={isAddingGateway} onOpenChange={setIsAddingGateway}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Payment Gateway</DialogTitle>
            <DialogDescription className="text-gray-400">
              Configure a new payment gateway for your hotel booking system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Gateway Type</Label>
              <Select>
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue placeholder="Select payment gateway" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="aba">ABA PayWay</SelectItem>
                  <SelectItem value="bakong">Bakong NBC</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="wing">Wing Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Merchant ID</Label>
                <Input
                  placeholder="Enter merchant ID"
                  className="bg-gray-800/50 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Environment</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="sandbox">Sandbox</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-gray-300">API Key</Label>
              <Input
                type="password"
                placeholder="Enter API key"
                className="bg-gray-800/50 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Secret Key</Label>
              <Input
                type="password"
                placeholder="Enter secret key"
                className="bg-gray-800/50 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Webhook URL</Label>
              <Input
                placeholder="https://api.neonhorizon.com/webhooks/gateway"
                className="bg-gray-800/50 border-gray-700 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddingGateway(false)}
              className="border-gray-600 text-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setIsAddingGateway(false)}
              className="bg-gradient-to-r from-[#31e6ed] to-[#9d4edd]"
            >
              Add Gateway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentIntegration;
