import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { SharedService } from 'src/app/shared.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-branch-input',
  standalone: true,
  imports: [AppCommonModule, CommonModule, FormsModule, ReactiveFormsModule],

  templateUrl: './branch-input.component.html',
  styleUrl: './branch-input.component.scss'
})
export class BranchInputComponent implements OnInit {

  addBranchForm: any;
  mainVendorData: any;

  constructor(private sharedService: SharedService, private fb: FormBuilder, private profileService: ProfileService) {

  }
  ngOnInit(): void {
    this.sharedService.loadScripts();
    this.initializeForm();

    this.getMainVendorData();
  }

  initializeForm() {

    this.addBranchForm = this.fb.group({
      business_name: [''], 
      business_type: [''],
      business_branch: [''],
      business_structure: [''],
      registered_email: [''],
      password: [''],
      registered_mobile_no: [''],
      country: [''],
      state: [''],
      city: [''],
      registered_address: [''],
      url: [''],
      business_registration_no: [''],
      business_registration_date: [''],
      pan: [''],
      gst_no: [''],
      fssai_license_number: [''],
      fssai_issued_on: [''],
      fssai_valid_upto: [''],
      vendor_scale: [''],
      business_kind_based: [''],
      best_known_for: [''],
      any_usp: [''],
      description: [''],
      famous_tags: [''],
      business_spokesperson: [''],
      spokesperson_designation: [''],
      spokesperson_email: [''],
      spokesperson_contact: [''],
      operational_address: [''],
      total_staff: [null],
      staff_strength: [null],
      house_capacity: [null],
      bank_name: [''],
      bank_no: [''],
      bank_code: [''],
      timings: [''],
      capacity: [null],
      occupied: [null],
      parking: [false],
      alcohol_serve: [false],
      smoke_space: [false],
      target_audience: [''],
      delivery: [false],
      kyc: [false],
      subscribed: [false],
      outlet_status: [false]
    });

  }


  patchInitialValues(data: any) {
    // let branch_name=data
    this.addBranchForm.patchValue({
      'business_name': data.business_name,
      'business_branch': data.business_branch,
      'business_type': data.business_type,
      'business_structure': data.business_structure,
      'country': data.country,
      'state': data.state,
      'city': data.city,
      'fssai_issued_on': data.fssai_issued_on,
      'fssai_license_number': data.fssai_license_number,
      'fssai_valid_upto': data.fssai_valid_upto,
      'vendor_scale': data.vendor_scale

    })



    this.addBranchForm.get('business_name').disable();
    this.addBranchForm.get('business_branch').disable();
    this.addBranchForm.get('business_type').disable();
    this.addBranchForm.get('business_structure').disable();
    this.addBranchForm.get('country').disable();
    this.addBranchForm.get('state').disable();
    this.addBranchForm.get('city').disable();
    this.addBranchForm.get('fssai_issued_on').disable();
    this.addBranchForm.get('fssai_license_number').disable();
    this.addBranchForm.get('fssai_valid_upto').disable();
    this.addBranchForm.get('vendor_scale').disable();
  }

  getMainVendorData() {
    this.profileService.getVendorDetails().subscribe({
      next: (res: any) => {
        console.log('Res---', res);
        this.mainVendorData = res.response['Main'];
        console.log('this.vendorData: ', this.mainVendorData);
        this.patchInitialValues(this.mainVendorData);

      },
      error: (err: any) => {

      }
    })
  }


  addBranch(){
    let obj={
      "business_name": "test",
      "business_type": "Restaurant",
      "business_branch": "Main",
      "business_structure": "llp",
      "registered_email": "test@gmail.com",
      "password": "est@123",
      "registered_mobile_no": "9810912490",
      "country": "India",
      "state": "Haryana",
      "city": "Gurgaon",
      "registered_address": "B/122 Dwarka Street",
      "url": "http://example.com",
      "business_registration_no": "AB123456",
      "business_registration_date": "2022-01-01",
      "pan": "ABCDE1234F",
      "gst_no": "1234567890ABCDE",
      "fssai_license_number": "FSSAI123456",
      "fssai_issued_on": "2023-07-24",
      "fssai_valid_upto": "2029-01-01",
      "vendor_scale": "medium",
      "business_kind_based": "Multi-cuisine",
      "best_known_for": "Best multi-cuisine restaurant",
      "any_usp": "Great ambiance",
      "description": "A multi-cuisine restaurant offering a wide variety of dishes.",
      "famous_tags": "family restaurant, multi-cuisine",
      "business_spokesperson": "Mr. John Doe",
      "spokesperson_designation": "Owner",
      "spokesperson_email": "johndoe@example.com",
      "spokesperson_contact": "9876543210",
      "operational_address": "B/123 Dwarka Street",
      "total_staff": 50,
      "staff_strength": 30,
      "house_capacity": 100,
      "bank_name": "HDFC Bank",
      "bank_no": "1234567890",
      "bank_code": "HDFC0001234",
      "timings": "9 AM - 11 PM",
      "capacity": 80,
      "occupied": 20,
      "parking": true,
      "alcohol_serve": false,
      "smoke_space": true,
      "target_audience": "Families, Couples",
      "delivery": false,
      "kyc": false,
      "subscribed": false,
      "outlet_status": false
  }
  console.log('obj----',obj);

    this.profileService.addBranch(obj).subscribe((res:any)=>{

      console.log('Resssss',res);

    })
  }

}
