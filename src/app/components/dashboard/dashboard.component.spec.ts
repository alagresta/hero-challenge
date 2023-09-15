import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HERO_TO_UPDATE_MOCK, HEROES_MOCK } from '../../services/api-service/mock-heroes';
import { DashboardComponent } from './dashboard.component';
import { HeroStoreService } from '../../services/store/hero-store.service';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { spyPropertyGetter } from '../../functions/test.functions';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroDetailsViewModeEnum } from '../../models/hero-details-view-mode.enum';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockHeroService: SpyObj<HeroStoreService> = createSpyObj(
    'HeroStoreService',
    ['deleteHero'],
    ['marvelHeroes']
  );

  beforeEach(waitForAsync(() => {
    spyPropertyGetter(mockHeroService, 'marvelHeroes').and.returnValue(of(HEROES_MOCK));
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, HeroSearchComponent, MatAutocomplete],
      imports: [
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: HeroStoreService, useValue: mockHeroService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    //  spyOnProperty(mockHeroService, 'marvelHeroes', 'get').and.returnValue(of(HEROES_MOCK));
    expect(component).toBeTruthy();
  });

  it('should call delete hero', waitForAsync(() => {
    mockHeroService.deleteHero.and.returnValue(of(HERO_TO_UPDATE_MOCK));
    component.deleteHero(HERO_TO_UPDATE_MOCK);
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HERO_TO_UPDATE_MOCK);
  }));

  it('should call viewHeroDetails', waitForAsync(() => {
    let onSomethingHappenedSpy = spyOn(component, 'openDialog');
    component.viewHeroDetails(HERO_TO_UPDATE_MOCK);
    expect(onSomethingHappenedSpy).toHaveBeenCalledWith(
      HERO_TO_UPDATE_MOCK,
      '0ms',
      '0ms',
      HeroDetailsViewModeEnum.VIEW
    );
  }));
  it('should call editHeroDetails', waitForAsync(() => {
    let onSomethingHappenedSpy = spyOn(component, 'openDialog');
    component.editHeroDetails(HERO_TO_UPDATE_MOCK);
    expect(onSomethingHappenedSpy).toHaveBeenCalledWith(
      HERO_TO_UPDATE_MOCK,
      '0ms',
      '0ms',
      HeroDetailsViewModeEnum.EDIT
    );
  }));

  it('should call createNewHero on button click', fakeAsync(() => {
    spyOn(component, 'createNewHero');

    let button = fixture.debugElement.nativeElement.querySelector('button#new-hero');
    button.click();
    tick();
    expect(component.createNewHero).toHaveBeenCalled();
  }));
});
