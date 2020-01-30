import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoints } from '../../enums/Endpoints';
import { Unloading, UnloadingDto } from '../../models/unloading';

@Injectable({
  providedIn: 'root'
})
export class UnloadingService {
  private UnloadingEndpoint: string;

  constructor(private http: HttpClient) {
    this.UnloadingEndpoint = `${'http://localhost:8080'}${Endpoints.UNLOADING_PATH}`;
  }

  public getUnloadings(): Observable<Unloading[]> {
    return this.http.get<Unloading[]>(this.UnloadingEndpoint).pipe(
      map((data: Unloading[]) => data.map((unloading: Unloading) => new Unloading(unloading))));
  }

  public getUnloading(unloadingId: number): Observable<Unloading> {
    return this.http.get<Unloading>(`${this.UnloadingEndpoint}/${unloadingId}`).pipe(
      map((unloading: Unloading) => new Unloading(unloading))
    );
  }

  public addUnloading(unloading: Unloading): Observable<Unloading> {
    console.log(unloading);
    const unloadingDto: UnloadingDto = Unloading.convertToUnloadingDto(unloading);
    console.log(unloadingDto);
    return this.http.post<Unloading>(this.UnloadingEndpoint, unloadingDto).pipe(
      map((newUnloading: Unloading) => new Unloading(newUnloading))
    );
  }

  public editUnloading(unloadingId: number, unloading: Unloading): Observable<Unloading> {
    const unloadingDto: UnloadingDto = Unloading.convertToUnloadingDto(unloading);
    return this.http.put<Unloading>(`${this.UnloadingEndpoint}/${unloadingId}`, unloadingDto).pipe(
      map((editedUnloading: Unloading) => new Unloading(editedUnloading))
    );
  }

  public deleteUnloading(unloadingId: number): Observable<any> {
    return this.http.delete<any>(`${this.UnloadingEndpoint}/${unloadingId}`);
  }
}