import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  showLoader:boolean=false;
  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
    this.sharedService.getLoaderStatus().subscribe((res:any)=>{
      this.showLoader=res; 
    })
  }

}
