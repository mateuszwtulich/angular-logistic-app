import { Component, OnInit, ViewChild } from '@angular/core';
import { JobService } from '../../services/job/job.service';
import { Job } from '../../models/job';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddJobModalComponent } from '../add-job-modal/add-job-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { SortUtil } from '../../utils/SortUtil';

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
    this.cofigureSortingAndFiltering();
    this.loadJobs();
  }

  private loadJobs(){
    this.isSpinnerDisplayed = true;
    this.jobService.getJobs().subscribe((jobs: Job[]) => {
      this.jobsDataSource.data = jobs;
      this.isSpinnerDisplayed = false;
    });
  }

  refresh(){
    this.loadJobs();
  }

  private cofigureSortingAndFiltering(){
    // this.jobsDataSource.data.slice();
    // this.sort.active = 'number';
    // this.sort.direction = 'asc';
    // this.sort.disableClear = true;
    this.jobsDataSource.sort = this.sort;
    this.jobsDataSource.filterPredicate = this.prepareFilterPredicate();
  }

  filter(filterValue: string) {
    this.jobsDataSource.filter = filterValue.trim().toLowerCase();
  }

  private prepareFilterPredicate(): (data: Job, filter: string) => boolean {
    return (data: Job, filter: string) => {
      var jobString = data.number.toString() + data.status.toString() + data.loading.address + data.unloading.address;
      if(data.driver != null){
        jobString = jobString + data.driver.name + data.driver.surname + data.driver.lorry.model;
      }
      return jobString.trim().toLowerCase().indexOf(filter) !== -1;
    }
  }

  sortData(sort: Sort) {
    const data = this.jobsDataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.jobsDataSource.data = data;
    }
    this.jobsDataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'number': return SortUtil.compare(a.number, b.number, isAsc);
        case 'driver': return SortUtil.compare(a.driver.name, b.driver.name, isAsc);
        case 'lorry': return SortUtil.compare(a.driver.lorry.model, b.driver.lorry.model, isAsc);
        case 'status': return SortUtil.compare(a.status, b.status, isAsc);
        case 'startingPoint': return SortUtil.compare(a.loading.address, b.loading.address, isAsc);
        case 'destination': return SortUtil.compare(a.unloading.address, b.unloading.address, isAsc);
        default: return 0;
      }
    });
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
      width: "540px"});
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
