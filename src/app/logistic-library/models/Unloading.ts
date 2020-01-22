export interface UnloadingDto{
    address: string;
}
  
export class Unloading {
    id: number;
    address: string;
  
    constructor(otherUnloading: Partial<Unloading> = {}) {
      this.id = otherUnloading.id;
      this.address = otherUnloading.address;
    }
  
    modify(modifiedUnloading: Unloading): void {
      this.id = modifiedUnloading.id;
      this.address = modifiedUnloading.address;
    }
  
    toString(): String {
      return `Address: ${this.address}`
    }
  
    static convertToUnloadingDto(Unloading: Unloading): UnloadingDto {
      return {
        address: Unloading.address
      }
    }
  }