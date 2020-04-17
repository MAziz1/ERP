import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { AuthService } from 'src/app/providers/authService/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {
  inputType = 'password';
  visible = false;

 icVisibility = icVisibility;
 icVisibilityOff = icVisibilityOff;
  authForm: FormGroup;
  constructor( private _formBilder: FormBuilder,
    public authService: AuthService, private route: Router,
     private http: HttpClient,private cd: ChangeDetectorRef,
      private snackbar: MatSnackBar) {

    //login
    this.authForm = this._formBilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }
   //login 
   get email() {
    return this.authForm.get('email');
  }
  get password() {
    return this.authForm.get('password');
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}