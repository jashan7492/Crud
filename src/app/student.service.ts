import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Studentvm} from '../app/student';

@Injectable({
  providedIn: 'root'
})

export class StudentService {


  url: 'http://localhost:44305';
  constructor(private http: HttpClient) { }

  getStudent():Observable<Studentvm[]>{
    return this.http.get<Studentvm[]>(this.url + 'api/student/List' );
  }
  createStudent(vm: Studentvm):Observable<Studentvm[]>{
    return this.http.post<Studentvm[]>(this.url + 'api/student/Create', vm);
  }
  deleteStudent(id: string): Observable<string>{
    return this.http.delete<string>(this.url + 'api/student/Delete/' + id);
  }
  updateStudent(id: string): Observable<Studentvm>{
    return this.http.put<Studentvm>(this.url + 'api/student/Update/' + id, Studentvm);
  }
  getStudentById(id: string):Observable<Studentvm>{
    return this.http.get<Studentvm>(this.url + 'api/student/Find/' + id);
  }
}
