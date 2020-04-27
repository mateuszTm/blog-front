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
  private _linksEachSide: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.lastPage = (this.firstPageIndex === 0) ? (this.totalPages - 1) : ((this.totalPages - 1) + this.firstPageIndex);
    console.log(
      'ngOnInit this.lastPage: ' + this.lastPage + '; ' +
      'ngOnInit this.firstPageIndex: ' + this.firstPageIndex + '; ' +
      'ngOnInit this.totalPages: ' + this.totalPages + '; '
    );
    console.log(this);
    this.new_setupPaginator();
  }

  ngOnChanges(): void {
    this.lastPage = (this.firstPageIndex === 0) ? (this.totalPages - 1) : ((this.totalPages - 1) + this.firstPageIndex);
    console.log(
      'ngOnChanges this.lastPage: ' + this.lastPage + '; ' +
      'ngOnChanges this.firstPageIndex: ' + this.firstPageIndex + '; ' +
      'ngOnChanges this.totalPages: ' + this.totalPages + '; '
    );
    console.log(this);
    this.new_setupPaginator();
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

  // @Input('sideOffset')
  // set sideOffset(offset: number) {
  //   if (offset > this.totalPages) {
  //     offset = this.totalPages / 2;
  //   }
  //   this._sideOffset = offset;
  // }

  // get sideOffset(): number{
  //   return this._sideOffset;
  // }

  private new_setupPaginator(){
    // if (this.startWith === 0) {
    //   var last = this.totalPages - 1;
    // } else {
    //   var last = this.totalPages;
    // }
    // let maxOffset;
    // if (this._sideOffset > this.totalPages) {
    //   maxOffset = Math.round(maxOffset / 2 );
    // }
    // console.log('TEST linksEachSide: ' + this.linksEachSide);
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
    
    console.log('firstPage: ' + firstPage + '; lastPage:' + lastPage + '; currentPage: ' + currentPage + '; maxOffset: ' + maxOffset + '; start: ' + start + '; end: ' + end);

    const increase = (base: number, max: number, increase: number) => {
      console.log('increase base: ' + base + '; max: ' + max + '; amount: ' + increase);
      while ((base < max) && (increase !== 0)) {
        base = base + 1;
        increase = increase - 1;
        console.log('base: ' + base + '; amount: ' + increase);
      }
      return base;
    };

    const decrease = (base: number, min: number, decrease: number) => {
      console.log('decrease base: ' + base + '; min: ' + min + '; amount: ' + decrease);
      while ((base > min) && (decrease !== 0)) {
        base = base - 1;
        decrease = decrease - 1;
        console.log('base: ' + base + '; amount: ' + decrease);
      }
      return base;
    };

    if (start < firstPage) {
      console.log('start < firstPage');
      end = increase(end, lastPage, (firstPage - start));
      start = firstPage;
    }
    if (end > lastPage) {
      console.log('end > lastPage');
      start = decrease(start, firstPage, ((end - lastPage)));
      end = lastPage;
    }
    const pages = [];
    for (let i = start; i <= end; i++ ) {
        pages.push(i);
    }
    console.log('start: ' + start + ' end: ' + end);
    console.log(pages);
    return pages;
  }

  private old_setupPaginator() {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    // if(this.sideOffset > this.totalPages) {
    //   this.sideOffset = this.totalPages / 2;
    // }
    const sideOffset = this.sideOffset;
    const pageLinks = sideOffset * 2 + 1;

    let start = currentPage - sideOffset;
    if (start < 0) {
        start = 0;
    }

    let end = start + pageLinks;
    if (end > totalPages) {
        end = totalPages;
        start = end - pageLinks;
    }

    // const pages = [];
    // for (let i = start; i <= end; i++ ) {
    //     pages.push(i);
    // }
    // console.log('start: ' + start + ' end: ' + end);
    // console.log(pages);
    // this.pageLinks = pages;
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
