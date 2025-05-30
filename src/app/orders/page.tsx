"use client";

import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  Edit,
  Eye,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  TrendingUp,
  Truck,
} from "lucide-react";

export default function OrdersPage() {
  // Mock data - will be replaced with real data from Supabase
  const orders = [
    {
      id: "ORD-001",
      distributor: "West Coast Beverages",
      distributor_id: "1",
      product_type: "Blueberry Lemon 4-Pack",
      quantity: 150,
      status: "shipped",
      order_date: "2025-05-28",
      shipped_date: "2025-05-29",
      delivered_date: null,
      total_amount: 4200,
      region: "California",
    },
    {
      id: "ORD-002",
      distributor: "Mountain View Markets",
      distributor_id: "2",
      product_type: "Cherry Verbena 4-Pack",
      quantity: 200,
      status: "pending",
      order_date: "2025-05-28",
      shipped_date: null,
      delivered_date: null,
      total_amount: 5600,
      region: "Colorado",
    },
    {
      id: "ORD-003",
      distributor: "Urban Refresh Co.",
      distributor_id: "4",
      product_type: "Plum Ginger 4-Pack",
      quantity: 100,
      status: "delivered",
      order_date: "2025-05-27",
      shipped_date: "2025-05-28",
      delivered_date: "2025-05-29",
      total_amount: 2800,
      region: "Washington",
    },
    {
      id: "ORD-004",
      distributor: "Pacific Distributors",
      distributor_id: "3",
      product_type: "Blueberry Lemon 4-Pack",
      quantity: 300,
      status: "shipped",
      order_date: "2025-05-27",
      shipped_date: "2025-05-28",
      delivered_date: null,
      total_amount: 8400,
      region: "Oregon",
    },
    {
      id: "ORD-005",
      distributor: "West Coast Beverages",
      distributor_id: "1",
      product_type: "Cherry Verbena 4-Pack",
      quantity: 175,
      status: "pending",
      order_date: "2025-05-29",
      shipped_date: null,
      delivered_date: null,
      total_amount: 4900,
      region: "California",
    },
  ];

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const shippedOrders = orders.filter((o) => o.status === "shipped").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.total_amount,
    0,
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "border-orange-200 text-orange-600";
      case "shipped":
        return "bg-golden-100 text-golden-800 hover:bg-golden-100";
      case "delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "border-grove-200 text-grove-600";
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Orders"
        subtitle="Track and manage all distributor orders and shipments."
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Package className="h-8 w-8 text-golden-500" />
                  <div>
                    <p className="text-2xl font-bold text-grove-900">
                      {totalOrders}
                    </p>
                    <p className="text-sm text-grove-600">Total Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold text-grove-900">
                      {pendingOrders}
                    </p>
                    <p className="text-sm text-grove-600">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Truck className="h-8 w-8 text-golden-500" />
                  <div>
                    <p className="text-2xl font-bold text-grove-900">
                      {shippedOrders}
                    </p>
                    <p className="text-sm text-grove-600">Shipped</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-grove-900">
                      {deliveredOrders}
                    </p>
                    <p className="text-sm text-grove-600">Delivered</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-grove-900">
                      ${totalRevenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-grove-600">Total Value</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-grove-900">
                    Order Management
                  </CardTitle>
                  <CardDescription>
                    Track all orders from placement to delivery
                  </CardDescription>
                </div>
                <Button className="golden-gradient hover:bg-golden-500 text-golden-900">
                  <Plus className="w-4 h-4 mr-2" />
                  New Order
                </Button>
              </div>

              <div className="flex gap-4 pt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-grove-500" />
                  <Input placeholder="Search orders..." className="pl-9" />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="blueberry">Blueberry Lemon</SelectItem>
                    <SelectItem value="cherry">Cherry Verbena</SelectItem>
                    <SelectItem value="plum">Plum Ginger</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Distributor</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="w-12" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-grove-50">
                      <TableCell>
                        <span className="font-mono text-sm font-medium text-grove-900">
                          {order.id}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-grove-900">
                            {order.distributor}
                          </p>
                          <p className="text-sm text-grove-600">
                            {order.region}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-golden-100 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-golden-600" />
                          </div>
                          <span className="font-medium text-grove-900">
                            {order.product_type}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-grove-900">
                          {order.quantity} units
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "delivered" ? "default" : "outline"
                          }
                          className={`flex items-center gap-1 w-fit ${getStatusColor(order.status)}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm text-grove-900">
                            {order.order_date}
                          </p>
                          {order.shipped_date && (
                            <p className="text-xs text-grove-600">
                              Shipped: {order.shipped_date}
                            </p>
                          )}
                          {order.delivered_date && (
                            <p className="text-xs text-green-600">
                              Delivered: {order.delivered_date}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-grove-900">
                          ${order.total_amount.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-8 h-8 p-0"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Edit className="w-4 h-4" />
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Download className="w-4 h-4" />
                              Download Invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
