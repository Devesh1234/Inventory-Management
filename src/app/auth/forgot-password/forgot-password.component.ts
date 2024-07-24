import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm:any;
  constructor( private authService:AuthService , private router: Router) { }

  ngOnInit(): void {
    this.forgotForm=new FormGroup({
      'email':new FormControl('',[Validators.required,Validators.email])      
    })
  }


  forgotPassword(){
    this.router.navigate(['/auth/new-password'])

    // this.authService.forgotPasswordApi(this.forgotForm.controls.email.value).subscribe((res:any)=>{
    //   console.log(res);


    // })
  }

}
