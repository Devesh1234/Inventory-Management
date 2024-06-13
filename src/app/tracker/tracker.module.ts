import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerComponent } from './tracker/tracker.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { SearchFilterPipe } from '../core/pipes/search-filter.pipe';
import { NgChartsModule } from 'ng2-charts';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../app-common/app-common.module';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import { AuthGuard } from '../auth.guard';


const routes:Routes=[
  // canActivate:[AuthGuard]
  {path:'Tracker',component:TrackerComponent }
]

@NgModule({
  declarations: [
    TrackerComponent,
    SearchFilterPipe
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AppCommonModule,
    NgChartsModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule
  ]
})
export class TrackerModule { }
