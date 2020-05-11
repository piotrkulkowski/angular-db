import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaComponent } from './tabela/tabela.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatPaginatorModule, MatSortModule,
  MatButtonModule, MatFormFieldModule, MatDialogModule,
  MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { OknoComponent } from './okno/okno.component'
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from './dropdown/dropdown.component';


@NgModule({
  declarations: [TabelaComponent, OknoComponent, DropdownComponent],
  entryComponents: [OknoComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule
  ],
  exports: [
    TabelaComponent,
    OknoComponent
  ]
})
export class TabelaModule { }
