import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) { }
 // addProduct(productData: FormData): Observable<any> {
  //  return this.http.post<any>(this.apiUrl, productData);
 // }
 addProduct(data: product) {
  return this.http.post('http://localhost:3000/products', data);
}
  productList() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put<product>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }
  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }

  // trendyProducts() {
  //   return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  // }

  searchProduct(query: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }
  getCartList(userId: number) {
    return this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);
  }

  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId=' + userData.id);
  }

  deleteCartItems(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId).subscribe((result) => {
      this.cartData.emit([]);
    })
  }

  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+orderId)

  }
  trendyProducts(): Observable<product[]> {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8').pipe(
      map(products => {
        return products.map(product => {
          const discount = product.price * 0.1; // Example discount calculation (10% off)
          return {
            ...product,
            discount
          };
        });
      })
    );

}
}
/* trendyProducts(): Observable<product[]> {
  return this.http.get<product[]>('http://localhost:3000/products?_limit=8').pipe(
    map(products => {
      return products.map(product => {
        const discount = product.price * 0.1; // Example discount calculation (10% off)
        return {
          ...product,
          discount
        };
      });
    })
  );
}*/
//}

// import { EventEmitter, Injectable } from '@angular/core';
// import { cart, order, product } from '../data-type';
// import { Observable } from 'rxjs';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   cartData = new EventEmitter<product[] | []>();

//   constructor(private http: HttpClient, private authService: AuthService) { }

//   private getAuthHeaders(): HttpHeaders {
//     const token = this.authService.getToken();
//     if (token) {
//       return new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     }
//     return new HttpHeaders();
//   }
//   // getProducts(userId: string) {
//   //   const headers = this.getAuthHeaders();
//   //   return this.http.get(`${this.apiUrl}/products?userId=${userId}`, { headers });
//   // }
//   addProduct(data: product) {
//     const headers = this.getAuthHeaders();
//     return this.http.post('http://localhost:3000/products', data, { headers });
//   }

//   productList() {
//     return this.http.get<product[]>('http://localhost:3000/products');
//   }

//   deleteProduct(id: number) {
//     const headers = this.getAuthHeaders();
//     return this.http.delete(`http://localhost:3000/products/${id}`, { headers });
//   }

//   getProduct(id: string) {
//     return this.http.get<product>(`http://localhost:3000/products/${id}`);
//   }

//   updateProduct(product: product) {
//     const headers = this.getAuthHeaders();
//     return this.http.put<product>(`http://localhost:3000/products/${product.id}`, product, { headers });
//   }

//   popularProducts() {
//     return this.http.get<product[]>("http://localhost:3000/products?_limit=3");
//   }

//   searchProduct(query: string) {
//     return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
//   }

//   localAddToCart(data: product) {
//     let cartData = [];
//     let localCart = localStorage.getItem('localCart');
//     if (!localCart) {
//       localStorage.setItem('localCart', JSON.stringify([data]));
//       this.cartData.emit([data]);
//     } else {
//       cartData = JSON.parse(localCart);
//       cartData.push(data);
//       localStorage.setItem('localCart', JSON.stringify(cartData));
//       this.cartData.emit(cartData);
//     }
//   }

//   removeItemFromCart(productId: number) {
//     let cartData = localStorage.getItem('localCart');
//     if (cartData) {
//       let items: product[] = JSON.parse(cartData);
//       items = items.filter((item: product) => productId !== item.id);
//       localStorage.setItem('localCart', JSON.stringify(items));
//       this.cartData.emit(items);
//     }
//   }

//   addToCart(cartData: cart) {
//     const headers = this.getAuthHeaders();
//     return this.http.post('http://localhost:3000/cart', cartData, { headers });
//   }

//   getCartList(userId: number) {
//     return this.http.get<product[]>('http://localhost:3000/cart?userId=' + userId).subscribe((result) => {
//       this.cartData.emit(result);
//     });
//   }

//   removeToCart(cartId: number) {
//     const headers = this.getAuthHeaders();
//     return this.http.delete('http://localhost:3000/cart/' + cartId, { headers });
//   }

//   currentCart() {
//     const userId = this.authService.getIdFromToken();
//     if (userId) {
//       return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userId, { headers: this.getAuthHeaders() });
//     }
//     return null;
//   }

//   orderNow(data: order) {
//     const headers = this.getAuthHeaders();
//     return this.http.post('http://localhost:3000/orders', data, { headers });
//   }

//   orderList() {
//     const userId = this.authService.getIdFromToken();
//     if (userId) {
//       return this.http.get<order[]>('http://localhost:3000/orders?userId=' + userId, { headers: this.getAuthHeaders() });
//     }
//     return null;
//   }

//   deleteCartItems(cartId: number) {
//     const headers = this.getAuthHeaders();
//     return this.http.delete('http://localhost:3000/cart/' + cartId, { headers }).subscribe((result) => {
//       this.cartData.emit([]);
//     });
//   }

//   cancelOrder(orderId: number) {
//     const headers = this.getAuthHeaders();
//     return this.http.delete('http://localhost:3000/orders/' + orderId, { headers });
//   }

//   trendyProducts(): Observable<product[]> {
//     return this.http.get<product[]>('http://localhost:3000/products?_limit=8').pipe(
//       map(products => {
//         return products.map(product => {
//           const discount = product.price * 0.1; // Example discount calculation (10% off)
//           return {
//             ...product,
//             discount
//           };
//         });
//       })
//     );
//   }
// }
