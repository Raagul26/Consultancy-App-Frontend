import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  jobs():void {
    this.router.navigate(['jobs'], { relativeTo: this.route });
  }

  candidates():void {
    this.router.navigate(['candidates'], { relativeTo: this.route });
  }

  appliedJobs():void
  {
    this.router.navigate(['jobs/applied'], { relativeTo: this.route });
  }

  logout():void {
    localStorage.clear();
    this.router.navigateByUrl('/admin/login');
  }
}
