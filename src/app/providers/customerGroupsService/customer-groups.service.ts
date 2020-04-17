import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/pages/apps/aio-table/interfaces/customer.model';
import { promise } from 'protractor';
import { Response } from 'src/app/pages/apps/aio-table/interfaces/response.models';
import { Account } from 'src/app/pages/apps/aio-table/interfaces/Account.models';
import { PriceList } from 'src/app/pages/apps/aio-table/interfaces/PriceList.models';
import { PayStyle } from 'src/app/pages/apps/aio-table/interfaces/PayStyle.models';

@Injectable({
  providedIn: 'root'
})
export class CustomerGroupsService {

  private readonly apiUrl: string = "http://www.api.synergycld.com/api/";
  private readonly token: string =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBc21hYUBzeW5lcmd5Y2xkLmNvbSIsImp0aSI6ImU4NWEzMjg1LWY4YzctNGRiYy04NDE5LTViNjBkYjdhNDlmZiIsInVuaXF1ZV9uYW1lIjoiQXNtYWFAc3luZXJneWNsZC5jb20iLCJEYXRhYmFzZU5hbWUiOiJEQl9BNTQ0RTNfQVBJU3luZXJneUNvbnRleHQiLCJleHAiOjE1ODcxNDQyMjksImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJhdWQiOiJ1c2VycyJ9.gkfmslKUn90ZbK-_DWQdZz4uEPF0nEue9Jn5wLeKD6c"

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token
  });

  PayStylesList: PayStyle[] = [];

  constructor(private _http: HttpClient) { }


  // service to get all customer groups.
  // return data as Observable<Customer[]>
  GetCustomerGroups(): Observable<Customer[]> {
    return this._http.get<Customer[]>(this.apiUrl + "CustomerGroups", { headers: this.headers });
  }

  // Add New Customer Group
  AddCustomerGroup(cust: Customer) {
    let _cust = JSON.stringify(cust);
    return this._http.post<Customer>(this.apiUrl + "CustomerGroups", _cust, { headers: this.headers });
  }

  // delete Customer Group By ID:
  DeleteCustomerGroup(id: number): Observable<Response> {
    return this._http.delete<Response>(this.apiUrl + "CustomerGroups/" + id, { headers: this.headers });
  }

  // Update Customer Group
  UpdateCustomerGroup(customer: Customer): Observable<Response> {
    let _cust = JSON.stringify(customer);
    return this._http.put<Response>(this.apiUrl + "CustomerGroups", _cust, { headers: this.headers });
  }

  // Get Accounts list
  GetAccountsList(): Observable<Account[]> {
    return this._http.get<Account[]>(this.apiUrl + "Accounts", { headers: this.headers });
  }

  // Get Price Lists
  GetPriceList() {
    return this._http.get<PriceList[]>(this.apiUrl + "PriceLists", { headers: this.headers });
  }

  // Get Customer Group ID 
  GetCustomerGroupById(id:number):Observable<Customer>
  {
    return this._http.get<Customer>(this.apiUrl + "CustomerGroups/" + id, { headers: this.headers });
  }

}
