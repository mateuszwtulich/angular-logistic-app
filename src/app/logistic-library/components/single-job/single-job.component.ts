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
import { DatePipe } from '@angular/common';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'cf-single-job',
  templateUrl: './single-job.component.html',
  styleUrls: ['./single-job.component.scss'],
  providers: [DatePipe]
})
export class SingleJobComponent implements OnInit {

  isSpinnerDisplayed = false;
  job : Job;
  date: String;

  constructor(private jobService: JobService, private route: ActivatedRoute, public dialog: MatDialog, 
              private snackBar: MatSnackBar, private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getJob();
  }

  getJob(){
    this.isSpinnerDisplayed = true;
    this.jobService.getJob(Number(this.route.snapshot.paramMap.get('id')))
        .subscribe((job : Job) => { this.job = job;
        this.date = this.datePipe.transform(this.job.date, 'MMMM d, y');
        this.isSpinnerDisplayed = false;
        });
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
           this.jobService.editJob(job.id, job).subscribe((modifiedJob: Job) => {
            this.snackBar.open('Job ' + modifiedJob.number +' has been modified!', 'Close', {duration: 2000});
            this.getJob();
          },(e) => {
            this.snackBar.open(e.error.message,'Close', {duration: 2000});
          })
        }
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
            this.snackBar.open('Driver ' + modifiedJob.driver.name + ' ' + modifiedJob.driver.surname +' has been assigned!', 'Close', {duration: 2000});
            this.getJob();

          },(e) => {
            this.snackBar.open(e.error.message,'Close', {duration: 2000});
          })
        }
    });
  }

  downloadPDF(){
    const doc = new jsPDF();
    doc.setFont('Times');
    doc.setFontSize(13);

    doc.text(`Number: ${this.job.number}`, 10, 20);
    doc.line(10,27,200,27);
    doc.text(`Date: `, 10, 35);
    doc.text(`${this.date}`,10,45);
    doc.line(10,52,200,52);
    doc.text(`Principal:`, 10, 60);
    doc.text(`${this.job.principal.name}`, 10, 70);
    doc.text(`${this.job.principal.address}`, 10, 80);
    doc.line(10,87,200,87);
    doc.text(`Manager: `, 10, 95);
    doc.text(`${this.job.manager.name} ${this.job.manager.surname}`, 10, 105);
    doc.line(10,112,200,112);
    doc.text(`Driver:`, 10, 120);    
    doc.text(`${this.job.driver.name} ${this.job.driver.surname}, ${this.job.driver.phoneNumber}`, 10, 130);
    doc.line(10,137,200,137);
    doc.text(`Lorry: `, 10, 145);
    doc.text(`${this.job.driver.lorry.licenceNumber}, ${this.job.driver.lorry.model}`, 10, 155);
    doc.line(10,162,200,162);
    doc.text(`Cargo: ${this.job.cargo.type}`, 10, 170);
    doc.line(10,177,200,177);
    doc.text(`Weight: ${this.job.weight}`, 10, 185);
    doc.line(10,192,200,192);
    doc.text(`Loading address: `, 10, 200);
    doc.text(`${this.job.loading.address}`, 10, 210);
    doc.line(10,217,200,217);
    doc.text(`Unloading address: `, 10, 225);
    doc.text(`${this.job.unloading.address}`, 10, 235);
    doc.line(10,242,200,242);
    doc.text(`Pay rate: ${this.job.payRate}`, 10, 250);
    doc.line(10,257,200,257);
    doc.text(`Place of issue: ${this.job.placeOfIssue}`, 10, 265);
    doc.line(10,272,200,272);
    doc.text(`Comment:`, 10, 280);
    doc.text(`${this.job.comment}`, 10, 290);

    doc.save('Job'+this.job.number.toString() +'.pdf')
    this.snackBar.open('Report for job '+ this.job.number.toString() + ' has been generated.','Close', {duration: 2000});
    }
}
