import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AppCommonModule } from '../app-common/app-common.module';
import { NgChartsModule } from 'ng2-charts';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchFilterPipe } from '../core/pipes/search-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes:Routes=[
  {path:'Dashboard',component:DashboardComponent}
]


@NgModule({
  declarations: [
    DashboardComponent,
    // HeaderComponent,
    // SidebarComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgChartsModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule
  ],

})
export class DashboardModule { }
