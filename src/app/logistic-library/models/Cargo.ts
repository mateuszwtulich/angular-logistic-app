export interface CargoDto{
    type: string
}
  
export class Cargo {
    id: number;
    type: string;
  
    constructor(otherCargo: Partial<Cargo> = {}) {
      this.id = otherCargo.id;
      this.type = otherCargo.type;
    }
  
    modify(modifiedCargo: Cargo): void {
      this.id = modifiedCargo.id;
      this.type = modifiedCargo.type;
    }
  
    toString(): String {
      return `Cargo type: ${this.type}`
    }
  
    static convertToCargoDto(Cargo: Cargo): CargoDto {
      return {
        type: Cargo.type,
      }
    }
  }