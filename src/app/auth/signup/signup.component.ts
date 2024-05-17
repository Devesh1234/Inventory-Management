import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm:any;
  countries_list:any;
  constructor(private router:Router , private sharedService:SharedService) {}

  ngOnInit(): void {

    this.sharedService.loadScripts();

   

    this.signupForm=new FormGroup({
      business_name:new FormControl('',Validators.required),
      registered_email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required),
      registered_mobile_no:new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]),
      business_type: new FormControl('',[Validators.required]),
      business_structure: new FormControl('',[Validators.required]),
      country: new FormControl('India',[Validators.required]),
      state: new FormControl('Haryana',[Validators.required]),
      city: new FormControl('Gurugram',[Validators.required]),
      registered_address:new FormControl('',[])


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
