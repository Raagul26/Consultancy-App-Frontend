import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styles: [],
})
export class StatusComponent implements OnInit {
  status: any;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .getCandidateStatus(String(localStorage.getItem('candidateEmailId')))
      .subscribe((res) => {
        this.status = res;
      });
  }
}
