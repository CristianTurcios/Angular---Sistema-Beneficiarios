import { NgModule } from '@angular/core';
// import { CommonModule, } from '@angular/common';
// import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './auth.guard';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'beneficiarios',
    pathMatch: 'full',
  }, 
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  }, 
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  }, {
    path: '**',
    redirectTo: 'beneficiarios'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
})
export class AppRoutingModule { }
