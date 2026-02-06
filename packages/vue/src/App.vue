<script setup lang="ts">
import { ref } from 'vue'
import Button from './components/ui/Button.vue'
import Card from './components/ui/Card.vue'
import CardHeader from './components/ui/CardHeader.vue'
import CardTitle from './components/ui/CardTitle.vue'
import CardDescription from './components/ui/CardDescription.vue'
import CardContent from './components/ui/CardContent.vue'
import CardFooter from './components/ui/CardFooter.vue'
import Input from './components/ui/Input.vue'
import Label from './components/ui/Label.vue'
import Badge from './components/ui/Badge.vue'
import Separator from './components/ui/Separator.vue'
import Skeleton from './components/ui/Skeleton.vue'
import Checkbox from './components/ui/Checkbox.vue'
import Switch from './components/ui/Switch.vue'
import Progress from './components/ui/Progress.vue'
import Accordion from './components/ui/Accordion.vue'
import AccordionItem from './components/ui/AccordionItem.vue'
import AccordionTrigger from './components/ui/AccordionTrigger.vue'
import AccordionContent from './components/ui/AccordionContent.vue'
import Tabs from './components/ui/Tabs.vue'
import TabsList from './components/ui/TabsList.vue'
import TabsTrigger from './components/ui/TabsTrigger.vue'
import TabsContent from './components/ui/TabsContent.vue'
import { useTheme } from './composables/useTheme'

const { resolvedTheme, setTheme } = useTheme()
const progress = ref(60)
const checked = ref(false)
const switchOn = ref(false)
const email = ref('')
</script>

<template>
  <div class="min-h-screen bg-background p-8">
    <div class="mx-auto max-w-4xl space-y-8">
      <div class="flex items-center justify-between">
        <h1 class="text-4xl font-black uppercase tracking-tight">BoldKit Vue</h1>
        <Button @click="setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')">
          Toggle Theme
        </Button>
      </div>

      <Separator />

      <section class="space-y-4">
        <h2 class="text-2xl font-bold uppercase">Buttons</h2>
        <div class="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold uppercase">Badges</h2>
        <div class="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold uppercase">Card</h2>
        <Card class="max-w-md">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the card content area.</p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold uppercase">Form Elements</h2>
        <div class="max-w-md space-y-4">
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" v-model="email" type="email" placeholder="Enter your email" />
          </div>
          <div class="flex items-center gap-2">
            <Checkbox id="terms" v-model:checked="checked" />
            <Label for="terms">Accept terms</Label>
          </div>
          <div class="flex items-center gap-2">
            <Switch id="notifications" v-model:checked="switchOn" />
            <Label for="notifications">Enable notifications</Label>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold uppercase">Progress</h2>
        <Progress :model-value="progress" class="max-w-md" />
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold uppercase">Accordion</h2>
        <Accordion type="single" collapsible class="max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with neubrutalism styles out of the box.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default with smooth transitions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold uppercase">Tabs</h2>
        <Tabs default-value="account" class="max-w-md">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="space-y-2">
                  <Label for="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="space-y-2">
                  <Label for="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold uppercase">Skeleton</h2>
        <div class="max-w-md space-y-2">
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-3/4" />
          <Skeleton class="h-4 w-1/2" />
        </div>
      </section>
    </div>
  </div>
</template>
