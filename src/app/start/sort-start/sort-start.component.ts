import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { InputDataService } from '../inputData.service';

@Component({
  selector: 'app-sort-start',
  templateUrl: './sort-start.component.html',
  styleUrls: ['./sort-start.component.css']
})
export class SortStartComponent implements OnInit {
  @ViewChild('graphtype', { static: false }) graphtype: HTMLElement;
  inputDataSub = new Subscription;
  speedValue: number = 3;
  sortValue: number = 0;
  dataKey: number = 0;
  previewMode: boolean = true;
  graphType = 'line';

  constructor(private route: ActivatedRoute, private inputDataService: InputDataService) { }

  ngOnInit(): void {
    this.inputDataService.previewModeSub.subscribe((previewMode) => {
      this.previewMode = previewMode;
    })
    this.sortValue = this.route.snapshot.params['id']
  }

  inputValueSub(event: { value: number; }) {
    this.dataKey = event.value;
    // console.log(event.value);
    this.inputDataService.setDataKey(this.dataKey)
  }

  onClickSuffle() {
    this.inputDataService.shuffleArray();
  }

  onSubmit() {
    this.inputDataService.submitInputData(this.speedValue, this.sortValue);
  }

  onCancel() {
    // this.inputDataService.isCancelled = true;
    this.inputDataService.onCancel();
  }
  graphCall(event: Event) {
    event
    console.log(event);
    console.log(this.graphtype);
  }
  clickedOn(){
    console.log('hello')
  }

}
