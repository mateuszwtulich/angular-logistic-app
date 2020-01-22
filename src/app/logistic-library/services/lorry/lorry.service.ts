import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoints } from '../../enums/Endpoints';
import { Lorry, LorryDto } from '../../models/lorry';

@Injectable({
  providedIn: 'root'
})
export class LorryService {
  private LorryEndpoint: string;

  constructor( private http: HttpClient) {
    this.LorryEndpoint = `${'http://localhost:8080'}${Endpoints.LORRY_PATH}`;
  }

  public getLorries(): Observable<Lorry[]> {
    return this.http.get<Lorry[]>(this.LorryEndpoint).pipe(
      map((data: Lorry[]) => data.map((lorry: Lorry) => new Lorry(lorry))));
  }

  public getLorry(lorryId: number): Observable<Lorry> {
    return this.http.get<Lorry>(`${this.LorryEndpoint}/${lorryId}`).pipe(
      map((lorry: Lorry) => new Lorry(lorry))
    );
  }

  public addLorry(lorry: Lorry): Observable<Lorry> {
    const lorryDto: LorryDto = Lorry.convertToLorryDto(lorry);
    return this.http.post<Lorry>(this.LorryEndpoint, lorryDto).pipe(
      map((newLorry: Lorry) => new Lorry(newLorry))
    );
  }

  public editLorry(lorryId: number, lorry: Lorry): Observable<Lorry> {
    const lorryDto: LorryDto = Lorry.convertToLorryDto(lorry);
    return this.http.put<Lorry>(`${this.LorryEndpoint}/${lorryId}`, lorryDto).pipe(
      map((editedLorry: Lorry) => new Lorry(editedLorry))
    );
  }

  public deleteLorry(lorryId: number): Observable<any> {
    return this.http.delete<any>(`${this.LorryEndpoint}/${lorryId}`);
  }
}