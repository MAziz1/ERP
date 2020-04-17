import { DateTime } from 'luxon'

import { PaymentStyle } from 'src/static-data/PaymetStyle';
import { PriceList } from './PriceList.models';
import { Account } from './Account.models';

export class Customer {
  custGroup_Code: number;
  cG_ArName: string;
  cG_EnName: string;
  priceList_Code: number = 0;
  cG_Phone: string;
  cG_Address: string;
  cG_Email: string;
  cG_ContactPerName1: string;
  cG_ContactPerName2: string;
  cG_ContactPerName3: string;
  cG_ContactPerPhone1: string;
  cG_ContactPerPhone2: string;
  cG_ContactPerPhone3: string;
  cG_ContactPerTitle1: string;
  cG_ContactPerTitle2: string;
  cG_ContactPerTitle3: string;
  cG_ContactPerEmail1: string;
  cG_ContactPerEmail2: string;
  cG_ContactPerEmail3: string;
  acc_No: number = 0;
  cust_PayStyle: number = 0;
  cG_PayPeriod: number = 0;
  discount: number = 0;
  cG_IsMainShoppingCart: boolean;
  cG_IsMain: boolean;
  cG_InDate: DateTime;
  cG_InUser: 0;
  cG_UpDate: DateTime;
  cG_UpUser: 0;
  priceList:PriceList;
  account:Account;

  constructor(customer) {
    this.custGroup_Code = customer.custGroup_Code;
    this.cG_ArName = customer.cG_ArName;
    this.cG_EnName = customer.cG_EnName;
    this.priceList = customer.priceList;
    this.cG_Phone = customer.cG_Phone;
    this.cG_Address = customer.cG_Address;
    this.cG_Email = customer.cG_Email;
    this.cG_ContactPerName1 = customer.cG_ContactPerName1;
    this.cG_ContactPerName2 = customer.cG_ContactPerName2;
    this.cG_ContactPerName3 = customer.cG_ContactPerName3;
    this.cG_ContactPerPhone1 = customer.cG_ContactPerPhone1;
    this.cG_ContactPerPhone2 = customer.cG_ContactPerPhone2;
    this.cG_ContactPerPhone3 = customer.cG_ContactPerPhone3;
    this.cG_ContactPerTitle1 = customer.cG_ContactPerTitle1;
    this.cG_ContactPerTitle2 = customer.cG_ContactPerTitle2;
    this.cG_ContactPerTitle3 = customer.cG_ContactPerTitle3;
    this.cG_ContactPerEmail1 = customer.cG_ContactPerEmail1;
    this.cG_ContactPerEmail2 = customer.cG_ContactPerEmail2;
    this.cG_ContactPerEmail3 = customer.cG_ContactPerEmail3;
    this.account = customer.account;
    this.cust_PayStyle = customer.cust_PayStyle;
    this.cG_PayPeriod = customer.cG_PayPeriod;
    this.discount = customer.discount;
    this.cG_IsMainShoppingCart = customer.cG_IsMainShoppingCart;
    this.cG_IsMain = customer.cG_IsMain;
    this.priceList_Code = customer.priceList !== null ? customer.priceList.priceList_Code : 0;
    this.acc_No = customer.account !== null ? customer.account.acc_No : 0;
  }

  get PaymentStyleText() {
    let payStyle = this.cust_PayStyle === null ? null : PaymentStyle.find(pay => pay.id === this.cust_PayStyle)
    return payStyle === null ? "" : payStyle.text;
  }

  get PriceListText(){
    return this.priceList !== null ? this.priceList.pL_EnName : "";
  }

  get AccountText(){
    return this.account !== null ? this.account.acc_ENName : "";
  }

}


