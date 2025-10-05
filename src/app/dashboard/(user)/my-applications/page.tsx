"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Calendar, 
  Briefcase, 
  Clock, 
  Award, 
  X, 
  Filter,
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  DollarSign,
  Grid3x3,
  List,
  Plus
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {TooltipProvider} from "@/components/ui/tooltip";

interface Application {
  id: number;
  company: string;
  role: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  appliedDate: string;
  location: string;
  experience: string;
  jobType: string;
  priority: "High" | "Medium" | "Low";
  salary?: string;
  description?: string;
}

const initialApplications: Application[] = [
  {
    id: 1,
    company: "Google",
    role: "Frontend Developer",
    status: "Interview",
    appliedDate: "2025-09-15",
    location: "California, USA",
    experience: "2-3 years",
    jobType: "Full-time",
    priority: "High",
    salary: "$120k - $150k",
    description: "React, TypeScript, Next.js"
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Full Stack Developer",
    status: "Applied",
    appliedDate: "2025-09-12",
    location: "Remote",
    experience: "1-2 years",
    jobType: "Remote",
    priority: "Medium",
    salary: "$90k - $120k",
    description: "Node.js, React, Azure"
  },
  {
    id: 3,
    company: "Amazon",
    role: "Backend Engineer",
    status: "Rejected",
    appliedDate: "2025-08-28",
    location: "Seattle, USA",
    experience: "0-1 years",
    jobType: "Internship",
    priority: "Low",
    salary: "$80k - $100k",
    description: "AWS, Python, Docker"
  },
  {
    id: 4,
    company: "Meta",
    role: "UI/UX Designer",
    status: "Offer",
    appliedDate: "2025-09-20",
    location: "Menlo Park, USA",
    experience: "2-4 years",
    jobType: "Full-time",
    priority: "High",
    salary: "$110k - $140k",
    description: "Figma, Prototyping, User Research"
  },
];

const statusConfig: Record<Application["status"], { color: string; icon: React.ReactNode }> = {
  Applied: { 
    color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
    icon: <Briefcase className="h-3 w-3" />
  },
  Interview: { 
    color: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
    icon: <Clock className="h-3 w-3" />
  },
  Offer: { 
    color: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
    icon: <Award className="h-3 w-3" />
  },
  Rejected: { 
    color: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800",
    icon: <X className="h-3 w-3" />
  },
};

const priorityConfig: Record<Application["priority"], { color: string; dot: string }> = {
  High: { 
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    dot: "bg-red-500"
  },
  Medium: { 
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    dot: "bg-amber-500"
  },
  Low: { 
    color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    dot: "bg-gray-500"
  },
};

const companyColors = [
  "bg-gradient-to-br from-gray-900 to-black dark:from-gray-100 dark:to-white",
  "bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-100",
  "bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-300 dark:to-gray-200",
];

