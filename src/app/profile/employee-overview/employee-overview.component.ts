import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { HeaderComponent } from 'src/app/app-common/header/header.component';
import { SidebarComponent } from 'src/app/app-common/sidebar/sidebar.component';
import { SharedService } from 'src/app/shared.service';
import { ProfileService } from '../profile.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-overview',
  standalone: true,
  imports: [CommonModule, AppCommonModule, FormsModule],
  templateUrl: './employee-overview.component.html',
  styleUrl: './employee-overview.component.scss'
})
export class EmployeeOverviewComponent implements OnInit {


  employeesList: any;
  employeesListCopy: any;


  employeeSearchValue:string='';

  constructor(private sharedService: SharedService, private profileService: ProfileService) {

  }


  ngOnInit(): void {
    this.sharedService.loadScripts();
    this.getEmployeesList();
  }


  getEmployeesList() {
    this.profileService.getEmployeesData().subscribe((res: any) => {
      this.employeesList = this.employeesListCopy = res.response;
      console.log('this.employeesList: ', this.employeesList);
    })
  }




  onInputChange(e: any) {
    console.log(e.target.value);

    let val = e.target.value.toString().toLowerCase();
    this.employeesList = this.employeesListCopy.filter((ele: any) => {
      return (
        ele.first_name.toString().toLowerCase().includes(val) ||
        ele.last_name.toString().toLowerCase().includes(val) ||
        ele.middle_name.toString().toLowerCase().includes(val) ||
        ele.phone_number.toString().toLowerCase().includes(val) ||
        ele.email.toString().toLowerCase().includes(val)
      )
    })


  }


  onInputCross(){
    this.employeeSearchValue='';
    this.employeesList=this.employeesListCopy;
  }

}
