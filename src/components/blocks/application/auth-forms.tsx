import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react'

// ============================================================================
// AUTH VARIANT 1: Login Form
// ============================================================================
export interface LoginFormProps {
  logo?: React.ReactNode
  title?: string
  description?: string
  onSubmit?: (data: { email: string; password: string; remember: boolean }) => void
  onForgotPassword?: () => void
  onSignUp?: () => void
  socialProviders?: Array<'google' | 'github'>
  className?: string
}

export function LoginForm({
  logo,
  title = 'Welcome back',
  description = 'Enter your credentials to access your account',
  onSubmit,
  onForgotPassword,
  onSignUp,
  socialProviders,
  className,
}: LoginFormProps) {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    remember: false,
  })
  const [showPassword, setShowPassword] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <Card>
        <CardHeader className="space-y-4 text-center">
          {logo && <div className="mx-auto">{logo}</div>}
          <div>
            <CardTitle className="text-2xl font-black uppercase">{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold uppercase text-xs">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-bold uppercase text-xs">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.remember}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, remember: checked as boolean })
                  }
                />
                <Label htmlFor="remember" className="text-sm font-medium cursor-pointer">
                  Remember me
                </Label>
              </div>
              {onForgotPassword && (
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-sm font-bold text-primary hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {socialProviders && socialProviders.length > 0 && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-foreground" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground font-bold">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {socialProviders.includes('google') && (
                    <Button variant="outline" type="button">
                      <Chrome className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                  )}
                  {socialProviders.includes('github') && (
                    <Button variant="outline" type="button">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  )}
                </div>
              </>
            )}

            {onSignUp && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onSignUp}
                  className="font-bold text-primary hover:underline"
                >
                  Sign up
                </button>
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================================
// AUTH VARIANT 2: Sign Up Form
// ============================================================================
export interface SignUpFormProps {
  logo?: React.ReactNode
  title?: string
  description?: string
  onSubmit?: (data: { name: string; email: string; password: string; terms: boolean }) => void
  onSignIn?: () => void
  socialProviders?: Array<'google' | 'github'>
  termsUrl?: string
  privacyUrl?: string
  className?: string
}

export function SignUpForm({
  logo,
  title = 'Create an account',
  description = 'Enter your details to get started',
  onSubmit,
  onSignIn,
  socialProviders,
  termsUrl = '#',
  privacyUrl = '#',
  className,
}: SignUpFormProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    terms: false,
  })
  const [showPassword, setShowPassword] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <Card>
        <CardHeader className="space-y-4 text-center">
          {logo && <div className="mx-auto">{logo}</div>}
          <div>
            <CardTitle className="text-2xl font-black uppercase">{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-bold uppercase text-xs">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email" className="font-bold uppercase text-xs">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password" className="font-bold uppercase text-xs">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.terms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, terms: checked as boolean })
                }
                required
              />
              <Label htmlFor="terms" className="text-sm leading-tight cursor-pointer">
                I agree to the{' '}
                <a href={termsUrl} className="font-bold text-primary hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href={privacyUrl} className="font-bold text-primary hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Create Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {socialProviders && socialProviders.length > 0 && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-foreground" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground font-bold">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {socialProviders.includes('google') && (
                    <Button variant="outline" type="button">
                      <Chrome className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                  )}
                  {socialProviders.includes('github') && (
                    <Button variant="outline" type="button">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  )}
                </div>
              </>
            )}

            {onSignIn && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onSignIn}
                  className="font-bold text-primary hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================================
// AUTH VARIANT 3: Forgot Password Form
// ============================================================================
export interface ForgotPasswordFormProps {
  logo?: React.ReactNode
  title?: string
  description?: string
  onSubmit?: (email: string) => void
  onBackToLogin?: () => void
  className?: string
}

