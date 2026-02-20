import { Component, Input, HostBinding, ChangeDetectionStrategy, Directive } from '@angular/core'
import { cn } from '../../utils/cn'
import { buttonVariants } from '../button/button.component'

@Component({
  selector: 'bk-pagination',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    'role': 'navigation',
    'aria-label': 'pagination',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('mx-auto flex w-full justify-center', this.class)
  }
}

@Component({
  selector: 'bk-pagination-content',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationContentComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('flex flex-row items-center gap-1', this.class)
  }
}

@Component({
  selector: 'bk-pagination-item',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationItemComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('', this.class)
  }
}

@Directive({
  selector: 'a[bkPaginationLink]',
  standalone: true,
})
export class PaginationLinkDirective {
  @Input() isActive: boolean = false
  @Input() size: 'default' | 'sm' | 'lg' | 'icon' = 'icon'
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      buttonVariants({
        variant: this.isActive ? 'default' : 'outline',
        size: this.size,
      }),
      this.class
    )
  }

  @HostBinding('attr.aria-current')
  get ariaCurrent(): string | null {
    return this.isActive ? 'page' : null
  }
}

@Component({
  selector: 'bk-pagination-previous',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
    <span>Previous</span>
  `,
  host: { 'aria-label': 'Go to previous page' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationPreviousComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn(buttonVariants({ variant: 'outline', size: 'default' }), 'gap-1 pl-2.5', this.class)
  }
}

@Component({
  selector: 'bk-pagination-next',
  standalone: true,
  template: `
    <span>Next</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  `,
  host: { 'aria-label': 'Go to next page' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationNextComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn(buttonVariants({ variant: 'outline', size: 'default' }), 'gap-1 pr-2.5', this.class)
  }
}

@Component({
  selector: 'bk-pagination-ellipsis',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
    <span class="sr-only">More pages</span>
  `,
  host: { 'aria-hidden': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationEllipsisComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('flex h-9 w-9 items-center justify-center', this.class)
  }
}

export const PaginationComponents = [
  PaginationComponent,
  PaginationContentComponent,
  PaginationItemComponent,
  PaginationLinkDirective,
  PaginationPreviousComponent,
  PaginationNextComponent,
  PaginationEllipsisComponent,
]
