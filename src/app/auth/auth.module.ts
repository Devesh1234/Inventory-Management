import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent }
]

@NgModule({
  declarations: [SigninComponent, SignupComponent
  ],
  imports: [RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
  ReactiveFormsModule,
  ],
  exports: []
})
export class AuthModule { }
