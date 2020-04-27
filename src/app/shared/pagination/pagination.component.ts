import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() currentPage = 1;
  @Input() totalPages: number;
  @Input() firstPageIndex = 0;
  @Input() sideOffset: number;
  @Output() previous: EventEmitter<void> = new EventEmitter();
  @Output() next: EventEmitter<void> = new EventEmitter();
  @Output() pageClicked: EventEmitter<number> = new EventEmitter();
  pageLinks = [];
  lastPage = 1;
  private _linksEachSide = 1;

  constructor() { }

  ngOnInit(): void {
    this._setupPaginator();
  }

  ngOnChanges(): void {
    this._setupPaginator();
  }

  @Input()
  set linksEachSide(links: number) {
    if (links > this.totalPages) {
        links = Math.round(links / 2 );
    }
    this._linksEachSide = links;
  }

  get linksEachSide(): number {
    return this._linksEachSide;
  }

  private _setupPaginator(){
    this.lastPage = (this.firstPageIndex === 0) ? (this.totalPages - 1) : ((this.totalPages - 1) + this.firstPageIndex);
    this.pageLinks = this._getPages(
      this.firstPageIndex,
      this.lastPage,
      this.currentPage,
      this.linksEachSide
    );
  }

  private _getPages(firstPage: number, lastPage: number, currentPage: number, maxOffset: number): number[] {
    let start = currentPage - maxOffset;
    let end = currentPage + maxOffset;

    const increase = (base: number, max: number, amount: number) => {
      while ((base < max) && (amount !== 0)) {
        base = base + 1;
        amount = amount - 1;
      }
      return base;
    };

    const decrease = (base: number, min: number, amount: number) => {
      while ((base > min) && (amount !== 0)) {
        base = base - 1;
        amount = amount - 1;
      }
      return base;
    };

    if (start < firstPage) {
      end = increase(end, lastPage, (firstPage - start));
      start = firstPage;
    }
    if (end > lastPage) {
      start = decrease(start, firstPage, ((end - lastPage)));
      end = lastPage;
    }
    const pages = [];
    for (let i = start; i <= end; i++ ) {
        pages.push(i);
    }
    return pages;
  }

  runNext() {
    this.next.emit();
  }

  runPrevious() {
    this.previous.emit();
  }

  runPageClicked(page: number) {
    this.pageClicked.emit(page);
  }
}
