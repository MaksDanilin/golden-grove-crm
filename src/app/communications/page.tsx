"use client";

import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import {
  AlertCircle,
  Building2,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Filter,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function CommunicationsPage() {
  const [date, setDate] = useState<Date>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data - will be replaced with real data from Supabase
  const communications = [
    {
      id: "1",
      distributor: "West Coast Beverages",
      distributor_id: "1",
      user: "Sarah Johnson",
      type: "email",
      date: "2025-05-29",
      summary:
        "Discussed Q2 order projections and new product line introduction. Positive response to Cherry Verbena flavor.",
      follow_up_date: "2025-06-05",
      status: "pending",
      tags: ["product-launch", "q2-planning"],
    },
    {
      id: "2",
      distributor: "Mountain View Markets",
      distributor_id: "2",
      user: "Mike Chen",
      type: "call",
      date: "2025-05-28",
      summary:
        "Weekly check-in call. Discussed delivery schedule adjustments for Memorial Day weekend.",
      follow_up_date: null,
      status: "completed",
      tags: ["logistics", "scheduling"],
    },
    {
      id: "3",
      distributor: "Pacific Distributors",
      distributor_id: "3",
      user: "Sarah Johnson",
      type: "meeting",
      date: "2025-05-27",
      summary:
        "In-person meeting at their Portland facility. Toured warehouse and discussed capacity expansion.",
      follow_up_date: "2025-06-10",
      status: "pending",
      tags: ["expansion", "partnership"],
    },
    {
      id: "4",
      distributor: "Urban Refresh Co.",
      distributor_id: "4",
      user: "Mike Chen",
      type: "email",
      date: "2025-05-26",
      summary:
        "Payment confirmation for recent order. Requested marketing materials for new store locations.",
      follow_up_date: "2025-05-30",
      status: "overdue",
      tags: ["marketing", "payment"],
    },
    {
      id: "5",
      distributor: "West Coast Beverages",
      distributor_id: "1",
      user: "Sarah Johnson",
      type: "call",
      date: "2025-05-25",
      summary:
        "Resolved shipping issue with damaged units. Arranged replacement shipment.",
      follow_up_date: null,
      status: "completed",
      tags: ["support", "logistics"],
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="w-4 h-4" />;
      case "call":
        return <Phone className="w-4 h-4" />;
      case "meeting":
        return <Users className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "email":
        return "bg-blue-100 text-blue-800";
      case "call":
        return "bg-green-100 text-green-800";
      case "meeting":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-golden-100 text-golden-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const pendingFollowUps = communications.filter(
    (c) => c.status === "pending",
  ).length;
  const overdueFollowUps = communications.filter(
    (c) => c.status === "overdue",
  ).length;
  const todaysActivities = communications.filter(
    (c) => c.date === "2025-05-29",
  ).length;

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Communications"
        subtitle="Track all interactions with distributors and manage follow-ups."
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-8 w-8 text-golden-500" />
                  <div>
                    <p className="text-2xl font-bold text-grove-900">
                      {communications.length}
                    </p>
                    <p className="text-sm text-grove-600">
                      Total Communications
                    </p>
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
                      {pendingFollowUps}
                    </p>
                    <p className="text-sm text-grove-600">Pending Follow-ups</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold text-grove-900">
                      {overdueFollowUps}
                    </p>
                    <p className="text-sm text-grove-600">Overdue</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-grove-900">
                      {todaysActivities}
                    </p>
                    <p className="text-sm text-grove-600">Today's Activities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Communications Timeline */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-grove-900">
                    Communication Timeline
                  </CardTitle>
                  <CardDescription>
                    All interactions with distributors in chronological order
                  </CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="golden-gradient hover:bg-golden-500 text-golden-900">
                      <Plus className="w-4 h-4 mr-2" />
                      Log Communication
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Log New Communication</DialogTitle>
                      <DialogDescription>
                        Record a new interaction with a distributor.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="distributor">Distributor</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select distributor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">
                              West Coast Beverages
                            </SelectItem>
                            <SelectItem value="2">
                              Mountain View Markets
                            </SelectItem>
                            <SelectItem value="3">
                              Pacific Distributors
                            </SelectItem>
                            <SelectItem value="4">Urban Refresh Co.</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="type">Communication Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="call">Phone Call</SelectItem>
                            <SelectItem value="meeting">Meeting</SelectItem>
                            <SelectItem value="text">Text Message</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? (
                                format(date, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="summary">Summary</Label>
                        <Textarea
                          id="summary"
                          placeholder="Describe the communication..."
                          className="resize-none"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="followup">
                          Follow-up Date (Optional)
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              <span>Pick a follow-up date</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" initialFocus />
                          </PopoverContent>
                        </Popover>
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
                        Save Communication
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex gap-4 pt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-grove-500" />
                  <Input
                    placeholder="Search communications..."
                    className="pl-9"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="call">Phone Call</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                {communications.map((comm, index) => (
                  <div key={comm.id} className="relative">
                    {index !== communications.length - 1 && (
                      <div className="absolute left-6 top-12 w-px h-16 bg-grove-200" />
                    )}

                    <div className="flex gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(comm.type)}`}
                      >
                        {getTypeIcon(comm.type)}
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-grove-900">
                                {comm.distributor}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {comm.type}
                              </Badge>
                              {comm.follow_up_date && (
                                <Badge className={getStatusColor(comm.status)}>
                                  {comm.status}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-grove-600">
                              by {comm.user} • {comm.date}
                            </p>
                          </div>
                        </div>

                        <div className="bg-grove-50 rounded-lg p-4">
                          <p className="text-grove-900">{comm.summary}</p>

                          {comm.tags && comm.tags.length > 0 && (
                            <div className="flex gap-2 mt-3">
                              {comm.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs bg-white"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {comm.follow_up_date && (
                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-grove-200">
                              <Clock className="w-4 h-4 text-grove-500" />
                              <span className="text-sm text-grove-600">
                                Follow-up scheduled for {comm.follow_up_date}
                              </span>
                              {comm.status === "pending" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="ml-auto"
                                >
                                  Mark Complete
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
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
