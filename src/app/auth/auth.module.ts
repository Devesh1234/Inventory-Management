import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';



const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'new-password', component: NewPasswordComponent }
]

@NgModule({
  declarations: [SigninComponent, SignupComponent, ForgotPasswordComponent
  ],
  imports: [RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
  ReactiveFormsModule,
  ],
  exports: []
})
export class AuthModule { }
