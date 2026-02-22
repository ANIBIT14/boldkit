import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Sticker } from '@/components/ui/sticker'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ExplosionShape } from '@/components/ui/shapes'
import { SEO } from '@/components/SEO'
import {
  Star,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  CreditCard,
  Minus,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Moon,
  Sun,
} from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'

// ============================================
// PRODUCT TEMPLATE - NEUBRUTALISM STYLE
// ============================================
// An e-commerce product detail page with gallery, variants, and reviews

const product = {
  name: 'Bold Sneakers X1',
  tagline: 'The Ultimate Street Style Statement',
  price: 189,
  originalPrice: 249,
  rating: 4.8,
  reviewCount: 127,
  description: 'Step into the future with the Bold Sneakers X1. Featuring our signature neubrutalist design language, premium materials, and unmatched comfort. These aren\'t just shoes – they\'re a statement.',
  features: [
    'Premium leather and mesh upper',
    'Memory foam insole for all-day comfort',
    'Bold geometric sole design',
    'Reflective accents for visibility',
    'Sustainable materials',
  ],
  specs: [
    { name: 'Material', value: 'Leather, Mesh, Rubber' },
    { name: 'Weight', value: '320g (Size 10)' },
    { name: 'Sole Height', value: '3.5cm' },
    { name: 'Origin', value: 'Made in Portugal' },
    { name: 'Care', value: 'Spot clean with damp cloth' },
  ],
  images: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80',
  ],
  colors: [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Blue', value: '#3B82F6' },
  ],
  sizes: ['7', '8', '9', '10', '11', '12'],
}

const reviews = [
  {
    id: 1,
    author: 'Alex M.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    rating: 5,
    date: 'Jan 10, 2025',
    title: 'Best sneakers I\'ve ever owned',
    content: 'The quality is outstanding and the design turns heads everywhere I go. Comfortable right out of the box. Worth every penny!',
    verified: true,
    helpful: 24,
  },
  {
    id: 2,
    author: 'Jordan K.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan',
    rating: 4,
    date: 'Jan 8, 2025',
    title: 'Great design, runs slightly large',
    content: 'Love the bold look and the comfort is great. Just note that they run about half a size large, so consider sizing down.',
    verified: true,
    helpful: 18,
  },
  {
    id: 3,
    author: 'Sam T.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sam',
    rating: 5,
    date: 'Jan 5, 2025',
    title: 'Statement piece!',
    content: 'These sneakers are fire! The neubrutalist design is exactly what I was looking for. Pairs perfectly with everything.',
    verified: true,
    helpful: 15,
  },
]

const relatedProducts = [
  {
    name: 'Bold Runner Pro',
    price: 159,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&q=80',
    rating: 4.6,
  },
  {
    name: 'Street Classic',
    price: 129,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&q=80',
    rating: 4.9,
  },
  {
    name: 'Urban High-Top',
    price: 179,
    image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=400&q=80',
    rating: 4.7,
  },
  {
    name: 'Retro Wave',
    price: 149,
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&q=80',
    rating: 4.5,
  },
]

