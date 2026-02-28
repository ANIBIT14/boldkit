<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import Checkbox from '@/components/ui/Checkbox.vue'
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Github } from 'lucide-vue-next'

type AuthFormVariant = 'login' | 'signup' | 'forgotPassword' | 'otpVerification' | 'splitLayout'

type SocialProvider = 'google' | 'github' | 'twitter'

interface AuthFormsProps {
  variant?: AuthFormVariant
  socialProviders?: SocialProvider[]
  backgroundImage?: string
  class?: string
}

const props = withDefaults(defineProps<AuthFormsProps>(), {
  variant: 'login',
  socialProviders: () => [],
})

const emit = defineEmits<{
  (e: 'submit', data: Record<string, string>): void
  (e: 'socialLogin', provider: SocialProvider): void
  (e: 'back'): void
}>()

const showPassword = ref(false)
const email = ref('')
const password = ref('')
const name = ref('')
const confirmPassword = ref('')
const rememberMe = ref(false)
const otpValues = ref(['', '', '', '', '', ''])
const inputRefs = ref<HTMLInputElement[]>([])

const handleOtpInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value

  if (value && index < 5) {
    inputRefs.value[index + 1]?.focus()
  }
}

const handleOtpKeydown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && !otpValues.value[index] && index > 0) {
    inputRefs.value[index - 1]?.focus()
  }
}

const handleSubmit = () => {
  if (props.variant === 'login') {
    emit('submit', { email: email.value, password: password.value, rememberMe: String(rememberMe.value) })
  } else if (props.variant === 'signup') {
    emit('submit', { name: name.value, email: email.value, password: password.value })
  } else if (props.variant === 'forgotPassword') {
    emit('submit', { email: email.value })
  } else if (props.variant === 'otpVerification') {
    emit('submit', { otp: otpValues.value.join('') })
  }
}
</script>

