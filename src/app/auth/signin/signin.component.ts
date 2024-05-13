import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router , private sharedService:SharedService) { }

  signinForm:any;

  ngOnInit(): void {
    this.signinForm=new FormGroup({
      'username':new FormControl('',[Validators.required]),
      'password':new FormControl('',[Validators.required])
    })
  }




  onSignIn() {
    // this.router.navigate(['/inventory/Input']);
    console.log('Form---',this.signinForm.value)
    this.sharedService.signInApi(this.signinForm.value).subscribe({
      next:(res:any)=>{
        console.log('res----',res)
      },
      error:(err:any)=>{
        console.log('res----',err)

      },
    })
  }


  navigateToSignup() {
    this.router.navigate(['/auth/signup'])
  }
  navigateToForgotPass()
  {
    this.router.navigate(['/auth/forgot-password'])

  }

}
