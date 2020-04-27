import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() currentPage;
  @Input() totalPages;
  @Input() firstPageIndex = 0;
  @Input() sideOffset;
  @Output() previous: EventEmitter<void> = new EventEmitter();
  @Output() next: EventEmitter<void> = new EventEmitter();
  @Output() pageClicked: EventEmitter<number> = new EventEmitter();
  pageLinks;
  first;
  lastPage;

  constructor() { }

  ngOnInit(): void {
    // console.log(this);
    // // this.lastPage = (this.startWith === 0) ? (this.totalPages - 1) : this.totalPages;
    // this.old_setupPaginator();
    // console.log(
    //   'ngOnInit this.lastPage: ' + this.lastPage + '; ' +
    //   'ngOnInit this.startWith: ' + this.startWith + '; ' +
    //   'ngOnInit this.totalPages: ' + this.totalPages + '; '
    // );
  }

  ngOnChanges(): void {
    this.lastPage = (this.firstPageIndex === 0) ? (this.totalPages - 1) : this.totalPages;
    this.new_setupPaginator();
    console.log(
      'ngOnChanges this.lastPage: ' + this.lastPage + '; ' +
      'ngOnChanges this.firstPageIndex: ' + this.firstPageIndex + '; ' +
      'ngOnChanges this.totalPages: ' + this.totalPages + '; '
    );
  }

  // @Input()
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

    this.pageLinks = this._getPages(
      this.firstPageIndex,
      this.lastPage,
      this.currentPage,
      this.sideOffset
    );
  }

  private _getPages(firstPage: number, lastPage: number, currentPage: number, offset: number): number[] {
    // const linksCount = lastPage - firstPage;
    let start = currentPage - offset;
    let end = currentPage + offset;
    
    if (start < firstPage) {
        start = firstPage;
        end = offset * 2;
    }

    // let end = start + linksCount;
    
    if (end > lastPage) {
        end = lastPage;
        start = end - (offset * 2);
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
