import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoints } from '../../enums/Endpoints';
import { Driver, DriverDto } from '../../models/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private DriverEndpoint: string;

  constructor(private http: HttpClient) {
    this.DriverEndpoint = `${'http://localhost:8080'}${Endpoints.DRIVER_PATH}`;
  }

  public getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.DriverEndpoint).pipe(
      map((data: Driver[]) => data.map((driver: Driver) => new Driver(driver))));
  }

  public getDriver(driverId: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.DriverEndpoint}/${driverId}`).pipe(
      map((driver: Driver) => new Driver(driver))
    );
  }

  public addDriver(driver: Driver): Observable<Driver> {
    const driverDto: DriverDto = Driver.convertToDriverDto(driver);
    return this.http.post<Driver>(this.DriverEndpoint, driverDto).pipe(
      map((newDriver: Driver) => new Driver(newDriver))
    );
  }

  public editDriver(driverId: number, driver: Driver): Observable<Driver> {
    const driverDto: DriverDto = Driver.convertToDriverDto(driver);
    return this.http.put<Driver>(`${this.DriverEndpoint}/${driverId}`, driverDto).pipe(
      map((editedDriver: Driver) => new Driver(editedDriver))
    );
  }

  public deleteDriver(driverId: number): Observable<any> {
    return this.http.delete<any>(`${this.DriverEndpoint}/${driverId}`);
  }
}