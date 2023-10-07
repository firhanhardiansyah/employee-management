import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { NotFoundComponent } from '@static/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    loadChildren: () =>
      import('@pages/auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    title: 'Home',
    canActivate: [authGuard],
    loadChildren: () =>
      import('@pages/home/home.module').then((m) => m.HomeModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
