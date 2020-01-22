import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogisticLibraryRoutingModule } from './logistic-library-routing.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { JobsManagementComponent } from './components/jobs-management/jobs-management.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import { AddJobModalComponent } from './components/add-job-modal/add-job-modal.component';
import { SingleJobComponent } from './components/single-job/single-job.component';
import { DeleteJobModalComponent } from './components/delete-job-modal/delete-job-modal.component';
import { ModifyJobModalComponent } from './components/modify-job-modal/modify-job-modal.component';
import { AssignDriverModalComponent } from './components/assign-driver-modal/assign-driver-modal.component';
import { FinishJobModalComponent } from './components/finish-job-modal/finish-job-modal.component';
import { GenerateReportModalComponent } from './components/generate-report-modal/generate-report-modal.component';


@NgModule({
  declarations: [MainPageComponent, JobsManagementComponent, AddJobModalComponent, SingleJobComponent, DeleteJobModalComponent, ModifyJobModalComponent, AssignDriverModalComponent, FinishJobModalComponent, GenerateReportModalComponent],
  imports: [
    CommonModule,
    LogisticLibraryRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  exports: [MainPageComponent, JobsManagementComponent, SingleJobComponent],
  entryComponents:[
    AddJobModalComponent, DeleteJobModalComponent, FinishJobModalComponent,
    ModifyJobModalComponent, AssignDriverModalComponent
  ]
})
export class LogisticLibraryModule { }
