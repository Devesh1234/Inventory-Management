import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) { }

  ngOnInit() {
    // this.router.navigate(['/auth/signup']);
    // this.router.navigate(['/auth/forgot-password']);
    // this.router.navigate(['/auth/signin']);
    // this.router.navigate(['/dashboard/Dashboard']);
    // this.router.navigate(['/inventory/Overview']);
    this.router.navigate(['/inventory/Input']);
    // this.router.navigate(['/inventory/Inventory']);
    // this.router.navigate(['/social/Social']);
    // this.router.navigate(['/tracker/Tracker']);        

  }



}
