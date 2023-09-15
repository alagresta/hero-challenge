import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-row-chart',
  templateUrl: './row-chart.component.html',
  styleUrls: ['./row-chart.component.scss'],
})
export class RowChartComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() showUniqueValues: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
