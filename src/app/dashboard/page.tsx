import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Clock,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

export default function DashboardPage() {
  // Mock data - will be replaced with real data from Supabase
  const metrics = {
    totalDistributors: 127,
    activeOrders: 34,
    monthlyRevenue: 245800,
    pipelineValue: 180000,
    newLeads: 12,
    pendingFollowUps: 8,
  };

  const recentOrders = [
    {
      id: "1",
      distributor: "West Coast Beverages",
      product: "Blueberry Lemon 4-Pack",
      quantity: 150,
      status: "shipped",
      date: "2025-05-28",
    },
    {
      id: "2",
      distributor: "Mountain View Markets",
      product: "Cherry Verbena 4-Pack",
      quantity: 200,
      status: "pending",
      date: "2025-05-28",
    },
    {
      id: "3",
      distributor: "Urban Refresh Co.",
      product: "Plum Ginger 4-Pack",
      quantity: 100,
      status: "delivered",
      date: "2025-05-27",
    },
    {
      id: "4",
      distributor: "Pacific Distributors",
      product: "Blueberry Lemon 4-Pack",
      quantity: 300,
      status: "shipped",
      date: "2025-05-27",
    },
  ];

  const topDistributors = [
    {
      name: "West Coast Beverages",
      region: "California",
      orders: 24,
      revenue: 45200,
    },
    {
      name: "Mountain View Markets",
      region: "Colorado",
      orders: 18,
      revenue: 32800,
    },
    {
      name: "Pacific Distributors",
      region: "Oregon",
      orders: 22,
      revenue: 38900,
    },
    {
      name: "Urban Refresh Co.",
      region: "Washington",
      orders: 15,
      revenue: 28400,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your business."
      />

      <div className="flex-1 overflow-auto p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-grove-700">
                Total Distributors
              </CardTitle>
              <Building2 className="h-4 w-4 text-grove-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-grove-900">
                {metrics.totalDistributors}
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3" />
                +12% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-grove-700">
                Active Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-grove-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-grove-900">
                {metrics.activeOrders}
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3" />
                +8% from yesterday
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-grove-700">
                Monthly Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-grove-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-grove-900">
                ${metrics.monthlyRevenue.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3" />
                +23% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-grove-700">
                Pipeline Value
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-grove-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-grove-900">
                ${metrics.pipelineValue.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-xs text-red-600">
                <ArrowDownRight className="h-3 w-3" />
                -3% this week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-grove-700">
                New Leads
              </CardTitle>
              <Users className="h-4 w-4 text-grove-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-grove-900">
                {metrics.newLeads}
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3" />
                +4 this week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-grove-700">
                Follow-ups
              </CardTitle>
              <Clock className="h-4 w-4 text-grove-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-grove-900">
                {metrics.pendingFollowUps}
              </div>
              <div className="text-xs text-grove-600">Due today</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="text-grove-900">Recent Orders</CardTitle>
              <CardDescription>
                Latest orders from your distributors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 border border-grove-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-grove-900">
                        {order.distributor}
                      </p>
                      <p className="text-sm text-grove-600">{order.product}</p>
                      <p className="text-xs text-grove-500">
                        {order.quantity} units • {order.date}
                      </p>
                    </div>
                    <Badge
                      variant={
                        order.status === "delivered"
                          ? "default"
                          : order.status === "shipped"
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : order.status === "shipped"
                            ? "bg-golden-100 text-golden-800 hover:bg-golden-100"
                            : "border-orange-200 text-orange-600"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Distributors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-grove-900">Top Distributors</CardTitle>
              <CardDescription>
                Best performing partners this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDistributors.map((distributor, index) => (
                  <div
                    key={distributor.name}
                    className="flex items-center justify-between p-3 border border-grove-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-golden-400 text-golden-900 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-grove-900">
                          {distributor.name}
                        </p>
                        <p className="text-sm text-grove-600">
                          {distributor.region}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-grove-900">
                        ${distributor.revenue.toLocaleString()}
                      </p>
                      <p className="text-sm text-grove-600">
                        {distributor.orders} orders
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
