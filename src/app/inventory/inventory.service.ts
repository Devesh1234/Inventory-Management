import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {


  vendor_id: any = '24';



  constructor(private httpClient: HttpClient) { }

  getCategories() {

    let apiUrl = 'http://127.0.0.1:8000/api/categories/' + this.vendor_id + '/';
    return this.httpClient.get(apiUrl);

  }
  setCategory(obj:any) {

    let apiUrl = 'http://127.0.0.1:8000/api/categories/' + this.vendor_id + '/';
    return this.httpClient.post(apiUrl,obj);

  }
  getSubCategories() {

    let apiUrl = 'http://127.0.0.1:8000/api/subcategories/' + this.vendor_id + '/';
    return this.httpClient.get(apiUrl);
  }

  setSubCategory(obj:any) {
    let apiUrl = 'http://127.0.0.1:8000/api/subcategories/' + this.vendor_id + '/';
    return this.httpClient.post(apiUrl,obj);
  }

  getSubSubCategories() {

  }

  setSubSubCategory() {

  }



}
