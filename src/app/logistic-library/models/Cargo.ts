import { Principal } from './Principal';

export interface CargoDto{
    type: string
    principalId: number
}
  
export class Cargo {
    id: number;
    type: string;
    principal: Principal;
  
    constructor(otherCargo: Partial<Cargo> = {}) {
      this.id = otherCargo.id;
      this.type = otherCargo.type;
    }
    
    toString(): String {
      return `Cargo type: ${this.type}`
    }
  
    static convertToCargoDto(Cargo: Cargo): CargoDto {
      return {
        type: Cargo.type,
        principalId: Cargo.principal.id,
      }
    }
  }