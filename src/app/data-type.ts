export interface signUp{
  name:string,
  email:string,
  password:string
}
export interface login{
email:String,
password:String
}
export interface SignUpData{
name: string;
  email: string;
  password: string;
  role:string;
}
export interface LoginData {
  email: String;
  password: String;
  role:string;
}
export interface product{
  name:string,
  price:number,
  discount: number,
  category:string,
  color:string,
  image:string,
  description:string,
  id:number,
  quantity:undefined | number,
  productId:undefined|number,
  discountedProduct: product | undefined;
  countdownProduct: product | undefined;
  isPopular: boolean;
  rating: number; // Add the rating property
  reviewName: string;
}
export interface cart{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  description:string,
  id:number|undefined,
  quantity:undefined | number,
  productId:number,
  userId:number
}
export interface priceSummary{
  price:number,
  discount:number,
  tax:number,
  delivery:number,
  total:number

}
export interface order{
  email:string,
  address:string,
  contact:string,
  totalPrice:number,
  userId:number,
  id:number|undefined
}
