import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialComponent } from './social/social.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../app-common/app-common.module';



const routes:Routes=[
  {path:'Social',component:SocialComponent}
]

@NgModule({
  declarations: [
    SocialComponent
  ],
  imports: [
    RouterModule.forChild(routes), 
    CommonModule,
    NgChartsModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule
  ]
})
export class SocialModule { }
