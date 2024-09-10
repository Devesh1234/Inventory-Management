import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from './loader/loader.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { DashboardCardsComponent } from './dashboard-cards/dashboard-cards.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    LoaderComponent,
    SnackbarComponent,
    DashboardCardsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    LoaderComponent,
    SnackbarComponent,
    DashboardCardsComponent
  ]
})
export class AppCommonModule { }
