import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { Order, Category } from "src/app/app.models";
import {
  Client,
  ResponseClient,
  LoginRequest
} from "src/app/models/client";
import { AppSettings } from "src/app/app.settings";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class ClientService {

  constructor(
    public http: HttpClient,
    public dialog: MatDialog,
    public appSettings: AppSettings,
    public translateService: TranslateService,
    
  ) {}


  public url = "https://jvautenticacionservices.azurewebsites.net";

  private createRequestOptions() {
    const options = {
      headers: new HttpHeaders()
        .append("Ocp-Apim-Subscription-Key", "d43316a26f4b479e9dba1ac996cf11ad")
      
    };

    return options;
  }

  public getClient(id: number): Observable<ResponseClient> {    
    
    const options = {
      params: new HttpParams().append("id", id)
    };

    return this.http.get<ResponseClient>(
      this.url,
      options
    );
  }

  public SetCreateClient(client: Client): Observable<ResponseClient> {
    return this.http.post<ResponseClient>(this.url+"/CreateUser",client);
  }

  public getAllClient(): Observable<ResponseClient> {
    return this.http.get<ResponseClient>(this.url);
  }

  public getLogin(login: LoginRequest): Observable<ResponseClient> {

    return this.http.post<ResponseClient>(
      this.url+"/LoginUser",
      login
    );
  }
}
