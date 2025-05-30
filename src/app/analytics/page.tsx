'use client'

import { Header } from '@/components/layout/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Calendar,
  Download,
  Filter,
  FileSpreadsheet,
  FileText
} from 'lucide-react'
import { generateAnalyticsReport, exportToCSV } from '@/lib/export-utils'
import { toast } from 'sonner'

export default function AnalyticsPage() {
  // Mock data - will be replaced with real data from Supabase
  const monthlyRevenue = [
    { month: 'Jan', revenue: 185000, orders: 45, target: 200000 },
    { month: 'Feb', revenue: 210000, orders: 52, target: 200000 },
    { month: 'Mar', revenue: 235000, orders: 58, target: 220000 },
    { month: 'Apr', revenue: 198000, orders: 48, target: 220000 },
    { month: 'May', revenue: 245800, orders: 62, target: 240000 },
  ]

  const distributorPerformance = [
    { name: 'West Coast Beverages', revenue: 45200, orders: 24, growth: 12, region: 'California' },
    { name: 'Mountain View Markets', revenue: 32800, orders: 18, growth: 8, region: 'Colorado' },
    { name: 'Pacific Distributors', revenue: 38900, orders: 22, growth: 15, region: 'Oregon' },
    { name: 'Urban Refresh Co.', revenue: 28400, orders: 15, growth: -3, region: 'Washington' },
    { name: 'Sierra Nevada Markets', revenue: 22100, orders: 12, growth: 25, region: 'Nevada' },
  ]

  const productSales = [
    { name: 'Blueberry Lemon', value: 45, color: '#ebcc68' },
    { name: 'Cherry Verbena', value: 30, color: '#e3d084' },
    { name: 'Plum Ginger', value: 25, color: '#cea49b' },
  ]

  const regionData = [
    { region: 'California', revenue: 89000, distributors: 8 },
    { region: 'Oregon', revenue: 67000, distributors: 5 },
    { region: 'Washington', revenue: 52000, distributors: 4 },
    { region: 'Colorado', revenue: 38000, distributors: 3 },
    { region: 'Nevada', revenue: 24000, distributors: 2 },
  ]

  const pipelineMetrics = [
    { stage: 'Lead', count: 2, value: 77000 },
    { stage: 'Contacted', count: 2, value: 93000 },
    { stage: 'Negotiation', count: 1, value: 89000 },
    { stage: 'Closed', count: 1, value: 125000 },
  ]

  const currentMonth = monthlyRevenue[monthlyRevenue.length - 1]
  const previousMonth = monthlyRevenue[monthlyRevenue.length - 2]
  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100).toFixed(1)
  const orderGrowth = ((currentMonth.orders - previousMonth.orders) / previousMonth.orders * 100).toFixed(1)

  // Export functions
  const handleExportRevenueTrend = () => {
    try {
      exportToCSV(monthlyRevenue, 'revenue_trend_report')
      toast.success('Revenue trend data exported successfully!')
    } catch (error) {
      toast.error('Failed to export revenue data')
    }
  }

  const handleExportDistributorPerformance = () => {
    try {
      const exportData = distributorPerformance.map(dist => ({
        'Distributor Name': dist.name,
        'Region': dist.region,
        'Revenue': `$${dist.revenue.toLocaleString()}`,
        'Orders': dist.orders,
        'Growth %': `${dist.growth}%`
      }))
      exportToCSV(exportData, 'distributor_performance_report')
      toast.success('Distributor performance data exported!')
    } catch (error) {
      toast.error('Failed to export distributor data')
    }
  }

  const handleExportRegionalData = () => {
    try {
      const exportData = regionData.map(region => ({
        'Region': region.region,
        'Revenue': `$${region.revenue.toLocaleString()}`,
        'Number of Distributors': region.distributors,
        'Average Revenue per Distributor': `$${Math.round(region.revenue / region.distributors).toLocaleString()}`
      }))
      exportToCSV(exportData, 'regional_performance_report')
      toast.success('Regional data exported successfully!')
    } catch (error) {
      toast.error('Failed to export regional data')
    }
  }

  const handleGeneratePDFReport = () => {
    try {
      const reportData = {
        metrics: {
          totalDistributors: distributorPerformance.length,
          monthlyRevenue: currentMonth.revenue,
          totalOrders: monthlyRevenue.reduce((sum, month) => sum + month.orders, 0),
          growthRate: revenueGrowth
        },
        distributors: distributorPerformance,
        orders: monthlyRevenue,
        revenue: monthlyRevenue
      }

      generateAnalyticsReport(reportData)
      toast.success('PDF report generated successfully!')
    } catch (error) {
      toast.error('Failed to generate PDF report')
    }
  }

  const handleExportAllData = () => {
    try {
      // Export comprehensive data set
      const comprehensiveData = {
        'Monthly Revenue': monthlyRevenue,
        'Distributor Performance': distributorPerformance,
        'Regional Data': regionData,
        'Pipeline Metrics': pipelineMetrics,
        'Product Sales': productSales
      }

      for (const [sheetName, data] of Object.entries(comprehensiveData)) {
        exportToCSV(data, `golden_grove_${sheetName.toLowerCase().replace(' ', '_')}`)
      }

      toast.success('All analytics data exported successfully!')
    } catch (error) {
      toast.error('Failed to export all data')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Analytics"
        subtitle="Insights and performance metrics for your distribution network."
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-grove-900">${currentMonth.revenue.toLocaleString()}</p>
                    <p className="text-sm text-grove-600">Monthly Revenue</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">+{revenueGrowth}%</span>
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-golden-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-grove-900">{currentMonth.orders}</p>
                    <p className="text-sm text-grove-600">Orders This Month</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">+{orderGrowth}%</span>
                    </div>
                  </div>
                  <Package className="w-8 h-8 text-golden-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-grove-900">{distributorPerformance.length}</p>
                    <p className="text-sm text-grove-600">Active Distributors</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">+2 this month</span>
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-golden-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-grove-900">98.2%</p>
                    <p className="text-sm text-grove-600">Target Achievement</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">Above target</span>
                    </div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-grove-900">Revenue Trend</CardTitle>
                    <CardDescription>Monthly revenue vs targets</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExportRevenueTrend}
                      className="flex items-center gap-1"
                    >
                      <FileSpreadsheet className="w-3 h-3" />
                      CSV
                    </Button>
                    <Select defaultValue="5months">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3months">3 Months</SelectItem>
                        <SelectItem value="5months">5 Months</SelectItem>
                        <SelectItem value="12months">12 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                    <XAxis dataKey="month" stroke="#6c757d" />
                    <YAxis stroke="#6c757d" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#ebcc68"
                      fill="#ebcc68"
                      fillOpacity={0.6}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#9cb2c2"
                      strokeDasharray="5 5"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Product Distribution */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-grove-900">Product Sales Distribution</CardTitle>
                    <CardDescription>Sales breakdown by product type</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportToCSV(productSales, 'product_sales_distribution')}
                    className="flex items-center gap-1"
                  >
                    <FileSpreadsheet className="w-3 h-3" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productSales}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {productSales.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {productSales.map((product) => (
                    <div key={product.name} className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: product.color }}
                        />
                        <span className="text-sm font-medium text-grove-900">{product.value}%</span>
                      </div>
                      <p className="text-xs text-grove-600">{product.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Distributors */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-grove-900">Top Distributors</CardTitle>
                    <CardDescription>Performance by revenue and growth</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportDistributorPerformance}
                    className="flex items-center gap-1"
                  >
                    <FileSpreadsheet className="w-3 h-3" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={distributorPerformance} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                    <XAxis type="number" stroke="#6c757d" />
                    <YAxis dataKey="name" type="category" width={120} stroke="#6c757d" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="revenue" fill="#ebcc68" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Regional Performance */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-grove-900">Regional Performance</CardTitle>
                    <CardDescription>Revenue by geographic region</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportRegionalData}
                    className="flex items-center gap-1"
                  >
                    <FileSpreadsheet className="w-3 h-3" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                    <XAxis dataKey="region" stroke="#6c757d" />
                    <YAxis stroke="#6c757d" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="revenue" fill="#e3d084" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pipeline Health */}
            <Card>
              <CardHeader>
                <CardTitle className="text-grove-900">Pipeline Health</CardTitle>
                <CardDescription>Deals by stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pipelineMetrics.map((stage) => (
                    <div key={stage.stage} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          stage.stage === 'Lead' ? 'bg-gray-400' :
                          stage.stage === 'Contacted' ? 'bg-blue-400' :
                          stage.stage === 'Negotiation' ? 'bg-orange-400' :
                          'bg-green-400'
                        }`} />
                        <span className="text-sm font-medium text-grove-900">{stage.stage}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-grove-900">{stage.count} deals</p>
                        <p className="text-xs text-grove-600">${stage.value.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Growth Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-grove-900">Growth Metrics</CardTitle>
                <CardDescription>Month-over-month changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-grove-600">Revenue Growth</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">+{revenueGrowth}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-grove-600">Order Volume</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">+{orderGrowth}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-grove-600">New Distributors</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">+2</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-grove-600">Avg Order Value</span>
                    <div className="flex items-center gap-1">
                      <TrendingDown className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-600">-2.1%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-grove-900">Export & Reports</CardTitle>
                <CardDescription>Download data and generate reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    onClick={handleGeneratePDFReport}
                    className="w-full justify-start gap-2 golden-gradient text-golden-900"
                  >
                    <FileText className="w-4 h-4" />
                    Generate PDF Report
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleExportAllData}
                    className="w-full justify-start gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export All Data (CSV)
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Calendar className="w-4 h-4" />
                    Schedule Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Filter className="w-4 h-4" />
                    Custom Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
