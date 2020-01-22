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

@Component({
  selector: 'cf-modify-job-modal',
  templateUrl: './modify-job-modal.component.html',
  styleUrls: ['./modify-job-modal.component.scss']
})
export class ModifyJobModalComponent implements OnInit {

  numberControl = new FormControl('', Validators.required);
  commissionedPartyControl = new FormControl('', Validators.required);
  principalControl = new FormControl('', Validators.required);
  driverControl = new FormControl('', Validators.nullValidator);
  cargoControl = new FormControl('', Validators.required);
  loadingControl = new FormControl('', Validators.required);
  unloadingControl = new FormControl('', Validators.required);
  placeOfIssueControl = new FormControl('', Validators.required);
  payRateControl = new FormControl('', Validators.required);
  commentControl = new FormControl('', Validators.required);
  weightControl = new FormControl('', Validators.required);
  manager: Manager;
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
              @Inject(MAT_DIALOG_DATA) public data: Job ) { 
                
              }

  ngOnInit() {
    this.loadAllCargos();
    this.loadAllDrivers();
    this.loadAllLoadings();
    this.loadAllUnloadings();
    this.loadAllPrincipals();
    console.log(this.data);
    this.managerService.getManager(5).subscribe( (manager: Manager) => this.manager = manager)
  }

  loadAllDrivers(){
    this.driverService.getDrivers().subscribe(
      (drivers: Driver[]) => this.drivers = drivers
    )
  }

  loadAllLoadings(){
    this.loadingService.getLoadings().subscribe(
      (loadings: Loading[]) => this.loadings = loadings
    )
  }

  loadAllUnloadings(){
    this.unloadingService.getUnloadings().subscribe(
      (unloadings: Unloading[]) => this.unloadings = unloadings
    )
  }

  loadAllPrincipals(){
    this.principalService.getPrincipals().subscribe(
      (principals: Principal[]) => this.principals = principals
    )
  }

  loadAllCargos(){
    this.cargoService.getCargos().subscribe(
      (cargos: Cargo[]) => this.cargos = cargos
    )
  }

  closeDialog(){
    this.dialogRef.close();
  }

  modifyJob(){
    if(this.numberControl.valid && this.payRateControl.valid && this.cargoControl.valid && 
      this.commentControl.valid && this.commissionedPartyControl.valid && this.loadingControl.valid && 
      this.unloadingControl.valid && this.principalControl.valid && this.placeOfIssueControl.valid &&
      this.weightControl.valid){

      var theStatus = JobStatus.UNASSIGNED;

      if(this.driverControl.value){
        theStatus = JobStatus.ASSIGNED;
      }

      console.log(this.driverControl.value)

      this.dialogRef.close(
        {
        number : Number(this.numberControl.value),
        date: new Date().toJSON(),
        commissionedParty: this.commissionedPartyControl.value,
        principal : this.principalControl.value,
        driver: this.driverControl.value,
        cargo : this.cargoControl.value,
        loading : this.loadingControl.value,
        unloading : this.unloadingControl.value,
        status : theStatus,
        manager: this.manager,
        placeOfIssue : this.placeOfIssueControl.value,
        comment : this.commentControl.value,
        weight : Number(this.weightControl.value),
        payRate : Number(this.payRateControl.value), 
      });
    }
  }

}