export default function EnhancedApplicationsTable() {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || app.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleStatusChange = (id: number, newStatus: Application["status"]) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const handleDelete = (id: number) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  const getStatusCount = (status: Application["status"]) => {
    return applications.filter(app => app.status === status).length;
  };

  const getCompanyColor = (index: number) => {
    return companyColors[index % companyColors.length];
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 rounded-lg">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Track Your Career Journey</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">Job Application Tracker</h1>
              <p className="text-muted-foreground text-lg">
                Organize and track your career opportunities in one centralized dashboard
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {(["Applied", "Interview", "Offer", "Rejected"] as const).map((status) => (
              <Card key={status} className="border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{status}</p>
                      <p className="text-3xl font-bold mt-1">
                        {getStatusCount(status)}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${statusConfig[status].color} border`}>
                      {statusConfig[status].icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <Card className="border bg-card">
            <CardHeader className="pb-4 border-b">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold">All Applications</CardTitle>
                  <CardDescription className="mt-1">
                    {filteredApplications.length} active {filteredApplications.length === 1 ? 'application' : 'applications'}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 bg-muted p-1 rounded-lg">
                    <Button 
                      variant={viewMode === "table" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("table")}
                      className="h-9 w-9 p-0"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="h-9 w-9 p-0"
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add New
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search companies or roles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Applied">Applied</SelectItem>
                      <SelectItem value="Interview">Interview</SelectItem>
                      <SelectItem value="Offer">Offer</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-[140px]">
                      <Award className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Grid View */}
              {viewMode === "grid" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredApplications.map((app, index) => (
                    <Card key={app.id} className="border bg-card hover:shadow-md transition-shadow group">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 ${getCompanyColor(index)} rounded-xl flex items-center justify-center text-white dark:text-black font-bold text-lg shadow-lg`}>
                            {app.company.charAt(0)}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(app.id)} className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg">{app.company}</h3>
                            <p className="text-sm text-muted-foreground">{app.role}</p>
                          </div>

                          <div className="flex gap-2">
                            <Badge variant="secondary" className={statusConfig[app.status].color}>
                              {app.status}
                            </Badge>
                            <Badge variant="secondary" className={priorityConfig[app.priority].color}>
                              {app.priority}
                            </Badge>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                              <span className="truncate">{app.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                              <span>{app.appliedDate}</span>
                            </div>
                            {app.salary && (
                              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                                <DollarSign className="h-3.5 w-3.5 flex-shrink-0" />
                                <span>{app.salary}</span>
                              </div>
                            )}
                          </div>

                          {app.description && (
                            <div className="flex flex-wrap gap-1 pt-2 border-t">
                              {app.description.split(', ').map((tech, i) => (
                                <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Table View */}
              {viewMode === "table" && (
                <div className="rounded-lg border overflow-hidden">
                  {/* Desktop Table */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-4 font-semibold text-sm">Company & Role</th>
                          <th className="text-left p-4 font-semibold text-sm">Details</th>
                          <th className="text-left p-4 font-semibold text-sm">Priority</th>
                          <th className="text-left p-4 font-semibold text-sm">Status</th>
                          <th className="text-right p-4 font-semibold text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {filteredApplications.map((app, index) => (
                          <tr key={app.id} className="hover:bg-muted/50 transition-colors group">
                            <td className="p-4">
                              <div className="flex items-start gap-3">
                                <div className={`w-12 h-12 ${getCompanyColor(index)} rounded-xl flex items-center justify-center text-white dark:text-black font-bold shadow-lg flex-shrink-0`}>
                                  {app.company.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-semibold">{app.company}</div>
                                  <div className="text-sm text-muted-foreground mt-0.5">{app.role}</div>
                                  {app.description && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {app.description.split(', ').map((tech, i) => (
                                        <span key={i} className="text-xs bg-muted px-2 py-0.5 rounded">
                                          {tech}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                                  <span className="truncate">{app.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                                  <span>{app.appliedDate}</span>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge variant="outline" className="text-xs">
                                    {app.jobType}
                                  </Badge>
                                  {app.salary && (
                                    <Badge variant="secondary" className="text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                                      {app.salary}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${priorityConfig[app.priority].dot}`} />
                                <Badge variant="secondary" className={priorityConfig[app.priority].color}>
                                  {app.priority}
                                </Badge>
                              </div>
                            </td>
                            <td className="p-4">
                              <Select
                                value={app.status}
                                onValueChange={(value) => handleStatusChange(app.id, value as Application["status"])}
                              >
                                <SelectTrigger className={`w-32 ${statusConfig[app.status].color} border`}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Applied">Applied</SelectItem>
                                  <SelectItem value="Interview">Interview</SelectItem>
                                  <SelectItem value="Offer">Offer</SelectItem>
                                  <SelectItem value="Rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="p-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <DropdownMenuItem className="cursor-pointer">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleDelete(app.id)} 
                                    className="cursor-pointer text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="lg:hidden divide-y">
                    {filteredApplications.map((app, index) => (
                      <div key={app.id} className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-12 h-12 ${getCompanyColor(index)} rounded-xl flex items-center justify-center text-white dark:text-black font-bold shadow-lg flex-shrink-0`}>
                            {app.company.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h3 className="font-semibold">{app.company}</h3>
                                <p className="text-sm text-muted-foreground">{app.role}</p>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleDelete(app.id)} 
                                    className="text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                            <span className="truncate">{app.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                            <span>{app.appliedDate}</span>
                          </div>
                          {app.salary && (
                            <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                              <DollarSign className="h-3.5 w-3.5 flex-shrink-0" />
                              <span>{app.salary}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary" className={statusConfig[app.status].color}>
                            {app.status}
                          </Badge>
                          <Badge variant="secondary" className={priorityConfig[app.priority].color}>
                            {app.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {app.jobType}
                          </Badge>
                        </div>

                        {app.description && (
                          <div className="flex flex-wrap gap-1">
                            {app.description.split(', ').map((tech, i) => (
                              <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredApplications.length === 0 && (
                <div className="text-center py-16 px-4 text-muted-foreground">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-8 w-8" />
                  </div>
                  <p className="text-lg font-semibold mb-2">No applications found</p>
                  <p className="text-sm">
                    {searchTerm || statusFilter !== "all" || priorityFilter !== "all" 
                      ? "Try adjusting your filters or search terms" 
                      : "Start by adding your first job application"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}