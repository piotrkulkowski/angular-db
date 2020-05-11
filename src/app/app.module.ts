import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatPaginatorModule, MatSortModule,
  MatButtonModule, MatFormFieldModule, MatDialogModule,
  MatInputModule, MatSnackBarModule, MatIconModule,
  MatOptionModule, MatSelectModule } from '@angular/material'
import { TabelaModule } from './tabela/tabela.module';
import { FormsModule } from '@angular/forms';
import { LogowanieComponent } from './logowanie/logowanie.component';

@NgModule({
  declarations: [
    AppComponent,
    LogowanieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    TabelaModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
