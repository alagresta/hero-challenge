import { TestBed } from '@angular/core/testing';

import { HeroStoreService } from './hero-store.service';
import SpyObj = jasmine.SpyObj;
import { HeroService } from '../api-service/hero.service';
import createSpyObj = jasmine.createSpyObj;
import { of } from 'rxjs';
import {
  HERO_TO_UPDATE_MOCK,
  HEROES_MOCK,
  NEW_HERO_MOCK,
  WRONG_ID_HERO_MOCK,
} from '../api-service/mock-heroes';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MarvelHeroModel } from '../../models/marvel-hero.model';

describe('HeroStoreService', () => {
  let service: HeroStoreService;
  let mockHeroService: SpyObj<HeroService>;

  beforeEach(() => {
    mockHeroService = createSpyObj('HeroService', [
      'getHeroes',
      'getHero',
      'addHero',
      'deleteHero',
      'updateHero',
    ]);
    mockHeroService.getHeroes.and.returnValue(of(HEROES_MOCK));
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    });
    service = TestBed.get(HeroStoreService);
    service.loadInitialData();
  });

  it('Service should be created', () => {
    service.marvelHeroes.subscribe((h: MarvelHeroModel[]) => {
      expect(h).toEqual(HEROES_MOCK);
      expect(service).toBeTruthy();
    });
  });
  describe('SHOULD CASES', () => {
    it('should DELETE a Hero', () => {
      const heroToDelete: MarvelHeroModel = HEROES_MOCK[0];
      mockHeroService.deleteHero.and.returnValue(of(heroToDelete));
      service.deleteHero(heroToDelete);
      service.marvelHeroes.subscribe((h: MarvelHeroModel[]) => {
        expect(h).not.toContain(jasmine.objectContaining(heroToDelete));
      });
    });
    it('should CREATE a Hero', () => {
      mockHeroService.addHero.withArgs(NEW_HERO_MOCK).and.returnValue(of(NEW_HERO_MOCK));
      service.addHero(NEW_HERO_MOCK);
      service.marvelHeroes.subscribe((h: MarvelHeroModel[]) => {
        expect(h).toContain(jasmine.objectContaining(NEW_HERO_MOCK));
      });
    });
    it('should UPDATE a Hero', () => {
      let heroToUpdate: MarvelHeroModel = HERO_TO_UPDATE_MOCK;
      heroToUpdate.creatorLabel = 'NONE';
      heroToUpdate.nameLabel = 'NONE';
      heroToUpdate.citizenshipLabel = 'NONE';
      heroToUpdate.memberOfLabel = 'NONE';
      mockHeroService.updateHero.withArgs(heroToUpdate).and.returnValue(of(heroToUpdate));
      service.updateHero(heroToUpdate);
      service.marvelHeroes.subscribe((h: MarvelHeroModel[]) => {
        expect(h).toContain(jasmine.objectContaining(heroToUpdate));
      });
    });
  });

  describe('SHOULD NOT CASES', () => {
    it('should NOT DELETE a Hero', () => {
      const heroToDelete: MarvelHeroModel = WRONG_ID_HERO_MOCK;
      mockHeroService.deleteHero.and.returnValue(of(heroToDelete));
      service.deleteHero(heroToDelete);
      service.marvelHeroes.subscribe((h: MarvelHeroModel[]) => {
        expect(h).toEqual(HEROES_MOCK);
      });
    });

    it('should NOT UPDATE a Hero', () => {
      let heroToUpdate: MarvelHeroModel = WRONG_ID_HERO_MOCK;
      heroToUpdate.creatorLabel = 'NONE';
      heroToUpdate.nameLabel = 'NONE';
      heroToUpdate.citizenshipLabel = 'NONE';
      heroToUpdate.memberOfLabel = 'NONE';
      mockHeroService.updateHero.withArgs(heroToUpdate).and.returnValue(of(heroToUpdate));
      service.updateHero(heroToUpdate);
      service.marvelHeroes.subscribe((h: MarvelHeroModel[]) => {
        expect(h).not.toContain(jasmine.objectContaining(heroToUpdate));
      });
    });
  });
});
