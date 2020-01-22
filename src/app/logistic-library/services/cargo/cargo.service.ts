import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoints } from '../../enums/Endpoints';
import { Cargo, CargoDto } from '../../models/Cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private CargoEndpoint: string;  

  constructor( private http: HttpClient) {
    this.CargoEndpoint = `${'http://localhost:8080'}${Endpoints.CARGO_PATH}`;
  }

  public getCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.CargoEndpoint).pipe(
      map((data: Cargo[]) => data.map((cargo: Cargo) => new Cargo(cargo))));
  }

  public getCargo(cargoId: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${this.CargoEndpoint}/${cargoId}`).pipe(
      map((cargo: Cargo) => new Cargo(cargo))
    );
  }

  public addCargo(cargo: Cargo): Observable<Cargo> {
    const cargoDto: CargoDto = Cargo.convertToCargoDto(cargo);
    return this.http.post<Cargo>(this.CargoEndpoint, cargoDto).pipe(
      map((newCargo: Cargo) => new Cargo(newCargo))
    );
  }

  public editCargo(cargoId: number, cargo: Cargo): Observable<Cargo> {
    const cargoDto: CargoDto = Cargo.convertToCargoDto(cargo);
    return this.http.put<Cargo>(`${this.CargoEndpoint}/${cargoId}`, cargoDto).pipe(
      map((editedCargo: Cargo) => new Cargo(editedCargo))
    );
  }

  public deleteCargo(cargoId: number): Observable<any> {
    return this.http.delete<any>(`${this.CargoEndpoint}/${cargoId}`);
  }
}