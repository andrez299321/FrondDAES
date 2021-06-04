import { Component, OnInit } from '@angular/core';
import { Settings, AppSettings } from 'src/app/app.settings';
import { AppService } from 'src/app/app.service';  
import { MenuItem } from 'src/app/models/product';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {  
  public slides = []; 
  public specialMenuItems:Array<MenuItem> = [];
  public bestMenuItems:Array<MenuItem> = [];
  public todayMenu!:MenuItem;

  public settings: Settings;
  constructor(public appSettings:AppSettings, public appService:AppService, public appProductoService:ProductoService ) {
    this.settings = this.appSettings.settings;  
  }

  ngOnInit(): void {
    this.getSlides();
    this.getSpecialMenuItems();
    this.getBestMenuItems();
    this.getTodayMenu();
  }

  public getSlides(){
    this.appService.getHomeCarouselSlides().subscribe((res:any)=>{
      this.slides = res;
    });
  }
 
  public getSpecialMenuItems(){
    this.appProductoService.getSpecialMenuItems().subscribe(menuItems=>{
      this.specialMenuItems = menuItems;
    });
  } 

  public getBestMenuItems(){
    this.appProductoService.getBestMenuItems().subscribe(menuItems=>{
      this.bestMenuItems = menuItems;
    });
  }

  public getTodayMenu(){
    this.appProductoService.getMenuItemById(23).subscribe(data=>{ 
      this.todayMenu = data;  
    });
  }  

}
