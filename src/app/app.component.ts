import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title:any = 'consulting-app-frontend';

  candidates:any
  jobs:any
  constructor(private apiService:ApiService){}

  ngOnInit(): void {
    this.apiService.getAllCandidates().subscribe((data)=>
    this.candidates=data)

    this.apiService.getAllJobs().subscribe((data)=>
    this.jobs=data)
  
  }

 
}
