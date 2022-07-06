import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-sort-start',
  templateUrl: './sort-start.component.html',
  styleUrls: ['./sort-start.component.css']
})
export class SortStartComponent implements OnInit {
  @ViewChild('sortForm', { static: false }) sForm: NgForm;
  inputValue = 1;
  speedValue = 1;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.inputValue);
  }

}
