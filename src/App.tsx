import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/hooks/use-theme'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { Home, Components, ThemeBuilder } from '@/pages'
import { DocsLayout } from '@/layouts/DocsLayout'
import { Introduction, Installation, ButtonDoc } from '@/pages/docs'
import '@/styles/globals.css'

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/components" element={<Components />} />
            <Route path="/themes" element={<ThemeBuilder />} />

            {/* Documentation routes */}
            <Route path="/docs" element={<DocsLayout />}>
              <Route index element={<Introduction />} />
              <Route path="installation" element={<Installation />} />
              <Route path="theming" element={<ThemeBuilder />} />
              <Route path="button" element={<ButtonDoc />} />
              {/* More component docs can be added here */}
              <Route path="*" element={<Introduction />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
