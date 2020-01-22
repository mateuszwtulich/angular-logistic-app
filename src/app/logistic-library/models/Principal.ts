export interface PrincipalDto{
    name: string;
    address: string;
}
  
export class Principal {
    id: number;
    name: string;
    address: string;
  
    constructor(otherPrincipal: Partial<Principal> = {}) {
      this.id = otherPrincipal.id;
      this.name = otherPrincipal.name;
      this.address = otherPrincipal.address;
    }
  
    modify(modifiedPrincipal: Principal): void {
      this.id = modifiedPrincipal.id;
      this.name = modifiedPrincipal.name;
      this.address = modifiedPrincipal.address;
    }
  
    toString(): String {
      return `Name: ${this.name}, address: ${this.address}`
    }
  
    static convertToPrincipalDto(Principal: Principal): PrincipalDto {
      return {
        name: Principal.name,
        address: Principal.address,
      }
    }
  }