const ratingDistribution = [
  { stars: 5, percentage: 72 },
  { stars: 4, percentage: 18 },
  { stars: 3, percentage: 7 },
  { stars: 2, percentage: 2 },
  { stars: 1, percentage: 1 },
]

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' }) {
  const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${
            star <= rating ? 'fill-warning text-warning' : 'fill-muted text-muted-foreground'
          }`}
        />
      ))}
    </div>
  )
}

export function ProductTemplate() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const { resolvedTheme, setTheme } = useTheme()
  const [isThemeAnimating, setIsThemeAnimating] = useState(false)

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const handleThemeToggle = () => {
    setIsThemeAnimating(true)
    setTimeout(() => {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      setTimeout(() => {
        setIsThemeAnimating(false)
      }, 200)
    }, 200)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Transition Overlay */}
      <div
        className={`fixed inset-0 z-[100] pointer-events-none bg-foreground transition-opacity duration-200 ${
          isThemeAnimating ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Floating Theme Toggle */}
      <button
        onClick={handleThemeToggle}
        className="fixed bottom-24 right-6 z-[9999] h-14 w-14 rounded-full border-4 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--foreground))] flex items-center justify-center hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_hsl(var(--foreground))] transition-all lg:bottom-6"
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>

      <SEO
        title="Product Template"
        description="An e-commerce product detail page template with image gallery, variant selectors, reviews, and related products. Built with BoldKit neubrutalism components."
        keywords="product template, ecommerce template, product page, react product, vue product, neubrutalism ecommerce"
        canonical="https://boldkit.dev/templates/product"
        breadcrumbs={[
          { name: 'Home', url: 'https://boldkit.dev/' },
          { name: 'Templates', url: 'https://boldkit.dev/templates' },
          { name: 'Product' },
        ]}
      />

      {/* Navigation */}
      <nav className="border-b-3 border-foreground bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary border-3 border-foreground" />
            <span className="font-black text-xl uppercase">BoldStore</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="font-bold hover:text-primary transition-colors">Men</a>
            <a href="#" className="font-bold hover:text-primary transition-colors">Women</a>
            <a href="#" className="font-bold text-primary">Sneakers</a>
            <a href="#" className="font-bold hover:text-primary transition-colors">New</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center border-2 border-foreground">
                2
              </span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="border-b-3 border-foreground bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Sneakers</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Product Hero */}
      <section className="py-8 md:py-12 border-b-3 border-foreground">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative">
                <AspectRatio ratio={1} className="bg-muted border-3 border-foreground overflow-hidden">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                {/* Sale Badge */}
                <Sticker variant="destructive" className="absolute top-4 left-4">
                  -{discount}%
                </Sticker>
                {/* Navigation */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background"
                  onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background"
                  onClick={() => setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-3">
                {product.images.map((image, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 border-3 ${
                      i === selectedImage ? 'border-primary' : 'border-foreground'
                    } overflow-hidden bg-muted`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="accent" className="mb-3">New Release</Badge>
                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground">{product.tagline}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <StarRating rating={Math.round(product.rating)} />
                <span className="font-bold">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black">${product.price}</span>
                <span className="text-2xl text-muted-foreground line-through">${product.originalPrice}</span>
                <div className="relative">
                  <ExplosionShape size={50} className="text-destructive" />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-destructive-foreground">
                    SALE
                  </span>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <Label className="font-bold uppercase text-sm mb-3 block">
                  Color: <span className="font-normal">{selectedColor}</span>
                </Label>
                <RadioGroup
                  value={selectedColor}
                  onValueChange={setSelectedColor}
                  className="flex gap-3"
                >
                  {product.colors.map((color) => (
                    <div key={color.name} className="relative">
                      <RadioGroupItem
                        value={color.name}
                        id={color.name}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={color.name}
                        className={`w-10 h-10 border-3 cursor-pointer flex items-center justify-center peer-data-[state=checked]:border-primary ${
                          color.value === '#FFFFFF' ? 'border-foreground' : 'border-foreground'
                        }`}
                        style={{ backgroundColor: color.value }}
                      >
                        {selectedColor === color.name && (
                          <Check className={`h-5 w-5 ${color.value === '#000000' || color.value === '#3B82F6' ? 'text-white' : 'text-foreground'}`} />
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="font-bold uppercase text-sm">Size</Label>
                  <a href="#" className="text-sm font-bold text-primary hover:underline">
                    Size Guide
                  </a>
                </div>
                <RadioGroup
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-2"
                >
                  {product.sizes.map((size) => (
                    <div key={size}>
                      <RadioGroupItem
                        value={size}
                        id={`size-${size}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className="w-14 h-10 border-3 border-foreground cursor-pointer flex items-center justify-center font-bold peer-data-[state=checked]:bg-foreground peer-data-[state=checked]:text-background hover:bg-muted transition-colors"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Quantity */}
              <div>
                <Label className="font-bold uppercase text-sm mb-3 block">Quantity</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="w-16 h-10 border-3 border-foreground flex items-center justify-center font-bold">
                    {quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button size="lg" className="flex-1 gap-2" animation="pulse" disabled={!selectedSize}>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t-2 border-foreground/10">
                {[
                  { icon: Truck, text: 'Free Shipping' },
                  { icon: RotateCcw, text: '30-Day Returns' },
                  { icon: Shield, text: '2-Year Warranty' },
                  { icon: CreditCard, text: 'Secure Payment' },
                ].map((badge) => (
                  <div key={badge.text} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-success/20 border-2 border-foreground flex items-center justify-center">
                      <badge.icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 border-b-3 border-foreground">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="description" className="max-w-4xl mx-auto">
            <TabsList className="mb-6">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-6">
              <p className="text-lg">{product.description}</p>
              <div>
                <h3 className="font-bold uppercase mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-success border-2 border-foreground flex items-center justify-center">
                        <Check className="h-3 w-3 text-success-foreground" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specifications">
              <div className="border-3 border-foreground">
                {product.specs.map((spec, i) => (
                  <div
                    key={spec.name}
                    className={`flex justify-between p-4 ${i % 2 === 0 ? 'bg-muted/30' : ''} ${
                      i !== product.specs.length - 1 ? 'border-b-2 border-foreground/20' : ''
                    }`}
                  >
                    <span className="font-bold">{spec.name}</span>
                    <span className="text-muted-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-8">
              {/* Rating Summary */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-primary/5">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl font-black mb-2">{product.rating}</div>
                    <StarRating rating={Math.round(product.rating)} />
                    <p className="text-muted-foreground mt-2">Based on {product.reviewCount} reviews</p>
                  </CardContent>
                </Card>
                <div className="space-y-2">
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center gap-3">
                      <span className="w-8 text-sm font-bold">{item.stars}★</span>
                      <Progress value={item.percentage} className="flex-1 h-3" />
                      <span className="w-12 text-sm text-muted-foreground">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="border-2 border-foreground">
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{review.author}</span>
                              {review.verified && (
                                <Badge variant="success" className="text-xs">Verified</Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      <h4 className="font-bold mb-2">{review.title}</h4>
                      <p className="text-muted-foreground">{review.content}</p>
                      <div className="mt-4 flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Helpful ({review.helpful})
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline" size="lg">
                  Load More Reviews
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tight">You May Also Like</h2>
            <Button variant="ghost" className="gap-2">
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((item) => (
              <Card key={item.name} className="group overflow-hidden hover:translate-y-[-4px] hover:shadow-[6px_6px_0px_hsl(var(--shadow-color))] transition-all">
                <AspectRatio ratio={1} className="bg-muted overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </AspectRatio>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-black">${item.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="text-sm">{item.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Cart Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t-3 border-foreground p-4 flex items-center justify-between gap-4 lg:hidden z-40">
        <div>
          <p className="font-black text-xl">${product.price}</p>
          <p className="text-sm text-muted-foreground line-through">${product.originalPrice}</p>
        </div>
        <Button size="lg" className="flex-1 gap-2" disabled={!selectedSize}>
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </Button>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background mt-16 lg:mt-0">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary border-3 border-background" />
                <span className="font-black text-xl uppercase">BoldStore</span>
              </div>
              <p className="text-background/70">
                Premium streetwear with bold designs.
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase mb-4">Shop</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-background">Men</a></li>
                <li><a href="#" className="hover:text-background">Women</a></li>
                <li><a href="#" className="hover:text-background">New Arrivals</a></li>
                <li><a href="#" className="hover:text-background">Sale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase mb-4">Help</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-background">Size Guide</a></li>
                <li><a href="#" className="hover:text-background">Shipping</a></li>
                <li><a href="#" className="hover:text-background">Returns</a></li>
                <li><a href="#" className="hover:text-background">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase mb-4">Legal</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-background">Privacy</a></li>
                <li><a href="#" className="hover:text-background">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-background/50">
            <p>&copy; 2025 BoldStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ProductTemplate
