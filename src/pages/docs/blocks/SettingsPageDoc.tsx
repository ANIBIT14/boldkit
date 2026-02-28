import { BlockDoc } from '@/components/docs/BlockDoc'
import {
  ProfileSettings,
  NotificationSettings,
  SecuritySettings,
  AppearanceSettings,
  DangerZone,
  SettingsPage,
} from '@/components/blocks/application/settings-page'

const variants = [
  {
    name: 'Profile',
    description: 'Profile settings form with avatar upload.',
    preview: (
      <div className="p-4">
        <ProfileSettings
          user={{
            name: 'John Doe',
            email: 'john@example.com',
            bio: 'Building great products.',
            company: 'Acme Inc.',
            location: 'San Francisco, CA',
          }}
          onSave={(data) => console.log('Save:', data)}
        />
      </div>
    ),
    reactCode: `import { SettingsBlocks } from '@/components/blocks/application'

<SettingsBlocks.Profile
  user={{
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Building great products.',
    company: 'Acme Inc.',
  }}
  onSave={(data) => updateProfile(data)}
  onAvatarChange={(file) => uploadAvatar(file)}
/>`,
    vueCode: `<script setup lang="ts">
import { SettingsPage } from '@/components/blocks/application'

const user = {
  name: 'John Doe',
  email: 'john@example.com',
}
</script>

<template>
  <SettingsPage variant="profile" :user="user" @save="updateProfile" />
</template>`,
  },
  {
    name: 'Notifications',
    description: 'Notification preferences with toggles.',
    preview: (
      <div className="p-4">
        <NotificationSettings
          onSave={(settings) => console.log('Save:', settings)}
        />
      </div>
    ),
    reactCode: `import { SettingsBlocks } from '@/components/blocks/application'

<SettingsBlocks.Notifications
  notifications={[
    { id: 'comments', title: 'Comments', description: '...', email: true, push: true },
  ]}
  onSave={(settings) => updateNotifications(settings)}
/>`,
    vueCode: `<template>
  <SettingsPage variant="notifications" @save="updateNotifications" />
</template>`,
  },
  {
    name: 'Security',
    description: 'Security settings with 2FA and sessions.',
    preview: (
      <div className="p-4">
        <SecuritySettings
          twoFactorEnabled={false}
          sessions={[
            { id: '1', device: 'Chrome on MacOS', location: 'San Francisco', lastActive: 'Now', current: true },
            { id: '2', device: 'Safari on iPhone', location: 'New York', lastActive: '2 hours ago' },
          ]}
        />
      </div>
    ),
    reactCode: `import { SettingsBlocks } from '@/components/blocks/application'

<SettingsBlocks.Security
  twoFactorEnabled={false}
  sessions={[
    { id: '1', device: 'Chrome on MacOS', location: 'SF', lastActive: 'Now', current: true },
  ]}
  onChangePassword={() => openPasswordModal()}
  onToggleTwoFactor={(enabled) => toggle2FA(enabled)}
  onRevokeSession={(id) => revokeSession(id)}
/>`,
    vueCode: `<template>
  <SettingsPage
    variant="security"
    :two-factor-enabled="false"
    :sessions="sessions"
    @change-password="openPasswordModal"
    @toggle-2fa="toggle2FA"
  />
</template>`,
  },
  {
    name: 'Appearance',
    description: 'Theme and color customization.',
    preview: (
      <div className="p-4">
        <AppearanceSettings
          theme="system"
          accentColor="#3b82f6"
          onThemeChange={(theme) => console.log('Theme:', theme)}
          onAccentColorChange={(color) => console.log('Color:', color)}
        />
      </div>
    ),
    reactCode: `import { SettingsBlocks } from '@/components/blocks/application'

<SettingsBlocks.Appearance
  theme="system" // 'light' | 'dark' | 'system'
  accentColor="#3b82f6"
  onThemeChange={(theme) => setTheme(theme)}
  onAccentColorChange={(color) => setAccentColor(color)}
/>`,
    vueCode: `<template>
  <SettingsPage
    variant="appearance"
    theme="system"
    accent-color="#3b82f6"
    @theme-change="setTheme"
  />
</template>`,
  },
  {
    name: 'DangerZone',
    description: 'Destructive actions section.',
    preview: (
      <div className="p-4">
        <DangerZone
          onExportData={() => console.log('Export')}
          onDeactivate={() => console.log('Deactivate')}
          onDelete={() => console.log('Delete')}
        />
      </div>
    ),
    reactCode: `import { SettingsBlocks } from '@/components/blocks/application'

<SettingsBlocks.DangerZone
  onExportData={() => exportData()}
  onDeactivate={() => deactivateAccount()}
  onDelete={() => confirmDelete()}
/>`,
    vueCode: `<template>
  <SettingsPage
    variant="dangerZone"
    @export-data="exportData"
    @deactivate="deactivateAccount"
    @delete="confirmDelete"
  />
</template>`,
  },
  {
    name: 'Page',
    description: 'Complete settings page with all tabs.',
    preview: (
      <div className="max-h-[600px] overflow-auto">
        <SettingsPage defaultTab="profile" />
      </div>
    ),
    reactCode: `import { SettingsBlocks } from '@/components/blocks/application'

<SettingsBlocks.Page defaultTab="profile" />`,
    vueCode: `<template>
  <SettingsPage variant="page" default-tab="profile" />
</template>`,
  },
]

export function SettingsPageDoc() {
  return (
    <BlockDoc
      name="Settings Page"
      description="Complete settings page components including profile, notifications, security, appearance, and danger zone sections."
      category="application"
      variants={variants}
    />
  )
}

export default SettingsPageDoc
