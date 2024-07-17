import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// export const customInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };


@Injectable()
export class customInterceptor implements HttpInterceptor {
  constructor() {

  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginUrl = 'http://127.0.0.1:8000/api/login/vendor/';
    const refreshUrl = 'http://127.0.0.1:8000/api/token/refresh/'
    // console.log('Devesh');
    if (req.url !== loginUrl && req.url != refreshUrl) {
      const access_token = localStorage.getItem('access_token');
      console.log('access_token----: ', access_token);
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + access_token)
      })

    }

    return next.handle(req);
  }
}