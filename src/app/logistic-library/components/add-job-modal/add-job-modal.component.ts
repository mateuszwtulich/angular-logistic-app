import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CargoService } from '../../services/cargo/cargo.service';
import { DriverService } from '../../services/driver/driver.service';
import { LoadingService } from '../../services/loading/loading.service';
import { PrincipalService } from '../../services/principal/principal.service';
import { UnloadingService } from '../../services/unloading/unloading.service';
import { Principal, PrincipalDto } from '../../models/Principal';
import { Loading } from '../../models/Loading';
import { Driver } from '../../models/Driver';
import { Cargo } from '../../models/Cargo';
import { Unloading } from '../../models/Unloading';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Job } from '../../models/job';
import { JobStatus } from '../../enums/JobStatus';
import { ManagerService } from '../../services/manager/manager.service';
import { Manager } from '../../models/Manager';
import { JobService } from '../../services/job/job.service';

@Component({
  selector: 'cf-add-job-modal',
  templateUrl: './add-job-modal.component.html',
  styleUrls: ['./add-job-modal.component.scss']
})
export class AddJobModalComponent implements OnInit {

  commissionedPartyControl = new FormControl('', Validators.required);
  principalControl = new FormControl('', Validators.required);
  driverControl = new FormControl('', Validators.nullValidator);
  cargoControl = new FormControl('', Validators.required);
  newCargoControl = new FormControl('', Validators.required);
  loadingControl = new FormControl('', Validators.required);
  newLoadingControl = new FormControl('', Validators.required);
  unloadingControl = new FormControl('', Validators.required);
  newUnloadingControl = new FormControl('', Validators.required)
  placeOfIssueControl = new FormControl('', Validators.required);
  payRateControl = new FormControl('', Validators.required);
  commentControl = new FormControl('', Validators.required);
  weightControl = new FormControl('', Validators.required);
  newPrincipalNameControl = new FormControl('', Validators.required);
  newPrincipalAddressControl = new FormControl('', Validators.required);
  isNewCargoRequired = false;
  isNewLoadingRequired = false;
  isNewUnloadingRequired = false;
  isNewPrincipalRequired = false;
  jobNumbers: number[] = [];
  nextNumber = 1;
  manager: Manager;
  jobs: Job[] = [];
  cargos: Cargo[] = [];
  drivers: Driver[] = [];
  loadings: Loading[] = [];
  principals: Principal[] = [];
  unloadings: Unloading[] = [];

  constructor(public dialogRef: MatDialogRef<AddJobModalComponent>,
    private cargoService: CargoService,
    private driverService: DriverService,
    private loadingService: LoadingService,
    private principalService: PrincipalService,
    private unloadingService: UnloadingService,
    private managerService: ManagerService,
    private jobService: JobService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadAllCargos();
    this.loadAllDrivers();
    this.loadAllLoadings();
    this.loadAllUnloadings();
    this.loadAllPrincipals();
    this.loadAllJobs();
    this.managerService.getManager(11).subscribe((manager: Manager) => this.manager = manager)
  }

  newCargoRequired() {
    this.isNewCargoRequired = !this.isNewCargoRequired;
  }

  newLoadingRequired() {
    this.isNewLoadingRequired = !this.isNewLoadingRequired;
  }

  newUnloadingRequired() {
    this.isNewUnloadingRequired = !this.isNewUnloadingRequired;
  }

  newPrincipalRequired() {
    this.isNewPrincipalRequired = !this.isNewPrincipalRequired;
    if(this.isNewPrincipalRequired){
      this.loadAllCargos();
      this.loadAllLoadings();
    }else if(this.principalControl.value){
      this.loadFromPrincipal(this.principalControl.value.id);
    }
  }

  loadAllJobs() {
    this.jobService.getJobs().subscribe(
      (jobs: Job[]) => this.jobs = jobs
    )
  }

  loadAllDrivers() {
    this.driverService.getDrivers().subscribe(
      (drivers: Driver[]) => this.drivers = drivers
    )
  }

  loadFromPrincipal(principalId: number) {
    this.principalService.getLoadingsFromPrincipal(principalId).subscribe(
      (loadings: Loading[]) => this.loadings = loadings
    );
    this.principalService.getCargosFromPrincipal(principalId).subscribe(
      (cargos: Cargo[]) => this.cargos = cargos
    );
  }

  loadAllLoadings() {
    this.loadingService.getLoadings().subscribe(
      (loadings: Loading[]) => this.loadings = loadings
    )
  }

  loadAllUnloadings() {
    this.unloadingService.getUnloadings().subscribe(
      (unloadings: Unloading[]) => this.unloadings = unloadings
    )
  }

  loadAllPrincipals() {
    this.principalService.getPrincipals().subscribe(
      (principals: Principal[]) => this.principals = principals
    )
  }

