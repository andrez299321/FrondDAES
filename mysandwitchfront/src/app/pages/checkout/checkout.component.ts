import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { AppService } from "src/app/app.service";
import {
  emailValidator,
  maxWordsValidator,
} from "src/app/theme/utils/app-validators";
//import {MailService} from '@sendgrid/mail';



@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  public psConfig: PerfectScrollbarConfigInterface = {
    wheelPropagation: true,
  };
  @ViewChild("sidenav") sidenav: any;
  public sidenavOpen: boolean = true;
  public checkoutForm: FormGroup = new FormGroup({});
  public countries: any[] = [];
  public deliveryMethods: any[] = [];
  public months: any[] = [];
  public years: any[] = [];
  public step = 0;
  public deliveryMethodSubmitted: boolean = false;
  public orderCompleted: boolean = false;
  public orderEmail: string = "";

  constructor(public appService: AppService, private fb: FormBuilder/*, public mailService :MailService*/) {}

  ngOnInit(): void {

    var cart = localStorage.getItem('cart');
    console.log(cart);
    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    }

    this.countries = this.appService.getCountries();
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();
    this.checkoutForm = this.fb.group({
      deliveryAddress: this.fb.group({
    
        country: [null, Validators.required],
        city: [null, Validators.required],
        place: [null, Validators.required],
        postalCode: [null, Validators.required],
        address: [null, Validators.required],
      }),
      paymentMethod: this.fb.group({
        cardHolderName: [null, Validators.required],
        cardNumber: [null, Validators.required],
        expiredMonth: [null, Validators.required],
        expiredYear: [null, Validators.required],
        cvv: [
          null,
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ],
      }),

    });
  }

  @HostListener("window:resize")
  public onWindowResize(): void {
    window.innerWidth < 960
      ? (this.sidenavOpen = false)
      : (this.sidenavOpen = true);
  }

  public setStep(index: number) {
    this.step = index;
  }
  public onSubmitForm(form: any) {
    console.log(this.checkoutForm.get(form)?.valid);
    if (this.checkoutForm.get(form)?.valid) {
      this.nextStep();
    }
  }
  public nextStep() {
    this.step++;
    console.log(this.step);
  }
  public prevStep() {
    this.step--;
  }

  public placeOrder() {
    this.checkoutForm.updateValueAndValidity();
    this.checkoutForm.markAllAsTouched();
    if (this.checkoutForm.valid) {
      this.step = 3;
      this.orderCompleted = true;
      this.checkoutForm.reset();
      this.appService.Data.cartList.length = 0;
      this.appService.Data.totalPrice = 0;
      this.appService.Data.totalCartCount = 0;
      
    }
  }


  
}
