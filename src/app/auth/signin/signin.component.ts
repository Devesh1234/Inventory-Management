import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  


  onSignIn()
  {
    this.router.navigate(['/dashboard/Dashboard']);
  }


  navigateToSignup()
  {
    this.router.navigate(['/auth/signup'])
  }

}
