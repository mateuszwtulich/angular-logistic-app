import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoints } from '../../enums/Endpoints';
import { Principal, PrincipalDto } from '../../models/principal';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  private PrincipalEndpoint: string;

  constructor( private http: HttpClient) {
    this.PrincipalEndpoint = `${'http://localhost:8080'}${Endpoints.PRINCIPAL_PATH}`;
  }

  public getPrincipals(): Observable<Principal[]> {
    return this.http.get<Principal[]>(this.PrincipalEndpoint).pipe(
      map((data: Principal[]) => data.map((principal: Principal) => new Principal(principal))));
  }

  public getPrincipal(principalId: number): Observable<Principal> {
    return this.http.get<Principal>(`${this.PrincipalEndpoint}/${principalId}`).pipe(
      map((principal: Principal) => new Principal(principal))
    );
  }

  public addPrincipal(principal: Principal): Observable<Principal> {
    const principalDto: PrincipalDto = Principal.convertToPrincipalDto(principal);
    return this.http.post<Principal>(this.PrincipalEndpoint, principalDto).pipe(
      map((newPrincipal: Principal) => new Principal(newPrincipal))
    );
  }

  public editPrincipal(principalId: number, principal: Principal): Observable<Principal> {
    const principalDto: PrincipalDto = Principal.convertToPrincipalDto(principal);
    return this.http.put<Principal>(`${this.PrincipalEndpoint}/${principalId}`, principalDto).pipe(
      map((editedPrincipal: Principal) => new Principal(editedPrincipal))
    );
  }

  public deletePrincipal(principalId: number): Observable<any> {
    return this.http.delete<any>(`${this.PrincipalEndpoint}/${principalId}`);
  }
}