import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path:'inventory',
    loadChildren:()=>import('./inventory/inventory.module').then(m=>m.InventoryModule)
  },
  {
    path:'tracker',
    loadChildren:()=>import('./tracker/tracker.module').then(m=>m.TrackerModule)
  },
  {
    path:'social',
    loadChildren:()=>import('./social/social.module').then(m=>m.SocialModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
