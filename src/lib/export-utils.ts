import Papa from 'papaparse'
// import jsPDF from 'jspdf' - Temporarily disabled for deployment
import type { Distributor, Order, Communication } from './types'

// CSV Export Functions
export const exportToCSV = (data: Record<string, unknown>[], filename: string) => {
  const csv = Papa.unparse(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export const exportDistributorsToCSV = (distributors: Distributor[]) => {
  const exportData = distributors.map(dist => ({
    'Company Name': dist.company_name,
    'Contact Person': dist.contact_person,
    'Email': dist.email,
    'Phone': dist.phone,
    'Address': dist.address,
    'Region': dist.region,
    'Type': dist.type,
    'Created Date': new Date(dist.created_at).toLocaleDateString(),
    'Last Updated': new Date(dist.updated_at).toLocaleDateString(),
    'Notes': dist.notes || ''
  }))

  exportToCSV(exportData, 'distributors_export')
}

export const exportOrdersToCSV = (orders: Order[]) => {
  const exportData = orders.map(order => ({
    'Order ID': order.id,
    'Product Type': order.product_type,
    'Quantity': order.quantity,
    'Status': order.status,
    'Order Date': order.order_date,
    'Shipped Date': order.shipped_date || 'Not shipped',
    'Delivered Date': order.delivered_date || 'Not delivered',
    'Total Amount': order.total_amount ? `$${order.total_amount}` : 'N/A',
    'Created': new Date(order.created_at).toLocaleDateString()
  }))

  exportToCSV(exportData, 'orders_export')
}

export const exportCommunicationsToCSV = (communications: Communication[]) => {
  const exportData = communications.map(comm => ({
    'Date': comm.date,
    'Type': comm.type,
    'Summary': comm.summary,
    'Follow-up Date': comm.follow_up_date || 'No follow-up',
    'Created': new Date(comm.created_at).toLocaleDateString()
  }))

  exportToCSV(exportData, 'communications_export')
}

// Types for analytics data
interface AnalyticsMetrics {
  totalDistributors: number
  monthlyRevenue: number
  totalOrders: number
  growthRate: string
}

interface DistributorSummary {
  name: string
  revenue: number
  orders: number
  growth: number
  region: string
}

interface MonthlyData {
  month: string
  revenue: number
  orders: number
  target?: number
}

// PDF Report Generation - Temporarily disabled
export const generateAnalyticsReport = (data: {
  metrics: AnalyticsMetrics,
  distributors: DistributorSummary[],
  orders: MonthlyData[],
  revenue: MonthlyData[]
}) => {
  // TODO: Re-enable PDF generation after deployment
  console.log('PDF generation temporarily disabled for deployment')

  // For now, export as comprehensive CSV instead
  const reportData = {
    'Summary': [
      {
        'Metric': 'Total Distributors',
        'Value': data.metrics.totalDistributors,
        'Type': 'Count'
      },
      {
        'Metric': 'Monthly Revenue',
        'Value': `$${data.metrics.monthlyRevenue.toLocaleString()}`,
        'Type': 'Currency'
      },
      {
        'Metric': 'Total Orders',
        'Value': data.metrics.totalOrders,
        'Type': 'Count'
      },
      {
        'Metric': 'Growth Rate',
        'Value': `${data.metrics.growthRate}%`,
        'Type': 'Percentage'
      }
    ]
  }

  exportToCSV(reportData.Summary, 'golden_grove_analytics_report')
}

// Excel-style export with better formatting
export const exportAdvancedCSV = (data: Record<string, unknown>[], filename: string, customHeaders?: string[]) => {
  const headers = customHeaders || Object.keys(data[0] || {})
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header]
        // Handle special characters and commas in data
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value || ''
      }).join(',')
    )
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

// Date range filtering for exports
export const filterDataByDateRange = (data: Record<string, unknown>[], startDate: string, endDate: string, dateField = 'created_at') => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  return data.filter(item => {
    const itemDate = new Date(item[dateField] as string)
    return itemDate >= start && itemDate <= end
  })
}
