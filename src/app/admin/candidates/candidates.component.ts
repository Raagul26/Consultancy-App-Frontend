import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CandidateModalComponent } from '../candidate-modal/candidate-modal.component';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styles: [],
})
export class CandidatesComponent implements OnInit {
  candidates: any;
  constructor(private apiService: ApiService,private dialog:MatDialog, private router:Router) {}

  ngOnInit(): void {
    this.apiService.getAllCandidates().subscribe((data) => {
      this.candidates = data;
      console.log(data)
    });
  }

  create():void
  {
    this.dialog.open(CandidateModalComponent,{data:{
      title:"Create"
    }})
  }

  edit(row:any):void
  {
    this.dialog.open(CandidateModalComponent,{data:{
      title:"Update",
      candidateData:row
    }})
  }

  delete(emailId: string):void {
    this.apiService.deleteCandidate(emailId).subscribe((data) => {
      console.log(data);
      this.reloadComponent()
    });
  }

  reloadComponent(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/dashboard/candidates']);
  }
}
