import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {


  vendor_id: any = '24';



  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getCategories() {

    // let access_token;
    // let refresh_token;

    this.authService.getNewTokens();

    // let headers = new HttpHeaders().set("Authorization", `Bearer ${refresh_token}`);
    // console.log('headers: ', headers);

    let apiUrl = 'http://127.0.0.1:8000/api/categories/' + this.vendor_id + '/';
    return this.httpClient.get(apiUrl)

  }
  setCategory(obj: any) {

    this.authService.getNewTokens();

    let apiUrl = 'http://127.0.0.1:8000/api/categories/' + this.vendor_id + '/';
    return this.httpClient.post(apiUrl, obj);

  }
  getSubCategories() {

    let apiUrl = 'http://127.0.0.1:8000/api/subcategories/' + this.vendor_id + '/';
    return this.httpClient.get(apiUrl);
  }

  setSubCategory(obj: any) {
    let apiUrl = 'http://127.0.0.1:8000/api/subcategories/' + this.vendor_id + '/';
    return this.httpClient.post(apiUrl, obj);
  }

  getSubSubCategories() {

  }

  setSubSubCategory() {

  }



}
