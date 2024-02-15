import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  loaderStatus = new BehaviorSubject<any>(false);

  activeTile = new BehaviorSubject<string>('Tracker');
  activeSubTile = new BehaviorSubject<string>('');

  private renderer: Renderer2;
  constructor(private rendererFactory: RendererFactory2) {
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

  public getLoaderStatus()
  {
      return this.loaderStatus.asObservable();
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



}
