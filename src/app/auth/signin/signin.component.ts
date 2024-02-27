import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router) { }

  signinForm:any;

  ngOnInit(): void {
    this.signinForm=new FormGroup({
      'email':new FormControl('',[Validators.required,Validators.email]),
      'password':new FormControl('',[Validators.required])
    })
  }




  onSignIn() {
    this.router.navigate(['/inventory/Input']);
  }


  navigateToSignup() {
    this.router.navigate(['/auth/signup'])
  }
  navigateToForgotPass()
  {
    this.router.navigate(['/auth/forgot-password'])

  }

}
