import { Component } from '@angular/core';
import { ConnectorService } from './serwisy/connector.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title = 'angulardbfront';

  constructor(private connectorService: ConnectorService,
    public router: Router) {
      this.connectorService.isOpen().subscribe(result => {
        if (result === true) {
          this.router.navigate(['/dropdown']);
        } else {
          this.router.navigate(['/logowanie']);
        }
      });
  }
}
