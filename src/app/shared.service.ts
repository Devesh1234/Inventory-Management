import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  activeTile=new BehaviorSubject<string>('tracker');

  constructor() { }

  getActiveTile()
  {
    return this.activeTile.asObservable();
  }
  setActiveTile(value:any)
  {
    this.activeTile.next(value)
  }

}
