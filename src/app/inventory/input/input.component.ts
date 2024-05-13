import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  uploadedFile: File | null = null;
  addItemform: any;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;


  constructor(private sharedService: SharedService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.sharedService.loadScripts();
    this.addItemform = this.fb.group({
      'vendor': ['24'],
      'menu_item': ['', Validators.required],
      'category': ['', Validators.required],
      'sub_category': ['', Validators.required],
      'sub_sub_category': ['', Validators.required],
      'item_type': ['', Validators.required],
      'ingredients': ['', Validators.required],
      'price': ['', Validators.required],
      'size_type': ['', Validators.required],
      'estimate_time': ['', Validators.required],
      'calories': ['', Validators.required],
      'stock': ['', Validators.required],
      'in_stock': ['', Validators.required],
      'description': ['', Validators.required]
    })
  }


  onFileSelected(event: any) {
    console.log('event---', event.target.files);
    this.uploadedFile = event.target.files[0];

  }

  saveUploadFile() {
    if (this.uploadedFile != null) {
      this.sharedService.insertInventoryMenuExcelEntryApi(this.uploadedFile).subscribe({
        next: (res: any) => {
          console.log('Inventory Menun Excel Entry', res);

        },
        error: (err: any) => {

        }
      });
    }
  }

  onFileCancel() {
    this.uploadedFile = null;
    this.fileInput.nativeElement.value = '';

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


  addItem() {
    console.log(this.addItemform.value);
    // this.sharedService.insertInventoryMenuSingleEntryApi(this.addItemform.value).subscribe({
    //   next: (res: any) => {
    //     console.log('Res----', res);
    //   },
    //   error: (err: any) => {
    //     console.log('errror----', err);
    //   }
    // });


  }


  onSelectionChange(event:any)
  {
    console.log('event----',event);
  }

  
}
