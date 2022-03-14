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
  loginForm: FormGroup; //reactiveform için kullanıyoruz
  errorMessage: string;

  constructor(private router: Router, private dataService: DataserviceService ) { }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('((?=.*[a-z])(?=.*[A-Z]).{6,30})'),
      ]),
    });
  }

  onSubmit(){
    if(this.loginForm.valid)
    {
      const userInfo = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
      };

      this.dataService.postData(userInfo).subscribe((olcay) => {
        console.log(olcay);
        this.router.navigate(['/login'])
      });
    }
  }
}
