import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm:any;
  constructor(private router:Router) {}

  ngOnInit(): void {




    this.signupForm=new FormGroup({
      fullName:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required),
      mobile:new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)])

    })
    
  }

 
  userSignUp()
  {
    console.log('Form---',this.signupForm.controls.mobile);
    
  }

  navigateToSignin()
  {
    this.router.navigate(['/auth/signin'])
  }

}
