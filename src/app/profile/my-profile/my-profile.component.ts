import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { SharedService } from 'src/app/shared.service';
import { ProfileService } from '../profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, AppCommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit {

  sharedService = inject(SharedService);
  profileService = inject(ProfileService);

  vendor_id: string = "";

  vendor_details: any;

  passwordUpdate: boolean = false;

  profileForm: any;

  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.sharedService.loadScripts();

    // if(this.sharedService.getLocalStorage('vendor_details'))
    this.vendor_details = (this.sharedService.getLocalStorage('vendor_details'))
    if (this.vendor_details != null)
      this.vendor_details = JSON.parse(this.vendor_details)

    console.log('this.vendor_details---- ', this.vendor_details);


    this.profileForm = this.fb.group({
      business_name: new FormControl({ value: this.vendor_details.business_name, disabled: true }),
      business_branch: new FormControl({ value: this.vendor_details.business_branch, disabled: true }),
      mobile_no: new FormControl({ value: this.vendor_details.registered_mobile_no, disabled: true }),
      registered_email: new FormControl({ value: this.vendor_details.registered_email, disabled: true }),
      old_password: new FormControl('', Validators.required),
      new_password: new FormControl('', Validators.required)
    })


    // this.profileForm.get('new_password').valueChanges.subscribe((value: any) => {
    //   console.log('Password Changed:', value);
    // });
  }


  uploadedFile: File | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;


  onImageUpload(event: any) {

    console.log('event---', event.target.files);
    this.uploadedFile = event.target.files[0];
    console.log('this.uploadedFile: ', this.uploadedFile);

    if (this.uploadedFile != null) {

      this.profileService.updateProfileImage(this.uploadedFile).subscribe((res: any) => {
        console.log('Image Update Successfuly', res);
        this.sharedService.showSnackBar(res.message, 'success');

        this.uploadedFile = null;
        this.fileInput.nativeElement.value = '';

      })
    }
  }



  // onUpdate() {

  //   // this.profileService.branchEditedData
  // }


  profileUpdate() {

    let formValue = this.profileForm.value;
    console.log('formValue: ', formValue);
    if (formValue.old_password == '' || formValue.new_password == '') {
      this.sharedService.showSnackBar('Please Fill all details', 'error');

    }
    else {

      let obj = {
        "old_password": formValue.old_password,
        "new_password": formValue.new_password
      }
      this.profileService.updatePassword(obj).subscribe((res: any) => {
        // console.log('Resssssss----', res);
        this.sharedService.showSnackBar('Password Updated Successfully', 'success');
      }, (err: any) => {
        this.sharedService.showSnackBar(err.error.detail, 'error');

      })
    }
  }


}
