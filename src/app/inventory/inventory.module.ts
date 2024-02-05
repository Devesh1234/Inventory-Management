import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory/inventory.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppCommonModule } from '../app-common/app-common.module';


const routes:Routes=[
  {path:'Inventory',component:InventoryComponent}
]

@NgModule({
  declarations: [
    InventoryComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AppCommonModule
    
  ]
})
export class InventoryModule { }
