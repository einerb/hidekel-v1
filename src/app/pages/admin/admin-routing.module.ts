import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { CellComponent } from './cell/cell.component';
import { PublicComponent } from './public/public.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: ``,
    component: AdminComponent,
    children: [
      { path: ``, component: WelcomeComponent },
      { path: `cells`, component: CellComponent },
      { path: `public-cells`, component: PublicComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
