import { Principal } from './Principal';
import { Manager } from './Manager';
import { Driver } from './Driver';
import { Cargo } from './Cargo';
import { Loading } from './Loading';
import { Unloading } from './Unloading';
import { JobStatus } from '../enums/JobStatus';

export interface JobDto{
    number: number;
    date: Date;
    commissionedParty: string;
    principalId: number;
    driverId: number;
    managerId: number;
    cargoId: number;
    loadingId: number;
    unloadingId: number;
    status: JobStatus;
    placeOfIssue: string;
    comment: string;
    weight: number;
    payRate: number;
}
  
export class Job {
    id: number;
    number: number;
    date: Date;
    commissionedParty: string;
    principal: Principal;
    driver: Driver = null;
    manager: Manager;
    cargo: Cargo;
    loading: Loading;
    unloading: Unloading;
    status: JobStatus;
    placeOfIssue: string;
    comment: string;
    weight: number;
    payRate: number;

    constructor(otherJob: Partial<Job> = {}) {
      this.id = otherJob.id;
      this.number = otherJob.number
      this.date = otherJob.date
      this.commissionedParty = otherJob.commissionedParty
      this.principal = otherJob.principal
      this.driver = otherJob.driver
      this.manager = otherJob.manager
      this.cargo = otherJob.cargo
      this.loading = otherJob.loading
      this.unloading = otherJob.unloading
      this.status = otherJob.status
      this.placeOfIssue = otherJob.placeOfIssue
      this.comment = otherJob.comment
      this.weight = otherJob.weight
      this.payRate = otherJob.payRate
    }
  
    // modify(modifiedJob: Job): void {
    //   this.id = modifiedJob.id;
    //   this.number = modifiedJob.number
    //   this.date = modifiedJob.date
    //   this.commissionedParty = modifiedJob.commissionedParty
    //   this.principal = modifiedJob.principal
    //   this.driver = modifiedJob.driver
    //   this.manager = modifiedJob.manager
    //   this.cargo = modifiedJob.cargo
    //   this.loading = modifiedJob.loading
    //   this.unloading = modifiedJob.unloading
    //   this.status = modifiedJob.status
    //   this.placeOfIssue = modifiedJob.placeOfIssue
    //   this.comment = modifiedJob.comment
    //   this.weight = modifiedJob.weight
    //   this.payRate = modifiedJob.payRate
    // }
  
    toString(): String {
      return `Number: ${this.number}, Principal: ${this.principal.name}`
    }
  
    static convertToJobDto(Job: Job): JobDto {
      return {
        number: Job.number,
        date: Job.date,
        commissionedParty: Job.commissionedParty,
        principalId: Job.principal.id,
        driverId: Job.driver.id,
        managerId: Job.manager.id,
        cargoId: Job.cargo.id,
        loadingId: Job.loading.id,
        unloadingId: Job.unloading.id,
        status: Job.status,
        placeOfIssue: Job.placeOfIssue,
        comment: Job.comment,
        weight: Job.weight,
        payRate: Job.payRate
      }
    }
  }