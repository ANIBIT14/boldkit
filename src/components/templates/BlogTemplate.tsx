import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ScribbleUnderline, Star5Shape, BurstShape } from '@/components/ui/shapes'
import { SEO } from '@/components/SEO'
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Mail,
  Twitter,
  Github,
  Rss,
  Moon,
  Sun,
} from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'

// ============================================
// BLOG TEMPLATE - NEUBRUTALISM STYLE
// ============================================
// An editorial magazine-style blog with asymmetric grids

interface ArticleCardProps {
  title: string
  excerpt: string
  category: string
  categoryColor: string
  author: string
  authorAvatar: string
  date: string
  readTime: string
  image: string
  featured?: boolean
  size?: 'small' | 'medium' | 'large'
}

function ArticleCard({
  title,
  excerpt,
  category,
  categoryColor,
  author,
  authorAvatar,
  date,
  readTime,
  image,
  featured,
  size = 'medium',
}: ArticleCardProps) {
  const isLarge = size === 'large' || featured

  return (
    <Card className={`group overflow-hidden ${isLarge ? 'md:col-span-2 md:row-span-2' : ''} hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all`}>
      <div className={isLarge ? 'md:flex' : ''}>
        {/* Image */}
        <div className={`relative overflow-hidden ${isLarge ? 'md:w-1/2' : ''}`}>
          <AspectRatio ratio={isLarge ? 4/3 : 16/9}>
            <div
              className="w-full h-full bg-muted bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
              style={{ backgroundImage: `url(${image})` }}
            />
          </AspectRatio>
          {/* Category bar */}
          <div className={`absolute top-0 left-0 w-2 h-full ${categoryColor}`} />
          {featured && (
            <div className="absolute top-4 right-4">
              <Badge variant="warning" className="shadow-[2px_2px_0px_hsl(var(--shadow-color))]">
                Featured
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className={`p-5 ${isLarge ? 'md:w-1/2 md:p-8 md:flex md:flex-col md:justify-center' : ''}`}>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className={`${categoryColor} text-foreground border-foreground`}>
              {category}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readTime}
            </span>
          </div>

          <h3 className={`font-black uppercase tracking-tight mb-2 group-hover:text-primary transition-colors ${isLarge ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
            {title}
          </h3>

          <p className={`text-muted-foreground mb-4 ${isLarge ? '' : 'line-clamp-2'}`}>
            {excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border-2 border-foreground">
                <AvatarImage src={authorAvatar} />
                <AvatarFallback>{author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-bold">{author}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {date}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Read <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

const categories = [
  { name: 'All', count: 48, active: true },
  { name: 'Design', count: 12 },
  { name: 'Development', count: 18 },
  { name: 'Product', count: 8 },
  { name: 'Marketing', count: 6 },
  { name: 'Startup', count: 4 },
]

const featuredArticle = {
  title: 'The Future of Design Systems in 2025',
  excerpt: 'Explore how design systems are evolving with AI-powered tools, token-based workflows, and cross-platform consistency. Learn what the next generation of design infrastructure looks like.',
  category: 'Design',
  categoryColor: 'bg-primary',
  author: 'Sarah Chen',
  authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
  date: 'Jan 15, 2025',
  readTime: '8 min read',
  image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
  featured: true,
}

const articles = [
  {
    title: 'Building Accessible Components',
    excerpt: 'A comprehensive guide to creating truly accessible UI components that work for everyone.',
    category: 'Development',
    categoryColor: 'bg-info',
    author: 'Mike Johnson',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    date: 'Jan 14, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  },
  {
    title: 'Neubrutalism: More Than a Trend',
    excerpt: 'Why this bold design style is here to stay and how to implement it effectively.',
    category: 'Design',
    categoryColor: 'bg-primary',
    author: 'Emily Davis',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
    date: 'Jan 13, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
  },
  {
    title: 'Scaling Your Startup Design Team',
    excerpt: 'Lessons learned from growing a design team from 1 to 50 designers.',
    category: 'Startup',
    categoryColor: 'bg-warning',
    author: 'Alex Kim',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    date: 'Jan 12, 2025',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
  },
  {
    title: 'The Psychology of Color in UI',
    excerpt: 'Understanding how color affects user behavior and decision making.',
    category: 'Design',
    categoryColor: 'bg-primary',
    author: 'Jordan Lee',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan',
    date: 'Jan 11, 2025',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=600&q=80',
  },
  {
    title: 'React Server Components Deep Dive',
    excerpt: 'Everything you need to know about RSC and how to use them effectively.',
    category: 'Development',
    categoryColor: 'bg-info',
    author: 'Taylor Swift',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=taylor',
    date: 'Jan 10, 2025',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
  },
  {
    title: 'Marketing for Developers',
    excerpt: 'How to market your side projects without feeling like a salesperson.',
    category: 'Marketing',
    categoryColor: 'bg-accent',
    author: 'Chris Anderson',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chris',
    date: 'Jan 9, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  },
]

const trendingArticles = [
  { title: 'Why Tailwind CSS Won', views: '12.5k' },
  { title: 'The Death of Third-Party Cookies', views: '8.2k' },
  { title: 'AI Will Not Replace Designers', views: '7.8k' },
  { title: 'TypeScript Best Practices 2025', views: '6.4k' },
]

const recentArticles = [
  { title: 'Understanding CSS Container Queries', date: 'Jan 8' },
  { title: 'The Art of Code Reviews', date: 'Jan 7' },
  { title: 'Building a Design System from Scratch', date: 'Jan 6' },
]

export function BlogTemplate() {
  const { resolvedTheme, setTheme } = useTheme()
  const [isThemeAnimating, setIsThemeAnimating] = useState(false)

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
        className="fixed bottom-6 right-6 z-[9999] h-14 w-14 rounded-full border-4 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--foreground))] flex items-center justify-center hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_hsl(var(--foreground))] transition-all"
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>

      <SEO
        title="Blog Template"
        description="An editorial magazine-style blog template with asymmetric grids, featured articles, and newsletter signup. Built with BoldKit neubrutalism components."
        keywords="blog template, magazine template, editorial template, react blog, vue blog, neubrutalism blog"
        canonical="https://boldkit.dev/templates/blog"
        breadcrumbs={[
          { name: 'Home', url: 'https://boldkit.dev/' },
          { name: 'Templates', url: 'https://boldkit.dev/templates' },
          { name: 'Blog' },
        ]}
      />

      {/* Header */}
      <header className="border-b-3 border-foreground bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <a href="#" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-foreground border-3 border-foreground flex items-center justify-center">
                  <span className="text-background font-black text-xl">B</span>
                </div>
                <span className="font-black text-xl uppercase hidden sm:block">Blog</span>
              </a>

              <nav className="hidden md:flex items-center gap-6">
                {['Design', 'Development', 'Product', 'About'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="font-bold text-sm uppercase hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Rss className="h-5 w-5" />
              </Button>
              <Button className="hidden sm:flex">Subscribe</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <section className="border-b-3 border-foreground bg-muted/30">
        <div className="container mx-auto px-4 py-4 overflow-x-auto">
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat.name}
                variant={cat.active ? 'default' : 'outline'}
                className="cursor-pointer shrink-0"
              >
                {cat.name}
                <span className="ml-1 text-xs opacity-70">({cat.count})</span>
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="border-b-3 border-foreground py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Star5Shape size={24} className="text-warning" />
            <h2 className="text-sm font-black uppercase tracking-wide">Featured Article</h2>
          </div>
          <ArticleCard {...featuredArticle} size="large" />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Articles Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black uppercase tracking-tight">Latest Articles</h2>
                <div className="hidden sm:flex items-center gap-2 border-3 border-foreground p-1">
                  <Button variant="ghost" size="sm" className="font-bold">
                    Recent
                  </Button>
                  <Button variant="ghost" size="sm" className="font-bold text-muted-foreground">
                    Popular
                  </Button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {articles.map((article, i) => (
                  <ArticleCard key={i} {...article} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button variant="outline" size="icon" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? 'default' : 'outline'}
                    size="icon"
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Search */}
              <div className="border-3 border-foreground p-4 bg-muted/30">
                <h3 className="font-bold uppercase text-sm mb-3">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search articles..." className="pl-9" />
                </div>
              </div>

              {/* Trending */}
              <div className="border-3 border-foreground p-4 bg-warning/10">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-4 w-4" />
                  <h3 className="font-bold uppercase text-sm">Trending</h3>
                </div>
                <div className="space-y-3">
                  {trendingArticles.map((article, i) => (
                    <a
                      key={i}
                      href="#"
                      className="flex items-start gap-3 group"
                    >
                      <span className="text-2xl font-black text-muted-foreground group-hover:text-primary transition-colors">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="font-bold text-sm group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{article.views} views</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Recent */}
              <div className="border-3 border-foreground p-4">
                <h3 className="font-bold uppercase text-sm mb-4">Recent Posts</h3>
                <div className="space-y-3">
                  {recentArticles.map((article, i) => (
                    <a
                      key={i}
                      href="#"
                      className="block group"
                    >
                      <p className="font-bold text-sm group-hover:text-primary transition-colors line-clamp-1">
                        {article.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{article.date}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="border-3 border-foreground p-4 bg-muted/30">
                <h3 className="font-bold uppercase text-sm mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(1).map((cat) => (
                    <Badge key={cat.name} variant="outline" className="cursor-pointer">
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Grid Breaking */}
      <section className="relative border-y-3 border-foreground bg-primary py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 diagonal-pattern opacity-20" />
        <BurstShape size={100} className="absolute top-10 right-10 text-warning hidden lg:block" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-4">
              <ScribbleUnderline size={150} className="text-primary-foreground mx-auto" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-primary-foreground mb-4">
              Never Miss a Post
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Subscribe to our newsletter and get the latest articles delivered straight to your inbox.
              No spam, unsubscribe anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-background flex-1"
              />
              <Button variant="secondary" size="lg" className="gap-2 shrink-0">
                <Mail className="h-4 w-4" />
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-primary-foreground/60 mt-4">
              Join 10,000+ subscribers • Weekly digest
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary border-3 border-background" />
                <span className="font-black text-xl uppercase">Blog</span>
              </div>
              <p className="text-background/70 mb-4">
                Insights on design, development, and building great products.
              </p>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
                  <Rss className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-bold uppercase mb-4">Categories</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-background">Design</a></li>
                <li><a href="#" className="hover:text-background">Development</a></li>
                <li><a href="#" className="hover:text-background">Product</a></li>
                <li><a href="#" className="hover:text-background">Marketing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase mb-4">Company</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-background">About</a></li>
                <li><a href="#" className="hover:text-background">Authors</a></li>
                <li><a href="#" className="hover:text-background">Contact</a></li>
                <li><a href="#" className="hover:text-background">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase mb-4">Legal</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-background">Privacy</a></li>
                <li><a href="#" className="hover:text-background">Terms</a></li>
                <li><a href="#" className="hover:text-background">RSS Feed</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-background/50">
            <p>&copy; 2025 Blog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default BlogTemplate
