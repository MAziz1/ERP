import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import icdone from '@iconify/icons-ic/done';
import rounderror from '@iconify/icons-ic/round-error';

@Component({
  selector: 'vex-snack-bar-icon',
  templateUrl: './snack-bar-icon.component.html',
  styleUrls: ['./snack-bar-icon.component.scss']
})
export class SnackBarIconComponent implements OnInit {

  icon: any;
  class:any;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
  ngOnInit(): void {
    debugger;
    switch (this.data.icon) {
      case "success":
        this.icon = icdone;
        this.class = 'mat-icon-green';
        break;
      case "error":
        this.icon = rounderror;
        this.class = 'mat-icon-danger';
        break;
      default:
        break;
    }
  }

}
