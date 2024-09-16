import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { SharedService } from 'src/app/shared.service';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';

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

  constructor(private sharedService: SharedService, private profileService: ProfileService, private router: Router) {

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

  editBranch(item: any) {
    console.log('Branch---', item);
    this.router.navigate(['/profile/branch-input']);

  }



  deletedBranchObj: any;

  getDeletedBranch(obj: any) {
    this.deletedBranchObj = obj;
    console.log('deleted item', this.deletedBranchObj);
  }

  deleteBranch() {
    let obj = {
      "business_name": this.deletedBranchObj['business_name'],
      "business_branch": this.deletedBranchObj['business_branch']
    }
    this.profileService.deleteBranch(obj).subscribe((res: any) => {
      console.log('ress----', res);
      this.sharedService.showSnackBar(res.message, 'success');
      this.ngOnInit();
    })
  }




}
