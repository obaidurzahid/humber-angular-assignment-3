import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, Observable, take } from 'rxjs';
import { ProductData } from 'src/app/models/product.interface';
import { DataStoreService } from 'src/app/services/data-store.service';
import { customValidator } from 'src/app/validator/validator';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  totalOrder:string='';
  totalOrderAmount:number=0;
  cartItems!: ProductData[];

  form!:FormGroup;
  storeAddress: any;
  totalCartItem:any;
  constructor(private dataStore: DataStoreService) { }

  ngOnInit(): void {
    this.dataStore.cartItems$.subscribe(result => this.cartItems = result);
    this.cartItems.forEach(item=>{
      let price=item.price. substring(1)
      this.totalOrderAmount += parseInt(price);
    });
    this.totalOrder='$'+this.totalOrderAmount.toString();

    
    this.form=new FormGroup({
      firstName:new FormControl('',[Validators.required]),
      lastName:new FormControl('',[Validators.required]),
      address:new FormControl('',[Validators.required]),
      city:new FormControl('',[Validators.required]),
      postalCode:new FormControl('',[Validators.required]),
      country:new FormControl('',[Validators.required]),
      cardType:new FormControl('',[Validators.required]),
      nameOnCard:new FormControl('',[Validators.required, Validators.maxLength(16)]),
      ccNumber:new FormControl('',[Validators.required]),
      ccExpireMonth:new FormControl('',[Validators.required,Validators.maxLength(2)]),
      ccExpireYear:new FormControl('',[Validators.required,Validators.maxLength(4)]),
      cvc:new FormControl('',[Validators.required,Validators.maxLength(4)])
    })
      
    
  }
  populateSavedAddress(postalCode:string){
    // this.form.setValue(
    //   {
    //     address: this.dataStore.storeAddress.address,
    //     city: this.dataStore.storeAddress.city,
    //     postalCode: this.dataStore.storeAddress.postalCode,
    //     country: this.dataStore.storeAddress.country}
    //   );
  }
  // saveAddress(){
  //   this.dataStore.storeAddress(
  //     {
  //       address:this.form.get('address')?.value,
  //       city:this.form.get('city')?.value,
  //       postalCode:this.form.get('postalCode')?.value,
  //       country:this.form.get('country')?.value,
        
  //     });
  // }
  submit(){
       console.log('User Details:');
       console.log(this.form.value);
       console.log('Product in Cart :');
      console.log(this.cartItems);
  }

}
