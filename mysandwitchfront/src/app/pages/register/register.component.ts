import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { matchingPasswords, emailValidator } from 'src/app/theme/utils/app-validators';
import { DomSanitizer } from '@angular/platform-browser';
import {ClientService} from 'src/app/services/client.service';
import {Client,ResponseClient} from 'src/app/models/client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public hide = true; 
  public bgImage:any;
  constructor(public fb: FormBuilder, public router:Router, public snackBar: MatSnackBar, private sanitizer:DomSanitizer,public clientServices: ClientService) { }

  ngOnInit() {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/register.jpg)');
    this.registerForm = this.fb.group({ 
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      lastname : ['', Validators.compose([Validators.required])],
      identification : ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],                          
      celphone: ['', Validators.required],    
    },{validator: matchingPasswords('password', 'confirmPassword')});
  }

  public onRegisterFormSubmit():void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      
      var client: Client = {
        name :  this.registerForm.value.username,
        lastName: this.registerForm.value.lastName,
        identification: this.registerForm.value.identification,
        celphone: this.registerForm.value.celphone,
        password: this.registerForm.value.password,
        email: this.registerForm.value.email,
        id :0
      };
 
      
      
      this.clientServices.SetCreateClient(client).subscribe((data) => {
        let clientData: ResponseClient = data;
        console.log(clientData);
        if(clientData.message == "OK")
        {
          this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.router.navigate(['/checkout']);
        }
      });
      
    }
  }
}
