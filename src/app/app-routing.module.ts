import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './logistic-library/components/main-page/main-page.component';
import { JobsManagementComponent } from './logistic-library/components/jobs-management/jobs-management.component';
import { SingleJobComponent } from './logistic-library/components/single-job/single-job.component';

const routes: Routes = [
 {path: '', redirectTo: '/main-page', pathMatch: 'full'},
  {path: 'main-page', component:MainPageComponent},
  {path: 'jobs-management', component: JobsManagementComponent},
  {path: 'job/:id', component: SingleJobComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
