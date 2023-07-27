import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../component/product-view/productmodal';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public cartitemlist : any=[];
  public amount:number=0;
  public productlist = new BehaviorSubject<any>([])

  constructor(private http:HttpClient) { }

  getproduct(){
    return this.http.get<product[]>("https://dummyjson.com/products")
  }
  getproductbyid(id:string){
    return this.http.get("https://dummyjson.com/products/"+ id)
  }

  addtocart(data:product){
    this.cartitemlist.push(data);
    this.productlist.next(this.cartitemlist);
    console.log(this.cartitemlist);
  }
  products(){
    return this.productlist.asObservable();
  }

  // removecartitem

  removecartitem(data:product){
    this.cartitemlist.map((a:product,index:product)=>{
      if(data.id === a.id){
        this.cartitemlist.splice(index,1)
      }
    })
    this.productlist.next(this.cartitemlist)
  }

 

  // remove all items

  removeallitems(){
    this.cartitemlist = [];
    this.productlist.next(this.cartitemlist);
  }

  
  // total calculation

  calculateprice(){
    let total =0;
    this.cartitemlist.map((a:any)=>{
      total +=a.price;
    })
    return total;
  }

  // passing data from one component to another

  sendfinalamout(data:number){
    this.amount = data;
  }
  recievefinalamount(){
    return this.amount;
  }



}
