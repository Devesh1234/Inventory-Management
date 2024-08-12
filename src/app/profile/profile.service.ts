import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  vendor_id: any = '24';

  constructor(private httpClient: HttpClient) { }


  serverUrl: any = "http://62.72.30.98:8000/api/"


  getEmployeesData(){
    let apiUrl= this.serverUrl+'employees/vendor/'+this.vendor_id;
    return this.httpClient.get(apiUrl);
  }

  insertSingleEmployeeData(){
    let apiUrl= this.serverUrl+'employees/create/'+this.vendor_id;
    return this.httpClient.post(apiUrl,{});
  }


  insertExcelEmployeeData(){
    
  }


}
