import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { InputData } from '../InputData.model';
import { InputDataService } from '../inputData.service';

@Component({
  selector: 'app-sort-start',
  templateUrl: './sort-start.component.html',
  styleUrls: ['./sort-start.component.css']
})
export class SortStartComponent implements OnInit {
  inputDataSub = new Subscription;
  speedValue: number = 0;
  sortValue: number = 0;
  dataKey: number = 0;

  constructor(private route: ActivatedRoute, private inputDataService: InputDataService) { }

  ngOnInit(): void {
    this.sortValue = this.route.snapshot.params['id']
  }

  inputValueSub(event) {
    this.dataKey = event.value;
    console.log(event.value);
    this.inputDataService.setDataKey(this.dataKey)
  }

  onSubmit() {

  }

}
