import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

interface JobDetails {
  id: string;
  jobId: string;
  title: string;
  overview: string;
  location: string;
  qualifications: string[];
  skills: string[];
  responsibilities: string[];
  status: string;
  createdOn: string;
  lastUpdatedOn?: string;
}

@Component({
  selector: 'app-job-modal',
  templateUrl: './job-modal.component.html',
  styles: [],
})
export class JobModalComponent implements OnInit {
  jobForm!: FormGroup;
  jobDetails!: any;
  constructor(
    private dialog: MatDialog,
    private apiService: ApiService,
    private router: Router,
    public dialogRef: MatDialogRef<JobModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; jobData: any }
  ) {}

  ngOnInit(): void {
    this.jobForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      overview: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
      qualifications: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      skills: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      responsibilities: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      location: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });

    if (this.data.title == 'Update') {
      this.jobForm = new FormGroup({
        title: new FormControl(this.data.jobData.title, [
          Validators.required,
          Validators.minLength(8),
        ]),
        overview: new FormControl(this.data.jobData.overview, [
          Validators.required,
          Validators.minLength(20),
        ]),
        qualifications: new FormControl(
          this.data.jobData.qualifications.toString().replace(',', '\n'),
          [Validators.required, Validators.minLength(10)]
        ),
        skills: new FormControl(
          this.data.jobData.skills.toString().replace(',', '\n'),
          [Validators.required, Validators.minLength(10)]
        ),
        responsibilities: new FormControl(
          this.data.jobData.responsibilities.toString().replace(',', '\n'),
          [Validators.required, Validators.minLength(10)]
        ),
        location: new FormControl(this.data.jobData.location, [
          Validators.required,
          Validators.minLength(3),
        ]),
      });
    }
  }

  createOrUpdateJob():void {
    if (this.jobForm.valid && this.data.title == 'Create') {
      this.jobDetails = {
        title: this.jobForm.value.title,
        overview: this.jobForm.value.overview,
        qualifications: this.jobForm.value.qualifications.trim().split('\n'),
        skills: this.jobForm.value.skills.trim().split('\n'),
        responsibilities: this.jobForm.value.responsibilities.trim().split('\n'),
        location: this.jobForm.value.location,
      };
      this.dialog.closeAll();

      this.apiService.createJob(this.jobDetails).subscribe((data) => {
        this.reloadComponent();
      });
    } else if (this.jobForm.valid && this.data.title == 'Update') {
      this.jobDetails = {
        jobId: this.data.jobData.jobId,
        title: this.jobForm.value.title,
        overview: this.jobForm.value.overview,
        qualifications: this.jobForm.value.qualifications.trim().split('\n'),
        skills: this.jobForm.value.skills.trim().split('\n'),
        responsibilities: this.jobForm.value.responsibilities.trim().split('\n'),
        location: this.jobForm.value.location,
      };
      this.dialog.closeAll();

      this.apiService.updateJob(this.jobDetails).subscribe((data) => {
        this.reloadComponent();
      });
    }
  }

  reloadComponent(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/dashboard/jobs']);
  }
}
