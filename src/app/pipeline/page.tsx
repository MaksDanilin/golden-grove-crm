"use client";

import { Header } from "@/components/layout/header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  Calendar,
  DollarSign,
  Edit,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Plus,
  Trash2,
  TrendingUp,
  User,
} from "lucide-react";
import { useState } from "react";

export default function PipelinePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data - will be replaced with real data from Supabase
  const pipelineData = {
    Lead: [
      {
        id: "1",
        company_name: "Sierra Nevada Markets",
        contact_person: "James Peterson",
        email: "james@sierramarkets.com",
        phone: "(555) 678-9012",
        region: "Nevada",
        value: 45000,
        assigned_rep: "Sarah Johnson",
        created_at: "2025-05-20",
        notes:
          "Interested in wholesale distribution for northern Nevada region.",
      },
      {
        id: "2",
        company_name: "Desert Springs Distribution",
        contact_person: "Maria Gonzalez",
        email: "maria@desertsprings.com",
        phone: "(555) 789-0123",
        region: "Arizona",
        value: 32000,
        assigned_rep: "Mike Chen",
        created_at: "2025-05-22",
        notes: "Looking for premium beverage options for luxury resorts.",
      },
    ],
    Contacted: [
      {
        id: "3",
        company_name: "Mountain Peak Beverages",
        contact_person: "Robert Kim",
        email: "robert@mountainpeak.com",
        phone: "(555) 890-1234",
        region: "Utah",
        value: 28000,
        assigned_rep: "Sarah Johnson",
        created_at: "2025-05-18",
        notes: "Had initial call, scheduling follow-up demo next week.",
      },
      {
        id: "4",
        company_name: "Coastal Fresh Foods",
        contact_person: "Jennifer White",
        email: "jennifer@coastalfresh.com",
        phone: "(555) 901-2345",
        region: "California",
        value: 65000,
        assigned_rep: "Mike Chen",
        created_at: "2025-05-15",
        notes: "Sent product samples, awaiting feedback on flavors.",
      },
    ],
    Negotiation: [
      {
        id: "5",
        company_name: "Northwest Natural Foods",
        contact_person: "Daniel Brown",
        email: "daniel@nwnaturalfoods.com",
        phone: "(555) 012-3456",
        region: "Washington",
        value: 89000,
        assigned_rep: "Sarah Johnson",
        created_at: "2025-05-10",
        notes: "Negotiating volume discounts and exclusive regional rights.",
      },
    ],
    Closed: [
      {
        id: "6",
        company_name: "Golden State Markets",
        contact_person: "Susan Davis",
        email: "susan@goldenstatemarkets.com",
        phone: "(555) 123-4567",
        region: "California",
        value: 125000,
        assigned_rep: "Mike Chen",
        created_at: "2025-05-08",
        notes: "Contract signed! First order scheduled for next month.",
      },
    ],
  };

  const stages = ["Lead", "Contacted", "Negotiation", "Closed"] as const;
  type Stage = (typeof stages)[number];

  const getStageColor = (stage: Stage) => {
    switch (stage) {
      case "Lead":
        return "bg-gray-100 border-gray-200";
      case "Contacted":
        return "bg-blue-50 border-blue-200";
      case "Negotiation":
        return "bg-orange-50 border-orange-200";
      case "Closed":
        return "bg-green-50 border-green-200";
    }
  };

  const getStageHeaderColor = (stage: Stage) => {
    switch (stage) {
      case "Lead":
        return "text-gray-700";
      case "Contacted":
        return "text-blue-700";
      case "Negotiation":
        return "text-orange-700";
      case "Closed":
        return "text-green-700";
    }
  };

  const getTotalValue = (deals: (typeof pipelineData)[Stage]) => {
    return deals.reduce((sum, deal) => sum + deal.value, 0);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Sales Pipeline"
        subtitle="Track leads and opportunities through your sales process."
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Pipeline Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stages.map((stage) => {
              const deals = pipelineData[stage];
              const count = deals.length;
              const value = getTotalValue(deals);

              return (
                <Card key={stage}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-grove-900">
                          {count}
                        </p>
                        <p className="text-sm text-grove-600">{stage}</p>
                        <p className="text-xs text-grove-500 mt-1">
                          ${value.toLocaleString()}
                        </p>
                      </div>
                      <div
                        className={`w-3 h-12 rounded-full ${
                          stage === "Lead"
                            ? "bg-gray-400"
                            : stage === "Contacted"
                              ? "bg-blue-400"
                              : stage === "Negotiation"
                                ? "bg-orange-400"
                                : "bg-green-400"
                        }`}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Pipeline Board */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-grove-900">
                    Sales Pipeline Board
                  </CardTitle>
                  <CardDescription>
                    Drag and drop deals to update their status
                  </CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="golden-gradient hover:bg-golden-500 text-golden-900">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Lead
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Add New Lead</DialogTitle>
                      <DialogDescription>
                        Create a new sales opportunity in your pipeline.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="company">Company Name</Label>
                          <Input id="company" placeholder="Acme Distribution" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="contact">Contact Person</Label>
                          <Input id="contact" placeholder="John Smith" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@acme.com"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" placeholder="(555) 123-4567" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="region">Region</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select region" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="california">
                                California
                              </SelectItem>
                              <SelectItem value="oregon">Oregon</SelectItem>
                              <SelectItem value="washington">
                                Washington
                              </SelectItem>
                              <SelectItem value="nevada">Nevada</SelectItem>
                              <SelectItem value="arizona">Arizona</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="value">Estimated Value</Label>
                          <Input id="value" type="number" placeholder="50000" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="assigned">Assigned Rep</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sales rep" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sarah">Sarah Johnson</SelectItem>
                            <SelectItem value="mike">Mike Chen</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          placeholder="Initial conversation notes..."
                          className="resize-none"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="golden-gradient text-golden-900"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Add Lead
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stages.map((stage) => (
                  <div
                    key={stage}
                    className={`rounded-lg border-2 border-dashed p-4 min-h-[600px] ${getStageColor(stage)}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className={`font-semibold ${getStageHeaderColor(stage)}`}
                      >
                        {stage}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {pipelineData[stage].length}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      {pipelineData[stage].map((deal) => (
                        <Card
                          key={deal.id}
                          className="cursor-move hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium text-grove-900 text-sm">
                                    {deal.company_name}
                                  </h4>
                                  <p className="text-xs text-grove-600">
                                    {deal.contact_person}
                                  </p>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="w-6 h-6 p-0"
                                    >
                                      <MoreHorizontal className="w-3 h-3" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem className="flex items-center gap-2 text-xs">
                                      <Edit className="w-3 h-3" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2 text-xs text-red-600">
                                      <Trash2 className="w-3 h-3" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <DollarSign className="w-3 h-3 text-green-600" />
                                  <span className="text-sm font-medium text-grove-900">
                                    ${deal.value.toLocaleString()}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <MapPin className="w-3 h-3 text-grove-500" />
                                  <span className="text-xs text-grove-600">
                                    {deal.region}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Mail className="w-3 h-3 text-grove-500" />
                                  <span className="text-xs text-grove-600">
                                    {deal.email}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Phone className="w-3 h-3 text-grove-500" />
                                  <span className="text-xs text-grove-600">
                                    {deal.phone}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-2 border-t border-grove-200">
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-6 h-6">
                                    <AvatarFallback className="bg-golden-400 text-golden-900 text-xs">
                                      {getInitials(deal.assigned_rep)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs text-grove-600">
                                    {deal.assigned_rep}
                                  </span>
                                </div>
                                <span className="text-xs text-grove-500">
                                  {deal.created_at}
                                </span>
                              </div>

                              {deal.notes && (
                                <div className="bg-grove-50 rounded p-2">
                                  <p className="text-xs text-grove-700 line-clamp-2">
                                    {deal.notes}
                                  </p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
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
