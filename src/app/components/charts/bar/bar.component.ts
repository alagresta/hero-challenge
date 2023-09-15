import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import * as d3 from 'd3';

// Adopted from Basic barplot example on D3 Graph Gallery:
// https://www.d3-graph-gallery.com/graph/barplot_basic.html
@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  private svg: any;
  private margin = 10;
  private width = 120;
  private height = 80;
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
      this.drawBars(this.data);
    }
  }
  ngOnInit(): void {}

  private createSvg(): void {
    this.svg = d3
      .select(this.hostElement)
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: any[]): void {
    // Add X axis
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map((d) => d.key))
      .padding(0.2);

    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 20]).range([this.height, 0]);

    this.svg.append('g').call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.key))
      .attr('y', (d: any) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.value))
      .attr('fill', '#d04a35');
  }
}
