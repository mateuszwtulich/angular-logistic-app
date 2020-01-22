import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoints } from '../../enums/Endpoints';
import { Loading, LoadingDto } from '../../models/loading';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private LoadingEndpoint: string;

  constructor( private http: HttpClient) {
    this.LoadingEndpoint = `${'http://localhost:8080'}${Endpoints.LOADING_PATH}`;
  }

  public getLoadings(): Observable<Loading[]> {
    return this.http.get<Loading[]>(this.LoadingEndpoint).pipe(
      map((data: Loading[]) => data.map((loading: Loading) => new Loading(loading))));
  }

  public getLoading(loadingId: number): Observable<Loading> {
    return this.http.get<Loading>(`${this.LoadingEndpoint}/${loadingId}`).pipe(
      map((loading: Loading) => new Loading(loading))
    );
  }

  public addLoading(loading: Loading): Observable<Loading> {
    const loadingDto: LoadingDto = Loading.convertToLoadingDto(loading);
    return this.http.post<Loading>(this.LoadingEndpoint, loadingDto).pipe(
      map((newLoading: Loading) => new Loading(newLoading))
    );
  }

  public editLoading(loadingId: number, loading: Loading): Observable<Loading> {
    const loadingDto: LoadingDto = Loading.convertToLoadingDto(loading);
    return this.http.put<Loading>(`${this.LoadingEndpoint}/${loadingId}`, loadingDto).pipe(
      map((editedLoading: Loading) => new Loading(editedLoading))
    );
  }

  public deleteLoading(loadingId: number): Observable<any> {
    return this.http.delete<any>(`${this.LoadingEndpoint}/${loadingId}`);
  }
}