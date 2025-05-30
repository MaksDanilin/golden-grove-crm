'use client'

import { Header } from '@/components/layout/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Plus,
  Search,
  Filter,
  Building2,
  Mail,
  Phone,
  MapPin,
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  Download,
  FileSpreadsheet
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { exportDistributorsToCSV, exportToCSV } from '@/lib/export-utils'
import { toast } from 'sonner'

export default function DistributorsPage() {
  // Mock data - will be replaced with real data from Supabase
  const distributors = [
    {
      id: '1',
      company_name: 'West Coast Beverages',
      contact_person: 'Michael Chen',
      email: 'michael@westcoastbev.com',
      phone: '(555) 123-4567',
      region: 'California',
      type: 'Wholesaler',
      address: '123 Market St, San Francisco, CA 94102',
      assigned_rep_id: '1',
      last_order: '2025-05-28',
      total_orders: 24,
      status: 'Active',
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2025-05-28T00:00:00Z',
      notes: 'Excellent partner, consistently high volume orders'
    },
    {
      id: '2',
      company_name: 'Mountain View Markets',
      contact_person: 'Sarah Williams',
      email: 'sarah@mvmarkets.com',
      phone: '(555) 234-5678',
      region: 'Colorado',
      type: 'Retailer',
      address: '456 Pine Ave, Denver, CO 80202',
      assigned_rep_id: '2',
      last_order: '2025-05-27',
      total_orders: 18,
      status: 'Active',
      created_at: '2024-02-20T00:00:00Z',
      updated_at: '2025-05-27T00:00:00Z',
      notes: 'Growing chain, potential for expansion'
    },
    {
      id: '3',
      company_name: 'Pacific Distributors',
      contact_person: 'David Rodriguez',
      email: 'david@pacificdist.com',
      phone: '(555) 345-6789',
      region: 'Oregon',
      type: 'Wholesaler',
      address: '789 Oak Blvd, Portland, OR 97205',
      assigned_rep_id: '1',
      last_order: '2025-05-26',
      total_orders: 22,
      status: 'Active',
      created_at: '2024-01-10T00:00:00Z',
      updated_at: '2025-05-26T00:00:00Z',
      notes: 'Long-term partner, seasonal order patterns'
    },
    {
      id: '4',
      company_name: 'Urban Refresh Co.',
      contact_person: 'Lisa Johnson',
      email: 'lisa@urbanrefresh.com',
      phone: '(555) 456-7890',
      region: 'Washington',
      type: 'Retailer',
      address: '321 Cedar St, Seattle, WA 98101',
      assigned_rep_id: '2',
      last_order: '2025-05-25',
      total_orders: 15,
      status: 'Lead',
      created_at: '2025-05-01T00:00:00Z',
      updated_at: '2025-05-25T00:00:00Z',
      notes: 'New lead, interested in premium products'
    },
  ]

  // Export functions
  const handleExportAll = () => {
    try {
      exportDistributorsToCSV(distributors)
      toast.success('All distributors exported successfully!')
    } catch (error) {
      toast.error('Failed to export distributors')
    }
  }

  const handleExportFiltered = () => {
    try {
      // For demo purposes, export active distributors only
      const activeDistributors = distributors.filter(d => d.status === 'Active')
      exportDistributorsToCSV(activeDistributors)
      toast.success('Active distributors exported successfully!')
    } catch (error) {
      toast.error('Failed to export filtered data')
    }
  }

  const handleExportSummary = () => {
    try {
      const summaryData = distributors.map(dist => ({
        'Company': dist.company_name,
        'Region': dist.region,
        'Type': dist.type,
        'Status': dist.status,
        'Total Orders': dist.total_orders,
        'Last Order': dist.last_order
      }))
      exportToCSV(summaryData, 'distributors_summary')
      toast.success('Distributor summary exported!')
    } catch (error) {
      toast.error('Failed to export summary')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Distributors"
        subtitle="Manage your distribution partners and track their performance."
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Building2 className="h-8 w-8 text-golden-500" />
                  <div>
                    <p className="text-2xl font-bold text-grove-900">{distributors.length}</p>
                    <p className="text-sm text-grove-600">Total Distributors</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <div className="h-3 w-3 bg-green-500 rounded-full" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-grove-900">
                      {distributors.filter(d => d.status === 'Active').length}
                    </p>
                    <p className="text-sm text-grove-600">Active Partners</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <div className="h-3 w-3 bg-orange-500 rounded-full" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-grove-900">
                      {distributors.filter(d => d.status === 'Lead').length}
                    </p>
                    <p className="text-sm text-grove-600">New Leads</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="h-3 w-3 bg-blue-500 rounded-full" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-grove-900">4</p>
                    <p className="text-sm text-grove-600">Regions Covered</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Actions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-grove-900">Distributor Directory</CardTitle>
                  <CardDescription>Comprehensive list of all distribution partners</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleExportAll} className="flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4" />
                        All Distributors (CSV)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleExportFiltered} className="flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4" />
                        Active Only (CSV)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleExportSummary} className="flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4" />
                        Summary Report (CSV)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button className="golden-gradient hover:bg-golden-500 text-golden-900">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Distributor
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-grove-500" />
                  <Input
                    placeholder="Search distributors..."
                    className="pl-9"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="california">California</SelectItem>
                    <SelectItem value="colorado">Colorado</SelectItem>
                    <SelectItem value="oregon">Oregon</SelectItem>
                    <SelectItem value="washington">Washington</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="wholesaler">Wholesaler</SelectItem>
                    <SelectItem value="retailer">Retailer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead className="w-12" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {distributors.map((distributor) => (
                    <TableRow key={distributor.id} className="hover:bg-grove-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-golden-100 rounded-lg flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-golden-600" />
                          </div>
                          <div>
                            <p className="font-medium text-grove-900">{distributor.company_name}</p>
                            <p className="text-sm text-grove-600 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {distributor.address.split(',')[0]}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-grove-900">{distributor.contact_person}</p>
                          <div className="flex flex-col gap-1 mt-1">
                            <p className="text-sm text-grove-600 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {distributor.email}
                            </p>
                            <p className="text-sm text-grove-600 flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {distributor.phone}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-grove-300 text-grove-700">
                          {distributor.region}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={distributor.type === 'Wholesaler' ? 'default' : 'secondary'}
                          className={distributor.type === 'Wholesaler' ?
                            'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                            'bg-green-100 text-green-800 hover:bg-green-100'
                          }
                        >
                          {distributor.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-grove-900">{distributor.total_orders}</span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={distributor.status === 'Active' ? 'default' : 'outline'}
                          className={distributor.status === 'Active' ?
                            'bg-green-100 text-green-800 hover:bg-green-100' :
                            'border-orange-200 text-orange-600'
                          }
                        >
                          {distributor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-grove-600">{distributor.last_order}</span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
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
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                              <Trash2 className="w-4 h-4" />
                              Delete
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
  )
}
