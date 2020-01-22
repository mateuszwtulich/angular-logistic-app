import { Lorry } from './Lorry';

export interface DriverDto{
    name: string;
    surname: string;
    lorryId: number;
    phoneNumber: string;
    status: DriverStatus;
    login: string;
    password: string;
}
  
export class Driver {
    id: number;
    name: string;
    surname: string;
    lorry: Lorry = null;
    phoneNumber: string;
    status: DriverStatus;
    login: string;
    password: string;

    constructor(otherDriver: Partial<Driver> = {}) {
      this.id = otherDriver.id;
      this.name = otherDriver.name
      this.surname = otherDriver.surname
      this.lorry = otherDriver.lorry
      this.phoneNumber = otherDriver.phoneNumber
      this.status = otherDriver.status
      this.login = otherDriver.login
    }
  
    modify(modifiedDriver: Driver): void {
      this.id = modifiedDriver.id;
      this.name = modifiedDriver.name;
      this.surname = modifiedDriver.surname;
      this.lorry = modifiedDriver.lorry;
      this.phoneNumber = modifiedDriver.phoneNumber;
      this.status = modifiedDriver.status;
      this.login = modifiedDriver.login;
      this.password = modifiedDriver.password;
    }
  
    toString(): String {
      return `Name: ${this.name}, Surname: ${this.surname}`
    }
  
    static convertToDriverDto(driver: Driver): DriverDto {
      return {
        name: driver.name,
        surname: driver.surname,
        lorryId: driver.lorry.id,
        phoneNumber: driver.phoneNumber,
        status: driver.status,
        login: driver.login,
        password: driver.password,
      }
    }
  }