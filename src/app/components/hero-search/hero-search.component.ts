import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatLegacyAutocompleteSelectedEvent as MatAutocompleteSelectedEvent } from '@angular/material/legacy-autocomplete';
import { MatLegacyChipInputEvent as MatChipInputEvent } from '@angular/material/legacy-chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HeroStoreService } from '../../services/store/hero-store.service';
import { MarvelHeroModel } from '../../models/marvel-hero.model';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent {
  private fullHeroesList: string[] = [];
  @ViewChild('heroInput') heroInput: ElementRef<HTMLInputElement> | undefined;
  @Output() onHeroChipAdded: EventEmitter<string[]> = new EventEmitter<string[]>();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  heroCtrl = new FormControl('');
  filteredHeroes: Observable<string[]>;
  heroes: string[] = [];

  constructor(private heroStoreService: HeroStoreService) {
    this.heroStoreService.marvelHeroes.subscribe((heroes: MarvelHeroModel[]) => {
      this.fullHeroesList = heroes.map((h: MarvelHeroModel) => {
        return h.nameLabel;
      });
    });
    this.filteredHeroes = this.heroCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.fullHeroesList.slice()))
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit

    const heroTag = this.fullHeroesList.find((elem: string) => {
      return elem.trim() === value;
    });
    if (heroTag) {
      this.heroes.push(value);
      this.heroStoreService.addHeroSelection(this.heroes);
      this.onHeroChipAdded.emit(this.heroes);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.heroCtrl.setValue(null);
  }

  remove(heroName: string): void {
    const index = this.heroes.indexOf(heroName);

    if (index >= 0) {
      this.heroes.splice(index, 1);
      this.heroStoreService.addHeroSelection(this.heroes);
      this.onHeroChipAdded.emit(this.heroes);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.heroes.push(event.option.viewValue);
    this.heroStoreService.addHeroSelection(this.heroes);
    this.onHeroChipAdded.emit(this.heroes);
    if (this.heroInput) {
      this.heroInput.nativeElement.value = '';
    }

    this.heroCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.fullHeroesList.filter((heroName) => heroName.toLowerCase().includes(filterValue));
  }
}
