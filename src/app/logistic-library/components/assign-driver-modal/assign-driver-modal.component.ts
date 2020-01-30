import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Driver } from '../../models/Driver';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DriverService } from '../../services/driver/driver.service';
import { Job } from '../../models/job';
import { JobStatus } from '../../enums/JobStatus';

@Component({
  selector: 'cf-assign-driver-modal',
  templateUrl: './assign-driver-modal.component.html',
  styleUrls: ['./assign-driver-modal.component.scss']
})
export class AssignDriverModalComponent implements OnInit {

  driverControl = new FormControl('', Validators.required);
  drivers: Driver[] = [];

  constructor(public dialogRef: MatDialogRef<AssignDriverModalComponent>,
    private driverService: DriverService,
    @Inject(MAT_DIALOG_DATA) public data: Job) { }

  ngOnInit() {
    this.loadAllDrivers();
  }

  loadAllDrivers() {
    this.driverService.getDrivers().subscribe(
      (drivers: Driver[]) => this.drivers = drivers
    )
  }

  closeDialog() {
    this.dialogRef.close();
  }

  modifyJob() {
    if (this.driverControl.valid) {

      var theStatus = JobStatus.ASSIGNED;

      this.dialogRef.close(
        {
          id: this.data.id,
          number: this.data.number,
          date: this.data.date,
          commissionedParty: this.data.commissionedParty,
          principal: this.data.principal,
          driver: this.driverControl.value,
          cargo: this.data.cargo,
          loading: this.data.loading,
          unloading: this.data.unloading,
          status: theStatus,
          manager: this.data.manager,
          placeOfIssue: this.data.placeOfIssue,
          comment: this.data.comment,
          weight: this.data.weight,
          payRate: this.data.payRate,
        });
    }
  }

}
