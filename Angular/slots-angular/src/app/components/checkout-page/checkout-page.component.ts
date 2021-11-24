import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCallsService } from 'src/app/services/http-calls.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
  });
  isCheckoutPage:boolean = true;
  savedEmail:string;
  savedCredits:Number;
  constructor(private http:HttpCallsService, private router:Router) { }

  ngOnInit(): void {
  }
  
  submit() {
    if (this.form.valid) {
      
      this.http.postCheckoutCredits(this.form.getRawValue()).subscribe((data:any)=>{
        this.savedEmail = data.email;
        this.savedCredits = data.credits;
        this.isCheckoutPage = false;
      },error=>{alert(error.error)})
      
    }
  }
  getErrorMessage(type:string){
    if(type.includes('name')){
      if(this.form.get('name').hasError('required')){
        return 'You must Enter a Value'
      }
      return ''
    }else{
      if(this.form.get('email').hasError('required')){
        return 'You must Enter a Value'
      }else{
        return this.form.get('email').hasError('email') ? 'Not a valid email' : '';
      }
    }
  }
  returnHome(){
    this.router.navigate(['/']);
  }
}
