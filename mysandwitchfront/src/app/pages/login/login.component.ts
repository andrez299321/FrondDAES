import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router'; 
import { AppSettings, Settings } from 'src/app/app.settings';
import {ClientService} from 'src/app/services/client.service';
import {LoginRequest,ResponseClient} from 'src/app/models/client';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public hide = true;
  public bgImage:any;
  public settings: Settings;
  constructor(public fb: FormBuilder, public router:Router, private sanitizer:DomSanitizer, public appSettings:AppSettings,public clientServices: ClientService,public snackBar: MatSnackBar,) { 
    this.settings = this.appSettings.settings; 
  }

  ngOnInit(): void {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/login.jpg)');
    this.loginForm = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  public onLoginFormSubmit():void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      let login: LoginRequest = {
        user:  this.loginForm.value.username,
        password:  this.loginForm.value.password
      }
      this.clientServices.getLogin(login).subscribe((data) => {
        let clientData: ResponseClient = data;
        console.log(clientData);
        if(clientData.message == "OK")
        {
          this.snackBar.open('You login successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.router.navigate(['/checkout']);
        }else{
          this.snackBar.open('You login is incorrect!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      });
      this.router.navigate(['/login']);
    }
  }

}
