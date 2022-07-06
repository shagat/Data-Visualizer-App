import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sort-start',
  templateUrl: './sort-start.component.html',
  styleUrls: ['./sort-start.component.css']
})
export class SortStartComponent implements OnInit {
  inputValue = 1;
  speedValue = 1;
  sortValue: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.inputValue);
    console.log(this.sortValue);
  }

}
