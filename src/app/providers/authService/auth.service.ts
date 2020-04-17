
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, JsonpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import LS from '../localStorage';
import { ToastrService } from 'ngx-toastr';


interface Response {
  data: any;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken;
  userId;
  SuppInUser;
  islogin: boolean = false;
  apiUrl = "http://api.synergycld.com/api/";

currentSupplierId?:number;
  currentUser: any;


  constructor(
    private http: HttpClient,
    private _injector: Injector,
    private route: Router,
    private toaster: ToastrService
  ) { }
  //get token
  getToken() {
    return LS.get('token');
  }
  
  // get user code
  getsupp_InUser() {
    return LS.get('supp_InUser');
  }
  removeToken() {
    LS.remove('token');
    LS.remove('currentUser');
    this.currentUser = false;
    //LS.remove('')
  }

  ////////////// login //////////////////
  login(credentials) { 
    console.log(this.apiUrl)
    this.http.post(this.apiUrl + 'Auth/CreateToken',credentials)
      .subscribe((res: any) => {
        console.log(res)
        console.log("yeees")
        this.route.navigate(["/apps/aio-table"]);
        this.SuppInUser=+res.user_Code;
        LS.set("supp_InUser",this.SuppInUser);
        LS.set("token",res.token);
        console.log("supp_InUser"+this.SuppInUser);
        console.log("token"+res.token);

      }, err => {
        console.log(err)
        this.toaster.error('username or password incorrect');
      }
      );
  }
 //add suppliers
  addsuppliers(data,suppInUser) {
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + this.getToken()
    })
    data.supp_InUser=suppInUser;
    console.log("userCode: " + suppInUser);
    this.http.post(this.apiUrl + 'Suppliers', data, { headers: headers})
      .subscribe((res:Response) => {
        console.log(res);
        resolve(res);
        this.toaster.success('Added', 'sucessfully!');
      }, (err) => {
        reject(err);
          console.log(err);
        this.toaster.error(' Falied','try again');
      });
  });
}
  // get suppliers by id
  getSuppliersById(id) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get(this.apiUrl + 'Suppliers',{ headers: headers });
  }
  //edit suppliers
  editsuppliers(data, suppCode,suppInUser) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + this.getToken()
      })
      data['supp_Code'] =+suppCode;
      data.supp_InUser=suppInUser;
      console.log("userCode: " + suppInUser);
      console.log("sup code"+suppCode);
      this.http.put(this.apiUrl + 'Suppliers', data, { headers: headers })
        .subscribe((res: { data: any }) => {
          resolve(res.data);
          this.toaster.success('Update','sucessfully!');
        }, (err) => {
          reject(err);
          this.toaster.error('Failed','plz,try again!');
        });
    });
  }

  //delete suppliers
  deletesuppliers(id) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + this.getToken()
      })
      this.http.delete(this.apiUrl + 'Suppliers/'+id,{ headers: headers })
        .subscribe((res: { data: any }) => {
          resolve(res.data);
                
          this.toaster.success('delete','sucessfully!');
        }, (err) => {
          reject(err);         
          this.toaster.error('Failed','plz,try again!');
        });
    });
  }
  //////////////log out ///////////////////////
  logout() {
    this.removeToken();
  }

}
