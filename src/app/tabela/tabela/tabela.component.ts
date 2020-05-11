import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ConnectorService } from 'src/app/serwisy/connector.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { OknoComponent } from '../okno/okno.component';
import { isNullOrUndefined, isUndefined, isNull } from 'util';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.sass']
})
export class TabelaComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input()
  tabela: string;

  dataSource;
  kolumny: Array<string> = [];
  dane;
  opola: Array<string> = [];
  klucze: Array<string> = [];

  constructor(private connectorService: ConnectorService, public okno: MatDialog, private dropdown: DropdownComponent) { }

  ngOnInit() {

    this.connectorService.getTable(this.tabela).subscribe(
      response => this.handleSuccessfulResponse(response));
    this.connectorService.getPrimaryKey(this.tabela).subscribe(
      response => (this.klucze = response));
  }

  handleSuccessfulResponse(response) {
    this.dataSource = new MatTableDataSource(response);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.kolumny = Object.keys(response[0]);
    this.dane = response;
  }

  openDialog(row: number): void {
    this.opola = [];
    console.log(Object.values(this.dane[row]));
    let pola = Object.values(this.dane[row]);
    for (var i = 0; i < pola.length; i++) {
      if (!isNull(pola[i])) {
        this.opola.push(pola[i].toString());
      } else {
        this.opola.push("");
      }
    }
    console.log(this.opola);
    let dialogRef = this.okno.open(OknoComponent, {
      width: '250px',
      data: { kolumny: this.kolumny, dane: this.opola }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!isNullOrUndefined(result))
        if (result === true) {
          this.usunKrotke();
        } else {
          this.edytujKrotke(result);
        }
    });
  }

  nowaKrotka() {
    this.opola = [];
    let dialogRef = this.okno.open(OknoComponent, {
      width: '250px',
      data: { kolumny: this.kolumny, dane: this.opola }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!isNullOrUndefined(result))
        this.dodajKrotke(result);
    });
  }

  edytujKrotke(result) {
    let zapytanie: String = "update " + this.tabela + " set ";
    let zmiana: boolean = false;
    for (var i = 0; i < result.length; i++) {
      if (result[i] !== this.opola[i]) {
        zapytanie += this.kolumny[i] + " = \'" + result[i] + "\', ";
        zmiana = true;
      }
    }
    if (!zmiana) return;
    zapytanie = zapytanie.substr(0, zapytanie.length - 2) + " where ";
    for (var i = 0; i < this.klucze.length; i++) {
      zapytanie += this.klucze[i] + " = \'";
      for (var j = 0; j < this.kolumny.length; j++) {
        if (this.kolumny[j] === this.klucze[i]) {
          zapytanie += this.opola[j] + "\', ";
        }
      }
    }
    zapytanie = zapytanie.substr(0, zapytanie.length - 2);
    this.wykonajZapytanie(zapytanie);
  }

  dodajKrotke(result) {
    let zapytanie = "insert into " + this.tabela + " values ("
    for (var i = 0; i < result.length; i++) {
      if (!isUndefined(result[i])) {
        zapytanie += "\'" + result[i] + "\', ";
      } else {
        zapytanie += "\'\', "
      }
    }
    zapytanie = zapytanie.substr(0, zapytanie.length - 2) + ")";
    this.wykonajZapytanie(zapytanie);
  }

  usunKrotke() {
    let zapytanie = "delete from " + this.tabela + " where ";
    for (var i = 0; i < this.klucze.length; i++) {
      zapytanie += this.klucze[i] + " = \'";
      for (var j = 0; j < this.kolumny.length; j++) {
        if (this.kolumny[j] === this.klucze[i]) {
          zapytanie += this.opola[j] + "\', ";
        }
      }
    }
    zapytanie = zapytanie.substr(0, zapytanie.length - 2);
    this.wykonajZapytanie(zapytanie);
  }

  wykonajZapytanie = (zapytanie) => {
    console.log(zapytanie);
    this.connectorService.edit(zapytanie).subscribe();
    this.dropdown.wybr();
  }

}
