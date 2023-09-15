import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowChartComponent } from './row-chart.component';

describe('RowChartComponent', () => {
  let component: RowChartComponent;
  let fixture: ComponentFixture<RowChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
