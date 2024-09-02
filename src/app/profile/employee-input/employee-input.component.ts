import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { SharedService } from 'src/app/shared.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-employee-input',
  standalone: true,
  imports: [AppCommonModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-input.component.html',
  styleUrl: './employee-input.component.scss'
})
export class EmployeeInputComponent implements OnInit {



  uploadedFile: File | null = null;
  addEmployeeForm: any;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;



  constructor(private sharedService: SharedService, private fb: FormBuilder , private profileService:ProfileService) { }

  ngOnInit(): void {

    this.sharedService.loadScripts();
    this.addEmployeeForm = this.fb.group({
      employee_id: ['', Validators.required],
      vendor_name: ['', Validators.required],
      business_branch: ['', Validators.required],
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      emergency_contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      team_name: ['', Validators.required],
      Discount_eligibility_upto: ['', Validators.required],
      date_of_joining: ['', Validators.required],
      employee_status: ['', Validators.required],
      date_of_exit: [''],
      country: [{ value: 'India', disabled: true }, Validators.required],
      state: [{ value: 'Haryana', disabled: true }, Validators.required],
      city: [{ value: 'Gurugram', disabled: true }, Validators.required],
      pin_code: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      landmark: [''],
      adhar_no: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
      pan: ['', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]],
      bank: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      casual_leaves_taken: ['', [Validators.required, Validators.min(0)]],
      casual_leaves_balance: ['', [Validators.required, Validators.min(0)]],
      sick_leaves_taken: ['', [Validators.required, Validators.min(0)]],
      sick_leaves_balance: ['', [Validators.required, Validators.min(0)]],
      privilege_leaves_taken: ['', [Validators.required, Validators.min(0)]],
      privilege_leaves_balance: ['', [Validators.required, Validators.min(0)]],
      total_taken_leaves: ['', [Validators.required, Validators.min(0)]],
      total_leaves_balance: ['', [Validators.required, Validators.min(0)]]
    });

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
    if (this.uploadedFile != null) {
      this.profileService.insertExcelEmployeeData(this.uploadedFile).subscribe({
        next: (res: any) => {
          console.log(' Employee Excel Entry', res);
          this.sharedService.showSnackBar('Excel Uploaded Sucessfully','success')
          this.onFileCancel();

        },
        error: (err: any) => {
          this.sharedService.showSnackBar('Something went wrong','error')

        }
      });
    }
  }


  onFileCancel() {
    this.uploadedFile = null;
    this.fileInput.nativeElement.value = '';

  }




  addEmployee(){
    console.log(this.addEmployeeForm.getRawValue());
    if(this.addEmployeeForm.invalid){
      this.sharedService.showSnackBar('Please fill all details','error')
    }
    else{
      this.profileService.insertSingleEmployeeData().subscribe((res:any)=>{})
    }
  }




}
