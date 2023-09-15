import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { HeroTableComponent } from './hero-table.component';
import { HeroStoreService } from '../../services/store/hero-store.service';
import { spyPropertyGetter } from '../../functions/test.functions';
import { of } from 'rxjs';
import { HEROES_MOCK } from '../../services/api-service/mock-heroes';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyTableDataSource as MatTableDataSource, MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MarvelHeroModel } from '../../models/marvel-hero.model';

describe('HeroTableComponent', () => {
  let component: HeroTableComponent;
  let fixture: ComponentFixture<HeroTableComponent>;
  let mockHeroService: SpyObj<HeroStoreService> = createSpyObj(
    'HeroStoreService',
    ['deleteHero'],
    ['marvelHeroes', 'marvelHeroesSelection']
  );

  beforeEach(waitForAsync(() => {
    spyPropertyGetter(mockHeroService, 'marvelHeroes').and.returnValue(of(HEROES_MOCK));
    spyPropertyGetter(mockHeroService, 'marvelHeroesSelection').and.returnValue(
      of(
        HEROES_MOCK.map((e: MarvelHeroModel) => {
          return e.nameLabel;
        })
      )
    );
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatTableModule],
      declarations: [HeroTableComponent],
      providers: [{ provide: HeroStoreService, useValue: mockHeroService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set data on init', () => {
    component.ngOnInit();
    expect(component.dataSource.data).toEqual(HEROES_MOCK);
    expect(component.isLoading).toBeFalse();
  });

  it('should call onHeroView on rock click', fakeAsync(() => {
    spyOn(component, 'onRowClick');
    component.ngOnInit();
    let td = fixture.debugElement.nativeElement.querySelector('#mat-row-cell-0');
    td.click();
    tick();
    expect(component.onRowClick).toHaveBeenCalled();
  }));

  it('should call onDeleteHeroView on button click', fakeAsync(() => {
    spyOn(component, 'onDeleteHeroClick');
    component.ngOnInit();
    let td = fixture.debugElement.nativeElement.querySelector('#mat-row-delete-button-0');
    td.click();
    tick();
    expect(component.onDeleteHeroClick).toHaveBeenCalled();
  }));
  it('should call onEditHeroView on button click', fakeAsync(() => {
    spyOn(component, 'onEditHeroClick');
    component.ngOnInit();
    let td = fixture.debugElement.nativeElement.querySelector('#mat-row-edit-button-0');
    td.click();
    tick();
    expect(component.onEditHeroClick).toHaveBeenCalled();
  }));
});
