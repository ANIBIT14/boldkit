import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

export default function Example() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[260px] gap-1 p-3">
              <li>
                <NavigationMenuLink className="block px-3 py-2 text-sm font-bold hover:bg-accent">
                  Components
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink className="block px-3 py-2 text-sm font-bold hover:bg-accent">
                  Templates
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink className="block px-3 py-2 text-sm font-bold hover:bg-accent">
                  Charts
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="inline-flex h-10 items-center border-3 border-foreground bg-background px-4 text-sm font-bold uppercase tracking-wide shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
