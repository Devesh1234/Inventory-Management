import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as CryptoJS from 'crypto-js';


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


  public loadScripts() :void {
    this.loadScriptUrl('assets/js/script.js');

  }



  // code for localstorage

  getLocalStorage(key:string) : string | null
  {
    const encryptedData = sessionStorage.getItem(key);

    if (encryptedData) {
      return this.decryptData(encryptedData);
    }
    return null;
  }

  setLocalStorage(key:string, data:string):void{
    const encryptedData = this.encryptData(data);
    sessionStorage.setItem(key, encryptedData);
  }


  removeLocalStorage(key:string)
  {
    sessionStorage.removeItem(key);
  }

  private secretKey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Replace with your actual secret key

  // Method to encrypt data
  encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }

  // Method to decrypt data
  decryptData(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
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












  vendor_id:any='24';




  insertInventoryMenuExcelEntryApi(file: File) {
    console.log('file------', file);
    let formData = new FormData();
    formData.append("excel_file",file)
    console.log('formData: ', formData);

    let apiUrl = 'http://127.0.0.1:8000/api/inventory/import/?excel_file';
    return this.httpClient.post<any>(apiUrl, formData);
  }

}
