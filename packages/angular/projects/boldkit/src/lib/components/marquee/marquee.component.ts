import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-marquee',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="contentClass"
      [style.animation-direction]="direction === 'right' ? 'reverse' : 'normal'">
      <ng-container *ngFor="let _ of repeatArray">
        <ng-content></ng-content>
      </ng-container>
    </div>
    <div
      [class]="contentClass"
      [style.animation-direction]="direction === 'right' ? 'reverse' : 'normal'"
      aria-hidden="true">
      <ng-container *ngFor="let _ of repeatArray">
        <ng-content select="[marquee-duplicate]"></ng-content>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueeComponent {
  @Input() direction: 'left' | 'right' = 'left'
  @Input() speed: 'slow' | 'normal' | 'fast' = 'normal'
  @Input() pauseOnHover: boolean = true
  @Input() bordered: boolean = true
  @Input() repeat: number = 4
  @Input() class: string = ''

  private speedClasses = {
    slow: 'animate-marquee-slow',
    normal: 'animate-marquee',
    fast: 'animate-marquee-fast',
  }

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      'flex overflow-hidden',
      this.bordered && 'border-3 border-foreground bg-background',
      this.pauseOnHover && '[&:hover_.marquee-content]:pause',
      this.class
    )
  }

  get repeatArray(): number[] {
    return Array(this.repeat).fill(0)
  }

  get contentClass(): string {
    const animationClass = this.direction === 'right' ? 'animate-marquee-reverse' : this.speedClasses[this.speed]
    return cn(
      'marquee-content flex shrink-0 items-center gap-8 py-3',
      animationClass,
      this.pauseOnHover && 'hover:[animation-play-state:paused]'
    )
  }
}

@Component({
  selector: 'bk-marquee-item',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueeItemComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      'inline-flex items-center gap-2 whitespace-nowrap px-4 text-lg font-bold uppercase tracking-wide',
      this.class
    )
  }
}

@Component({
  selector: 'bk-marquee-separator',
  standalone: true,
  template: `<ng-content>/</ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueeSeparatorComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('text-2xl font-black text-muted-foreground', this.class)
  }
}

export const MarqueeComponents = [MarqueeComponent, MarqueeItemComponent, MarqueeSeparatorComponent]
