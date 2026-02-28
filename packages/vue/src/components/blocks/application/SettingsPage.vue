<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import Switch from '@/components/ui/Switch.vue'
import Avatar from '@/components/ui/Avatar.vue'
import AvatarImage from '@/components/ui/AvatarImage.vue'
import AvatarFallback from '@/components/ui/AvatarFallback.vue'
import Separator from '@/components/ui/Separator.vue'
import { User, Bell, Shield, Palette, Trash2, Upload, Save, AlertTriangle } from 'lucide-vue-next'

type SettingsVariant = 'profile' | 'notifications' | 'security' | 'appearance' | 'dangerZone' | 'fullPage'

interface UserProfile {
  name: string
  email: string
  avatar?: string
  bio?: string
}

interface NotificationSettings {
  email: boolean
  push: boolean
  marketing: boolean
  updates: boolean
}

interface SettingsPageProps {
  variant?: SettingsVariant
  user?: UserProfile
  notifications?: NotificationSettings
  class?: string
}

const props = withDefaults(defineProps<SettingsPageProps>(), {
  variant: 'profile',
})

const emit = defineEmits<{
  (e: 'save', data: Record<string, unknown>): void
  (e: 'deleteAccount'): void
}>()

const profileName = ref(props.user?.name || '')
const profileEmail = ref(props.user?.email || '')
const profileBio = ref(props.user?.bio || '')

const emailNotifications = ref(props.notifications?.email ?? true)
const pushNotifications = ref(props.notifications?.push ?? true)
const marketingEmails = ref(props.notifications?.marketing ?? false)
const productUpdates = ref(props.notifications?.updates ?? true)

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const theme = ref<'light' | 'dark' | 'system'>('system')
const activeTab = ref<SettingsVariant>('profile')

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}
</script>

