import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../serwisy/connector.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.sass']
})
export class LogowanieComponent implements OnInit {

  url: String = "localhost:1521/praca";
  nazwa: String = "uzytkownik";
  haslo: String = "haslo2";
  czyZalog;

  constructor(private connectorService: ConnectorService,
    public router: Router) { }

  ngOnInit() {
  }

  zaloguj() {
    let tempArray: String[] = [this.url, this.nazwa, this.haslo];
    this.connectorService.login(tempArray).subscribe(result => {
      if (result === true) this.router.navigate(['/dropdown']);
    });
  }

  zmUrl(event){
      this.url = event.target.value;
  }

  zmNaz(event){
    this.nazwa = event.target.value;
  }

  zmHas(event){
    this.haslo = event.target.value;
  }

}
