import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Manager } from '../../models/Manager';
import { Cargo } from '../../models/Cargo';
import { Driver } from '../../models/Driver';
import { Loading } from '../../models/Loading';
import { Principal } from '../../models/Principal';
import { Unloading } from '../../models/Unloading';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddJobModalComponent } from '../add-job-modal/add-job-modal.component';
import { CargoService } from '../../services/cargo/cargo.service';
import { DriverService } from '../../services/driver/driver.service';
import { LoadingService } from '../../services/loading/loading.service';
import { PrincipalService } from '../../services/principal/principal.service';
import { UnloadingService } from '../../services/unloading/unloading.service';
import { ManagerService } from '../../services/manager/manager.service';
import { JobStatus } from '../../enums/JobStatus';
import { Job } from '../../models/job';
import { JobService } from '../../services/job/job.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cf-modify-job-modal',
  templateUrl: './modify-job-modal.component.html',
  styleUrls: ['./modify-job-modal.component.scss']
})
export class ModifyJobModalComponent implements OnInit {

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
  manager: Manager;
  cargos: Cargo[] = [];
  drivers: Driver[] = [];
  loadings: Loading[] = [];
  principals: Principal[] = [];
  unloadings: Unloading[] = [];
  job: Job;
  isSpinnerDisplayed = false;

  constructor(public dialogRef: MatDialogRef<AddJobModalComponent>,
    private cargoService: CargoService,
    private driverService: DriverService,
    private loadingService: LoadingService,
    private principalService: PrincipalService,
    private unloadingService: UnloadingService,
    private managerService: ManagerService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Job) { }

  async ngOnInit() {
    this.job = this.mapJob();
    this.loadFromPrincipal(this.job.principal.id);
    this.loadAllDrivers();
    this.loadAllUnloadings();
    this.loadAllPrincipals();
    this.managerService.getManager(11).subscribe((manager: Manager) => this.manager = manager)
  }

  mapJob() {
    this.isSpinnerDisplayed = true;
    return {
      id: this.data.id,
      number: this.data.number,
      date: this.data.date,
      commissionedParty: this.data.commissionedParty,
      principal: this.data.principal,
      driver: this.data.driver,
      cargo: this.data.cargo,
      loading: this.data.loading,
      unloading: this.data.unloading,
      status: this.data.status,
      manager: this.data.manager,
      placeOfIssue: this.data.placeOfIssue,
      comment: this.data.comment,
      weight: this.data.weight,
      payRate: this.data.payRate,
    }
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
    if (this.isNewPrincipalRequired) {
      this.loadAllCargos();
      this.loadAllLoadings();
    } else if (this.principalControl.value) {
      this.loadFromPrincipal(this.principalControl.value);
    }
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
      (principals: Principal[]) => {
        this.principals = principals;
        this.isSpinnerDisplayed = false;
      }
    )
  }

  loadAllCargos() {
    this.cargoService.getCargos().subscribe(
      (cargos: Cargo[]) => this.cargos = cargos
    )
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private async modifyJob() {
    if (this.payRateControl.valid && this.commentControl.valid &&
      this.commissionedPartyControl.valid && this.placeOfIssueControl.valid && this.weightControl.valid) {

      var principal;
      if (this.newPrincipalAddressControl.valid && this.newPrincipalNameControl.valid && this.isNewPrincipalRequired) {
        principal = await this.saveNewPrincipal();
      }
      else if (this.principalControl.valid) {
        principal = this.job.principal;
      }

      var cargo;
      if (this.newCargoControl.valid && this.isNewCargoRequired) {
        cargo = await this.saveNewCargo(principal);
      }
      else if (this.cargoControl.valid) {
        cargo = this.job.cargo;
      }

      var loading;
      if (this.newLoadingControl.valid && this.isNewLoadingRequired) {
        loading = await this.saveNewLoading(principal);
      }
      else if (this.loadingControl.valid) {
        loading = this.job.loading;
      }

      var unloading;
      if (this.newUnloadingControl.valid && this.isNewUnloadingRequired) {
        unloading = await this.saveNewUnloading();
      }
      else if (this.unloadingControl.valid) {
        unloading = this.job.unloading;
      }

      var driver = new Driver();
      var theStatus = JobStatus.UNASSIGNED;
      if (this.driverControl.value) {
        theStatus = JobStatus.ASSIGNED;
        driver = this.job.driver;
      } else {
        driver.id = null;
      }

      this.dialogRef.close(
        {
          id: this.job.id,
          number: this.job.number,
          date: this.job.date,
          commissionedParty: this.job.commissionedParty,
          principal: principal,
          driver: driver,
          cargo: cargo,
          loading: loading,
          unloading: unloading,
          status: theStatus,
          manager: this.manager,
          placeOfIssue: this.placeOfIssueControl.value,
          comment: this.commentControl.value,
          weight: Number(this.weightControl.value),
          payRate: Number(this.payRateControl.value),
        });
    }
  }

  private async saveNewCargo(principal: Principal) {
    var cargo: Cargo = {
      id: null,
      type: this.newCargoControl.value,
      principal: principal,
    }

    this.cargoService.addCargo(cargo).subscribe(
      (cargoOutput: Cargo) => {
        cargo = new Cargo(cargoOutput);
      }, (e) => {
        this.snackBar.open(e.error.message, 'Close', { duration: 2000 });
      });
    while (cargo.id == null) {
      await this.delay(20);
    } return cargo;
  }

  private async saveNewLoading(principal: Principal) {
    var loading: Loading = {
      id: null,
      address: this.newLoadingControl.value,
      principal: principal
    }
    this.loadingService.addLoading(loading).subscribe(
      (loadingOutput: Loading) => {
        loading = loadingOutput
      }, (e) => {
        this.snackBar.open(e.error.message, 'Close', { duration: 2000 });
      });
    while (loading.id == null) {
      await this.delay(20);
    } return loading
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
    while (unloading.id == null) {
      await this.delay(20);
    } return unloading
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
    while (principal.id == null) {
      await this.delay(20);
    } return principal
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
