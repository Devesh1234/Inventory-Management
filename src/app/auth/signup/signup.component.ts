import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: any;
  countries_list: any;
  constructor(private router: Router, private sharedService: SharedService, private authService: AuthService) { }

  ngOnInit(): void {

    this.sharedService.loadScripts();



    this.signupForm = new FormGroup({
      business_name: new FormControl('', Validators.required),
      business_type: new FormControl('Restaurant', [Validators.required]),
      business_branch: new FormControl({ value: 'Main', disabled: true }, [Validators.required]),
      business_structure: new FormControl('Sole Proprietorship', [Validators.required]),
      registered_email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      registered_mobile_no: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]),
      country: new FormControl({ value: 'India', disabled: true }, [Validators.required]),
      state: new FormControl({ value: 'Haryana', disabled: true }, [Validators.required]),
      city: new FormControl({ value: 'Gurugram', disabled: true }, [Validators.required]),
      registered_address: new FormControl('', [])


    })

  }


  userSignUp() {
    console.log('Form---', this.signupForm.getRawValue());
    let obj = this.signupForm.getRawValue();
    if (this.signupForm.valid)
      this.authService.signUpApi(obj).subscribe((res: any) => {
        console.log('Res---', res);
        this.sharedService.showSnackBar(res.message, 'success')
        this.router.navigate(['/tracker/Tracker']);

      },
        (err: any) => {
          console.log('Err---', err);
          this.sharedService.showSnackBar(err.error.message, 'error')


        })


  }

  navigateToSignin() {
    this.router.navigate(['/auth/signin'])
  }

}
