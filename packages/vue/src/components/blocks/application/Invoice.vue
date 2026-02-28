<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/Button.vue'
import Separator from '@/components/ui/Separator.vue'
import Badge from '@/components/ui/Badge.vue'
import { Download, Printer, Mail, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-vue-next'

type InvoiceVariant = 'full' | 'receipt' | 'summary' | 'list'
type InvoiceStatus = 'paid' | 'pending' | 'overdue'

interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface InvoiceData {
  id: string
  status: InvoiceStatus
  date: string
  dueDate?: string
  from: {
    name: string
    address?: string
    email?: string
    phone?: string
  }
  to: {
    name: string
    address?: string
    email?: string
  }
  items: InvoiceItem[]
  subtotal: number
  tax?: number
  taxRate?: number
  discount?: number
  total: number
}

interface InvoiceProps {
  variant?: InvoiceVariant
  invoice: InvoiceData
  invoices?: InvoiceData[]
  class?: string
}

const props = withDefaults(defineProps<InvoiceProps>(), {
  variant: 'full',
})

const emit = defineEmits<{
  (e: 'download', id: string): void
  (e: 'print', id: string): void
  (e: 'send', id: string): void
  (e: 'viewDetails', id: string): void
}>()

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const statusConfig = {
  paid: { label: 'Paid', variant: 'success' as const, icon: CheckCircle },
  pending: { label: 'Pending', variant: 'warning' as const, icon: Clock },
  overdue: { label: 'Overdue', variant: 'destructive' as const, icon: AlertCircle },
}
</script>

<template>
  <!-- Full Invoice -->
  <div v-if="variant === 'full'" :class="cn('max-w-3xl mx-auto p-6', props.class)">
    <Card class="shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
      <CardHeader class="flex flex-row items-start justify-between">
        <div>
          <CardTitle class="text-3xl uppercase">Invoice</CardTitle>
          <p class="text-muted-foreground font-mono mt-1">#{{ invoice.id }}</p>
        </div>
        <Badge :variant="statusConfig[invoice.status].variant" class="gap-1.5">
          <component :is="statusConfig[invoice.status].icon" class="h-3.5 w-3.5" />
          {{ statusConfig[invoice.status].label }}
        </Badge>
      </CardHeader>
      <CardContent class="space-y-8">
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <p class="font-bold uppercase text-sm text-muted-foreground mb-2">From</p>
            <p class="font-bold text-lg">{{ invoice.from.name }}</p>
            <p v-if="invoice.from.address" class="text-muted-foreground">{{ invoice.from.address }}</p>
            <p v-if="invoice.from.email" class="text-muted-foreground">{{ invoice.from.email }}</p>
            <p v-if="invoice.from.phone" class="text-muted-foreground">{{ invoice.from.phone }}</p>
          </div>
          <div>
            <p class="font-bold uppercase text-sm text-muted-foreground mb-2">Bill To</p>
            <p class="font-bold text-lg">{{ invoice.to.name }}</p>
            <p v-if="invoice.to.address" class="text-muted-foreground">{{ invoice.to.address }}</p>
            <p v-if="invoice.to.email" class="text-muted-foreground">{{ invoice.to.email }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 text-sm">
          <div class="border-3 border-foreground p-4">
            <p class="font-bold uppercase text-muted-foreground">Invoice Date</p>
            <p class="font-bold text-lg">{{ invoice.date }}</p>
          </div>
          <div v-if="invoice.dueDate" class="border-3 border-foreground p-4">
            <p class="font-bold uppercase text-muted-foreground">Due Date</p>
            <p class="font-bold text-lg">{{ invoice.dueDate }}</p>
          </div>
        </div>

        <div class="border-3 border-foreground">
          <table class="w-full">
            <thead>
              <tr class="border-b-3 border-foreground bg-muted">
                <th class="text-left p-4 font-bold uppercase text-sm">Description</th>
                <th class="text-right p-4 font-bold uppercase text-sm">Qty</th>
                <th class="text-right p-4 font-bold uppercase text-sm">Price</th>
                <th class="text-right p-4 font-bold uppercase text-sm">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in invoice.items" :key="index" class="border-b border-foreground/20">
                <td class="p-4">{{ item.description }}</td>
                <td class="p-4 text-right">{{ item.quantity }}</td>
                <td class="p-4 text-right">{{ formatCurrency(item.unitPrice) }}</td>
                <td class="p-4 text-right font-bold">{{ formatCurrency(item.total) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-end">
          <div class="w-64 space-y-2">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Subtotal</span>
              <span>{{ formatCurrency(invoice.subtotal) }}</span>
            </div>
            <div v-if="invoice.tax" class="flex justify-between">
              <span class="text-muted-foreground">Tax ({{ invoice.taxRate }}%)</span>
              <span>{{ formatCurrency(invoice.tax) }}</span>
            </div>
            <div v-if="invoice.discount" class="flex justify-between text-success">
              <span>Discount</span>
              <span>-{{ formatCurrency(invoice.discount) }}</span>
            </div>
            <Separator class="bg-foreground h-[3px]" />
            <div class="flex justify-between font-black text-lg">
              <span class="uppercase">Total</span>
              <span>{{ formatCurrency(invoice.total) }}</span>
            </div>
          </div>
        </div>

        <div class="flex gap-3 justify-end pt-4">
          <Button variant="outline" class="gap-2" @click="emit('download', invoice.id)">
            <Download class="h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" class="gap-2" @click="emit('print', invoice.id)">
            <Printer class="h-4 w-4" />
            Print
          </Button>
          <Button class="gap-2" @click="emit('send', invoice.id)">
            <Mail class="h-4 w-4" />
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>

  <!-- Receipt Variant -->
  <div v-else-if="variant === 'receipt'" :class="cn('max-w-sm mx-auto p-6', props.class)">
    <Card class="shadow-[6px_6px_0px_hsl(var(--shadow-color))]">
      <CardContent class="pt-6 text-center">
        <div class="w-16 h-16 mx-auto border-3 border-foreground bg-success flex items-center justify-center mb-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
          <CheckCircle class="h-8 w-8 text-success-foreground" />
        </div>
        <h2 class="text-2xl font-black uppercase mb-2">Payment Received</h2>
        <p class="text-muted-foreground mb-6">Thank you for your purchase!</p>

        <div class="border-3 border-foreground p-4 mb-6 text-left">
          <div class="flex justify-between mb-2">
            <span class="text-muted-foreground">Receipt #</span>
            <span class="font-mono font-bold">{{ invoice.id }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-muted-foreground">Date</span>
            <span class="font-bold">{{ invoice.date }}</span>
          </div>
          <Separator class="bg-foreground/20 my-3" />
          <div v-for="(item, index) in invoice.items" :key="index" class="flex justify-between mb-1">
            <span>{{ item.description }}</span>
            <span class="font-bold">{{ formatCurrency(item.total) }}</span>
          </div>
          <Separator class="bg-foreground h-[2px] my-3" />
          <div class="flex justify-between font-black text-lg">
            <span class="uppercase">Total</span>
            <span>{{ formatCurrency(invoice.total) }}</span>
          </div>
        </div>

        <Button class="w-full gap-2" @click="emit('download', invoice.id)">
          <Download class="h-4 w-4" />
          Download Receipt
        </Button>
      </CardContent>
    </Card>
  </div>

  <!-- Summary Variant -->
  <div v-else-if="variant === 'summary'" :class="cn('max-w-md mx-auto p-6', props.class)">
    <Card class="shadow-[6px_6px_0px_hsl(var(--shadow-color))]">
      <CardHeader class="flex flex-row items-center justify-between">
        <div>
          <CardTitle class="uppercase">Invoice Summary</CardTitle>
          <p class="text-sm text-muted-foreground font-mono">#{{ invoice.id }}</p>
        </div>
        <Badge :variant="statusConfig[invoice.status].variant">
          {{ statusConfig[invoice.status].label }}
        </Badge>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex justify-between">
          <span class="text-muted-foreground">To</span>
          <span class="font-bold">{{ invoice.to.name }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Date</span>
          <span>{{ invoice.date }}</span>
        </div>
        <div v-if="invoice.dueDate" class="flex justify-between">
          <span class="text-muted-foreground">Due Date</span>
          <span>{{ invoice.dueDate }}</span>
        </div>
        <Separator class="bg-foreground h-[2px]" />
        <div class="flex justify-between font-black text-xl">
          <span class="uppercase">Total</span>
          <span>{{ formatCurrency(invoice.total) }}</span>
        </div>
        <Button class="w-full gap-2" @click="emit('viewDetails', invoice.id)">
          <FileText class="h-4 w-4" />
          View Details
        </Button>
      </CardContent>
    </Card>
  </div>

  <!-- List Variant -->
  <div v-else-if="variant === 'list'" :class="cn('max-w-4xl mx-auto p-6', props.class)">
    <Card class="shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
      <CardHeader>
        <CardTitle class="uppercase">Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="border-3 border-foreground">
          <table class="w-full">
            <thead>
              <tr class="border-b-3 border-foreground bg-muted">
                <th class="text-left p-4 font-bold uppercase text-sm">Invoice</th>
                <th class="text-left p-4 font-bold uppercase text-sm">Client</th>
                <th class="text-left p-4 font-bold uppercase text-sm">Date</th>
                <th class="text-left p-4 font-bold uppercase text-sm">Status</th>
                <th class="text-right p-4 font-bold uppercase text-sm">Amount</th>
                <th class="text-right p-4 font-bold uppercase text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="inv in (invoices || [invoice])"
                :key="inv.id"
                class="border-b border-foreground/20 hover:bg-muted/50"
              >
                <td class="p-4 font-mono font-bold">#{{ inv.id }}</td>
                <td class="p-4">{{ inv.to.name }}</td>
                <td class="p-4">{{ inv.date }}</td>
                <td class="p-4">
                  <Badge :variant="statusConfig[inv.status].variant" class="gap-1">
                    <component :is="statusConfig[inv.status].icon" class="h-3 w-3" />
                    {{ statusConfig[inv.status].label }}
                  </Badge>
                </td>
                <td class="p-4 text-right font-bold">{{ formatCurrency(inv.total) }}</td>
                <td class="p-4 text-right">
                  <div class="flex gap-2 justify-end">
                    <Button size="sm" variant="ghost" @click="emit('viewDetails', inv.id)">
                      View
                    </Button>
                    <Button size="sm" variant="outline" @click="emit('download', inv.id)">
                      <Download class="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