  loadAllCargos() {
    this.cargoService.getCargos().subscribe(
      (cargos: Cargo[]) => this.cargos = cargos
    )
  }

  private async loadNextNumber() {
    if (this.jobs.length > 0) {
      this.jobs.forEach(job => this.jobNumbers.push(job.number));
      this.jobNumbers = this.jobNumbers.sort((a, b) => a - b);

      var once = 0;
      for (let i = 0; i < this.jobNumbers.length; i++) {
        if (this.jobNumbers[i] != i + 1 && once == 0) {
          this.nextNumber = i + 1;
          once = 1;
        }
      }
      if (once == 0) {
        this.nextNumber = this.jobNumbers[this.jobNumbers.length - 1] + 1;
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private async addJob() {
    if (this.payRateControl.valid && this.commentControl.valid &&
      this.commissionedPartyControl.valid && this.placeOfIssueControl.valid && this.weightControl.valid) {

      var principal;
      if (this.newPrincipalAddressControl.valid && this.newPrincipalNameControl.valid && this.isNewPrincipalRequired) {
        principal = await this.saveNewPrincipal();
      }
      else if (this.principalControl.valid) {
        principal = this.principalControl.value;
      }

      var cargo;
      if (this.newCargoControl.valid && this.isNewCargoRequired) {
        cargo = await this.saveNewCargo(principal);
      }
      else if (this.cargoControl.valid) {
        cargo = this.cargoControl.value;
      }

      var loading;
      if (this.newLoadingControl.valid && this.isNewLoadingRequired) {
        loading = await this.saveNewLoading(principal);
      }
      else if (this.loadingControl.valid) {
        loading = this.loadingControl.value;
      }

      var unloading;
      if (this.newUnloadingControl.valid && this.isNewUnloadingRequired) {
        unloading = await this.saveNewUnloading();
      }
      else if (this.unloadingControl.valid) {
        unloading = this.unloadingControl.value;
      }

      var driver = new Driver();
      var theStatus = JobStatus.UNASSIGNED;
      if (this.driverControl.value) {
        theStatus = JobStatus.ASSIGNED;
        driver = this.driverControl.value;
      } else {
        driver.id = null;
      }

      await this.loadNextNumber();
      await this.sendJob(principal, driver, cargo, loading, unloading, theStatus);
    }
  }

  private async sendJob(principal: Principal, driver: Driver, cargo: Cargo,
    loading: Loading, unloading: Unloading, status: JobStatus) {
    this.dialogRef.close(
      {
        id: null,
        number: this.nextNumber,
        date: new Date().toJSON(),
        commissionedParty: this.commissionedPartyControl.value,
        principal: principal,
        driver: driver,
        cargo: cargo,
        loading: loading,
        unloading: unloading,
        status: status,
        manager: this.manager,
        placeOfIssue: this.placeOfIssueControl.value,
        comment: this.commentControl.value,
        weight: Number(this.weightControl.value),
        payRate: Number(this.payRateControl.value),
      });
  }

  private async saveNewCargo(principal: Principal) {
    var cargo: Cargo = {
      id: null,
      type: this.newCargoControl.value,
      principal: principal
    }
    this.cargoService.addCargo(cargo).subscribe(
      (cargoOutput: Cargo) => {
        cargo = cargoOutput;
      }, (e) => {
        this.snackBar.open(e.error.message, 'Close', { duration: 2000 });
      });
      while(cargo.id== null){
        await this.delay(20);
      }
    return cargo;
  }

  private async saveNewLoading(principal: Principal) {
    var loading: Loading = {
      id: null,
      address: this.newLoadingControl.value,
      principal: principal
    }
     await this.loadingService.addLoading(loading).subscribe(
      (loadingOutput: Loading) => {
        loading = loadingOutput
      }, (e) => {
        this.snackBar.open(e.error.message, 'Close', { duration: 2000 });
      });

    while(loading.id== null){
      await this.delay(20);
    }
    return loading
  }

  private async saveNewUnloading() {
    var unloading: Unloading = {
      id: null,
      address: this.newUnloadingControl.value
    }
    this.unloadingService.addUnloading(unloading).subscribe(
      (unloadingOutput: Unloading) => {
        unloading = unloadingOutput
      }, (e) => {
        this.snackBar.open(e.error.message, 'Close', { duration: 2000 });
      });
      while(unloading.id== null){
        await this.delay(20);
      }    
      return unloading
  }

  private async saveNewPrincipal() {
    var principal: Principal = {
      id: null,
      name: this.newPrincipalNameControl.value,
      address: this.newPrincipalAddressControl.value
    }
    this.principalService.addPrincipal(principal).subscribe(
      (principalOutput: Principal) => {
        principal = principalOutput
      }, (e) => {
        this.snackBar.open(e.error.message, 'Close', { duration: 2000 });
      });
      while(principal.id== null){
        await this.delay(20);
      }    
      return principal
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
