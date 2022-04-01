import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-available-jobs',
  templateUrl: './available-jobs.component.html',
  styles: [
  ]
})
export class AvailableJobsComponent implements OnInit {

  availableJobs:any
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.getAvailableJobs().subscribe((data)=>{
      this.availableJobs = data
    })
  }

}