<template>
  <!-- Login Variant -->
  <div
    v-if="variant === 'login'"
    :class="cn('flex items-center justify-center min-h-screen p-4', props.class)"
  >
    <Card class="w-full max-w-md shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
      <CardHeader class="text-center">
        <CardTitle class="text-2xl uppercase">Welcome Back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <div class="relative">
              <Mail class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="email" v-model="email" type="email" placeholder="you@example.com" class="pl-10" required />
            </div>
          </div>
          <div class="space-y-2">
            <Label for="password">Password</Label>
            <div class="relative">
              <Lock class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="pl-10 pr-10"
                required
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                @click="showPassword = !showPassword"
              >
                <EyeOff v-if="showPassword" class="h-5 w-5" />
                <Eye v-else class="h-5 w-5" />
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Checkbox id="remember" v-model:checked="rememberMe" />
              <Label for="remember" class="text-sm cursor-pointer">Remember me</Label>
            </div>
            <a href="#" class="text-sm text-primary hover:underline font-medium">Forgot password?</a>
          </div>
          <Button type="submit" class="w-full">Sign In</Button>
        </form>

        <div v-if="socialProviders.length > 0" class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t-3 border-foreground" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-card px-2 text-muted-foreground font-bold uppercase">Or continue with</span>
            </div>
          </div>
          <div class="mt-4 flex gap-3">
            <Button
              v-for="provider in socialProviders"
              :key="provider"
              variant="outline"
              class="flex-1"
              @click="emit('socialLogin', provider)"
            >
              <Github v-if="provider === 'github'" class="h-5 w-5" />
              <span v-else class="font-bold">{{ provider[0].toUpperCase() }}</span>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter class="justify-center">
        <p class="text-sm text-muted-foreground">
          Don't have an account?
          <a href="#" class="text-primary hover:underline font-bold">Sign up</a>
        </p>
      </CardFooter>
    </Card>
  </div>

  <!-- SignUp Variant -->
  <div
    v-else-if="variant === 'signup'"
    :class="cn('flex items-center justify-center min-h-screen p-4', props.class)"
  >
    <Card class="w-full max-w-md shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
      <CardHeader class="text-center">
        <CardTitle class="text-2xl uppercase">Create Account</CardTitle>
        <CardDescription>Enter your details to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div class="space-y-2">
            <Label for="name">Full Name</Label>
            <div class="relative">
              <User class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="name" v-model="name" placeholder="John Doe" class="pl-10" required />
            </div>
          </div>
          <div class="space-y-2">
            <Label for="signup-email">Email</Label>
            <div class="relative">
              <Mail class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="signup-email" v-model="email" type="email" placeholder="you@example.com" class="pl-10" required />
            </div>
          </div>
          <div class="space-y-2">
            <Label for="signup-password">Password</Label>
            <div class="relative">
              <Lock class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="signup-password" v-model="password" type="password" placeholder="••••••••" class="pl-10" required />
            </div>
          </div>
          <div class="space-y-2">
            <Label for="confirm-password">Confirm Password</Label>
            <div class="relative">
              <Lock class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="confirm-password" v-model="confirmPassword" type="password" placeholder="••••••••" class="pl-10" required />
            </div>
          </div>
          <Button type="submit" class="w-full">Create Account</Button>
        </form>
      </CardContent>
      <CardFooter class="justify-center">
        <p class="text-sm text-muted-foreground">
          Already have an account?
          <a href="#" class="text-primary hover:underline font-bold">Sign in</a>
        </p>
      </CardFooter>
    </Card>
  </div>

  <!-- ForgotPassword Variant -->
  <div
    v-else-if="variant === 'forgotPassword'"
    :class="cn('flex items-center justify-center min-h-screen p-4', props.class)"
  >
    <Card class="w-full max-w-md shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
      <CardHeader class="text-center">
        <CardTitle class="text-2xl uppercase">Reset Password</CardTitle>
        <CardDescription>
          Enter your email and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div class="space-y-2">
            <Label for="reset-email">Email</Label>
            <div class="relative">
              <Mail class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="reset-email" v-model="email" type="email" placeholder="you@example.com" class="pl-10" required />
            </div>
          </div>
          <Button type="submit" class="w-full">Send Reset Link</Button>
        </form>
      </CardContent>
      <CardFooter class="justify-center">
        <Button variant="ghost" class="gap-2" @click="emit('back')">
          <ArrowLeft class="h-4 w-4" />
          Back to login
        </Button>
      </CardFooter>
    </Card>
  </div>

  <!-- OTP Verification Variant -->
  <div
    v-else-if="variant === 'otpVerification'"
    :class="cn('flex items-center justify-center min-h-screen p-4', props.class)"
  >
    <Card class="w-full max-w-md shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
      <CardHeader class="text-center">
        <CardTitle class="text-2xl uppercase">Verify Code</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div class="flex justify-center gap-3">
            <input
              v-for="(_, index) in otpValues"
              :key="index"
              :ref="(el) => { if (el) inputRefs[index] = el as HTMLInputElement }"
              v-model="otpValues[index]"
              type="text"
              maxlength="1"
              class="w-12 h-14 text-center text-2xl font-black border-3 border-foreground shadow-[3px_3px_0px_hsl(var(--shadow-color))] focus:outline-none focus:ring-2 focus:ring-primary"
              @input="(e) => handleOtpInput(index, e)"
              @keydown="(e) => handleOtpKeydown(index, e)"
            />
          </div>
          <Button type="submit" class="w-full">Verify</Button>
        </form>
      </CardContent>
      <CardFooter class="flex-col gap-4">
        <p class="text-sm text-muted-foreground text-center">
          Didn't receive the code?
          <button type="button" class="text-primary hover:underline font-bold">Resend</button>
        </p>
        <Button variant="ghost" class="gap-2" @click="emit('back')">
          <ArrowLeft class="h-4 w-4" />
          Back
        </Button>
      </CardFooter>
    </Card>
  </div>

  <!-- SplitLayout Variant -->
  <div
    v-else-if="variant === 'splitLayout'"
    :class="cn('grid lg:grid-cols-2 min-h-screen', props.class)"
  >
    <div
      class="hidden lg:flex flex-col justify-between p-12 bg-primary text-primary-foreground"
      :style="backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
    >
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 border-3 border-primary-foreground" />
        <span class="font-black uppercase text-xl">BoldKit</span>
      </div>
      <div class="space-y-4">
        <h2 class="text-4xl font-black uppercase">Build bold interfaces</h2>
        <p class="text-primary-foreground/80 text-lg font-medium">
          Join thousands of developers building stunning applications with BoldKit.
        </p>
      </div>
      <p class="text-sm text-primary-foreground/60">
        © 2024 BoldKit. All rights reserved.
      </p>
    </div>

    <div class="flex items-center justify-center p-8 bg-background">
      <div class="w-full max-w-md space-y-8">
        <div class="text-center">
          <h1 class="text-3xl font-black uppercase">Sign In</h1>
          <p class="text-muted-foreground mt-2">Enter your credentials to continue</p>
        </div>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div class="space-y-2">
            <Label for="split-email">Email</Label>
            <Input id="split-email" v-model="email" type="email" placeholder="you@example.com" required />
          </div>
          <div class="space-y-2">
            <Label for="split-password">Password</Label>
            <Input id="split-password" v-model="password" type="password" placeholder="••••••••" required />
          </div>
          <Button type="submit" class="w-full">Sign In</Button>
        </form>

        <div v-if="socialProviders.length > 0">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t-3 border-foreground" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-background px-2 text-muted-foreground font-bold uppercase">Or</span>
            </div>
          </div>
          <div class="mt-4 flex gap-3">
            <Button
              v-for="provider in socialProviders"
              :key="provider"
              variant="outline"
              class="flex-1"
              @click="emit('socialLogin', provider)"
            >
              <Github v-if="provider === 'github'" class="h-5 w-5 mr-2" />
              {{ provider }}
            </Button>
          </div>
        </div>

        <p class="text-center text-sm text-muted-foreground">
          Don't have an account?
          <a href="#" class="text-primary hover:underline font-bold">Sign up</a>
        </p>
      </div>
    </div>
  </div>
</template>
