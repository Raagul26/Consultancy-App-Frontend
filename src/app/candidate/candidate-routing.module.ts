import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateGuard } from '../guards/candidate.guard';
import { AvailableJobsComponent } from './available-jobs/available-jobs.component';
import { HomeComponent } from './home/home.component';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
  {path:'',component:HomeComponent,children:[
    {
      path:'',component:AvailableJobsComponent
    },
    {path:'candidate/status',component:StatusComponent,canActivate:[CandidateGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
