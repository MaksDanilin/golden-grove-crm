// Database types for Golden Grove CRM

export type User = {
  id: string;
  email: string;
  full_name: string;
  role: "admin" | "sales_rep";
  created_at: string;
};

export type Distributor = {
  id: string;
  company_name: string;
  contact_person: string;
  address: string;
  phone: string;
  email: string;
  region: string;
  type: string;
  assigned_rep_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: string;
  distributor_id: string;
  product_type: string;
  quantity: number;
  status: "pending" | "shipped" | "delivered";
  order_date: string;
  shipped_date: string | null;
  delivered_date: string | null;
  total_amount: number | null;
  created_at: string;
};

export type Communication = {
  id: string;
  distributor_id: string;
  user_id: string;
  type: string;
  date: string;
  summary: string;
  follow_up_date: string | null;
  created_at: string;
};

export type Pipeline = {
  id: string;
  distributor_id: string;
  stage: "Lead" | "Contacted" | "Negotiation" | "Closed";
  assigned_rep_id: string | null;
  value: number | null;
  created_at: string;
  updated_at: string;
};

export type Note = {
  id: string;
  distributor_id: string;
  user_id: string;
  content: string;
  created_at: string;
};

// Extended types with relations
export type DistributorWithRep = Distributor & {
  assigned_rep?: User;
};

export type OrderWithDistributor = Order & {
  distributor: Distributor;
};

export type CommunicationWithUser = Communication & {
  user: User;
  distributor: Distributor;
};
