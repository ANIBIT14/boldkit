import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-card',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styles: [`:host { display: block; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() interactive: boolean = false
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      'bg-card text-card-foreground border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200',
      this.interactive && 'cursor-pointer hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
      this.class
    )
  }
}

@Component({
  selector: 'bk-card-header',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styles: [`:host { display: block; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('flex flex-col space-y-1.5 p-6 border-b-3 border-foreground', this.class)
  }
}

@Component({
  selector: 'bk-card-title',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styles: [`:host { display: block; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTitleComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('text-xl font-bold uppercase tracking-wide leading-none', this.class)
  }
}

@Component({
  selector: 'bk-card-description',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styles: [`:host { display: block; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDescriptionComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('text-sm text-muted-foreground', this.class)
  }
}

@Component({
  selector: 'bk-card-content',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styles: [`:host { display: block; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardContentComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('p-6', this.class)
  }
}

@Component({
  selector: 'bk-card-footer',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styles: [`:host { display: block; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFooterComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('flex items-center p-6 border-t-3 border-foreground bg-muted/50', this.class)
  }
}

export const CardComponents = [
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
  CardFooterComponent,
]
