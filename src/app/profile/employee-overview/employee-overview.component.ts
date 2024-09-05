import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { HeaderComponent } from 'src/app/app-common/header/header.component';
import { SidebarComponent } from 'src/app/app-common/sidebar/sidebar.component';
import { SharedService } from 'src/app/shared.service';
import { ProfileService } from '../profile.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-overview',
  standalone: true,
  imports: [CommonModule, AppCommonModule, FormsModule],
  templateUrl: './employee-overview.component.html',
  styleUrl: './employee-overview.component.scss'
})
export class EmployeeOverviewComponent implements OnInit {

cardsData:any;

  employeesList: any;
  employeesListCopy: any;

  branchWiseEmployeesList: any;
  branchWiseEmployeesListCopy: any;


  employeeSearchValue: string = '';

  selectedBranchValue: string = 'Main';
  branchList: any;

  constructor(private sharedService: SharedService, private profileService: ProfileService , private router:Router) {

  }


  ngOnInit(): void {
    this.sharedService.loadScripts();
    this.getEmployeesList();
  }



  getEmployeesList() {
    this.profileService.getEmployeesData().subscribe((res: any) => {
      this.cardsData=res.cards
      console.log('this.cardsData: ', this.cardsData);
      this.employeesList = this.employeesListCopy = res.response;
      console.log('this.employeesList: ', this.employeesList);
      this.branchList = Object.keys(this.employeesList);
      console.log('this.branchList: ', this.branchList);

      this.branchWiseEmployeesList = this.branchWiseEmployeesListCopy = this.employeesList[this.selectedBranchValue]
    })
  }




  onInputChange(e: any) {
    console.log(e.target.value);

    let val = e.target.value.toString().toLowerCase();
    this.branchWiseEmployeesList = this.branchWiseEmployeesListCopy.filter((ele: any) => {
      return (
        ele.first_name.toString().toLowerCase().includes(val) ||
        ele.last_name.toString().toLowerCase().includes(val) ||
        ele.middle_name.toString().toLowerCase().includes(val) ||
        ele.phone_number.toString().toLowerCase().includes(val) ||
        ele.email.toString().toLowerCase().includes(val)
      )
    })


  }


  onInputCross() {
    this.employeeSearchValue = '';
    this.branchWiseEmployeesList = this.branchWiseEmployeesListCopy;
  }



  selectBranch(br: any) {
    this.selectedBranchValue = br;
    this.branchWiseEmployeesList = this.branchWiseEmployeesListCopy = this.employeesList[this.selectedBranchValue];

    console.log('this.branchWiseEmployeesList: ', this.branchWiseEmployeesList);

    this.onInputCross();

  }



  editEmployee(item: any) {
    this.profileService.employeeEditedData.next(item)
    this.router.navigate(['/profile/employee-input']);

  }

  deletedEmployee: string = '';

  getDeletedEmployee(id: any) {
    this.deletedEmployee = id;
    console.log('deleted Employee', id);

  }

  deleteEmployee() {
    let obj = { 'employee_ids': [this.deletedEmployee] }
    // console.log('obj: ', obj);
    this.profileService.deleteEmployeeData(obj).subscribe((res: any) => {
      // console.log('Delete Response ----', res);
      console.log('Employee Delete Successfully');
    })
  }


}
