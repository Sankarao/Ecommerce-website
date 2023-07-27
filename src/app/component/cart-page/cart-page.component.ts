import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { product } from '../product-view/productmodal';
import { FormControl , FormGroup , Validators } from '@angular/forms'

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  showproduct:any=[];
  public totalamount :number=0;
  public taxamount:number=0;
  public finalamount:number=0;
  public sendamount:number=0;
  public addressform:boolean =false;
  myform:any;
  FormGroup:any;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.products().subscribe(res=>{
      this.showproduct = res;
      this.totalamount = this.api.calculateprice();
      // console.log("total amt is",this.totalamount);

      //**** */ calculation of 15% taxation amount/****** */

      this.taxamount = this.totalamount/100*15
      // console.log("your taxation amount is",this.taxamount)

      // *****final amount ******

      this.finalamount = this.totalamount + this.taxamount;

      
      // ****sending final amount to order page component****
      this.sendamount = this.finalamount
      this.api.sendfinalamout(this.sendamount);



    })

    // form
    this.myform = new FormGroup({
      email:new FormControl ('', Validators.required),
      name:new FormControl ('', Validators.required),
      mobile:new FormControl ('', Validators.required),
      address:new FormControl ('', Validators.required),
    })
  }
  deleteitem(item:product){
    this.api.removecartitem(item);
  }
  Empty(){
    this.api.removeallitems();
  }
  cancel(){
    this.addressform = false;
    this.myform.reset();
  }
  onsubmit(){
    this.myform.value;
    console.log(this.myform.value)
    // this.myform.reset();
    localStorage.setItem('ecomdata',JSON.stringify(this.myform.value))
  }

}
