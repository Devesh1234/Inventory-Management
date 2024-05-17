import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  loaderStatus = new BehaviorSubject<any>(false);
  snackBarStatus = new BehaviorSubject<any>({});

  activeTile = new BehaviorSubject<string>('Tracker');
  activeSubTile = new BehaviorSubject<string>('');

  private renderer: Renderer2;
  constructor(private rendererFactory: RendererFactory2, private httpClient: HttpClient) {
    this.renderer = rendererFactory.createRenderer(null, null);

  }


  public loadScripts() {
    this.loadScriptUrl('assets/js/script.js');

  }



  private loadScriptUrl(url: string) {
    const script = this.renderer.createElement('script');
    script.src = url;
    script.onload = () => {
      console.log('Script loaded successfully');
    };
    script.onerror = (error: any) => {
      console.error('Script loading error:', error);
    };
    this.renderer.appendChild(document.body, script);
  }





  public showLoader() {
    this.loaderStatus.next(true);
  }
  public hideLoader() {
    this.loaderStatus.next(false);
  }

  public getLoaderStatus() {
    return this.loaderStatus.asObservable();
  }



  public showSnackBar(message: string, action: string) {
    this.snackBarStatus.next({ 'message': message, 'action': action });
  }

  public getSnackBarStatus() {
    return this.snackBarStatus.asObservable();
  }






  getActiveTile() {
    return this.activeTile.asObservable();
  }
  setActiveTile(value: any) {
    this.activeTile.next(value);
  }

  getActiveSubTile() {
    return this.activeSubTile.asObservable();
  }
  setActiveSubTile(value: any) {
    this.activeSubTile.next(value);
  }





  signInApi(credentials: any) {
    let apiUrl = 'http://localhost:8000/api/signin/';
    return this.httpClient.post<any>(apiUrl,credentials
    )
  };

  signUpApi() {
    let apiUrl = 'http://127.0.0.1:8000/api/signup/';
  }


  forgotPasswordApi()
  {
    
  }




  getInventoryMenuDataApi() {
    let apiUrl = 'http://127.0.0.1:8000/api/inventory/view-all/';
    return this.httpClient.get(apiUrl);

  }

  insertInventoryMenuSingleEntryApi(data: any) {
    let apiUrl = 'http://127.0.0.1:8000/api/inventory/create/';
    return this.httpClient.post(apiUrl, { data })
  }

  insertInventoryMenuExcelEntryApi(file: File) {
    console.log('file------', file);
    let formData = new FormData();
    formData.append("excel_file",file)
    console.log('formData: ', formData);

    let apiUrl = 'http://127.0.0.1:8000/api/inventory/import/?excel_file';
    return this.httpClient.post<any>(apiUrl, formData);
  }

}
