import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { MatSliderModule } from '@angular/material/slider';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { AppCommonModule } from './app-common/app-common.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NgChartsModule } from 'ng2-charts';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { InventoryModule } from './inventory/inventory.module';
import { SearchFilterPipe } from './core/pipes/search-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrackerModule } from './tracker/tracker.module';
import { LoaderComponent } from './app-common/loader/loader.component';
import {HttpClientModule} from '@angular/common/http'

// import { TabViewModule } from "primeng/tabview";




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CommonModule,
    MatSliderModule,
    MatCardModule,
    BrowserAnimationsModule,
    AppCommonModule,
    DashboardModule,
    InventoryModule,
    TrackerModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
