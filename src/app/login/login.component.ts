import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string; 
  constructor(private router: Router, private dataService: DataserviceService) { }

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
    const userInfo={
      email:this.loginForm.get('email').value,
      password:this.loginForm.get('password').value
    }
    
    // this.dataService.postData(user).subscribe((response) => {
    //   console.log(response);
    // });
    
    this.dataService.getData().subscribe((users)=> { //Yapılan Request'e karşılık API'nin tepkisi
      // console.log(users);
      users.forEach(user => {
        // console.log(user);
        if(userInfo.email == user.email && userInfo.password == user.password){
          //LocalStorage setItem ile veriyi ChromeV8'e yazdırdık
          localStorage.setItem('user',JSON.stringify(user));
          this.router.navigate(['/dashboard']);
        } else{
          this.errorMessage = 'Bu email ve şifre kullanıcı bulunmamaktadır!';
          this.timer();
        }
      });  
    })
  }
  timer() {
    setTimeout(() => {
      this.errorMessage = '';
    },3000)
  }
}
