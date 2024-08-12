import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-employee-input',
  standalone: true,
  imports: [AppCommonModule, CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './employee-input.component.html',
  styleUrl: './employee-input.component.scss'
})
export class EmployeeInputComponent implements OnInit {



  uploadedFile: File | null = null;
  addEmployeeForm:any;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;



  constructor(private sharedService: SharedService , private fb:FormBuilder) { }

  ngOnInit(): void {

    this.addEmployeeForm = this.fb.group({
      'first_name': ['',Validators.required],
      'last_name': ['', Validators.required],
    })

  }






  onFileSelected(event: any) {
    console.log('event---', event.target.files);
    this.uploadedFile = event.target.files[0];
    console.log('this.uploadedFile: ', this.uploadedFile);


  }





  excelDownload() {
    const fileUrl = '/assets/samplefile/sample_file.xlsx';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', 'filename.ext');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.sharedService.showSnackBar('Sample File Download ', 'success')

  }



  saveUploadFile() {
    // if (this.uploadedFile != null) {
    //   this.inventoryService.insertExcelData(this.uploadedFile).subscribe({
    //     next: (res: any) => {
    //       console.log('Inventory Menun Excel Entry', res);
    //       this.sharedService.showSnackBar('Excel Uploaded Sucessfully','success')
    //       this.onFileCancel();

    //     },
    //     error: (err: any) => {
    //       this.sharedService.showSnackBar('Something went wrong','error')

    //     }
    //   });
    // }
  }


  onFileCancel() {
    this.uploadedFile = null;
    this.fileInput.nativeElement.value = '';

  }




}
