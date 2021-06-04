import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { Order, Category } from "src/app/app.models";
import {
  MenuItem,
  MenuItemImage,
  MenuItem2,
  ResponseMenu,
} from "src/app/models/product";
import { AppSettings } from "src/app/app.settings";
import { environment } from "src/environments/environment";

export class Data {
  constructor(public favorites: MenuItem[]) {}
}

@Injectable({
  providedIn: "root",
})
export class ProductoService {
  public Data = new Data(
    [] // categories
  );

  public url = environment.url + "/assets/data/";

  constructor(
    public http: HttpClient,
    public dialog: MatDialog,
    public appSettings: AppSettings,
    public translateService: TranslateService
  ) {}

  private createRequestOptions() {
    const options = {
      headers: new HttpHeaders()
        .append("Ocp-Apim-Subscription-Key", "d43316a26f4b479e9dba1ac996cf11ad")
        .append("Access-Control-Allow-Origin", "http://localhost:4200")
        .append("Accept", "application/json, text/plain, */*")
        .append("Accept-Encoding", "gzip, deflate, br")
        .append("Accept-Language", "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3"),
    };

    return options;
  }

  public getMenuItems(): Observable<ResponseMenu> {
    let options = this.createRequestOptions();

    return this.http.get<ResponseMenu>(
      "https://jvproductservices.azurewebsites.net/GetAllProduct"
      //options
    );
  }

  public getMenuItemById(id: number): Observable<MenuItem> {
    return this.http.get<MenuItem>(this.url + "menu-item-" + id + ".json");
  }

  public getSpecialMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.url + "special-menu-items.json");
  }

  public getBestMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.url + "best-menu-items.json");
  }
}
