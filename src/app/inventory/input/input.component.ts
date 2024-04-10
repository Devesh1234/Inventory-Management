import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  uploadedFile:File|null=null;
  
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {

    this.sharedService.loadScripts();
  }


  onFileSelected(event: any) {
    console.log('event---', event.target.files[0]);
    
    this.uploadedFile=event.target.files[0]
  }

  onFileCancel(){
    this.uploadedFile=null
  }

  excelDownload()
  {
    this.sharedService.showSnackBar('File Downloaded Successfully','success')
  }

}
