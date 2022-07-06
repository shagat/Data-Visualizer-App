import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sort-item',
  templateUrl: './sort-item.component.html',
  styleUrls: ['./sort-item.component.css']
})
export class SortItemComponent implements OnInit {
@Input('sortData') sortData : {};
  constructor() { }

  ngOnInit(): void {
  }

}
