import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AComponent } from './components/a/a.component';
import { BComponent } from './components/b/b.component';
import { CComponent } from './components/c/c.component';
import { DComponent } from './components/d/d.component';
import { EComponent } from './components/e/e.component';
import { FComponent } from './components/f/f.component';
import { GComponent } from './components/g/g.component';
import { HComponent } from './components/h/h.component';
import { IComponent } from './components/i/i.component';
import { JComponent } from './components/j/j.component';
import { KComponent } from './components/k/k.component';
import { LComponent } from './components/l/l.component';
import { MComponent } from './components/m/m.component';
import { NComponent } from './components/n/n.component';
import { OComponent } from './components/o/o.component';
import { PComponent } from './components/p/p.component';
import { QComponent } from './components/q/q.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '1' },
  { path: '1', component: AComponent },
  { path: '2', component: BComponent },
  { path: '3', component: CComponent },
  { path: '4', component: DComponent },
  { path: '5', component: EComponent },
  { path: '6', component: FComponent },
  { path: '7', component: GComponent },
  { path: '8', component: HComponent },
  { path: '9', component: IComponent },
  { path: '10', component: JComponent },
  { path: '11', component: KComponent },
  { path: '12', component: LComponent },
  { path: '13', component: MComponent },
  { path: '14', component: NComponent },
  { path: '15', component: OComponent },
  { path: '16', component: PComponent },
  { path: '17', component: QComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
