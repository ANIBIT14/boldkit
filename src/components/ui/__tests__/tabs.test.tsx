import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/test-utils'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs'

describe('Tabs', () => {
  const renderTabs = (props = {}) => {
    return render(
      <Tabs defaultValue="tab1" {...props}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
        <TabsContent value="tab3">Content 3</TabsContent>
      </Tabs>
    )
  }

  describe('Rendering', () => {
    it('renders tab list', () => {
      renderTabs()
      expect(screen.getByRole('tablist')).toBeInTheDocument()
    })

    it('renders all tab triggers', () => {
      renderTabs()
      expect(screen.getAllByRole('tab')).toHaveLength(3)
    })

    it('renders default tab content', () => {
      renderTabs()
      expect(screen.getByText('Content 1')).toBeInTheDocument()
    })

    it('does not render non-active tab content by default', () => {
      renderTabs()
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
    })
  })

  describe('Default Value', () => {
    it('activates first tab by default', () => {
      renderTabs()
      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('data-state', 'active')
    })

    it('shows correct content for default tab', () => {
      renderTabs({ defaultValue: 'tab2' })
      expect(screen.getByText('Content 2')).toBeInTheDocument()
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    })
  })

  describe('Tab Switching', () => {
    it('switches to clicked tab', async () => {
      const { user } = renderTabs()

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }))

      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('data-state', 'active')
      expect(screen.getByText('Content 2')).toBeInTheDocument()
    })

    it('deactivates previous tab when switching', async () => {
      const { user } = renderTabs()

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }))

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('data-state', 'inactive')
    })

    it('hides previous content when switching', async () => {
      const { user } = renderTabs()

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }))

      expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    })

    it('calls onValueChange when switching tabs', async () => {
      const handleChange = vi.fn()
      const { user } = render(
        <Tabs defaultValue="tab1" onValueChange={handleChange}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      )

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }))
      expect(handleChange).toHaveBeenCalledWith('tab2')
    })
  })

  describe('Keyboard Navigation', () => {
    it('focuses next tab with ArrowRight', async () => {
      const { user } = renderTabs()

      await user.click(screen.getByRole('tab', { name: 'Tab 1' }))
      await user.keyboard('{ArrowRight}')

      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus()
    })

    it('focuses previous tab with ArrowLeft', async () => {
      const { user } = renderTabs()

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }))
      await user.keyboard('{ArrowLeft}')

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveFocus()
    })

    it('wraps to first tab from last with ArrowRight', async () => {
      const { user } = renderTabs()

      await user.click(screen.getByRole('tab', { name: 'Tab 3' }))
      await user.keyboard('{ArrowRight}')

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveFocus()
    })

    it('wraps to last tab from first with ArrowLeft', async () => {
      const { user } = renderTabs()

      await user.click(screen.getByRole('tab', { name: 'Tab 1' }))
      await user.keyboard('{ArrowLeft}')

      expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveFocus()
    })

    it('focuses first tab with Home', async () => {
      const { user } = renderTabs()

      await user.click(screen.getByRole('tab', { name: 'Tab 3' }))
      await user.keyboard('{Home}')

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveFocus()
    })

    it('focuses last tab with End', async () => {
      const { user } = renderTabs()

      await user.click(screen.getByRole('tab', { name: 'Tab 1' }))
      await user.keyboard('{End}')

      expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveFocus()
    })
  })

  describe('Disabled Tabs', () => {
    it('renders disabled tab', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" disabled>Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      )

      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeDisabled()
    })

    it('does not switch to disabled tab on click', async () => {
      const { user } = render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" disabled>Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      )

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }))

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('data-state', 'active')
      expect(screen.getByText('Content 1')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('applies neubrutalism styles to tab list', () => {
      renderTabs()
      expect(screen.getByRole('tablist')).toHaveClass('border-3')
    })

    it('accepts custom className on Tabs', () => {
      render(
        <Tabs defaultValue="tab1" className="custom-tabs" data-testid="tabs">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      )
      expect(screen.getByTestId('tabs')).toHaveClass('custom-tabs')
    })

    it('accepts custom className on TabsList', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList className="custom-list">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      )
      expect(screen.getByRole('tablist')).toHaveClass('custom-list')
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes on tablist', () => {
      renderTabs()
      expect(screen.getByRole('tablist')).toBeInTheDocument()
    })

    it('has correct ARIA attributes on tabs', () => {
      renderTabs()
      const tab = screen.getByRole('tab', { name: 'Tab 1' })
      expect(tab).toHaveAttribute('aria-selected', 'true')
      expect(tab).toHaveAttribute('aria-controls')
    })

    it('links tabs to their panels', () => {
      renderTabs()
      const tab = screen.getByRole('tab', { name: 'Tab 1' })
      const panelId = tab.getAttribute('aria-controls')
      const panel = document.getElementById(panelId!)
      expect(panel).toBeInTheDocument()
    })

    it('panels are labelled by their tabs', () => {
      renderTabs()
      const tab = screen.getByRole('tab', { name: 'Tab 1' })
      const tabId = tab.getAttribute('id')
      const panel = screen.getByRole('tabpanel')
      expect(panel).toHaveAttribute('aria-labelledby', tabId)
    })
  })
})
