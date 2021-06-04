import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
  DetailSalesOrder,
  SalesOrder,
  ResponseSalesOrder
} from "src/app/models/salesorder";
import { AppSettings } from "src/app/app.settings";


@Injectable({
  providedIn: "root", 
})
export class OrderService {

  constructor(
    public http: HttpClient,
    public dialog: MatDialog,
    public appSettings: AppSettings,
    public translateService: TranslateService,
    
  ) {}


  public url = "https://jvsalesorderservices.azurewebsites.net";

  private createRequestOptions() {
    const options = {
      headers: new HttpHeaders()
        .append("Ocp-Apim-Subscription-Key", "d43316a26f4b479e9dba1ac996cf11ad")
      
    };

    return options;
  }

  public getSalesOrder(id: number): Observable<ResponseSalesOrder> {    
    
    const options = {
      params: new HttpParams().append("id", id)
    };

    return this.http.get<ResponseSalesOrder>(
      this.url+"/GetSalesOrder",
      options
    );
  }

  public SetCreateSalesOrder(sales: SalesOrder): Observable<ResponseSalesOrder> {
    return this.http.post<ResponseSalesOrder>(this.url+"/CreateSalesOrder",sales);
  }

}
