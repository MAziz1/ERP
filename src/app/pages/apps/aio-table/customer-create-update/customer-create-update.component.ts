import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../interfaces/customer.model';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icLocationCity from '@iconify/icons-ic/twotone-location-city';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import icPayment from '@iconify/icons-ic/payment'
import icMail from '@iconify/icons-ic/email';
import { CustomerGroupsService } from 'src/app/providers/customerGroupsService/customer-groups.service';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../interfaces/Account.models';
import { PriceList } from '../interfaces/PriceList.models';
import { PayStyle } from '../interfaces/PayStyle.models';
import { PaymentStyle } from  '../../../../../static-data/PaymetStyle';

@Component({
  selector: 'vex-customer-create-update',
  templateUrl: './customer-create-update.component.html',
  styleUrls: ['./customer-create-update.component.scss']
})
export class CustomerCreateUpdateComponent implements OnInit {

  static id = 100;
  accountsList: Account[] = [];
  priceList: PriceList[] = [];
  PayStylesList: PayStyle[] = [];
  form: FormGroup;
  mode: 'create' | 'update' = 'create';

  icMoreVert = icMoreVert;
  icClose = icClose;

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;

  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;
  icMail = icMail;
  icPayment = icPayment;

  showLoader:boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<CustomerCreateUpdateComponent>,
    private fb: FormBuilder, private CustomerGroupSrv: CustomerGroupsService,
    private toaster: ToastrService) {
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Customer;
    }

    

    this.form = this.fb.group({

      custGroup_Code: [this.defaults.custGroup_Code],
      cG_ArName: [this.defaults.cG_ArName || '', [Validators.maxLength(50), Validators.required]],
      cG_EnName: [this.defaults.cG_EnName || '', [Validators.maxLength(50), Validators.required]],
      cG_Address: [this.defaults.cG_Address || '', [Validators.maxLength(50), Validators.required]],
      cG_Phone: [this.defaults.cG_Phone || '', [Validators.pattern("[0-11]\\d{10}"), Validators.required]],
      cG_Email: [this.defaults.cG_Email || '', [Validators.email, Validators.required]],
      cG_ContactPerName1: [this.defaults.cG_ContactPerName1 || '', Validators.maxLength(50)],
      cG_ContactPerName2: [this.defaults.cG_ContactPerName2 || '', Validators.maxLength(50)],
      cG_ContactPerName3: [this.defaults.cG_ContactPerName3 || '', Validators.maxLength(50)],
      cG_ContactPerPhone1: [this.defaults.cG_ContactPerPhone1 || '', Validators.pattern("[0-11]\\d{10}")],
      cG_ContactPerPhone2: [this.defaults.cG_ContactPerPhone2 || '', Validators.pattern("[0-11]\\d{10}")],
      cG_ContactPerPhone3: [this.defaults.cG_ContactPerPhone3 || '', Validators.pattern("[0-11]\\d{10}")],
      cG_ContactPerTitle1: [this.defaults.cG_ContactPerTitle1 || '', Validators.maxLength(50)],
      cG_ContactPerTitle2: [this.defaults.cG_ContactPerTitle2 || '', Validators.maxLength(50)],
      cG_ContactPerTitle3: [this.defaults.cG_ContactPerTitle3 || '', Validators.maxLength(50)],
      cG_ContactPerEmail1: [this.defaults.cG_ContactPerEmail1 || '', Validators.email],
      cG_ContactPerEmail2: [this.defaults.cG_ContactPerEmail2 || '', Validators.email],
      cG_ContactPerEmail3: [this.defaults.cG_ContactPerEmail3 || '', Validators.email],
      cust_PayStyle: [this.defaults.cust_PayStyle || 1],
      acc_No: [this.defaults.acc_No || 0],
      priceList_Code: [this.defaults.priceList_Code, Validators.required],
      cG_PayPeriod: [this.defaults.cG_PayPeriod || 0,[Validators.min(0)]],
      discount: [this.defaults.discount || 0, [Validators.max(100), Validators.min(0)]],
      cG_IsMainShoppingCart: [this.defaults.cG_IsMainShoppingCart || false],
      cG_IsMain: [this.defaults.cG_IsMain || false]
    });

    // Get Account List
    this.GetAccountsList();

    // Get Price List
    this.GetPriceList();

    // Get Paystyles List
    this.GetPayStylesList();
  }

  GetAccountsList() {
    this.CustomerGroupSrv.GetAccountsList().subscribe(accounts => {
      this.accountsList = accounts;
    });
  }

  GetPriceList() {
    this.CustomerGroupSrv.GetPriceList().subscribe(priceList => {
      this.priceList = priceList;
    });
  }

  GetPayStylesList() {
    this.PayStylesList = PaymentStyle;
  }

  save() {
    if (this.mode === 'create') {
      this.createCustomer();
    } else if (this.mode === 'update') {
      this.updateCustomer();
    }
  }

  createCustomer() {
    if (this.form.valid) {
      this.form.removeControl("custGroup_Code");
      let customer = this.form.value;
      this.showLoader = true;
      this.CustomerGroupSrv.AddCustomerGroup(customer).subscribe(result => {
        customer = result as Customer;
        this.dialogRef.close(customer);
        this.showLoader = false;
      });
    }
  }

  updateCustomer() {
    if (this.form.valid) {
      const customer = this.form.value;
      this.showLoader = true;
      this.CustomerGroupSrv.UpdateCustomerGroup(customer).subscribe(result => {
        this.dialogRef.close(customer);
        this.showLoader = false;
      });
    }
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }


}
