import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../interfaces/customer.model';
import { CustomerGroupsService } from 'src/app/providers/customerGroupsService/customer-groups.service';
import icClose from '@iconify/icons-ic/twotone-close';

@Component({
  selector: 'vex-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  icClose = icClose;

  constructor(@Inject(MAT_DIALOG_DATA) public customer: Customer,
    private _customerGroupSrv: CustomerGroupsService, 
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,) { }

  ngOnInit(): void {

  }

  DeleteCustomer(){
    this._customerGroupSrv.DeleteCustomerGroup(this.customer.custGroup_Code).subscribe(response=>{
      if (response.message.toLowerCase() == "deleted successfully.") {
        this.dialogRef.close(this.customer);
      }
    });
  }
}
