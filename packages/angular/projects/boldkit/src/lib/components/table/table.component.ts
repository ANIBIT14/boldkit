import { Component, Input, HostBinding, ChangeDetectionStrategy, Directive } from '@angular/core'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-table',
  standalone: true,
  template: `
    <div class="relative w-full overflow-auto">
      <table [class]="tableClass">
        <ng-content></ng-content>
      </table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() class: string = ''

  get tableClass(): string {
    return cn(
      'w-full caption-bottom text-sm border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
      this.class
    )
  }
}

@Directive({
  selector: 'thead[bkTableHeader]',
  standalone: true,
})
export class TableHeaderDirective {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('bg-muted [&_tr]:border-b-3', this.class)
  }
}

@Directive({
  selector: 'tbody[bkTableBody]',
  standalone: true,
})
export class TableBodyDirective {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('[&_tr:last-child]:border-0', this.class)
  }
}

@Directive({
  selector: 'tfoot[bkTableFooter]',
  standalone: true,
})
export class TableFooterDirective {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('border-t-3 bg-muted/50 font-bold [&>tr]:last:border-b-0', this.class)
  }
}

@Directive({
  selector: 'tr[bkTableRow]',
  standalone: true,
})
export class TableRowDirective {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      'border-b-3 border-foreground transition-colors hover:bg-muted/50 data-[state=selected]:bg-accent',
      this.class
    )
  }
}

@Directive({
  selector: 'th[bkTableHead]',
  standalone: true,
})
export class TableHeadDirective {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      'h-12 px-4 text-left align-middle font-bold uppercase tracking-wide text-foreground [&:has([role=checkbox])]:pr-0',
      this.class
    )
  }
}

@Directive({
  selector: 'td[bkTableCell]',
  standalone: true,
})
export class TableCellDirective {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', this.class)
  }
}

@Directive({
  selector: 'caption[bkTableCaption]',
  standalone: true,
})
export class TableCaptionDirective {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('mt-4 text-sm text-muted-foreground', this.class)
  }
}

export const TableComponents = [
  TableComponent,
  TableHeaderDirective,
  TableBodyDirective,
  TableFooterDirective,
  TableRowDirective,
  TableHeadDirective,
  TableCellDirective,
  TableCaptionDirective,
]
