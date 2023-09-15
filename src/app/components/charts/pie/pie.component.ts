import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
  Renderer2,
} from '@angular/core';
import * as d3 from 'd3';

// Adopted from Basic pie chart example on D3 Graph Gallery:
// https://www.d3-graph-gallery.com/graph/pie_basic.html
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})
export class PieComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  private svg: any;
  private margin = 10;
  private width = 100;
  private height = 90;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;
  private hostElement: any;
  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['data'].currentValue.length > 0 &&
      changes['data'].previousValue !== changes['data'].currentValue
    ) {
      const childElements = this.hostElement.children;
      for (let child of childElements) {
        this.renderer.removeChild(this.hostElement.nativeElement, child);
      }

      this.createSvg();
      this.createColors();
      this.drawChart();
    }
  }

  ngOnInit(): void {}

  private createSvg(): void {
    this.svg = d3
      .select(this.hostElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  private createColors(): void {
    this.colors = d3
      .scaleOrdinal()
      .domain(this.data.map((d) => d.value.toString()))
      .range(['#1f77b4', '#ff7f0e', '#2ca02c', '#e35252', '#5a6782']);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.value));

    // Build the pie chart
    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(this.radius))
      .attr('fill', (d: any, i: any) => this.colors(i))
      .attr('stroke', '#d5d5d5')
      .style('stroke-width', '1px');

    // Add labels
    const labelLocation = d3.arc().innerRadius(50).outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text((d: any) => d.data.key)
      .attr('transform', (d: any) => 'translate(' + labelLocation.centroid(d) + ')')
      .style('text-anchor', 'middle')
      .style('color', '#d5d5d5')
      .style('font-size', 12);
  }
}
