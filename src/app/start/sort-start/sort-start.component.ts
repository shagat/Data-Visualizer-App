import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InputDataService } from '../inputData.service';

@Component({
  selector: 'app-sort-start',
  templateUrl: './sort-start.component.html',
  styleUrls: ['./sort-start.component.css']
})
export class SortStartComponent implements OnInit {
  inputValue: number;
  speedValue: number;
  sortValue = null;

  constructor(private route: ActivatedRoute, private inputDataService: InputDataService) { }

  ngOnInit(): void {
    this.sortValue = this.route.snapshot.params['id']
  }

  inputValueSub(event) {
    this.inputValue = event.value;
    this.inputDataService.setInputValue(this.inputValue);
  }

  onSubmit() {

  }

}
