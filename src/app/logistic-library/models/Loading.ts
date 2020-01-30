import { Principal } from './Principal';

export interface LoadingDto{
    address: string;
    principalId: number;
}
  
export class Loading {
    id: number;
    address: string;
    principal: Principal;
  
    constructor(otherLoading: Partial<Loading> = {}) {
      this.id = otherLoading.id;
      this.address = otherLoading.address;
      this.principal = otherLoading.principal
    }
  
    toString(): String {
      return `Address: ${this.address}`
    }
  
    static convertToLoadingDto(Loading: Loading): LoadingDto {
      return {
        address: Loading.address,
        principalId: Loading.principal.id
      }
    }
  }