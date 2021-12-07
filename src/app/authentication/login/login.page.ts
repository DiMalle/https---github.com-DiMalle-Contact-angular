import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interface/login';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public login: Login;
  public gotLogin: any;
  public msg = "";
  constructor(private service: UserService, private fb: FormBuilder, private route: Router) { }

  ngOnInit() {
    this.onInIt();
  }
  public onInIt() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  public loginUser() {
    this.login = this.loginForm.value;
    this.service.LoginUser(this.login).subscribe(
      data => {
        this.gotLogin = data;
        console.log("data received", this.gotLogin);
        localStorage.setItem("user", JSON.stringify(this.gotLogin));
        this.route.navigate(['/all'])
      },
      error => {
        console.log("exception");
        this.msg = "Bad Credentials please enter again your Email and Password"
      }
    );
  }
}
