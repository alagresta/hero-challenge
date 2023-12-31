import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MarvelHeroModel } from '../../models/marvel-hero.model';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET heroes from the server */
  getHeroes(): Observable<MarvelHeroModel[]> {
    return this.http.get<MarvelHeroModel[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<MarvelHeroModel[]>('getHeroes', []))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<MarvelHeroModel> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<MarvelHeroModel[]>(url).pipe(
      map((heroes) => heroes[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<MarvelHeroModel>(`getHero id=${id}`))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<MarvelHeroModel> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<MarvelHeroModel>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<MarvelHeroModel>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<MarvelHeroModel[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<MarvelHeroModel[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`)
      ),
      catchError(this.handleError<MarvelHeroModel[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero(hero: MarvelHeroModel): Observable<MarvelHeroModel> {
    return this.http.post<MarvelHeroModel>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: MarvelHeroModel) => {
        this.log(`added hero w/ id=${hero.id}`);
      }),
      catchError(this.handleError<MarvelHeroModel>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: string): Observable<MarvelHeroModel> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<MarvelHeroModel>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<MarvelHeroModel>('deleteHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: MarvelHeroModel): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`HeroService: ${message}`);
  }
}
