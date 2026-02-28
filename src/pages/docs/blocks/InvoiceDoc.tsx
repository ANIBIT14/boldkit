import { BlockDoc } from '@/components/docs/BlockDoc'
import {
  Invoice,
  Receipt,
  InvoiceSummary,
  InvoiceList,
} from '@/components/blocks/application/invoice'

const sampleInvoiceData = {
  invoiceNumber: 'INV-2024-001',
  issueDate: 'Feb 1, 2024',
  dueDate: 'Mar 1, 2024',
  status: 'pending' as const,
  from: {
    name: 'BoldKit Inc.',
    company: 'BoldKit',
    address: '123 Design Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    email: 'billing@boldkit.dev',
  },
  to: {
    name: 'John Doe',
    company: 'Acme Corp',
    address: '456 Client Ave',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    email: 'john@acme.com',
  },
  items: [
    { description: 'UI Component Library License', quantity: 1, unitPrice: 499.00 },
    { description: 'Premium Support (Annual)', quantity: 1, unitPrice: 199.00 },
    { description: 'Custom Component Development', quantity: 5, unitPrice: 150.00 },
  ],
  subtotal: 1448.00,
  tax: { label: 'Sales Tax', rate: 8.5, amount: 123.08 },
  total: 1571.08,
  notes: 'Thank you for your business!',
  terms: 'Payment due within 30 days.',
}

const sampleReceiptData = {
  receiptNumber: 'RCP-001',
  date: 'Feb 28, 2024',
  merchant: {
    name: 'BoldKit Store',
    address: '123 Design St, SF',
    phone: '(555) 123-4567',
  },
  items: [
    { name: 'Pro License', price: 99.00 },
    { name: 'Theme Pack', quantity: 2, price: 29.98 },
  ],
  subtotal: 128.98,
  tax: 10.96,
  total: 139.94,
  paymentMethod: 'Credit Card',
  cardLast4: '4242',
}

const sampleInvoices = [
  { id: '1', invoiceNumber: 'INV-001', clientName: 'Acme Corp', date: 'Feb 1, 2024', amount: 1571.08, status: 'pending' as const },
  { id: '2', invoiceNumber: 'INV-002', clientName: 'TechStart', date: 'Jan 15, 2024', amount: 2340.00, status: 'paid' as const },
  { id: '3', invoiceNumber: 'INV-003', clientName: 'StartupXYZ', date: 'Dec 20, 2023', amount: 890.50, status: 'overdue' as const },
]

const variants = [
  {
    name: 'Full',
    description: 'Complete invoice document.',
    preview: (
      <div className="py-4 max-h-[600px] overflow-auto">
        <Invoice
          data={sampleInvoiceData}
          logo={<span className="text-2xl font-black">BK</span>}
          onDownload={() => console.log('Download')}
          onPrint={() => console.log('Print')}
          onSendEmail={() => console.log('Email')}
        />
      </div>
    ),
    reactCode: `import { InvoiceBlocks } from '@/components/blocks/application'

<InvoiceBlocks.Full
  data={{
    invoiceNumber: 'INV-001',
    issueDate: 'Feb 1, 2024',
    dueDate: 'Mar 1, 2024',
    status: 'pending',
    from: { name: 'Company', address: '...', city: '...', zip: '...' },
    to: { name: 'Client', address: '...', city: '...', zip: '...' },
    items: [{ description: 'Service', quantity: 1, unitPrice: 100 }],
    subtotal: 100,
    tax: { label: 'Tax', rate: 10, amount: 10 },
    total: 110,
  }}
  logo={<Logo />}
  onDownload={() => downloadPDF()}
  onPrint={() => window.print()}
  onSendEmail={() => sendEmail()}
/>`,
    vueCode: `<script setup lang="ts">
import { Invoice } from '@/components/blocks/application'
</script>

<template>
  <Invoice variant="full" :data="invoiceData" @download="downloadPDF" @print="print" />
</template>`,
  },
  {
    name: 'Receipt',
    description: 'Compact receipt format.',
    preview: (
      <div className="py-4">
        <Receipt
          data={sampleReceiptData}
          onDownload={() => console.log('Download')}
        />
      </div>
    ),
    reactCode: `import { InvoiceBlocks } from '@/components/blocks/application'

<InvoiceBlocks.Receipt
  data={{
    receiptNumber: 'RCP-001',
    date: 'Feb 28, 2024',
    merchant: { name: 'Store', address: '...' },
    items: [{ name: 'Item', price: 10.00 }],
    subtotal: 10.00,
    tax: 0.80,
    total: 10.80,
    paymentMethod: 'Card',
    cardLast4: '4242',
  }}
  logo={<Logo />}
  onDownload={() => downloadReceipt()}
/>`,
    vueCode: `<template>
  <Invoice variant="receipt" :data="receiptData" @download="downloadReceipt" />
</template>`,
  },
  {
    name: 'Summary',
    description: 'Invoice summary card.',
    preview: (
      <div className="py-4 max-w-md mx-auto">
        <InvoiceSummary
          invoiceNumber="INV-2024-001"
          clientName="Acme Corporation"
          issueDate="Feb 1, 2024"
          dueDate="Mar 1, 2024"
          amount={1571.08}
          status="pending"
          onView={() => console.log('View')}
          onDownload={() => console.log('Download')}
        />
      </div>
    ),
    reactCode: `import { InvoiceBlocks } from '@/components/blocks/application'

<InvoiceBlocks.Summary
  invoiceNumber="INV-001"
  clientName="Client Name"
  issueDate="Feb 1, 2024"
  dueDate="Mar 1, 2024"
  amount={1000.00}
  status="pending" // 'paid' | 'pending' | 'overdue'
  onView={() => viewInvoice()}
  onDownload={() => downloadInvoice()}
/>`,
    vueCode: `<template>
  <Invoice
    variant="summary"
    invoice-number="INV-001"
    client-name="Client"
    :amount="1000"
    status="pending"
    @view="viewInvoice"
  />
</template>`,
  },
  {
    name: 'List',
    description: 'Invoice list table view.',
    preview: (
      <div className="py-4">
        <InvoiceList
          invoices={sampleInvoices}
          onView={(id) => console.log('View:', id)}
          onDownload={(id) => console.log('Download:', id)}
        />
      </div>
    ),
    reactCode: `import { InvoiceBlocks } from '@/components/blocks/application'

<InvoiceBlocks.List
  invoices={[
    {
      id: '1',
      invoiceNumber: 'INV-001',
      clientName: 'Client',
      date: 'Feb 1, 2024',
      amount: 1000.00,
      status: 'paid',
    },
  ]}
  onView={(id) => viewInvoice(id)}
  onDownload={(id) => downloadInvoice(id)}
/>`,
    vueCode: `<template>
  <Invoice variant="list" :invoices="invoices" @view="viewInvoice" @download="downloadInvoice" />
</template>`,
  },
]

export function InvoiceDoc() {
  return (
    <BlockDoc
      name="Invoice"
      description="Invoice and billing components including full invoice documents, compact receipts, summary cards, and list views with status indicators."
      category="application"
      variants={variants}
    />
  )
}

export default InvoiceDoc
