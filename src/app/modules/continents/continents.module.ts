import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CountriesComponent } from './components/countries/countries.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  },
];

@NgModule({
  declarations: [SidemenuComponent, LayoutComponent, CountriesComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class ContinentsModule {}
