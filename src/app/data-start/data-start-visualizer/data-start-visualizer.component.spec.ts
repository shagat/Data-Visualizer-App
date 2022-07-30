import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataStartVisualizerComponent } from './data-start-visualizer.component';

describe('DataStartVisualizerComponent', () => {
  let component: DataStartVisualizerComponent;
  let fixture: ComponentFixture<DataStartVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataStartVisualizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataStartVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
