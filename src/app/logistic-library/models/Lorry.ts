export interface LorryDto{
    licenceNumber: string;
    model: string;
    status: LorryStatus;
}
  
export class Lorry {
    id: number;
    licenceNumber: string;
    model: string;
    status: LorryStatus;
  
    constructor(otherLorry: Partial<Lorry> = {}) {
      this.id = otherLorry.id;
      this.licenceNumber = otherLorry.licenceNumber;
      this.model = otherLorry.model;
      this.status = otherLorry.status;
    }
  
    modify(modifiedLorry: Lorry): void {
      this.id = modifiedLorry.id;
      this.licenceNumber = modifiedLorry.licenceNumber;
      this.model = modifiedLorry.model;
      this.status = modifiedLorry.status;
    }
  
    toString(): String {
      return `Licence number: ${this.licenceNumber}, model: ${this.model}`
    }
  
    static convertToLorryDto(lorry: Lorry): LorryDto {
      return {
        licenceNumber: lorry.licenceNumber,
        model: lorry.model,
        status: lorry.status
      }
    }
  }