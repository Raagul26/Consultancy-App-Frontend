import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CandidatesComponent } from './candidates/candidates.component';
import { JobsComponent } from './jobs/jobs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobModalComponent } from './job-modal/job-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CandidateModalComponent } from './candidate-modal/candidate-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { JobApplyModalComponent } from './job-apply-modal/job-apply-modal.component';
import { JobsAppliedComponent } from './jobs-applied/jobs-applied.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    CandidatesComponent,
    JobsComponent,
    DashboardComponent,
    JobModalComponent,
    CandidateModalComponent,
    JobApplyModalComponent,
    JobsAppliedComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class AdminModule {}
