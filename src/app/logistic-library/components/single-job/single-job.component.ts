import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../models/job';
import { JobService } from '../../services/job/job.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteJobModalComponent } from '../delete-job-modal/delete-job-modal.component';
import {Router} from '@angular/router';
import { JobStatus } from '../../enums/JobStatus';
import { FinishJobModalComponent } from '../finish-job-modal/finish-job-modal.component';
import { ModifyJobModalComponent } from '../modify-job-modal/modify-job-modal.component';
import { AssignDriverModalComponent } from '../assign-driver-modal/assign-driver-modal.component';

@Component({
  selector: 'cf-single-job',
  templateUrl: './single-job.component.html',
  styleUrls: ['./single-job.component.scss']
})
export class SingleJobComponent implements OnInit {

  job : Job;

  constructor(private jobService: JobService, private route: ActivatedRoute, public dialog: MatDialog, 
              private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.getJob();
  }

  getJob(){
    this.jobService.getJob(Number(this.route.snapshot.paramMap.get('id')))
        .subscribe((job : Job) => this.job = job);
  }

  deleteJob(){
    const dialogRef = this.openDeleteJobModal(this.job);
    this.handleClosingDeleteJobModal(dialogRef);
  }

  private openDeleteJobModal(jobToDelete: Job){
    return this.dialog.open(DeleteJobModalComponent, 
      {data: jobToDelete})
    };

  private handleClosingDeleteJobModal(dialogRef: MatDialogRef<DeleteJobModalComponent>){
    dialogRef.afterClosed().subscribe(isDeleted => {
        if(!isDeleted){
          this.snackBar.open('Adding job canceled!', 'Close', { duration: 2000});
        } else{
          this.jobService.deleteJob(this.job.id).subscribe(() => {
            this.snackBar.open('Job has been deleted!', 'Close', {duration: 2000});
            this.router.navigate(['/jobs-management']);
          },(e) => {
            this.snackBar.open(e.error.message,'Close', {duration: 2000});
          })
        }
    });
  }

  finishJob(){
    const dialogRef = this.openFinishJobModal(this.job);
    this.handleClosingFinishJobModal(dialogRef);
  }

  private openFinishJobModal(jobToFinish: Job){
    return this.dialog.open(FinishJobModalComponent, 
      {data: this.job})
    };

  private handleClosingFinishJobModal(dialogRef: MatDialogRef<FinishJobModalComponent>){
    dialogRef.afterClosed().subscribe(isFinished => {
        if(!isFinished){
          this.snackBar.open('Finishing job canceled!', 'Close', { duration: 2000});
        } else{
          this.job.status = JobStatus.FINISHED;
          this.jobService.editJob(this.job.id, this.job).subscribe(() => {
            this.snackBar.open('Job has been finished!', 'Close', {duration: 2000});
          },(e) => {
            this.snackBar.open(e.error.message,'Close', {duration: 2000});
          })
        }
    });
  }

  modifyJob(){
    const dialogRef = this.openModifyJobModal();
    this.handleClosingModifyJobModal(dialogRef);
  }

  private openModifyJobModal(){
    return this.dialog.open(ModifyJobModalComponent, {data: this.job})
  }

  private handleClosingModifyJobModal(dialogRef: MatDialogRef<ModifyJobModalComponent>){
    dialogRef.afterClosed().subscribe((job: Job) => {
        if(job === undefined){
          this.snackBar.open('Modifying job canceled!', 'Close', { duration: 2000});
        } else{
          console.log(job);
          this.jobService.editJob(job.id, job).subscribe((modifiedJob: Job) => {
            this.snackBar.open('Job ' + modifiedJob.number +' has been modified!', 'Close', {duration: 2000});
          },(e) => {
            this.snackBar.open(e.error.message,'Close', {duration: 2000});
          })
        }
        this.getJob();
    });
  }

  assignDriver(){
    const dialogRef = this.openAssignDriverModal();
    this.handleClosingAssignDriverModal(dialogRef);
  }

  private openAssignDriverModal(){
    return this.dialog.open(AssignDriverModalComponent, {data: this.job})
  }

  private handleClosingAssignDriverModal(dialogRef: MatDialogRef<AssignDriverModalComponent>){
    dialogRef.afterClosed().subscribe((job: Job) => {
        if(job === undefined){
          this.snackBar.open('Assigning driver canceled!', 'Close', { duration: 2000});
        } else{
          console.log(job);
          this.jobService.editJob(job.id, job).subscribe((modifiedJob: Job) => {
            this.snackBar.open('Driver ' + modifiedJob.driver +' has been assigned!', 'Close', {duration: 2000});
          },(e) => {
            this.snackBar.open(e.error.message,'Close', {duration: 2000});
          })
        }
        this.getJob();
    });
  }

}
