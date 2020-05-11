import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ConnectorService } from 'src/app/serwisy/connector.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.sass']
})
export class DropdownComponent implements OnInit {

  nazwyTabel;
  wybrana;
  loadComponent: boolean = false;

  constructor(private connectorService: ConnectorService, private changeDetector: ChangeDetectorRef, public router: Router) { }

  ngOnInit() {
    this.connectorService.getTableNames().subscribe(result => {
      this.nazwyTabel = result;
      console.log(this.nazwyTabel);
      this.wybrana = this.nazwyTabel[0];
    });
  }

  wybr() {
    this.loadComponent = false;
    this.changeDetector.detectChanges();
    this.loadComponent = true;
  }

  wyloguj() {
    this.connectorService.logout().subscribe();
    this.router.navigate(['/logowanie']);
  }


}
