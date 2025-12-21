// Full Imports for InvoiceForm.jsx/tsx

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

// Lucide icons
import { Plus, FileText, Trash2, Download } from "lucide-react"; 

// Your custom/shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Project specific files
import { invoiceSchema, type InvoiceFormData } from "@/lib/invoiceSchema";
import { calculateTotals, generateInvoicePDF } from "@/utils/pdfGenerator";

// React hooks and external libraries
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ===================================
// IMPORT NEW COMPONENTS
// IMPORTANT: Adjust the path below if your Navbar and Footer files are in a different location

// ===================================

const COMPANY_STORAGE_KEY = "quickbill_company_details";

export const InvoiceForm = () => {
  const [totals, setTotals] = useState({ subtotal: 0, taxAmount: 0, discountAmount: 0, total: 0 });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      invoiceNumber: `INV-${Date.now()}`,
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      companyDetails: {
        name: "",
        address: "",
        email: "",
        phone: "",
        gstNumber: "",
      },
      clientDetails: {
        name: "",
        address: "",
        email: "",
        phone: "",
      },
      lineItems: [{ id: "1", description: "", quantity: 1, rate: 0, amount: 0 }],
      taxRate: 18,
      discount: 0,
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems",
  });

  // Load company details from localStorage
  useEffect(() => {
    const savedCompany = localStorage.getItem(COMPANY_STORAGE_KEY);
    if (savedCompany) {
      const companyData = JSON.parse(savedCompany);
      setValue("companyDetails", companyData);
      toast.success("Company details loaded from storage");
    }
  }, [setValue]);

  // Watch all values for real-time calculation
  const watchedLineItems = watch("lineItems");
  const watchedTaxRate = watch("taxRate");
  const watchedDiscount = watch("discount");

  // Calculate amounts for line items and totals
  useEffect(() => {
    watchedLineItems.forEach((item, index) => {
      const amount = item.quantity * item.rate;
      if (item.amount !== amount) {
        setValue(`lineItems.${index}.amount`, amount);
      }
    });

    const calculatedTotals = calculateTotals(watchedLineItems, watchedTaxRate, watchedDiscount);
    setTotals(calculatedTotals);
  }, [watchedLineItems, watchedTaxRate, watchedDiscount, setValue]);

  const onSubmit = (data: InvoiceFormData) => {
    try {
      // Save company details to localStorage
      localStorage.setItem(COMPANY_STORAGE_KEY, JSON.stringify(data.companyDetails));
      
      // Generate PDF
      generateInvoicePDF(data, totals);
      
      toast.success("Invoice generated successfully!");
    } catch (error) {
      toast.error("Failed to generate invoice");
      console.error(error);
    }
  };

  const addLineItem = () => {
    append({
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto p-4 md:p-8"
      >
        
      {/* NEW CLEAN HERO SECTION */}
      <div className="mb-16 text-center pt-8">
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold mb-4 tracking-tight text-foreground"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
        >
          InvoiceFlow
        </motion.h1>
        <motion.p 
          className="text-foreground/70 text-xl md:text-2xl max-w-3xl mx-auto font-light mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Generate clean, professional, and compliant invoices instantly.
          Simple. Fast. Perfect for freelancers and small businesses.
        </motion.p>
          <motion.div
           id="form-start" // <--- ADDED ID HERE
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground italic">
            Fill out the form below to create and download your PDF invoice.
          </p>
        </motion.div>
      </div>

      <form id="invoice-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Invoice Details */}
        <Card id="invoice-form-start" className="shadow-xl border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <FileText className="h-5 w-5 text-primary" />
              Invoice Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input id="invoiceNumber" {...register("invoiceNumber")} />
              {errors.invoiceNumber && (
                <p className="text-sm text-destructive mt-1">{errors.invoiceNumber.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input id="invoiceDate" type="date" {...register("invoiceDate")} />
              {errors.invoiceDate && (
                <p className="text-sm text-destructive mt-1">{errors.invoiceDate.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" type="date" {...register("dueDate")} />
              {errors.dueDate && (
                <p className="text-sm text-destructive mt-1">{errors.dueDate.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Details */}
          <Card className="shadow-xl border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-foreground">Your Company</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" {...register("companyDetails.name")} />
                {errors.companyDetails?.name && (
                  <p className="text-sm text-destructive mt-1">{errors.companyDetails.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="companyAddress">Address</Label>
                <Textarea id="companyAddress" {...register("companyDetails.address")} rows={2} />
                {errors.companyDetails?.address && (
                  <p className="text-sm text-destructive mt-1">{errors.companyDetails.address.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyEmail">Email</Label>
                  <Input id="companyEmail" type="email" {...register("companyDetails.email")} />
                  {errors.companyDetails?.email && (
                    <p className="text-sm text-destructive mt-1">{errors.companyDetails.email.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="companyPhone">Phone</Label>
                  <Input id="companyPhone" {...register("companyDetails.phone")} />
                  {errors.companyDetails?.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.companyDetails.phone.message}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="companyGst">GST Number (Optional)</Label>
                <Input id="companyGst" {...register("companyDetails.gstNumber")} />
              </div>
            </CardContent>
          </Card>

          {/* Client Details */}
          <Card className="shadow-xl border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-foreground">Bill To</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="clientName">Client Name</Label>
                <Input id="clientName" {...register("clientDetails.name")} />
                {errors.clientDetails?.name && (
                  <p className="text-sm text-destructive mt-1">{errors.clientDetails.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="clientAddress">Address</Label>
                <Textarea id="clientAddress" {...register("clientDetails.address")} rows={2} />
                {errors.clientDetails?.address && (
                  <p className="text-sm text-destructive mt-1">{errors.clientDetails.address.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientEmail">Email</Label>
                  <Input id="clientEmail" type="email" {...register("clientDetails.email")} />
                  {errors.clientDetails?.email && (
                    <p className="text-sm text-destructive mt-1">{errors.clientDetails.email.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="clientPhone">Phone</Label>
                  <Input id="clientPhone" {...register("clientDetails.phone")} />
                  {errors.clientDetails?.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.clientDetails.phone.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Line Items */}
        <Card className="shadow-xl border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-foreground">Line Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <motion.div
                
                key={field.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-12 gap-4 items-end"
              >
                <div className="col-span-12 md:col-span-5">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Input
                    id={`description-${index}`}
                    {...register(`lineItems.${index}.description`)}
                    placeholder="Service or product description"
                  />
                  {errors.lineItems?.[index]?.description && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.lineItems[index]?.description?.message}
                    </p>
                  )}
                </div>
                <div className="col-span-4 md:col-span-2">
                  <Label htmlFor={`quantity-${index}`}>Qty</Label>
                  <Input
                    id={`quantity-${index}`}
                    type="number"
                    min="1"
                    {...register(`lineItems.${index}.quantity`, { valueAsNumber: true })}
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <Label htmlFor={`rate-${index}`}>Rate</Label>
                  <Input
                    id={`rate-${index}`}
                    type="number"
                    min="0"
                    step="0.01"
                    {...register(`lineItems.${index}.rate`, { valueAsNumber: true })}
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <Label>Amount</Label>
                  <div className="h-10 px-3 py-2 border rounded-md bg-muted flex items-center">
                    ${watchedLineItems[index]?.amount?.toFixed(2) || "0.00"}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-1">
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addLineItem}
              className="w-full border-dashed border-primary/30 hover:border-primary hover:bg-primary/10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Line Item
            </Button>
          </CardContent>
        </Card>

        {/* Tax and Discount */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-xl border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-foreground">Tax & Discount</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  {...register("taxRate", { valueAsNumber: true })}
                />
                {errors.taxRate && (
                  <p className="text-sm text-destructive mt-1">{errors.taxRate.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="discount">Discount ($)</Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  step="0.01"
                  {...register("discount", { valueAsNumber: true })}
                />
                {errors.discount && (
                  <p className="text-sm text-destructive mt-1">{errors.discount.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Totals - Maintained gradient for emphasis but updated shadow/hover */}
          <Card className="shadow-xl bg-gradient-to-br from-primary/20 to-accent/20 border-primary/40 backdrop-blur-sm hover:shadow-2xl hover:border-primary/60 hover:-translate-y-0.5 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-foreground">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-lg text-foreground">
                <span>Subtotal:</span>
                <span className="font-semibold">${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg text-foreground">
                <span>Tax ({watchedTaxRate}%):</span>
                <span className="font-semibold">${totals.taxAmount.toFixed(2)}</span>
              </div>
              {totals.discountAmount > 0 && (
                <div className="flex justify-between text-lg text-foreground">
                  <span>Discount:</span>
                  <span className="font-semibold">-${totals.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-primary/30 pt-3">
                <div className="flex justify-between text-2xl font-bold text-foreground">
                  <span>Total:</span>
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">${totals.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes */}
        <Card className="shadow-xl border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-foreground">Notes (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              {...register("notes")}
              rows={4}
              placeholder="Payment terms, additional information, thank you note..."
            />
          </CardContent>
        </Card>

        {/* Submit Button - Removed shadow-glow on button as well */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-lg font-semibold py-6 shadow-lg opacity-100"
          >
            <Download className="h-5 w-5 mr-2" />
            Generate & Download Invoice PDF
          </Button>
        </motion.div>
      </form>
      </motion.div>
    </>
  );
};