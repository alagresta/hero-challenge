import { Component, OnInit } from '@angular/core';

import { MarvelHeroModel } from '../../models/marvel-hero.model';
import { MatDialog } from '@angular/material/dialog';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroStoreService } from '../../services/store/hero-store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeroDetailsViewModeEnum } from '../../models/hero-details-view-mode.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  //@ViewChild(MatTable) table: MatTable<MarvelHeroModel>;
  heroes: MarvelHeroModel[] = [];
  searchValues: string[] = [];
  isLoading: boolean = false;

  constructor(
    private dialog: MatDialog,
    private heroStoreService: HeroStoreService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  openDialog(
    marvelHero: MarvelHeroModel,
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    viewMode: string
  ): void {
    this.dialog.open(HeroDetailComponent, {
      data: { hero: marvelHero, mode: viewMode },
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
    });
  }

  viewHeroDetails($event: MarvelHeroModel): void {
    this.openDialog($event, '0ms', '0ms', HeroDetailsViewModeEnum.VIEW);
  }

  editHeroDetails($event: MarvelHeroModel): void {
    this.openDialog($event, '0ms', '0ms', HeroDetailsViewModeEnum.EDIT);
  }

  createNewHero(): void {
    const newHero: MarvelHeroModel = new MarvelHeroModel({
      creatorLabel: '',
      nameLabel: '',
      skillsLabel: '',
      occupationLabel: '',
      memberOfLabel: '',
      genderLabel: '',
      citizenshipLabel: '',
    });
    this.openDialog(newHero, '0ms', '0ms', HeroDetailsViewModeEnum.CREATE);
  }

  handleChange($event: string[]) {
    this.searchValues = $event;
  }

  deleteHero($event: MarvelHeroModel) {
    this.isLoading = true;
    this.heroStoreService.deleteHero($event).subscribe(() => {
      this._snackBar.open($event.nameLabel + ' deleted', 'close');
      this.isLoading = false;
    });
  }
}
