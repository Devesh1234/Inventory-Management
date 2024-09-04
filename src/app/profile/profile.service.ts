import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  vendor_id: any = '24';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }


  // serverUrl: any = "http://127.0.0.1:8000/api/"

  serverUrl: any = "http://62.72.30.98:8000/api/"


  employeeEditedData: BehaviorSubject<Object> = new BehaviorSubject<Object>({});



  getEmployeesData() {
    this.authService.getNewTokens();

    let apiUrl = this.serverUrl + 'employees/vendor/' + this.vendor_id;
    return this.httpClient.get(apiUrl);
  }

  insertSingleEmployeeData(obj:any) {
    this.authService.getNewTokens();

    let apiUrl = this.serverUrl + 'employees/create/' + this.vendor_id+'/';
    return this.httpClient.post(apiUrl, obj);
  }


  insertExcelEmployeeData(file: any) {
    this.authService.getNewTokens();
    const formData = new FormData();

    formData.append('excel_file', file, file.name);
    formData.append('vendor', this.vendor_id);
    console.log('formData: ', formData);

    let apiUrl = 'http://62.72.30.98:8000/api/employees/';

    return this.httpClient.post(apiUrl, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }

  editEmployeeData(obj:any){
    let apiUrl = this.serverUrl+'employee/edit/'+ obj.employee_id+'/';
    return this.httpClient.post(apiUrl,obj);

  }


  deleteEmployeeData(obj:any){
    let apiUrl = 'http://62.72.30.98:8000/api/employees/delete/';
    return this.httpClient.post(apiUrl,obj);

  }

  getPhotosData() {
    this.authService.getNewTokens();

    let apiUrl = this.serverUrl + 'vendors/' + this.vendor_id + '/photos/'
    console.log('apiUrl: ', apiUrl);
    return this.httpClient.get(apiUrl);
  }

  postPhoto(files: File[]) {



    this.authService.getNewTokens();
    const formData: FormData = new FormData();

    files.forEach((file) => {
      formData.append('photos', file, file.name);
    });


    console.log('formData: ', formData);

    let apiUrl = this.serverUrl + 'vendors/' + this.vendor_id + '/photos/'


    return this.httpClient.post(apiUrl, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });

  }

  deletePhoto(obj: any) {
    this.authService.getNewTokens();

    let apiUrl = this.serverUrl + 'vendors/' + this.vendor_id + '/photos/delete/'
    return this.httpClient.post(apiUrl, obj)
  }

}
