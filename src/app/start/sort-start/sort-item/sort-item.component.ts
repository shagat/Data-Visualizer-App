import { Component, Input, OnInit } from '@angular/core';
import { InputData } from '../../InputData.model';

@Component({
  selector: 'app-sort-item',
  templateUrl: './sort-item.component.html',
  styleUrls: ['./sort-item.component.css']
})
export class SortItemComponent implements OnInit {
  @Input('inputData') inputData: InputData;
  constructor() { }

  ngOnInit(): void {
  }
  
  suffle() {
    for (var a = [], i = 0; i < 40; ++i) a[i] = i;
    function shuffle(array) {
      var tmp, current, top = array.length;
      if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
      return array;
    }

    a = shuffle(a);

  }
}
