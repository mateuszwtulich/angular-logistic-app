export interface LoadingDto{
    address: string;
}
  
export class Loading {
    id: number;
    address: string;
  
    constructor(otherLoading: Partial<Loading> = {}) {
      this.id = otherLoading.id;
      this.address = otherLoading.address;
    }
  
    modify(modifiedLoading: Loading): void {
      this.id = modifiedLoading.id;
      this.address = modifiedLoading.address;
    }
  
    toString(): String {
      return `Address: ${this.address}`
    }
  
    static convertToLoadingDto(Loading: Loading): LoadingDto {
      return {
        address: Loading.address
      }
    }
  }