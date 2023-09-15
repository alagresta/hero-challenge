import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MarvelHeroModel } from '../../models/marvel-hero.model';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { HeroStoreService } from '../../services/store/hero-store.service';
import { TableColumnsModel, TableColumnChartInterface } from '../../models/table-columns.model';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss'],
})
export class HeroTableComponent implements OnInit, OnChanges {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @Input() isLoading: boolean = false;
  @Output() onEditHero: EventEmitter<MarvelHeroModel> = new EventEmitter<MarvelHeroModel>();
  public dataSource: MatTableDataSource<MarvelHeroModel> = new MatTableDataSource<MarvelHeroModel>(
    []
  );
  @Output() onDeleteHero: EventEmitter<MarvelHeroModel> = new EventEmitter<MarvelHeroModel>();
  @Output() onHeroView: EventEmitter<MarvelHeroModel> = new EventEmitter<MarvelHeroModel>();
  private heroSelection: string[] = [];
  public displayedColumns: TableColumnsModel = new TableColumnsModel();
  dataready: boolean = false;

  constructor(private _liveAnnouncer: LiveAnnouncer, private heroStoreService: HeroStoreService) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.isLoading = true;
    this.heroStoreService.marvelHeroes.subscribe((heroes: MarvelHeroModel[]) => {
      this.dataSource = new MatTableDataSource(heroes);
      this.dataSource.filterPredicate = (data: MarvelHeroModel, filter: string) => {
        return this.heroSelection.length > 0
          ? this.heroSelection.some((name) => name == data.nameLabel)
          : true;
      };
      this.displayedColumns.columnNamesWithChart.forEach((propName: string) => {
        const chartData: TableColumnChartInterface[] = this.countUnique(
          this.dataSource.filteredData.map((hero: MarvelHeroModel) => {
            return hero[propName as keyof MarvelHeroModel];
          })
        );
        this.displayedColumns.setChartData(propName, chartData);
      });
      this.dataSource.sort = this.sort;
      this.isLoading = false;
      this.dataready = true;
    });

    this.heroStoreService.marvelHeroesSelection.subscribe((hs: string[]) => {
      this.heroSelection = hs;
      this.dataSource.filter = 'only used to trigger filter';
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  private countUnique(arr: string[]): TableColumnChartInterface[] {
    let counts: any = {};

    arr.forEach((el: string) => {
      counts[el] = 1 + (counts[el] || 0);
    });

    return Object.keys(counts).map((e: string) => {
      return { key: e, value: counts[e] };
    });
  }

  public onEditHeroClick($event: MarvelHeroModel): void {
    this.onEditHero.emit($event);
  }
  public onDeleteHeroClick($event: MarvelHeroModel): void {
    this.onDeleteHero.emit($event);
  }
  public onRowClick($event: MarvelHeroModel): void {
    this.onHeroView.emit($event);
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
