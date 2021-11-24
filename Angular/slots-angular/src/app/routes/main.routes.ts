import { CheckoutPageComponent } from './../components/checkout-page/checkout-page.component';
import { SlotsComponent } from './../components/slots/slots.component';
import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
export const routes: Routes = [
    { path: '', component:SlotsComponent},
    { path: 'checkout', component:CheckoutPageComponent},
    { path: '**', redirectTo: "/404" }
]



export const ROUTER_PROVIDER: ModuleWithProviders<any> = RouterModule.forRoot(routes);