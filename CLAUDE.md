# BoldKit Project Instructions

## Overview

BoldKit is a neubrutalism UI component library for React and Vue 3. Features 50+ components, 10 chart types, 45 SVG shapes, and templates with bold borders, chunky shadows, and vibrant colors.

## Tech Stack

- **React**: Radix UI primitives, Recharts, CVA, Tailwind CSS
- **Vue 3**: Reka UI primitives, vue-echarts, CVA, Tailwind CSS
- **Registry**: shadcn CLI compatible for both React and Vue

## Design Principles (Neubrutalism)

- **Borders**: 3px solid (`border-3 border-foreground`)
- **Shadows**: 4px offset (`shadow-[4px_4px_0px_hsl(var(--shadow-color))]`)
- **No border-radius**: Sharp corners everywhere
- **Typography**: Bold (700+), uppercase labels, tracking-wide
- **Hover**: translate + shadow-none effect

---

# Release Roadmap

## ✅ v2.5.0 (COMPLETED - Feb 2026)
- [x] 5 new charts (Radar, Radial Bar, Donut, Sparklines, Gauge)
- [x] Stepper/Wizard component
- [x] File Upload/Dropzone
- [x] Spinner component (5 variants)
- [x] Kbd component
- [x] Stat Card component

---

## 📦 v2.6.0 (Blocks Release) - NEXT

### Marketing Blocks (10)
- [ ] Hero Sections (5-10 variants: with image, video, split layout, centered, with shapes)
- [ ] Feature Grid (3-column, 4-column, with icons, with images)
- [ ] Testimonials (cards, carousel, single quote, with avatars)
- [ ] Logo Cloud (client/partner logos with marquee option)
- [ ] CTA Sections (newsletter signup, trial signup, contact)
- [ ] Stats Section (big numbers with labels)
- [ ] Team Section (team member cards with social links)
- [ ] FAQ Section (using Accordion component)
- [ ] Footer (multiple column layouts with newsletter)
- [ ] Contact Section (with form, map placeholder, contact info)

### Application Blocks (5)
- [ ] Auth Forms (Login, Signup, Forgot Password, OTP verification)
- [ ] Settings Page (Profile, notifications, billing tabs)
- [ ] Onboarding Flow (multi-step setup wizard)
- [ ] Error Pages (404, 500, maintenance with neubrutalism style)
- [ ] Invoice / Receipt (printable document layout)

### Component
- [ ] Empty State component

---

## 📊 v2.7.0 (Data & Forms)
- [ ] Enhanced Data Table (sorting, filtering, column resize, row selection, column visibility)
- [ ] Date Range Picker
- [ ] Time Picker
- [ ] Rating / Stars component
- [ ] Tag Input (multi-value input with removable tags)

---

## 🧭 v2.8.0 (Navigation & Advanced)
- [ ] Sidebar component (extractable reusable sidebar)
- [ ] Tree View (file explorers, nested menus)
- [ ] Timeline (activity feeds, version history, process flows)
- [ ] Carousel / Slider (image galleries, testimonials)
- [ ] Tour / Onboarding (step-by-step product tours)

---

## 🚀 v3.0.0 (Major Release)
- [ ] 10+ theme presets (Cyberpunk, Retro, Pastel, Monochrome, etc.)
- [ ] Figma design kit
- [ ] Documentation site template
- [ ] Advanced charts (Funnel, Treemap, Sankey, Heatmap)
- [ ] Animated shapes (CSS animation presets)
- [ ] Shape Builder (interactive customization tool)

---

# Component Categories

## UI Components (50+)
Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Checkbox, Collapsible, Command, Dialog, Drawer, Dropdown Menu, Dropzone, Hover Card, Input, Input OTP, Kbd, Label, Layered Card, Marquee, Pagination, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Sheet, Skeleton, Slider, Sonner, Spinner, Stat Card, Stepper, Sticker, Switch, Table, Tabs, Textarea, Toggle, Toggle Group, Tooltip

## Charts (10)
Area, Bar, Line, Pie, Horizontal Bar, Donut, Radar, Radial Bar, Gauge, Sparkline

## Shapes (45)
Badges, Decorative, Geometric, Arrows, Icons

## Templates
Dashboard, Landing Page, Pricing, Blog, Portfolio, E-commerce

---

# Registry URLs

**React:**
```bash
npx shadcn@latest add "https://boldkit.dev/r/{component}.json"
```

**Vue:**
```bash
npx shadcn-vue@latest add "https://boldkit.dev/r/vue/{component}.json"
```

---

# Commands

```bash
npm run dev           # Development server
npm run build         # Production build
npm run registry:build # Build shadcn registries
```
