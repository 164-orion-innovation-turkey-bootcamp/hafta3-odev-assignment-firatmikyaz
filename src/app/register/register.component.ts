import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup; //reactiveform için kullanıyoruz
  errorMessage: string;

  constructor(private router: Router, private dataService: DataserviceService ) { }


  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('((?=.*[a-z])(?=.*[A-Z]).{6,30})'),
      ]),
    });
  }

  onSubmit(){
    if(this.registerForm.valid)
    {
      const userInfo = {
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value
      };

      this.dataService.postData(userInfo).subscribe((element) => {
        console.log(element);
        this.router.navigate(['/login'])
      });
    }
  }
}
