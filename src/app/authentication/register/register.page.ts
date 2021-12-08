import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User;
  registered: any;
  createForm: FormGroup;
  constructor(private service: UserService, public fb: FormBuilder, private route: Router) { }

  ngOnInit() {
    this.inForm();
  }
  public inForm() {
    this.createForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(2)])],
      password: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  public onSubmit() {
    console.log("show", this.createForm.value);
    this.user = this.createForm.value
    this.service.RegisterUser(this.user).subscribe(
      data => {
        this.registered = data;
        console.log("registration", this.registered);
        this.route.navigate(['/login'])
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
