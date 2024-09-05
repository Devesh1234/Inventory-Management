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

  editedData: any;
  isEmployeeEditedData: boolean = false;

  currentDate: any;



  constructor(private sharedService: SharedService, private fb: FormBuilder, private profileService: ProfileService) { }

  ngOnInit(): void {




    this.sharedService.loadScripts();
    this.initializeForm();
    this.currentDate = this.getCurrentDate();


    this.profileService.employeeEditedData.asObservable().subscribe((res: any) => {
      this.editedData = res;
      if (Object.keys(this.editedData).length != 0) {
        this.isEmployeeEditedData = true;
        this.patchEditedValues(this.editedData);

      }
    })


  }


  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }



  initializeForm() {
    this.addEmployeeForm = this.fb.group({
      employee_id: [{ value: '', disabled: true }],
      // vendor_name: [{value:'',disabled:true}],
      business_branch: [{ value: '', disabled: true }],
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
      country: [{ value: 'India', disabled: true }],
      state: [{ value: 'Haryana', disabled: true }],
      city: [{ value: 'Gurugram', disabled: true }],
      pin_code: ['', Validators.pattern('^[0-9]{6}$')],
      landmark: [''],
      adhar_no: ['', [Validators.pattern('^[0-9]{12}$')]],
      pan: ['', [Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]],
      bank: ['',],
      salary: ['', [Validators.min(0)]],
      casual_leaves_taken: ['', [Validators.min(0)]],
      casual_leaves_balance: ['', [Validators.min(0)]],
      sick_leaves_taken: ['', [Validators.min(0)]],
      sick_leaves_balance: ['', [Validators.min(0)]],
      privilege_leaves_taken: ['', [Validators.min(0)]],
      privilege_leaves_balance: ['', [Validators.min(0)]],
      total_taken_leaves: ['', [Validators.min(0)]],
      total_leaves_balance: ['', [Validators.min(0)]]
    });

  }

  patchEditedValues(data: any) {





    this.addEmployeeForm.patchValue({
      "employee_id": data.employee_id,
      // "vendor_name": data.vendor_name,
      "business_branch": data.business_branch,
      "first_name": data.first_name,
      "middle_name": data.middle_name,
      "last_name": data.last_name,
      "date_of_birth": data.date_of_birth,
      "email": data.email,
      "phone_number": data.phone_number,
      "emergency_contact": data.emergency_contact,
      "gender": data.gender,
      "designation": data.designation,
      "team_name": data.team_name,
      "Discount_eligibility_upto": data.Discount_eligibility_upto,
      "date_of_joining": data.date_of_joining,
      "employee_status": data.employee_status,
      "date_of_exit": data.date_of_exit,
      "pin_code": data.pin_code,
      "landmark": data.landmark,
      "adhar_no": data.adhar_no,
      "pan": data.pan,
      "bank": data.bank,
      "salary": data.salary,
      "casual_leaves_taken": data.casual_leaves_taken,
      "casual_leaves_balance": data.casual_leaves_balance,
      "sick_leaves_taken": data.sick_leaves_taken,
      "sick_leaves_balance": data.sick_leaves_balance,
      "privilege_leaves_taken": data.privilege_leaves_taken,
      "privilege_leaves_balance": data.privilege_leaves_balance,
      "total_taken_leaves": data.total_taken_leaves,
      "total_leaves_balance": data.total_leaves_balance
    })


    console.log('Edited Data', this.addEmployeeForm);
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
          this.sharedService.showSnackBar('Excel Uploaded Sucessfully', 'success')
          this.onFileCancel();

        },
        error: (err: any) => {
          this.sharedService.showSnackBar('Something went wrong', 'error')

        }
      });
    }
  }


  onFileCancel() {
    this.uploadedFile = null;
    this.fileInput.nativeElement.value = '';

  }




  addEmployee() {
    console.log(this.addEmployeeForm.getRawValue());
    const formValue = this.addEmployeeForm.getRawValue();
    if (this.addEmployeeForm.invalid) {
      for (let item in this.addEmployeeForm.controls) {
        console.log(item, this.addEmployeeForm.controls[item].errors);

      }
      this.sharedService.showSnackBar('Please fill all details', 'error')
    }
    else {
      if (this.isEmployeeEditedData == false) {
        this.profileService.insertSingleEmployeeData(formValue).subscribe((res: any) => {
          console.log('resp-----', res);
        })
      }
      else {
        this.profileService.editEmployeeData(formValue).subscribe((res: any) => {
          console.log('resp222-----', res);
        })
      }


    }
  }




}
