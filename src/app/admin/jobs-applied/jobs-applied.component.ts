import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { JobApplyModalComponent } from '../job-apply-modal/job-apply-modal.component';

@Component({
  selector: 'app-jobs-applied',
  templateUrl: './jobs-applied.component.html',
  styles: [
  ]
})
export class JobsAppliedComponent implements OnInit {

  applications:any
  constructor(private apiService:ApiService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.apiService.getAllApplications().subscribe((data)=>{
      this.applications = data
    })
  }

  applyJob()
  {
     this.dialog.open(JobApplyModalComponent,{data:{
       title:"Apply"
     }})
  }

  changeStatus(row:any)
  {
    this.dialog.open(JobApplyModalComponent,{data:{
      title:"Update",
      rowData:row
    }})
  }

}
