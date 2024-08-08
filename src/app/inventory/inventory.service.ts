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

    let apiUrl = 'http://62.72.30.98:8000/api/categories/' + this.vendor_id + '/';
    return this.httpClient.get(apiUrl)

  }
  setCategory(obj: any) {

    this.authService.getNewTokens();

    let apiUrl = 'http://62.72.30.98:8000/api/categories/' + this.vendor_id + '/';
    return this.httpClient.post(apiUrl, obj);

  }
  getSubCategories() {

    this.authService.getNewTokens();

    let apiUrl = 'http://62.72.30.98:8000/api/subcategories/' + this.vendor_id + '/';
    return this.httpClient.get(apiUrl);
  }

  setSubCategory(obj: any) {
    this.authService.getNewTokens();

    let apiUrl = 'http://62.72.30.98:8000/api/subcategories/' + this.vendor_id + '/';
    return this.httpClient.post(apiUrl, obj);
  }

  getSubSubCategories() {

    this.authService.getNewTokens();

    let apiUrl = 'http://62.72.30.98:8000/api/subsubcategories/' + this.vendor_id + '/';
    return this.httpClient.get(apiUrl);

  }

  setSubSubCategory(obj: any) {
    console.log('obj----- ', obj);
    this.authService.getNewTokens();

    let apiUrl = 'http://62.72.30.98:8000/api/subsubcategories/' + this.vendor_id + '/';
    return this.httpClient.post(apiUrl, obj);
  }






  deleteCategory(obj: any) {
    this.authService.getNewTokens();


    let apiUrl = 'http://62.72.30.98:8000/api/categories_delete/' + this.vendor_id + '/';
    return this.httpClient.post(apiUrl, obj);


  }


  deleteSubCategory(obj: any) {
    this.authService.getNewTokens();

    let apiUrl = 'http://62.72.30.98:8000/api/subcategories_delete/' + this.vendor_id + '/';
    return this.httpClient.post(apiUrl, obj);

  }


  deleteSubSubCategory(obj: any) {

    this.authService.getNewTokens();

    let apiUrl = 'http://62.72.30.98:8000/api/subsubcategories_delete/' + this.vendor_id + '/';
    return this.httpClient.post(apiUrl, obj);


  }



  getInventoryItemsData() {
    this.authService.getNewTokens();

    let apiUrl = 'http://62.72.30.98:8000/api/inventory/single_vendors/' + this.vendor_id + '/';
    return this.httpClient.get(apiUrl);

  }

  insertSingleItem(data: any) {
    console.log('data: ', data);
    this.authService.getNewTokens();

    let apiUrl = 'http://62.72.30.98:8000/api/inventory/create/' + this.vendor_id + '/';
    return this.httpClient.post(apiUrl, data)
  }

  insertExcelData(file: any) {
    this.authService.getNewTokens();
    const formData = new FormData();

    formData.append('excel_file', file, file.name);
    formData.append('vendor', this.vendor_id);
    console.log('formData: ', formData);

    let apiUrl = 'http://62.72.30.98:8000/api/inventory/import/?excel_file';

    return this.httpClient.post(apiUrl, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }


  editMenuItem(obj: any) {
    this.authService.getNewTokens();

    let apiUrl = 'http://62.72.30.98:8000/api/vendors/' + this.vendor_id + '/menu-items/edit/'

    return this.httpClient.post(apiUrl, obj)
  }

  deleteMenuItem(obj: any) {
    this.authService.getNewTokens();

    let apiUrl = 'http://62.72.30.98:8000/api/vendors/' + this.vendor_id + '/menu-items/delete/'
    return this.httpClient.post(apiUrl, obj)
  }



}
