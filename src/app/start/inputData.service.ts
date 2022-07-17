import { Injectable } from "@angular/core";
import { Subject, timeout } from "rxjs";
import { InputData } from "./InputData.model";

@Injectable({
  providedIn: 'root'
})
export class InputDataService {
  inputDataChanged = new Subject<InputData>();
  indexDataChanged = new Subject<[number, number]>();
  previewModeSub = new Subject<boolean>();
  private inputData: InputData = new InputData(0, [], 3);
  private dataArray: number[] = [];
  previewMode: boolean = true;
  private dataKey: number;


  async submitInputData(speedValue: number, sortValue: number) {
    this.previewMode = false;
    this.previewModeSub.next(this.previewMode);

    this.inputData.algo = sortValue;
    this.inputData.speed = speedValue;
    this.inputData.input = this.dataArray;

    await this.sortingCordinator();

    this.previewMode = true;
    this.previewModeSub.next(this.previewMode)
  }

  async sortingCordinator() {
    switch (+this.inputData.algo) {
      case 1:
        console.log('switch case bubble sort')
        await this.bubbleSort();
        break;
      case 2:
        console.log('switch case insertion sort')
        await this.insertionSort();
        break;
      case 3:
        console.log('switch case selection sort')
        await this.selectionSort();
        break;
      case 4:
        console.log('switch case quick sort')
        let lb = 0;
        let ub = (this.inputData.input).length - 1;
        await this.quickSorting(this.inputData.input, lb, ub);
        break;
    }
    return;
  }

  // Data Manipulation
  setDataKey(dataKey: number) {
    this.dataKey = dataKey;
    this.spawnDataArray();
    this.inputDataChanged.next(this.inputData);
  }

  spawnDataArray() {
    this.dataArray = Array.from({ length: +(this.dataKey) }, () => Math.floor(Math.random() * 40));
    this.inputData.input = this.dataArray;
  }

  shuffleArray() {
    for (let i = this.dataArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.dataArray[i], this.dataArray[j]] = [this.dataArray[j], this.dataArray[i]];
    }
    this.inputDataChanged.next(this.inputData);
  }

  // Bubble Sort
  async bubbleSort() {
    try {
      let n = (this.inputData.input).length;
      for (let i = 0; i < (n - 1); i++) {
        let isChanged = false;
        console.log('Pass: ' + (i + 1))
        this.letDelay()
        for (let j = 0; j < (n - 1 - i); j++) {
          if ((this.inputData.input)[j + 1] < (this.inputData.input)[j]) {
            await this.checkIndexOf(this.inputData.input[j], this.inputData.input[j + 1])
            let temp = (this.inputData.input)[j + 1];
            (this.inputData.input)[j + 1] = (this.inputData.input)[j];
            (this.inputData.input)[j] = temp;
            isChanged = true;
            this.inputDataChanged.next(this.inputData);
            await this.letDelay();
          }
        }
        if (isChanged == false) {
          break;
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      console.log('finished sorting');
      return;
    }
  }

  // Insertion Sort
  async insertionSort() {
    try {
      let n = (this.inputData.input).length;
      for (let i = 1; i < n; i++) {
        let key = this.inputData.input[i];
        let j = (i - 1);
        while (j >= 0 && this.inputData.input[j] > key) {
          await this.checkIndexOf(this.inputData.input[j], this.inputData.input[j + 1])
          this.inputData.input[j + 1] = this.inputData.input[j];
          j--;
          this.inputDataChanged.next(this.inputData);
          await this.letDelay();
        }
        this.inputData.input[j + 1] = key;
      }
    } catch (error) {
      console.log(error)
    } finally {
      console.log('finished sorting');
      return;
    }
  }

  // Selection Sort
  async selectionSort() {
    try {
      const n = this.inputData.input.length;
      console.log(n)
      for (let i = 0; i < n; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++) {
          if (this.inputData.input[j] < this.inputData.input[min]) {
            min = j;
          }
        }
        if (min != i) {
          await this.checkIndexOf(this.inputData.input[i], this.inputData.input[min])
          let temp = this.inputData.input[i]
          this.inputData.input[i] = this.inputData.input[min]
          this.inputData.input[min] = temp;
          this.inputDataChanged.next(this.inputData);
          await this.letDelay();
        }
        // console.log('Pass: ' + i)
      }
    } catch (error) {
      console.log(error)
    } finally {
      console.log('finished sorting');
      return;
    }
  }

  // Quick Sorting
  async quickSorting(a: number[], lb: number, ub: number) {
    if (lb < ub) {
      let pIndex = await this.partition(a, lb, ub);
      await this.quickSorting(a, lb, pIndex - 1);
      await this.quickSorting(a, pIndex + 1, ub);
      return;
    }
    return;
  }
  async partition(a: number[], lb: number, ub: number) {
    let pivot = a[lb]
    let start = lb;
    let end = ub;
    while (start < end) {
      while (a[start] <= pivot) {
        start++;
      }
      while (a[end] > pivot) {
        end--;
      }
      await this.checkIndexOf(this.inputData.input[start], this.inputData.input[end])
      if (start < end) {
        let temp = a[start];
        a[start] = a[end];
        a[end] = temp;
        // this.inputData.input = a;
        this.inputDataChanged.next(this.inputData);
        await this.letDelay();
      }
    }
    let temp = a[lb];
    a[lb] = a[end];
    a[end] = temp;
    // this.inputData.input = a;
    this.inputDataChanged.next(this.inputData);
    await this.letDelay();
    return end;
  }

  // Flow Controller Drivers
  letDelay() {
    return new Promise(resolve => setTimeout(
      resolve,
      (1000 - 150 * this.inputData.speed))
    );
  }

  checkIndexOf(a: number, b: number) {
    let indexa = this.inputData.input.indexOf(a);
    let indexb = this.inputData.input.indexOf(b);
    this.indexDataChanged.next([indexa, indexb]);
    return new Promise(resolve => setTimeout(
      resolve,
      300)
    );
  }

  onCancel() {
    if (confirm('Are you sure you want to cancel operation?')) {
      location.reload();
      return false;
    }
    return false;
  }
}
