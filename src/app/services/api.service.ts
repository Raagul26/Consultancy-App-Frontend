import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // AUTH

  adminLogin(body: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'admin/login', body);
  }

  candidateLogin(body: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'candidate/login', body);
  }

  // JOB

  getAllJobs(): Observable<any> {
    return this.http.get(environment.apiUrl + 'job/all');
  }

  getAvailableJobs(): Observable<any> {
    return this.http.get(environment.apiUrl + 'job/active');
  }

  createJob(body: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'job/create', body);
  }

  deleteJob(jobId: string): Observable<any> {
    return this.http.delete(environment.apiUrl + 'job/delete/' + jobId);
  }

  updateJob(body: any): Observable<any> {
    return this.http.put(environment.apiUrl + 'job/update', body);
  }

  // CANDIDATE

  getAllCandidates(): Observable<any> {
    return this.http.get(environment.apiUrl + 'candidate/all');
  }

  createCandidate(body: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'candidate/create', body);
  }

  deleteCandidate(emailId: string): Observable<any> {
    return this.http.delete(environment.apiUrl + 'candidate/delete/' + emailId);
  }

  updateCandidate(body: any): Observable<any> {
    return this.http.put(environment.apiUrl + 'candidate/update', body);
  }

  // Applications

  getAllApplications(): Observable<any> {
    return this.http.get(environment.apiUrl + 'applications/all');
  }

  applyJob(body: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'applications/apply', body);
  }

  changeApplicationStatus(body: any): Observable<any> {
    return this.http.put(
      environment.apiUrl + 'applications/changeStatus',
      body
    );
  }

  getCandidateStatus(emailId: string): Observable<any> {
    return this.http.get(environment.apiUrl + 'applications/' + emailId);
  }
}
