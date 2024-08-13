import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-photos-view',
  standalone: true,
  imports: [AppCommonModule,CommonModule],
  templateUrl: './photos-view.component.html',
  styleUrl: './photos-view.component.scss'
})
export class PhotosViewComponent implements OnInit {

  constructor(private sharedService:SharedService){

  }
  ngOnInit(): void {
      this.sharedService.loadScripts();
  }


}
