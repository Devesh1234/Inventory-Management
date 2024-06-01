import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  activeTrackerButton = new BehaviorSubject<string>('requested');



  constructor(private httpClient:HttpClient) { }



  

  getActiveTrackerButton() :Observable<any>
  {
    return this.activeTrackerButton.asObservable();
  }
  setActiveTrackerButton(activeBtn:string)
  {
    this.activeTrackerButton.next(activeBtn);
  }









  
  getRequestedOrders(vendor_id:any)
  {
    let apiUrl = 'http://127.0.0.1:8000/api/vendor/requests/'+vendor_id+'/request';
    return this.httpClient.get(apiUrl);

  }

  vendorAcceptOrReject(statusObj:any)
  {
    let apiUrl = 'http://127.0.0.1:8000/api/reservation/vendor/notify_vendor_response/';
    return this.httpClient.post(apiUrl,statusObj);

  }


  getActiveOrders()
  {
    let apiUrl = 'http://127.0.0.1:8000/api/vendor/requests/29/active';
    return this.httpClient.get(apiUrl);
  }
  getCheckoutOrders()
  {

  }
  getHistoryOrders()
  {
    
  }

}
