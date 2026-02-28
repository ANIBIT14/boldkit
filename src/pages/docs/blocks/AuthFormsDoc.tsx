import { BlockDoc } from '@/components/docs/BlockDoc'
import {
  LoginForm,
  SignUpForm,
  ForgotPasswordForm,
  OTPVerificationForm,
  AuthSplitLayout,
} from '@/components/blocks/application/auth-forms'

const variants = [
  {
    name: 'Login',
    description: 'Standard login form with email, password, and social providers.',
    preview: (
      <div className="flex items-center justify-center py-8 bg-background">
        <LoginForm
          onSubmit={(data) => console.log('Login:', data)}
          socialProviders={['google', 'github']}
        />
      </div>
    ),
    reactCode: `import { AuthForms } from '@/components/blocks/application'

<AuthForms.Login
  onSubmit={(data) => console.log(data)}
  socialProviders={['google', 'github']}
  onForgotPassword={() => navigate('/forgot-password')}
  onSignUp={() => navigate('/signup')}
/>`,
    vueCode: `<script setup lang="ts">
import { AuthForms } from '@/components/blocks/application'

const handleSubmit = (data: { email: string; password: string }) => {
  console.log(data)
}
</script>

<template>
  <AuthForms
    variant="login"
    :social-providers="['google', 'github']"
    @submit="handleSubmit"
  />
</template>`,
  },
  {
    name: 'SignUp',
    description: 'Registration form with name, email, password, and confirmation.',
    preview: (
      <div className="flex items-center justify-center py-8 bg-background">
        <SignUpForm
          onSubmit={(data) => console.log('SignUp:', data)}
          socialProviders={['google']}
        />
      </div>
    ),
    reactCode: `import { AuthForms } from '@/components/blocks/application'

<AuthForms.SignUp
  onSubmit={(data) => console.log(data)}
  socialProviders={['google']}
  onLogin={() => navigate('/login')}
  termsLink="/terms"
  privacyLink="/privacy"
/>`,
    vueCode: `<script setup lang="ts">
import { AuthForms } from '@/components/blocks/application'
</script>

<template>
  <AuthForms
    variant="signup"
    :social-providers="['google']"
    @submit="handleSubmit"
  />
</template>`,
  },
  {
    name: 'ForgotPassword',
    description: 'Password reset request form.',
    preview: (
      <div className="flex items-center justify-center py-8 bg-background">
        <ForgotPasswordForm
          onSubmit={(email) => console.log('Reset:', email)}
          onBackToLogin={() => {}}
        />
      </div>
    ),
    reactCode: `import { AuthForms } from '@/components/blocks/application'

<AuthForms.ForgotPassword
  onSubmit={(email) => sendResetEmail(email)}
  onBackToLogin={() => navigate('/login')}
/>`,
    vueCode: `<script setup lang="ts">
import { AuthForms } from '@/components/blocks/application'
</script>

<template>
  <AuthForms
    variant="forgotPassword"
    @submit="sendResetEmail"
    @back="navigateToLogin"
  />
</template>`,
  },
  {
    name: 'OTPVerification',
    description: '6-digit OTP verification form.',
    preview: (
      <div className="flex items-center justify-center py-8 bg-background">
        <OTPVerificationForm
          email="user@example.com"
          onSubmit={(otp: string) => console.log('OTP:', otp)}
          onResend={() => console.log('Resend OTP')}
        />
      </div>
    ),
    reactCode: `import { AuthForms } from '@/components/blocks/application'

<AuthForms.OTPVerification
  email="user@example.com"
  onSubmit={(otp) => verifyOTP(otp)}
  onResend={() => resendOTP()}
  onBackToLogin={() => navigate('/login')}
/>`,
    vueCode: `<script setup lang="ts">
import { AuthForms } from '@/components/blocks/application'
</script>

<template>
  <AuthForms
    variant="otpVerification"
    email="user@example.com"
    @submit="handleVerify"
    @resend="handleResend"
  />
</template>`,
  },
  {
    name: 'SplitLayout',
    description: 'Two-column layout with branding panel.',
    preview: (
      <div className="h-[500px] overflow-hidden border-3 border-foreground">
        <AuthSplitLayout
          brandContent={
            <div className="text-primary-foreground">
              <h2 className="text-3xl font-black uppercase mb-2">BoldKit</h2>
              <p className="text-lg font-medium opacity-90">Build bold interfaces</p>
              <p className="mt-4 opacity-80">Join thousands of developers building stunning applications.</p>
            </div>
          }
        >
          <LoginForm
            onSubmit={(data) => console.log('Split Login:', data)}
            socialProviders={['google', 'github']}
          />
        </AuthSplitLayout>
      </div>
    ),
    reactCode: `import { AuthForms } from '@/components/blocks/application'

<AuthForms.SplitLayout
  brandContent={
    <div className="text-primary-foreground">
      <h2 className="text-3xl font-black">YourBrand</h2>
      <p>Your tagline here</p>
    </div>
  }
  brandBackground="bg-primary"
  position="left"
>
  <AuthForms.Login
    onSubmit={(data) => handleAuth(data)}
    socialProviders={['google', 'github']}
  />
</AuthForms.SplitLayout>`,
    vueCode: `<script setup lang="ts">
import { AuthForms } from '@/components/blocks/application'
</script>

<template>
  <AuthForms.SplitLayout brand-background="bg-primary" position="left">
    <template #brand>
      <div class="text-primary-foreground">
        <h2 class="text-3xl font-black">YourBrand</h2>
        <p>Your tagline</p>
      </div>
    </template>
    <AuthForms.Login @submit="handleAuth" />
  </AuthForms.SplitLayout>
</template>`,
  },
]

export function AuthFormsDoc() {
  return (
    <BlockDoc
      name="Auth Forms"
      description="Authentication forms including login, signup, forgot password, OTP verification, and split layout variants."
      category="application"
      variants={variants}
    />
  )
}

export default AuthFormsDoc
