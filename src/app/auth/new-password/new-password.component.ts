import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent implements OnInit {





  newPasswordForm: any;
  password_same: boolean = false;
  constructor(private authService: AuthService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.newPasswordForm = new FormGroup({
      'new_password': new FormControl('', [Validators.required]),
      'confirm_password': new FormControl('', [Validators.required])
    })
  }

  passwordReset() {

    if (this.newPasswordForm.controls.new_password.value != this.newPasswordForm.controls.confirm_password.value) {
      this.sharedService.showSnackBar('Both Passwods must be same', 'error')
    }


  }



}
