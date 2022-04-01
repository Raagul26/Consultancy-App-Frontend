import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AvailableJobsComponent } from './available-jobs/available-jobs.component';
import { StatusComponent } from './status/status.component'
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [
    HomeComponent,
    AvailableJobsComponent,
    StatusComponent
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class CandidateModule { }
