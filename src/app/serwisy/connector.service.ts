import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  constructor(private httpClient: HttpClient, private errorBar: MatSnackBar) {
    
  }

  login(dane: String[]) {
    console.log(dane);
    return this.httpClient.post('http://localhost:8080/login', dane);
  }

  getTable(tabela) {
    return this.httpClient.post('http://localhost:8080/getTable', tabela);
  }

  getTableNames() {
    return this.httpClient.post('http://localhost:8080/getTableNames', {responseType: 'text'});
  }

  logout() {
    return this.httpClient.post('http://localhost:8080/logout',{responseType: 'text'});
  }

  edit(dane: String) {
    console.log(dane);
    return this.httpClient.post<String>('http://localhost:8080/edit', dane).pipe(
      catchError(this.handleError)
      );
  }

  getPrimaryKey(tabela){
    return this.httpClient.post<Array<string>>('http://localhost:8080/getPrimaryKey', tabela);
  }

  isOpen() {
    return this.httpClient.post('http://localhost:8080/isOpen',{responseType: 'text'});
  }

  handleError = (error: HttpErrorResponse) => {
    this.errorBar.open("Wystąpił błąd", "Ok", {
      duration: 2000,
    });
    return throwError(error);
  }
}
