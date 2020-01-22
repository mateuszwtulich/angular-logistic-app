import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoints } from '../../enums/Endpoints';
import { Job, JobDto } from '../../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private JobEndpoint: string;

  constructor(private http: HttpClient) {
    this.JobEndpoint = `${'http://localhost:8080'}${Endpoints.JOB_PATH}`;
  }

  public getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.JobEndpoint).pipe(
      map((data: Job[]) => data.map((job: Job) => new Job(job))));
  }

  public getJob(jobId: number): Observable<Job> {
    return this.http.get<Job>(`${this.JobEndpoint}/${jobId}`).pipe(
      map((job: Job) => new Job(job))
    );
  }

  public addJob(job: Job): Observable<Job> {
    const jobDto: JobDto = Job.convertToJobDto(job);
    console.log(jobDto);
    return this.http.post<Job>(this.JobEndpoint, jobDto).pipe(
      map((newJob: Job) => new Job(newJob))
    );
  }

  public editJob(jobId: number, job: Job): Observable<Job> {
    const jobDto: JobDto = Job.convertToJobDto(job);
    return this.http.put<Job>(`${this.JobEndpoint}/${jobId}`, jobDto).pipe(
      map((editedJob: Job) => new Job(editedJob))
    );
  }

  public deleteJob(jobId: number): Observable<any> {
    return this.http.delete<any>(`${this.JobEndpoint}/${jobId}`);
  }
}