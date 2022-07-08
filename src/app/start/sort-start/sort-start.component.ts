import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sort-start',
  templateUrl: './sort-start.component.html',
  styleUrls: ['./sort-start.component.css']
})
export class SortStartComponent implements OnInit {
  inputValue: number;
  speedValue: number;
  sortValue = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sortValue = this.route.snapshot.params['id']
  }

  inputValueSub(event) {
    this.inputValue = event.value;
  }

  onSubmit() {

  }

}
