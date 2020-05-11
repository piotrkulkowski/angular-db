import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaComponent } from './tabela/tabela/tabela.component';
import { LogowanieComponent } from './logowanie/logowanie.component';
import { DropdownComponent } from './tabela/dropdown/dropdown.component';


const routes: Routes = [
  { path: 'tabela', component: TabelaComponent},
  { path: 'logowanie', component: LogowanieComponent},
  { path: 'dropdown', component: DropdownComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
