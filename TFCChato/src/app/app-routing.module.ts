import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { UserDataPageModule } from './pages/user-data/user-data.module';

const routes: Routes = [
  {
    path: 'home',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'incident-data/:id',
        loadChildren: () => import('./pages/incident-data/incident-data.module').then( m => m.IncidentDataPageModule),
        canActivate: [AuthGuard, AdminGuard],
      }
    ]
  },
  {
    path: '',
    redirectTo: 'access',
    pathMatch: 'full'
  },
  {
    path: 'access',
    loadChildren: () => import('./pages/access/access.module').then( m => m.AccessPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'data',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/data/data.module').then(m => m.DataPageModule),
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'user/:id',
        loadChildren: () => import('./pages/user-data/user-data.module').then(m => m.UserDataPageModule),
        canActivate: [AuthGuard, AdminGuard],
      },
    ]
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule),
    canActivate: [AuthGuard, AdminGuard],
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
