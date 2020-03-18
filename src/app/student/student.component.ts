import { Component, OnInit } from '@angular/core';
import {StudentService} from '../student.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs'
import { Studentvm } from '../student';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  datasaved: any;
  message: string;
  studentForm: any;
  StudentID: string;
  allStudent: Observable<Studentvm[]>;
  constructor(private fb: FormBuilder, private studentservice: StudentService) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      stuid: ['',[Validators.required]],
      stuname: ['',[Validators.required]],
      stuage: ['',[Validators.required]],
      stucls: ['',[Validators.required]],
      stufatnam: ['',[Validators.required]],
      stumotnam: ['',[Validators.required]],
    });
    this.listStudent();
  }

  listStudent(){
    this.allStudent = this.studentservice.getStudent();
  }

  Reset(){
    this.studentForm.reset();
  }
  addStudent(vm: Studentvm){
    vm.stuid = this.StudentID;
    this.studentservice.createStudent(vm).subscribe(() =>{
      this.datasaved = true;
      this.message = 'Detail Saved Successfully';
      this.listStudent();
      this.Reset();
      this.StudentID = "0";
    });
  }
  removeStudent(StudentID: string){
    if (confirm("Are You Sure you want to delete these details?")){
      this.studentservice.deleteStudent(StudentID).subscribe(() =>{
        this.datasaved = true;
        this.message = 'Deleted Successfully';
        this.listStudent();
      });
    }
  }

  editStudent(StudentID: string){
    this.studentservice.getStudentById(StudentID).subscribe(Response =>{
      this.message = null;
      this.datasaved = false;
      this.StudentID = Response.stuid;
      this.studentForm.controls['stuname'].setValue(Response.stuname);
      this.studentForm.controls['stuage'].setValue(Response.stuage);
      this.studentForm.controls['stucls'].setValue(Response.stucls);
      this.studentForm.controls['stufatnam'].setValue(Response.stufatnam);
      this.studentForm.controls['stumotnam'].setValue(Response.stumotnam);
    });
  }
}
