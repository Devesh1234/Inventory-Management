import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from './loader/loader.component';
import { SnackbarComponent } from './snackbar/snackbar.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    LoaderComponent,
    SnackbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    LoaderComponent,
    SnackbarComponent
  ]
})
export class AppCommonModule { }
