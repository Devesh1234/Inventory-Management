import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeOverviewComponent } from './employee-overview/employee-overview.component';
import { EmployeeInputComponent } from './employee-input/employee-input.component';
import { PhotosViewComponent } from './photos-view/photos-view.component';
import { NumbersOnlyDirective } from '../core/directives/numbers-only.directive';
import { AppCommonModule } from '../app-common/app-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component';
import { BranchInputComponent } from './branch-input/branch-input.component';


const routes:Routes=[
  {path:'employee-overview',component:EmployeeOverviewComponent},
  {path:'employee-input',component:EmployeeInputComponent},
  {path:'profile-view',component:ProfileOverviewComponent},
  {path:'branch-input',component:BranchInputComponent},
  {path:'photos-view',component:PhotosViewComponent}
]

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AppCommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProfileModule { }
