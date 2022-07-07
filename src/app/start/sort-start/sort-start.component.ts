import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InputData } from '../InputData.model';

@Component({
  selector: 'app-sort-start',
  templateUrl: './sort-start.component.html',
  styleUrls: ['./sort-start.component.css']
})
export class SortStartComponent implements OnInit {
  inputValue = 15;
  speedValue = 1;
  sortValue = null;
  dataArray: number[] = [];
  inputData: InputData;


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sortValue = this.route.snapshot.params['id']
  }

  getDataArray() {
    this.dataArray = Array.from({ length: +(this.inputValue) }, () => Math.floor(Math.random() * 40));
  }

  onSubmit() {
    this.getDataArray();
    this.inputData = new InputData(this.sortValue, this.dataArray, this.speedValue);
    console.log(this.inputData);

  }

}
