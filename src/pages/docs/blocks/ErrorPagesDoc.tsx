import { BlockDoc } from '@/components/docs/BlockDoc'
import {
  NotFoundPage,
  ServerErrorPage,
  MaintenancePage,
  OfflinePage,
  ForbiddenPage,
  ComingSoonPage,
  GenericErrorPage,
} from '@/components/blocks/application/error-pages'

const variants = [
  {
    name: 'NotFound',
    description: '404 page not found error.',
    preview: (
      <div className="py-8">
        <NotFoundPage
          homeHref="/"
          backHref="#"
        />
      </div>
    ),
    reactCode: `import { ErrorPages } from '@/components/blocks/application'

<ErrorPages.NotFound
  homeHref="/"
  backHref="/previous-page"
  showSearch
  onSearch={(query) => search(query)}
/>`,
    vueCode: `<script setup lang="ts">
import { ErrorPages } from '@/components/blocks/application'
</script>

<template>
  <ErrorPages
    variant="notFound"
    home-href="/"
    back-href="/previous-page"
  />
</template>`,
  },
  {
    name: 'ServerError',
    description: '500 internal server error.',
    preview: (
      <div className="py-8">
        <ServerErrorPage
          onRetry={() => window.location.reload()}
          homeHref="/"
        />
      </div>
    ),
    reactCode: `import { ErrorPages } from '@/components/blocks/application'

<ErrorPages.ServerError
  onRetry={() => window.location.reload()}
  homeHref="/"
  errorId="ERR-12345"
  supportEmail="support@company.com"
/>`,
    vueCode: `<template>
  <ErrorPages variant="serverError" @retry="reload" home-href="/" />
</template>`,
  },
  {
    name: 'Maintenance',
    description: 'Scheduled maintenance page.',
    preview: (
      <div className="py-8">
        <MaintenancePage />
      </div>
    ),
    reactCode: `import { ErrorPages } from '@/components/blocks/application'

<ErrorPages.Maintenance
  estimatedTime="30 minutes"
/>`,
    vueCode: `<template>
  <ErrorPages variant="maintenance" estimated-time="30 minutes" />
</template>`,
  },
  {
    name: 'Offline',
    description: 'No internet connection page.',
    preview: (
      <div className="py-8">
        <OfflinePage
          onRetry={() => window.location.reload()}
        />
      </div>
    ),
    reactCode: `import { ErrorPages } from '@/components/blocks/application'

<ErrorPages.Offline
  onRetry={() => checkConnection()}
/>`,
    vueCode: `<template>
  <ErrorPages variant="offline" @retry="checkConnection" />
</template>`,
  },
  {
    name: 'Forbidden',
    description: '403 access denied error.',
    preview: (
      <div className="py-8">
        <ForbiddenPage
          homeHref="/"
          loginHref="/login"
        />
      </div>
    ),
    reactCode: `import { ErrorPages } from '@/components/blocks/application'

<ErrorPages.Forbidden
  homeHref="/"
  loginHref="/login"
/>`,
    vueCode: `<template>
  <ErrorPages variant="forbidden" home-href="/" login-href="/login" />
</template>`,
  },
  {
    name: 'ComingSoon',
    description: 'Feature coming soon page.',
    preview: (
      <div className="py-8">
        <ComingSoonPage
          onNotify={(email) => console.log('Notify:', email)}
        />
      </div>
    ),
    reactCode: `import { ErrorPages } from '@/components/blocks/application'

<ErrorPages.ComingSoon
  launchDate={new Date('2025-01-01')}
  onNotify={(email) => subscribeToNotifications(email)}
/>`,
    vueCode: `<template>
  <ErrorPages variant="comingSoon" @notify="subscribe" />
</template>`,
  },
  {
    name: 'Generic',
    description: 'Generic error page.',
    preview: (
      <div className="py-8">
        <GenericErrorPage
          title="Oops!"
          description="Something unexpected happened. Please try again."
          actions={[
            { label: 'Try Again', onClick: () => window.location.reload() },
            { label: 'Go Home', href: '/', variant: 'outline' },
          ]}
        />
      </div>
    ),
    reactCode: `import { ErrorPages } from '@/components/blocks/application'

<ErrorPages.Generic
  title="Oops!"
  description="Something went wrong."
  actions={[
    { label: 'Try Again', onClick: () => retry() },
    { label: 'Go Home', href: '/', variant: 'outline' },
  ]}
/>`,
    vueCode: `<template>
  <ErrorPages
    variant="generic"
    title="Oops!"
    description="Something went wrong."
    :actions="[{ label: 'Retry', onClick: handleRetry }]"
  />
</template>`,
  },
]

export function ErrorPagesDoc() {
  return (
    <BlockDoc
      name="Error Pages"
      description="Error and status pages for 404, 500, maintenance, offline, forbidden, coming soon, and generic errors."
      category="application"
      variants={variants}
    />
  )
}

export default ErrorPagesDoc