<template>
  <!-- Profile Settings -->
  <div v-if="variant === 'profile'" :class="cn('max-w-2xl mx-auto p-6', props.class)">
    <Card class="shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
      <CardHeader>
        <CardTitle class="uppercase flex items-center gap-2">
          <User class="h-5 w-5" />
          Profile Settings
        </CardTitle>
        <CardDescription>Manage your personal information</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="flex items-center gap-6">
          <Avatar class="h-20 w-20 border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
            <AvatarImage v-if="user?.avatar" :src="user.avatar" :alt="user.name" />
            <AvatarFallback class="bg-primary text-primary-foreground text-2xl font-black">
              {{ getInitials(user?.name || 'U') }}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" class="gap-2">
            <Upload class="h-4 w-4" />
            Upload Photo
          </Button>
        </div>

        <div class="grid gap-4">
          <div class="space-y-2">
            <Label for="name">Full Name</Label>
            <Input id="name" v-model="profileName" placeholder="Your name" />
          </div>
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" v-model="profileEmail" type="email" placeholder="your@email.com" />
          </div>
          <div class="space-y-2">
            <Label for="bio">Bio</Label>
            <Input id="bio" v-model="profileBio" placeholder="Tell us about yourself" />
          </div>
        </div>
      </CardContent>
      <CardFooter class="justify-end">
        <Button class="gap-2" @click="emit('save', { name: profileName, email: profileEmail, bio: profileBio })">
          <Save class="h-4 w-4" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  </div>

  <!-- Notification Settings -->
  <div v-else-if="variant === 'notifications'" :class="cn('max-w-2xl mx-auto p-6', props.class)">
    <Card class="shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
      <CardHeader>
        <CardTitle class="uppercase flex items-center gap-2">
          <Bell class="h-5 w-5" />
          Notification Settings
        </CardTitle>
        <CardDescription>Choose how you want to be notified</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-bold">Email Notifications</p>
            <p class="text-sm text-muted-foreground">Receive notifications via email</p>
          </div>
          <Switch v-model:checked="emailNotifications" />
        </div>
        <Separator class="bg-foreground h-[2px]" />
        <div class="flex items-center justify-between">
          <div>
            <p class="font-bold">Push Notifications</p>
            <p class="text-sm text-muted-foreground">Receive push notifications</p>
          </div>
          <Switch v-model:checked="pushNotifications" />
        </div>
        <Separator class="bg-foreground h-[2px]" />
        <div class="flex items-center justify-between">
          <div>
            <p class="font-bold">Marketing Emails</p>
            <p class="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
          </div>
          <Switch v-model:checked="marketingEmails" />
        </div>
        <Separator class="bg-foreground h-[2px]" />
        <div class="flex items-center justify-between">
          <div>
            <p class="font-bold">Product Updates</p>
            <p class="text-sm text-muted-foreground">Get notified about new features and updates</p>
          </div>
          <Switch v-model:checked="productUpdates" />
        </div>
      </CardContent>
      <CardFooter class="justify-end">
        <Button class="gap-2" @click="emit('save', { emailNotifications, pushNotifications, marketingEmails, productUpdates })">
          <Save class="h-4 w-4" />
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  </div>

  <!-- Security Settings -->
  <div v-else-if="variant === 'security'" :class="cn('max-w-2xl mx-auto p-6', props.class)">
    <Card class="shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
      <CardHeader>
        <CardTitle class="uppercase flex items-center gap-2">
          <Shield class="h-5 w-5" />
          Security Settings
        </CardTitle>
        <CardDescription>Manage your password and security</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="current-password">Current Password</Label>
            <Input id="current-password" v-model="currentPassword" type="password" placeholder="••••••••" />
          </div>
          <div class="space-y-2">
            <Label for="new-password">New Password</Label>
            <Input id="new-password" v-model="newPassword" type="password" placeholder="••••••••" />
          </div>
          <div class="space-y-2">
            <Label for="confirm-new-password">Confirm New Password</Label>
            <Input id="confirm-new-password" v-model="confirmPassword" type="password" placeholder="••••••••" />
          </div>
        </div>
      </CardContent>
      <CardFooter class="justify-end">
        <Button class="gap-2" @click="emit('save', { currentPassword, newPassword })">
          <Save class="h-4 w-4" />
          Update Password
        </Button>
      </CardFooter>
    </Card>
  </div>

  <!-- Appearance Settings -->
  <div v-else-if="variant === 'appearance'" :class="cn('max-w-2xl mx-auto p-6', props.class)">
    <Card class="shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
      <CardHeader>
        <CardTitle class="uppercase flex items-center gap-2">
          <Palette class="h-5 w-5" />
          Appearance
        </CardTitle>
        <CardDescription>Customize the look and feel</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div>
          <Label class="mb-4 block">Theme</Label>
          <div class="grid grid-cols-3 gap-4">
            <button
              :class="cn(
                'border-3 border-foreground p-4 text-center transition-all',
                theme === 'light' ? 'bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]' : 'hover:bg-muted'
              )"
              @click="theme = 'light'"
            >
              <div class="font-bold">Light</div>
            </button>
            <button
              :class="cn(
                'border-3 border-foreground p-4 text-center transition-all',
                theme === 'dark' ? 'bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]' : 'hover:bg-muted'
              )"
              @click="theme = 'dark'"
            >
              <div class="font-bold">Dark</div>
            </button>
            <button
              :class="cn(
                'border-3 border-foreground p-4 text-center transition-all',
                theme === 'system' ? 'bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]' : 'hover:bg-muted'
              )"
              @click="theme = 'system'"
            >
              <div class="font-bold">System</div>
            </button>
          </div>
        </div>
      </CardContent>
      <CardFooter class="justify-end">
        <Button class="gap-2" @click="emit('save', { theme })">
          <Save class="h-4 w-4" />
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  </div>

  <!-- Danger Zone -->
  <div v-else-if="variant === 'dangerZone'" :class="cn('max-w-2xl mx-auto p-6', props.class)">
    <Card class="border-destructive shadow-[8px_8px_0px_hsl(var(--destructive))]">
      <CardHeader>
        <CardTitle class="uppercase flex items-center gap-2 text-destructive">
          <AlertTriangle class="h-5 w-5" />
          Danger Zone
        </CardTitle>
        <CardDescription>Irreversible and destructive actions</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex items-center justify-between p-4 border-3 border-destructive/50 bg-destructive/5">
          <div>
            <p class="font-bold">Delete Account</p>
            <p class="text-sm text-muted-foreground">Permanently delete your account and all data</p>
          </div>
          <Button variant="destructive" class="gap-2" @click="emit('deleteAccount')">
            <Trash2 class="h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>

  <!-- Full Page Settings -->
  <div v-else-if="variant === 'fullPage'" :class="cn('max-w-6xl mx-auto p-6', props.class)">
    <div class="grid lg:grid-cols-4 gap-8">
      <nav class="space-y-2">
        <button
          v-for="tab in (['profile', 'notifications', 'security', 'appearance', 'dangerZone'] as const)"
          :key="tab"
          :class="cn(
            'w-full text-left px-4 py-3 border-3 border-foreground font-bold uppercase text-sm transition-all',
            activeTab === tab
              ? 'bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]'
              : 'hover:bg-muted'
          )"
          @click="activeTab = tab"
        >
          {{ tab === 'dangerZone' ? 'Danger Zone' : tab }}
        </button>
      </nav>

      <div class="lg:col-span-3">
        <SettingsPage v-if="activeTab === 'profile'" variant="profile" :user="user" @save="(data) => emit('save', data)" />
        <SettingsPage v-else-if="activeTab === 'notifications'" variant="notifications" :notifications="notifications" @save="(data) => emit('save', data)" />
        <SettingsPage v-else-if="activeTab === 'security'" variant="security" @save="(data) => emit('save', data)" />
        <SettingsPage v-else-if="activeTab === 'appearance'" variant="appearance" @save="(data) => emit('save', data)" />
        <SettingsPage v-else-if="activeTab === 'dangerZone'" variant="dangerZone" @delete-account="emit('deleteAccount')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SettingsPage',
})
</script>
