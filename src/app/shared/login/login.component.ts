import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide: boolean = true;
  isAdmin: boolean = false;
  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    if (this.router.url == '/admin/login') {
      this.isAdmin = true;
      this.loginForm = new FormGroup({
        emailId: new FormControl('', [
          Validators.required,
          Validators.pattern(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
      });
    } else {
      this.loginForm = new FormGroup({
        emailId: new FormControl('', [
          Validators.required,
          Validators.pattern(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/),
        ]),
      });
    }
  }

  logIn(): void {
    if (this.loginForm.valid) {
      if (this.router.url == '/admin/login') {
        this.apiService.adminLogin(this.loginForm.value).subscribe((data) => {
          localStorage.setItem('isAdminLoggedIn', 'true');
          this.router.navigateByUrl('/dashboard');
        });
      } else {
        this.apiService.candidateLogin(this.loginForm.value).subscribe(
          (data) => {
            localStorage.setItem('isCandidateLoggedIn', 'true');
            localStorage.setItem(
              'candidateEmailId',
              this.loginForm.value.emailId
            );
            this.router.navigateByUrl('');
          },
          (err) => {
            alert(err.error.message);
          }
        );
      }
    }
  }
}
