export class TableColumnsModel {
  public columns: TableColumnInterface;
  // 'id',
  constructor() {
    this.columns = {
      nameLabel: [],
      genderLabel: [],
      citizenshipLabel: [],
      skillsLabel: [],
      occupationLabel: [],
      memberOfLabel: [],
      creatorLabel: [],
      actions: [],
    };
  }

  get columnNames(): string[] {
    return Object.keys(this.columns);
  }

  get columnNamesWithChart(): string[] {
    return Object.keys(this.columns).filter((e: string) => e !== 'actions');
  }
  get columnNamesChartLabel(): string[] {
    return Object.keys(this.columns).map((e: string) => e + '-chart');
  }

  setChartData(key: string, chartData: TableColumnChartInterface[]): void {
    this.columns[key] = chartData;
  }
}

interface TableColumnInterface {
  [key: string]: TableColumnChartInterface[];
}

export interface TableColumnChartInterface {
  key: string;
  value: number;
}
