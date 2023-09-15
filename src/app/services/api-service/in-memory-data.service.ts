import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import heroesArray from '../../assets/wikipedia_marvel_data.json';
import { MarvelHeroModel } from '../../models/marvel-hero.model';
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = heroesArray.map((elem) => {
      return new MarvelHeroModel(elem);
    });
    return { heroes };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.


}
