import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LightgalleryModule } from 'lightgallery/angular';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { SharedService } from 'src/app/shared.service';
import lgZoom from 'lightgallery/plugins/zoom';
import { InitDetail } from 'lightgallery/lg-events';
import { ViewEncapsulation } from '@angular/core';
import { ProfileService } from '../profile.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-photos-view',
  standalone: true,
  imports: [AppCommonModule, CommonModule, LightgalleryModule],
  templateUrl: './photos-view.component.html',
  styleUrl: './photos-view.component.scss',
  encapsulation: ViewEncapsulation.None,

})
export class PhotosViewComponent implements OnInit {

  uploadedFiles: File[] = [];

  photosUrls: any;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;


  imagesDeleteDataArray: any = [];

  deleteButtonStatus:boolean=false;

  imageViewUrl:any;

  settings = {
    counter: false,
    plugins: [lgZoom],
  };




  

  constructor(private sharedService: SharedService, private profileService: ProfileService) {

  }
  ngOnInit(): void {
    this.sharedService.loadScripts();

    this.profileService.getPhotosData().subscribe((res: any) => {
      console.log('res---', res);
      this.photosUrls = res.response;
    })
  }

  onFileSelected(event: any): void {
    this.uploadedFiles = Array.from(event.target.files);
    console.log('this.uploadedFiles: ', this.uploadedFiles);
  }
  saveUploadFile() {

    this.profileService.postPhoto(this.uploadedFiles).subscribe((res: any) => {
      console.log('Response----', res);
      this.sharedService.showSnackBar('Photos Uploaded Succesfully', 'success');
      this.onFileCancel();
      this.ngOnInit();
    })
  }
  onFileCancel() {

    this.uploadedFiles = [];
    this.fileInput.nativeElement.value = '';

  }


  imageView(item: any, index: any) {
    this.imageViewUrl=item.photo;
    console.log('this.imageViewUrl: ', this.imageViewUrl);
  }




  onImageSelect(event: any, id: any, index: any) {
    if (event.target.checked == true) {
      this.imagesDeleteDataArray.push(id)
    }
    else {
      let index = this.imagesDeleteDataArray.indexOf(id);
      this.imagesDeleteDataArray.splice(index, 1)
    }
    console.log(this.imagesDeleteDataArray);
  }


  deletePhotos() {
    let obj={'photo_ids':this.imagesDeleteDataArray}
    this.profileService.deletePhoto(obj).subscribe((res: any) => {
      this.sharedService.showSnackBar('Photos Deleted Successfully', 'success');
      this.ngOnInit();
    })
  }

}
