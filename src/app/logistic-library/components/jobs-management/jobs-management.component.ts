import { Component, OnInit, ViewChild } from '@angular/core';
import { JobService } from '../../services/job/job.service';
import { Job } from '../../models/job';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddJobModalComponent } from '../add-job-modal/add-job-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cf-jobs-management',
  templateUrl: './jobs-management.component.html',
  styleUrls: ['./jobs-management.component.scss']
})
export class JobsManagementComponent implements OnInit {
  [x: string]: any;

  isSpinnerDisplayed = false;
  selectedJob: Job;
  jobsDataSource: MatTableDataSource<Job> = new MatTableDataSource<Job>();
  displayedColumns: string[] = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private jobService: JobService, public dialog: MatDialog, private snackBar: MatSnackBar) { 

    this.displayedColumns = ['number', 'lorry', 'driver', 'status', 'startingPoint', 'destination'];
  }

  ngOnInit() {
    this.jobsDataSource.paginator = this.paginator;
    this.cofigureSorting();
    this.loadJobs();
  }

  private loadJobs(){
    this.isSpinnerDisplayed = true;
    this.jobService.getJobs().subscribe((jobs: Job[]) => {
      this.jobsDataSource.data = jobs;
      this.isSpinnerDisplayed = false;
    });
  }

  private cofigureSorting(){
    this.sort.active = 'number';
    this.sort.direction = 'asc';
    this.sort.disableClear = true;
    this.jobsDataSource.sort = this.sort;
  }

  filter(filterValue: string){
    this.jobsDataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  addJob(){
    const dialogRef = this.openAddJobModal();
    this.handleClosingAddJobModal(dialogRef);
  }

  selectJob(row: Job){
    this.dataService.changeJob(row);
  }

  private openAddJobModal(){
    return this.dialog.open(AddJobModalComponent,{
      width: "400px"});
  }

  private handleClosingAddJobModal(dialogRef: MatDialogRef<AddJobModalComponent>){
    dialogRef.afterClosed().subscribe((job: Job) => {
        if(job === undefined){
          this.snackBar.open('Adding job canceled!', 'Close', { duration: 2000});
        } else{
          console.log(job);
          this.jobService.addJob(job).subscribe((addedJob: Job) => {
            this.snackBar.open('Job ' + addedJob.number +' has been added!', 'Close', {duration: 2000});
            this.loadJobs();
          },(e) => {
            this.snackBar.open(e.error.message,'Close', {duration: 2000});
          })
        }
    });
  }

}
