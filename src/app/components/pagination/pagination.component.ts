import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() totalRecords = 0;
  @Input() recordsPerPage = 0;

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  public pages: number[] = [];
  activePage: any;

  ngOnChanges(): any {
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
    this.activePage = 1;
    this.onPageChange.emit(1);
  }

  private getPageCount(): number {
    let totalPage = 0;

    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount = this.totalRecords / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);
      //To check rounded page count is less than page count. if yes, add 1 to rounded page count
      totalPage =
        roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return totalPage;
  }

  private getArrayOfPage(pageCount: number): number[] {
    const pageArray = [];
    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }

    return pageArray;
  }

  onClickPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.pages.length) {
      this.activePage = pageNumber;
      this.onPageChange.emit(this.activePage);
    }
  }
}
