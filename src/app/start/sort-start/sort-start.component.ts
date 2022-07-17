import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InputDataService } from '../inputData.service';

@Component({
  selector: 'app-sort-start',
  templateUrl: './sort-start.component.html',
  styleUrls: ['./sort-start.component.css']
})
export class SortStartComponent implements OnInit, OnDestroy {
  inputDataSub = new Subscription;
  speedValue: number = 3;
  sortValue: number = 0;
  dataKey: number = 0;
  previewMode: boolean = true;

  constructor(private route: ActivatedRoute, private inputDataService: InputDataService, private router: Router) { }

  ngOnInit(): void {
    this.inputDataService.previewModeSub.subscribe((previewMode) => {
      this.previewMode = previewMode;
    })
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
    if (this.sortValue >= 1) {
      console.log(this.sortValue);
      this.inputDataService.submitInputData(this.speedValue, this.sortValue);
    }
    else {
      alert('No sorting method selected.')
      return false;
    }
    return false;
  }

  onCancel() {
    this.inputDataService.onCancel();
  }

  onBack() {
    this.router.navigate(['']);
    return false;
  }
  ngOnDestroy(): void {
    this.inputDataSub.unsubscribe();
  }

}
