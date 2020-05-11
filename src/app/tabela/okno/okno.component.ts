import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  kolumny: String[];
  dane: String[];
}


@Component({
  selector: 'app-okno',
  templateUrl: './okno.component.html',
  styleUrls: ['./okno.component.sass']
})
export class OknoComponent implements OnInit {

  kolumny: String[];
  dane: String[];
  singleArray: Array<any> = [];
  tempArray: Array<String> = [];
  usun: Boolean = true;

  constructor(public dialogRef: MatDialogRef<OknoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.kolumny = data.kolumny;
      this.dane = data.dane;
      for (var i = 0; i < this.kolumny.length; i++) {
        this.singleArray.push({
                             kolumny: this.kolumny[i],
                             dane: this.dane[i]
                            });
      }
    }

  ngOnInit() {
  }

  zatwierdz() {
    for (var i = 0; i < this.singleArray.length; i++) {
      this.tempArray.push(this.singleArray[i].dane);
    }
  }

}
