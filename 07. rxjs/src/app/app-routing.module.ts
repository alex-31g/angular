import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AComponent } from './components/a/a.component';
import { BComponent } from './components/b/b.component';
import { CComponent } from './components/c/c.component';
import { DComponent } from './components/d/d.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '1' },
  { path: '1', component: AComponent },
  { path: '2', component: BComponent },
  { path: '3', component: CComponent },
  { path: '4', component: DComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}