import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { JobModalComponent } from '../job-modal/job-modal.component';

interface JobDetails{
  id:string
  jobId:string
  title:string
  overview:string
  location:string
  qualifications:string[]
  skills:string[]
  responsibilities:string[]
  status:string
  createdOn:string
  lastUpdatedOn?:string
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styles: [],
})
export class JobsComponent implements OnInit {
  jobs: any;
  constructor(private apiService: ApiService,private dialog:MatDialog) {}

  ngOnInit(): void {
    this.apiService.getAllJobs().subscribe((data) => {
      this.jobs = data;
      console.log(data);
    });
  }

  create()
  {
    this.dialog.open(JobModalComponent,{data:{
      title:"Create"
    }})
  }

  edit(row: any) {
    this.dialog.open(JobModalComponent,{data:{
      title:"Update",
      jobData:row
    }})
  }

  delete(jobId: string) {
    this.apiService.deleteJob(jobId).subscribe((data) => {
      console.log(data);
      this.ngOnInit();
    });
  }
}
