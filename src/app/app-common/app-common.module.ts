import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    LoaderComponent
  ]
})
export class AppCommonModule { }
