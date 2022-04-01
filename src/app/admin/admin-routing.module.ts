import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { CandidatesComponent } from './candidates/candidates.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobsAppliedComponent } from './jobs-applied/jobs-applied.component';
import { JobsComponent } from './jobs/jobs.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'candidates', component: CandidatesComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'jobs/applied', component: JobsAppliedComponent },
      { path: '', component: JobsComponent },
    ],
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
