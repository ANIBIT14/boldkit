import { Component, Input, HostBinding, ChangeDetectionStrategy, Directive } from '@angular/core'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-breadcrumb',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: { 'aria-label': 'breadcrumb' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  @HostBinding('attr.role') role = 'navigation'
}

@Component({
  selector: 'bk-breadcrumb-list',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbListComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
      this.class
    )
  }
}

@Component({
  selector: 'bk-breadcrumb-item',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbItemComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('inline-flex items-center gap-1.5', this.class)
  }
}

@Directive({
  selector: 'a[bkBreadcrumbLink]',
  standalone: true,
})
export class BreadcrumbLinkDirective {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('transition-colors hover:text-foreground font-medium', this.class)
  }
}

@Component({
  selector: 'bk-breadcrumb-page',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    'role': 'link',
    'aria-disabled': 'true',
    'aria-current': 'page',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbPageComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('font-bold text-foreground', this.class)
  }
}

@Component({
  selector: 'bk-breadcrumb-separator',
  standalone: true,
  template: `<ng-content><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></ng-content>`,
  host: {
    'role': 'presentation',
    'aria-hidden': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbSeparatorComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('[&>svg]:h-3.5 [&>svg]:w-3.5', this.class)
  }
}

@Component({
  selector: 'bk-breadcrumb-ellipsis',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
    <span class="sr-only">More</span>
  `,
  host: {
    'role': 'presentation',
    'aria-hidden': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbEllipsisComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('flex h-9 w-9 items-center justify-center', this.class)
  }
}

export const BreadcrumbComponents = [
  BreadcrumbComponent,
  BreadcrumbListComponent,
  BreadcrumbItemComponent,
  BreadcrumbLinkDirective,
  BreadcrumbPageComponent,
  BreadcrumbSeparatorComponent,
  BreadcrumbEllipsisComponent,
]
