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
  selector: 'app-candidate-modal',
  templateUrl: './candidate-modal.component.html',
  styles: [],
})
export class CandidateModalComponent implements OnInit {
  candidateForm!: FormGroup;
  candidateDetails: any;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CandidateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; candidateData: any }
  ) {}

  ngOnInit(): void {
    this.candidateForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      emailId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/),
      ]),
      phoneNo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
      experience: new FormControl('', [Validators.required, Validators.min(1)]),
      qualification: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      skills: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });

    if (this.data.title == 'Update') {
      console.log(this.data.candidateData);
      this.candidateForm = new FormGroup({
        name: new FormControl(this.data.candidateData.name, [
          Validators.required,
          Validators.minLength(4),
        ]),
        emailId: new FormControl(this.data.candidateData.emailId, [
          Validators.required,
          Validators.pattern(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/),
        ]),
        phoneNo: new FormControl(this.data.candidateData.phoneNo, [
          Validators.required,
          Validators.pattern('^[0-9]{10}$'),
        ]),
        experience: new FormControl(this.data.candidateData.experience, [
          Validators.required,
          Validators.min(1),
        ]),
        qualification: new FormControl(
          this.data.candidateData.qualification
            .toString()
            .replaceAll(',', '\n'),
          [Validators.required, Validators.minLength(10)]
        ),
        skills: new FormControl(
          this.data.candidateData.skills.toString().replaceAll(',', '\n'),
          [Validators.required, Validators.minLength(10)]
        ),
      });
    }
  }

  createOrUpdateCandidate():void {
    if (this.candidateForm.valid && this.data.title == 'Create') {
      this.candidateDetails = {
        name: this.candidateForm.value.name,
        emailId: this.candidateForm.value.emailId,
        phoneNo: this.candidateForm.value.phoneNo,
        experience: this.candidateForm.value.experience,
        qualification: this.candidateForm.value.qualification
          .trim()
          .split('\n'),
        skills: this.candidateForm.value.skills.trim().split('\n'),
      };
      console.log(this.candidateDetails);
      this.dialog.closeAll();
      this.apiService
        .createCandidate(this.candidateDetails)
        .subscribe((data) => {
          this.reloadComponent();

          console.log(data);
        });
    } else if (this.candidateForm.valid && this.data.title == 'Update') {
      this.candidateDetails = {
        name: this.candidateForm.value.name,
        emailId: this.candidateForm.value.emailId,
        phoneNo: this.candidateForm.value.phoneNo,
        experience: this.candidateForm.value.experience,
        qualification: this.candidateForm.value.qualification
          .trim()
          .split('\n'),
        skills: this.candidateForm.value.skills.trim().split('\n'),
      };
      console.log(this.candidateDetails);
      this.dialog.closeAll();
      this.apiService
        .updateCandidate(this.candidateDetails)
        .subscribe((data) => {
          this.reloadComponent();
          console.log(data);
        });
    }
  }

  reloadComponent(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/dashboard/candidates']);
  }
}
