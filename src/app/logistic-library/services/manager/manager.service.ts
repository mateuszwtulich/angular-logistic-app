import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoints } from '../../enums/Endpoints';
import { Manager, ManagerDto } from '../../models/manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private ManagerEndpoint: string;

  constructor( private http: HttpClient) {
    this.ManagerEndpoint = `${'http://localhost:8080'}${Endpoints.MANAGER_PATH}`;
  }

  public getManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(this.ManagerEndpoint).pipe(
      map((data: Manager[]) => data.map((manager: Manager) => new Manager(manager))));
  }

  public getManager(managerId: number): Observable<Manager> {
    return this.http.get<Manager>(`${this.ManagerEndpoint}/${managerId}`).pipe(
      map((manager: Manager) => new Manager(manager))
    );
  }

  public addManager(manager: Manager): Observable<Manager> {
    const managerDto: ManagerDto = Manager.convertToManagerDto(manager);
    return this.http.post<Manager>(this.ManagerEndpoint, managerDto).pipe(
      map((newManager: Manager) => new Manager(newManager))
    );
  }

  public editManager(managerId: number, manager: Manager): Observable<Manager> {
    const managerDto: ManagerDto = Manager.convertToManagerDto(manager);
    return this.http.put<Manager>(`${this.ManagerEndpoint}/${managerId}`, managerDto).pipe(
      map((editedManager: Manager) => new Manager(editedManager))
    );
  }

  public deleteManager(managerId: number): Observable<any> {
    return this.http.delete<any>(`${this.ManagerEndpoint}/${managerId}`);
  }
}