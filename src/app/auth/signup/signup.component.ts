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

  basicInfoForm: any;
  kycForm: any;
  accountForm: any;

  activeForm: string = 'basicInfoForm';
  show_prev_btn: boolean = false;
  show_next_btn: boolean = true;
  show_submit_btn: boolean = false;




  constructor(private router: Router, private sharedService: SharedService, private authService: AuthService, private fb: FormBuilder) { }



  ngOnInit(): void {

    this.sharedService.loadScripts();



    this.basicInfoForm = new FormGroup({
      business_name: new FormControl('', Validators.required),
      business_type: new FormControl('Restaurant', [Validators.required]),
      business_branch: new FormControl({ value: 'Main', disabled: true }, [Validators.required]),
      business_structure: new FormControl('Sole Proprietorship', [Validators.required]),
      registered_email: new FormControl('devesh@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      registered_mobile_no: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]),
      country: new FormControl({ value: 'India', disabled: true }, [Validators.required]),
      state: new FormControl({ value: 'Haryana', disabled: true }, [Validators.required]),
      city: new FormControl({ value: 'Gurugram', disabled: true }, [Validators.required]),
      registered_address: new FormControl('', [])
    })



    this.kycForm = new FormGroup({
      email_otp: new FormControl('', [Validators.required]),
      adhaar_no: new FormControl('', [Validators.required]),
      pan_no: new FormControl('', [Validators.required])
    })

    this.accountForm = new FormGroup({
      bank_name: new FormControl('', [Validators.required]),
      account_no: new FormControl('', [Validators.required]),
      ifsc_code: new FormControl('', [Validators.required])
    })








    this.signupForm = new FormGroup({
      basicInfoForm: this.basicInfoForm,
      kycForm: this.kycForm,
      accountForm: this.accountForm

    })






  }



  onAdhaarInput() {

  }




  stepperDomUpdate(pos: any) {

    let list_dom = document.getElementsByClassName("step-wizard-list")

    let list_children = list_dom[0].children

    for (let i = 0; i < list_children.length; i++) {
      console.log(list_children[i].className);
      list_children[i].classList.remove('current-item')
    }

    console.log('list_dom: ', (list_dom[0].children));

    list_children[pos].classList.add('current-item')


  }


  onPrevClick() {

  }

  onNextClick() {



    if (this.activeForm == 'basicInfoForm') {
      if (this.basicInfoForm.valid) {
        this.activeForm = 'kycForm';
        this.stepperDomUpdate(1);
        this.show_prev_btn = true
      }
      else {
        this.sharedService.showSnackBar('Please Fill all the details', 'error')
      }
    }


    else if (this.activeForm == 'kycForm') {
      if (this.kycForm.valid) {
        this.activeForm = 'accountForm';
        this.stepperDomUpdate(2);
        // this.show_prev_btn=true
        this.show_next_btn = false;
        this.show_submit_btn = true;
      }
      else {
        this.sharedService.showSnackBar('Please Fill all the details', 'error')
      }
    }


  }



  onSubmit() {

    if (this.accountForm.invalid) {
      this.sharedService.showSnackBar('Please Fill All the Details', 'error')
    }
  }

  confirm() {

  }

  resendEmailOtp() {

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
