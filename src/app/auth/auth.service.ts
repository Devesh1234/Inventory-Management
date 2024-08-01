import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private sharedService: SharedService, private httpClient: HttpClient, private router: Router) { }




  // Example method to check if the user is logged in
  isLoggedIn(): boolean {
    if (this.sharedService.getLocalStorage("user_login") != null && this.sharedService.getLocalStorage("user_login") != undefined)
      return true;
    return false
  }

  // Example method to login the user (for demonstration purposes)
  login(username: string): void {
    console.log("username", username);
    this.sharedService.setLocalStorage("user_login", username);
  }

  // Example method to logout the user (for demonstration purposes)
  logout(): void {
    this.sharedService.removeLocalStorage("user_login");

  }




  getNewTokens() {



    let access_token = localStorage.getItem('access_token');
    // console.log('access_token: ', access_token);
    let refresh_token = localStorage.getItem('refresh_token');
    // console.log('refresh_token: ', refresh_token);

    if (refresh_token == null || access_token==null ) {
      this.router.navigate(['/auth/signin']);
      return ;
    }





    let apiUrl = 'http://127.0.0.1:8000/api/token/refresh/';
    return this.httpClient.post(apiUrl, {
      "refresh_token": refresh_token
    }).subscribe((res: any) => {
      localStorage.setItem('access_token', res.access_token)
      localStorage.setItem('refresh_token', res.refresh_token)
    });
  }



  signInApi(credentials: any) {
    console.log('credentials: ', credentials);

    let apiUrl = 'http://62.72.30.98:8000/api/login/vendor/';
    return this.httpClient.post<any>(apiUrl, credentials
    )
  };

  signUpApi() {
    let apiUrl = 'http://127.0.0.1:8000/api/register/vendor/';
  }

  vendor_id:any=68

  forgotPasswordApi(email:any) {
    let obj={'email':email, 'vendor_id':this.vendor_id}
    let apiUrl = 'http://127.0.0.1:8000/api/vendor/request-password-reset/';
    return this.httpClient.post(apiUrl,obj)

  }



}
