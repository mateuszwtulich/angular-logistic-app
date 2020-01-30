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
  
    toString(): String {
      return `Address: ${this.address}`
    }
  
    static convertToUnloadingDto(unloading: Unloading): UnloadingDto {
      return {
        address: unloading.address
      }
    }
  }