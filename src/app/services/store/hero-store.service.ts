import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MarvelHeroModel } from '../../models/marvel-hero.model';
import { HeroService } from '../api-service/hero.service';

@Injectable({
  providedIn: 'root',
})
export class HeroStoreService {
  private _marvelHeroes: BehaviorSubject<MarvelHeroModel[]> = new BehaviorSubject<
    MarvelHeroModel[]
  >([]);

  get marvelHeroes(): Observable<Array<MarvelHeroModel>> {
    return this._marvelHeroes.asObservable();
  }

  private _marvelHeroesSelection: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  get marvelHeroesSelection(): Observable<Array<string>> {
    return this._marvelHeroesSelection.asObservable();
  }

  constructor(private heroService: HeroService) {
    this.loadInitialData();
  }

  loadInitialData() {
    this.heroService.getHeroes().subscribe(
      (heroes: MarvelHeroModel[]) => {
        this._marvelHeroes.next(heroes);
      },
      (err) => console.log('Error retrieving Heroes')
    );
  }

  public addHeroSelection(names: string[]) {
    this._marvelHeroesSelection.next(names);
  }

  public addHero(newHero: MarvelHeroModel): Observable<MarvelHeroModel> {
    const obs: Observable<MarvelHeroModel> = this.heroService.addHero(newHero);
    obs.subscribe(() => {
      this._marvelHeroes.getValue().push(newHero);
      this._marvelHeroes.next(this._marvelHeroes.getValue());
    });

    return obs;
  }

  public updateHero(heroToUpdate: MarvelHeroModel): Observable<MarvelHeroModel> {
    let obs: Observable<MarvelHeroModel> = this.heroService.updateHero(heroToUpdate);
    obs.subscribe(() => {
      this._marvelHeroes.next(
        this._marvelHeroes.getValue().map((h: MarvelHeroModel) => {
          return h.id === heroToUpdate.id ? heroToUpdate : h;
        })
      );
    });

    return obs;
  }

  public deleteHero(heroToDelete: MarvelHeroModel): Observable<MarvelHeroModel> {
    let obs: Observable<MarvelHeroModel> = this.heroService.deleteHero(heroToDelete.id);

    obs.subscribe((res) => {
      let heroes: Array<MarvelHeroModel> = this._marvelHeroes.getValue();
      this._marvelHeroes.next(heroes.filter((todo) => todo.id !== heroToDelete.id));
    });

    return obs;
  }
}
