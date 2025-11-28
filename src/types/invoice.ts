export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface CompanyDetails {
  name: string;
  address: string;
  email: string;
  phone: string;
  gstNumber?: string;
}

export interface ClientDetails {
  name: string;
  address: string;
  email: string;
  phone: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  companyDetails: CompanyDetails;
  clientDetails: ClientDetails;
  lineItems: LineItem[];
  taxRate: number;
  discount: number;
  notes?: string;
}

export interface InvoiceTotals {
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
}
