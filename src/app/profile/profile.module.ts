import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeOverviewComponent } from './employee-overview/employee-overview.component';
import { EmployeeInputComponent } from './employee-input/employee-input.component';
import { PhotosViewComponent } from './photos-view/photos-view.component';


const routes:Routes=[
  {path:'employee-overview',component:EmployeeOverviewComponent},
  {path:'employee-input',component:EmployeeInputComponent},
  {path:'photos-view',component:PhotosViewComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ProfileModule { }
