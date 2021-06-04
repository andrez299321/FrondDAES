import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet'; 
import { MenuItem } from 'src/app/models/product';
import { Settings, AppSettings } from 'src/app/app.settings';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.scss']
})
export class CartOverviewComponent implements OnInit {
  public menuItems: MenuItem[] = [];
  public settings: Settings;
  constructor(public appService:AppService, 
              public appSettings:AppSettings,
              private bottomSheetRef: MatBottomSheetRef<CartOverviewComponent>,
              public snackBar: MatSnackBar) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.menuItems = this.appService.Data.cartList;
    console.log(this.menuItems);
    var json = JSON.stringify(this.menuItems); 
    localStorage.setItem('cart',json);
  }

  public hideSheet(isRedirect:boolean){
    this.bottomSheetRef.dismiss(isRedirect);
  }

  public clearCart(){
    this.appService.Data.cartList.length = 0;
    this.appService.Data.totalPrice = 0; 
    this.hideSheet(false)
  }

  public remove(item:MenuItem, event:any) {
    const index: number = this.appService.Data.cartList.indexOf(item);
    if (index !== -1) {
      item.cartCount = 0;
      this.appService.Data.cartList.splice(index, 1);  
      this.appService.calculateCartTotal(); 
    } 
    if(this.appService.Data.cartList.length == 0){
      this.hideSheet(false);
    }
    event.preventDefault();           
  }  

  public counterChange(menuItem:MenuItem, count:number){   

    menuItem.cartCount = count;
    const index: number = this.appService.Data.cartList.indexOf(menuItem);
    console.log(menuItem);
    this.menuItems[index].cartCount = menuItem.cartCount;
    this.appService.Data.cartList[index].cartCount = menuItem.cartCount;
    console.log(menuItem);
    console.log(this.menuItems);
    var json = JSON.stringify(this.menuItems); 
    localStorage.setItem('cart',json);

    if(menuItem.cartCount <= menuItem.availibilityCount){ 
      this.appService.calculateCartTotal();
    }
    else{
      menuItem.cartCount = menuItem.availibilityCount;
      this.snackBar.open('You can not add more items than available. In stock ' + menuItem.availibilityCount + ' items and you already added ' + menuItem.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
    } 
  }
 

}
