import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { SharedService } from 'src/app/shared.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-overview',
  standalone: true,
  imports: [AppCommonModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile-overview.component.html',
  styleUrl: './profile-overview.component.scss'
})
export class ProfileOverviewComponent implements OnInit {

  branches: any;
  vendorData: any;

  constructor(private sharedService: SharedService, private profileService: ProfileService) {

  }
  ngOnInit(): void {
    this.sharedService.loadScripts();

    this.getVendorData();
  }


  getVendorData() {
    this.profileService.getVendorDetails().subscribe({
      next: (res: any) => {
        this.vendorData = res.response;
        console.log('this.vendorData: ', this.vendorData);
      },
      error: (err: any) => {

      }
    })
  }

  keys(obj: any): Array<string> {
    if (obj != null)
      return Object.keys(obj)
    else
      return [];
  }




}
