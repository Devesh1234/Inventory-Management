import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LightgalleryModule } from 'lightgallery/angular';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { SharedService } from 'src/app/shared.service';
import lgZoom from 'lightgallery/plugins/zoom';
import { InitDetail } from 'lightgallery/lg-events';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-photos-view',
  standalone: true,
  imports: [AppCommonModule,CommonModule,LightgalleryModule],
  templateUrl: './photos-view.component.html',
  styleUrl: './photos-view.component.scss',
  encapsulation: ViewEncapsulation.None,

})
export class PhotosViewComponent implements OnInit {



  

  settings = {
    counter: false,
    plugins: [lgZoom],
};


  constructor(private sharedService:SharedService){

  }
  ngOnInit(): void {
      this.sharedService.loadScripts();
  }


}
