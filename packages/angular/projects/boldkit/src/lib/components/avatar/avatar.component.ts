import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-avatar',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none',
      this.class
    )
  }
}

@Component({
  selector: 'bk-avatar-image, img[bkAvatarImage]',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarImageComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('aspect-square h-full w-full object-cover', this.class)
  }
}

@Component({
  selector: 'bk-avatar-fallback',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarFallbackComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      'flex h-full w-full items-center justify-center bg-primary text-primary-foreground font-bold uppercase',
      this.class
    )
  }
}

export const AvatarComponents = [AvatarComponent, AvatarImageComponent, AvatarFallbackComponent]
