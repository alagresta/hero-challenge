import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelHeroModel } from '../../models/marvel-hero.model';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HeroDetailsViewModeEnum } from '../../models/hero-details-view-mode.enum';
import { HeroStoreService } from '../../services/store/hero-store.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  // hero: MarvelHeroModel | undefined;
  public heroForm: FormGroup = new FormGroup<any>({});
  public dialogViewModes = HeroDetailsViewModeEnum;
  constructor(
    private route: ActivatedRoute,
    private heroStoreService: HeroStoreService,
    private dialogRef: MatDialogRef<HeroDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { hero: MarvelHeroModel; mode: string }
  ) {}

  ngOnInit(): void {
    // this.getHero();
    const validators: ValidatorFn[] = [Validators.minLength(3), Validators.required];

    this.heroForm = new FormGroup({
      /**
       * citizenshipLabel: string = '';
       *   creatorLabel: string = '';
       *   genderLabel: string = '';
       *   memberOfLabel: string = '';
       *   nameLabel: string = '';
       *   occupationLabel: string = '';
       *   skillsLabel: string = '';
       */
      id: new FormControl(this.data.hero.id || '', validators),
      citizenshipLabel: new FormControl(this.data.hero.citizenshipLabel || '', validators),
      creatorLabel: new FormControl(this.data.hero.creatorLabel || '', validators),
      genderLabel: new FormControl(this.data.hero.genderLabel || '', validators),
      memberOfLabel: new FormControl(this.data.hero.memberOfLabel || '', validators),
      nameLabel: new FormControl(this.data.hero.nameLabel || '', validators),
      occupationLabel: new FormControl(this.data.hero.occupationLabel || '', validators),
      skillsLabel: new FormControl(this.data.hero.skillsLabel || '', validators),
    });

    if (this.data.mode === HeroDetailsViewModeEnum.VIEW) {
      this.heroForm.disable();
    } else {
      this.heroForm.enable();
    }
  }

  submit() {
    if (this.data.mode === HeroDetailsViewModeEnum.EDIT) {
      this.heroStoreService.updateHero(this.heroForm.getRawValue()).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.heroStoreService.addHero(this.heroForm.getRawValue()).subscribe(() => {
        this.dialogRef.close();
      });

    }
  }
}
