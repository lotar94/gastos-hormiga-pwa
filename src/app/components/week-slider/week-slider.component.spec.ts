import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekSliderComponent } from './week-slider.component';

describe('WeekSliderComponent', () => {
  let component: WeekSliderComponent;
  let fixture: ComponentFixture<WeekSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
