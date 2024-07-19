import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedService } from '../shared.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  activeTrackerButton = new BehaviorSubject<string>('requested');



  constructor(private httpClient: HttpClient, private authService:AuthService) { }





  getActiveTrackerButton(): Observable<any> {
    return this.activeTrackerButton.asObservable();
  }
  setActiveTrackerButton(activeBtn: string) {
    this.activeTrackerButton.next(activeBtn);
  }






  vendor_id: any = '46';



  getRequestedOrders() {
    let apiUrl = 'http://127.0.0.1:8000/api/vendor/requests/' + this.vendor_id + '/request';
    return this.httpClient.get(apiUrl);

  }

  postvendorAcceptOrReject(statusObj: any) {
    let apiUrl = 'http://127.0.0.1:8000/api/reservation/vendor/notify_vendor_response/';
    return this.httpClient.post(apiUrl, statusObj);

  }




  getActiveOrders() {
    let apiUrl = 'http://127.0.0.1:8000/api/vendor/requests/' + this.vendor_id + '/active';
    return this.httpClient.get(apiUrl);
  }


  getCheckoutOrders() {

    let apiUrl = 'http://127.0.0.1:8000/api/vendor/requests/' + this.vendor_id + '/checkout';
    return this.httpClient.get(apiUrl);

  }
  postPaymentApproval(obj:any) {

    let apiUrl="http://127.0.0.1:8000/api/vendor/approve_payment/"
    return this.httpClient.post(apiUrl,obj)
  }
  getHistoryOrders() {
    let apiUrl = 'http://127.0.0.1:8000/api/vendor/requests/' + this.vendor_id + '/history';
    return this.httpClient.get(apiUrl);
  }





  getDailyStats(){

    this.authService.getNewTokens();

    let apiUrl = 'http://127.0.0.1:8000/api/vendor-daily-stats/' + this.vendor_id ;
    return this.httpClient.get(apiUrl);
  }

}
