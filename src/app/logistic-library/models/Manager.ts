export interface ManagerDto{
    name: string;
    surname: string;
    login: string;
    password: string;
}
  
export class Manager {
    id: number;
    name: string;
    surname: string;
    login: string;
    password: string;

    constructor(otherManager: Partial<Manager> = {}) {
      this.id = otherManager.id;
      this.name = otherManager.name
      this.surname = otherManager.surname
      this.login = otherManager.login
    }
  
    modify(modifiedManager: Manager): void {
      this.id = modifiedManager.id;
      this.name = modifiedManager.name;
      this.surname = modifiedManager.surname;
      this.login = modifiedManager.login;
      this.password = modifiedManager.password;
    }
  
    toString(): String {
      return `Name: ${this.name}, Surname: ${this.surname}`
    }
  
    static convertToManagerDto(Manager: Manager): ManagerDto {
      return {
        name: Manager.name,
        surname: Manager.surname,
        login: Manager.login,
        password: Manager.password,
      }
    }
  }