import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-job-apply-modal',
  templateUrl: './job-apply-modal.component.html',
  styles: [],
})
export class JobApplyModalComponent implements OnInit {
  applyForm!: FormGroup;
  jobIds: any;
  emailIds: any;
  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<JobApplyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; rowData: any }
  ) {}

  ngOnInit(): void {
    this.apiService.getAllJobs().subscribe((res: any) => {
      this.jobIds = res.data
        .filter((elem: { status: string }) => elem.status == 'active')
        .map((elem: { jobId: any }) => elem.jobId);
    });

    this.apiService.getAllCandidates().subscribe((res: any) => {
      this.emailIds = res.data
        .filter((elem: { status: string }) => elem.status == 'active')
        .map((elem: { emailId: any }) => elem.emailId);
    });

    this.applyForm = new FormGroup({
      jobId: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      emailId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/),
      ]),
    });

    if (this.data.title == 'Update') {
      this.applyForm = new FormGroup({
        jobId: new FormControl({
          value: this.data.rowData.jobId,
          disabled: true,
        }),
        emailId: new FormControl({
          value: this.data.rowData.emailId,
          disabled: true,
        }),
        status: new FormControl(this.data.rowData.status, [
          Validators.required,
        ]),
      });
    }
  }

  applyJobOrChangeStatus(): void {
    if (this.applyForm.valid && this.data.title == 'Apply') {
      this.apiService.applyJob(this.applyForm.value).subscribe(
        (res) => {
          this.dialog.closeAll();
          this.reloadComponent();
        },
        (err) => {
          alert(err.error.message);
        }
      );
    } else if (this.applyForm.valid && this.data.title == 'Update') {
      this.apiService
        .changeApplicationStatus(this.applyForm.getRawValue())
        .subscribe((res) => {
          this.dialog.closeAll();
          this.reloadComponent();
        });
    }
  }

  reloadComponent(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/dashboard/jobs/applied']);
  }
}