export function ForgotPasswordForm({
  logo,
  title = 'Forgot password?',
  description = "No worries, we'll send you reset instructions.",
  onSubmit,
  onBackToLogin,
  className,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(email)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={cn('w-full max-w-md mx-auto', className)}>
        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <div className="w-16 h-16 mx-auto flex items-center justify-center border-3 border-foreground bg-success/20 shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
              <Mail className="h-8 w-8 text-success" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase">Check your email</h3>
              <p className="text-sm text-muted-foreground mt-2">
                We sent a password reset link to{' '}
                <span className="font-bold text-foreground">{email}</span>
              </p>
            </div>
            <Button variant="outline" className="w-full" onClick={onBackToLogin}>
              Back to login
            </Button>
            <p className="text-xs text-muted-foreground">
              Didn't receive the email?{' '}
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="font-bold text-primary hover:underline"
              >
                Click to resend
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <Card>
        <CardHeader className="space-y-4 text-center">
          {logo && <div className="mx-auto">{logo}</div>}
          <div>
            <CardTitle className="text-2xl font-black uppercase">{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="font-bold uppercase text-xs">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Send Reset Link
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {onBackToLogin && (
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={onBackToLogin}
              >
                Back to login
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================================
// AUTH VARIANT 4: OTP Verification Form
// ============================================================================
export interface OTPVerificationFormProps {
  logo?: React.ReactNode
  title?: string
  description?: string
  email?: string
  length?: number
  onSubmit?: (otp: string) => void
  onResend?: () => void
  onBackToLogin?: () => void
  className?: string
}

export function OTPVerificationForm({
  logo,
  title = 'Verify your email',
  description,
  email,
  length = 6,
  onSubmit,
  onResend,
  onBackToLogin,
  className,
}: OTPVerificationFormProps) {
  const [otp, setOtp] = React.useState<string[]>(new Array(length).fill(''))
  const inputRefs = React.useRef<HTMLInputElement[]>([])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    if (newOtp.every((digit) => digit !== '') && newOtp.join('').length === length) {
      onSubmit?.(newOtp.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, length)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split('').forEach((char, index) => {
      if (index < length) newOtp[index] = char
    })
    setOtp(newOtp)

    if (newOtp.every((digit) => digit !== '')) {
      onSubmit?.(newOtp.join(''))
    }
  }

  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <Card>
        <CardHeader className="space-y-4 text-center">
          {logo && <div className="mx-auto">{logo}</div>}
          <div>
            <CardTitle className="text-2xl font-black uppercase">{title}</CardTitle>
            <CardDescription className="mt-2">
              {description ||
                `We sent a ${length}-digit code to ${email || 'your email'}. Enter it below.`}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => { if (el) inputRefs.current[index] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-14 text-center text-2xl font-black"
              />
            ))}
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={() => onSubmit?.(otp.join(''))}
            disabled={otp.some((digit) => digit === '')}
          >
            Verify
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="text-center space-y-2">
            {onResend && (
              <p className="text-sm text-muted-foreground">
                Didn't receive a code?{' '}
                <button
                  type="button"
                  onClick={onResend}
                  className="font-bold text-primary hover:underline"
                >
                  Resend
                </button>
              </p>
            )}
            {onBackToLogin && (
              <Button variant="ghost" size="sm" onClick={onBackToLogin}>
                Back to login
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================================
// AUTH VARIANT 5: Split Auth Layout
// ============================================================================
export interface AuthSplitLayoutProps {
  children: React.ReactNode
  brandContent?: React.ReactNode
  brandBackground?: string
  position?: 'left' | 'right'
  className?: string
}

export function AuthSplitLayout({
  children,
  brandContent,
  brandBackground = 'bg-primary',
  position = 'left',
  className,
}: AuthSplitLayoutProps) {
  return (
    <div className={cn('min-h-screen flex', className)}>
      {position === 'left' && brandContent && (
        <div
          className={cn(
            'hidden lg:flex lg:w-1/2 flex-col justify-center p-12',
            brandBackground
          )}
        >
          {brandContent}
        </div>
      )}

      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        {children}
      </div>

      {position === 'right' && brandContent && (
        <div
          className={cn(
            'hidden lg:flex lg:w-1/2 flex-col justify-center p-12',
            brandBackground
          )}
        >
          {brandContent}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// Export all variants
// ============================================================================
export const AuthForms = {
  Login: LoginForm,
  SignUp: SignUpForm,
  ForgotPassword: ForgotPasswordForm,
  OTPVerification: OTPVerificationForm,
  SplitLayout: AuthSplitLayout,
}
