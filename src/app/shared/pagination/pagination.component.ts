import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ResourcesPage } from 'src/app/dto/resources-page';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() firstPageIndex = 0;
  @Output() actionParams: EventEmitter<HttpParams> = new EventEmitter();

  pageLinks = [];
  lastPage = 1;
  currentPage = 1;
  private _linksEachSide = 1;
  private _data;
  private totalPages = 1;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
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

  @Input('resourcesPage')
  set data(data: ResourcesPage) {
    if (data !== undefined) {
      this._data = data;
      this.currentPage = this._data.number;
      this.totalPages = this._data.totalPages;
      this._setupPaginator();
    }
  }

  get data() {
    return this._data;
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
    if (this.currentPage < this.lastPage) {
      this.runActionParams(this.currentPage + 1);
    }
  }

  runPrevious() {
    if (this.currentPage > this.firstPageIndex) {
      this.runActionParams(this.currentPage - 1);
    }
  }

  runPageClicked(page: number) {
    this.runActionParams(page);
  }

  runActionParams(pageNumber: number) {
    this.actionParams.emit(new HttpParams().append('page', pageNumber.toString()));
  }
}
