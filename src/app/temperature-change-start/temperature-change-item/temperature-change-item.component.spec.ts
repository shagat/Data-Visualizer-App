import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureChangeItemComponent } from './temperature-change-item.component';

describe('TemperatureChangeItemComponent', () => {
  let component: TemperatureChangeItemComponent;
  let fixture: ComponentFixture<TemperatureChangeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperatureChangeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureChangeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
