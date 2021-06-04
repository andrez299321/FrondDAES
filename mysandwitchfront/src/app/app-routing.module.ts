import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

import { PagesComponent } from "./pages/pages.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { LockScreenComponent } from "./pages/lock-screen/lock-screen.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      //{ path: '', redirectTo: '/landing', pathMatch: 'full' },
      {
        path: "",
        loadChildren: () =>
          import("./pages/home/home.module").then((m) => m.HomeModule),
      },
      {
        path: "about",
        loadChildren: () =>
          import("./pages/about/about.module").then((m) => m.AboutModule),
      },


      {
        path: "menu",
        loadChildren: () =>
          import("./pages/menu/menu.module").then((m) => m.MenuModule),
      },

      {
        path: "account",
        loadChildren: () =>
          import("./pages/account/account.module").then((m) => m.AccountModule),
      },
      {
        path: "cart",
        loadChildren: () =>
          import("./pages/cart/cart.module").then((m) => m.CartModule),
      },
      {
        path: "checkout",
        loadChildren: () =>
          import("./pages/checkout/checkout.module").then(
            (m) => m.CheckoutModule
          ),
      },
      {
        path: "login",
        loadChildren: () =>
          import("./pages/login/login.module").then((m) => m.LoginModule),
      },
      {
        path: "register",
        loadChildren: () =>
          import("./pages/register/register.module").then(
            (m) => m.RegisterModule
          ),
      }
    
    ],
  },
  
  { path: "lock-screen", component: LockScreenComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
      initialNavigation: "enabled", // for one load page, without reload
      relativeLinkResolution: "legacy",
      // useHash: true
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
