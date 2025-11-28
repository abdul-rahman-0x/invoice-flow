import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { InvoiceData, InvoiceTotals } from "@/types/invoice";

export const calculateTotals = (
  lineItems: InvoiceData["lineItems"],
  taxRate: number,
  discount: number
): InvoiceTotals => {
  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const discountAmount = discount;
  const total = subtotal + taxAmount - discountAmount;

  return {
    subtotal,
    taxAmount,
    discountAmount,
    total,
  };
};

export const generateInvoicePDF = (data: InvoiceData, totals: InvoiceTotals) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // Header with gradient background (simulated with color)
  doc.setFillColor(23, 162, 184); // Primary color
  doc.rect(0, 0, pageWidth, 40, "F");
  
  // Company name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(data.companyDetails.name, 15, 20);
  
  // Invoice title
  doc.setFontSize(16);
  doc.text("INVOICE", pageWidth - 15, 20, { align: "right" });
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Company details
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  let yPos = 50;
  doc.text(data.companyDetails.address, 15, yPos);
  yPos += 5;
  doc.text(data.companyDetails.email, 15, yPos);
  yPos += 5;
  doc.text(data.companyDetails.phone, 15, yPos);
  if (data.companyDetails.gstNumber) {
    yPos += 5;
    doc.text(`GST: ${data.companyDetails.gstNumber}`, 15, yPos);
  }
  
  // Invoice details (right side)
  yPos = 50;
  doc.setFont("helvetica", "bold");
  doc.text("Invoice Number:", pageWidth - 70, yPos);
  doc.setFont("helvetica", "normal");
  doc.text(data.invoiceNumber, pageWidth - 15, yPos, { align: "right" });
  
  yPos += 5;
  doc.setFont("helvetica", "bold");
  doc.text("Invoice Date:", pageWidth - 70, yPos);
  doc.setFont("helvetica", "normal");
  doc.text(data.invoiceDate, pageWidth - 15, yPos, { align: "right" });
  
  yPos += 5;
  doc.setFont("helvetica", "bold");
  doc.text("Due Date:", pageWidth - 70, yPos);
  doc.setFont("helvetica", "normal");
  doc.text(data.dueDate, pageWidth - 15, yPos, { align: "right" });
  
  // Bill to section
  yPos += 15;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("BILL TO:", 15, yPos);
  
  yPos += 7;
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text(data.clientDetails.name, 15, yPos);
  
  yPos += 5;
  doc.setFont("helvetica", "normal");
  doc.text(data.clientDetails.address, 15, yPos);
  yPos += 5;
  doc.text(data.clientDetails.email, 15, yPos);
  yPos += 5;
  doc.text(data.clientDetails.phone, 15, yPos);
  
  // Line items table
  yPos += 10;
  const tableData = data.lineItems.map((item) => [
    item.description,
    item.quantity.toString(),
    `$${item.rate.toFixed(2)}`,
    `$${item.amount.toFixed(2)}`,
  ]);
  
  autoTable(doc, {
    startY: yPos,
    head: [["Description", "Quantity", "Rate", "Amount"]],
    body: tableData,
    theme: "grid",
    headStyles: {
      fillColor: [23, 162, 184],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    styles: {
      fontSize: 9,
    },
    columnStyles: {
      0: { cellWidth: "auto" },
      1: { cellWidth: 30, halign: "center" },
      2: { cellWidth: 35, halign: "right" },
      3: { cellWidth: 35, halign: "right" },
    },
  });
  
  // Get the final Y position after the table
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  // Totals section
  const totalsX = pageWidth - 70;
  let totalsY = finalY;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  
  doc.text("Subtotal:", totalsX, totalsY);
  doc.text(`$${totals.subtotal.toFixed(2)}`, pageWidth - 15, totalsY, { align: "right" });
  
  totalsY += 6;
  doc.text(`Tax (${data.taxRate}%):`, totalsX, totalsY);
  doc.text(`$${totals.taxAmount.toFixed(2)}`, pageWidth - 15, totalsY, { align: "right" });
  
  if (totals.discountAmount > 0) {
    totalsY += 6;
    doc.text("Discount:", totalsX, totalsY);
    doc.text(`-$${totals.discountAmount.toFixed(2)}`, pageWidth - 15, totalsY, { align: "right" });
  }
  
  totalsY += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setFillColor(23, 162, 184);
  doc.rect(totalsX - 5, totalsY - 5, 75, 10, "F");
  doc.setTextColor(255, 255, 255);
  doc.text("TOTAL:", totalsX, totalsY);
  doc.text(`$${totals.total.toFixed(2)}`, pageWidth - 15, totalsY, { align: "right" });
  
  // Notes section
  if (data.notes && data.notes.trim()) {
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    totalsY += 20;
    doc.text("Notes:", 15, totalsY);
    
    doc.setFont("helvetica", "normal");
    totalsY += 5;
    const splitNotes = doc.splitTextToSize(data.notes, pageWidth - 30);
    doc.text(splitNotes, 15, totalsY);
  }
  
  // Footer
  const footerY = doc.internal.pageSize.height - 20;
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text("Thank you for your business!", pageWidth / 2, footerY, { align: "center" });
  
  // Save the PDF
  doc.save(`Invoice-${data.invoiceNumber}.pdf`);
};
