// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../services/product.service';
// import { product } from '../data-type';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   popularProducts: product[] = [];
//   trendyProducts: product[] = [];
//   randomImages: any[] = [];
//   remainingTime: number = 86400; // Set the initial countdown time to 1 day (in seconds)
//   discountedProduct: product | undefined;
//   popularDiscount: number = 10; // Assign the appropriate discount value

//   constructor(private productService: ProductService) {}

//   ngOnInit(): void {
//     this.productService.popularProducts().subscribe((data: product[]) => {
//       this.popularProducts = data;
//       this.setRandomImages();
//     });

//     this.productService.trendyProducts().subscribe((data: product[]) => {
//       this.trendyProducts = data;
//     });

//     // Start the countdown timer
//     this.startCountdownTimer();
//   }

//   setRandomImages(): void {
//     this.randomImages = [
//       {
//         image: 'https://static.vecteezy.com/system/resources/previews/004/996/812/original/summer-sale-web-banner-designs-and-special-offers-for-summer-holiday-store-shopping-promotion-vector.jpg',
//         name: ' “Snap! Crackle! Pop!”',
//         description: 'Summer sale, Flat 50% OFF, Hurry up before the stock ends'
//       },
//       {
//         image: 'https://hamercop.com/cdn/shop/files/x1_4_1400x.jpg?v=1663683899',
//         name: 'STYLE',
//         description: 'DRESS LIKE A BOSS'
//       },
//       {
//         image: 'https://hamercop.com/cdn/shop/files/z1_1_1400x.jpg?v=1663684294',
//         name: 'MENS WEAR',
//         description: 'POSE LIKE OFFICIALS'
//       },
//       {
//         image: 'https://hamercop.com/cdn/shop/files/2_4c644fe0-c122-41d0-8502-12e0d05ab9d7_1400x.jpg?v=1663656765',
//         name: 'PREMIUM',
//         description: 'FEEL THE FABRIC'
//       }
//     ];
//   }

//   startCountdownTimer(): void {
//     setInterval(() => {
//       if (this.remainingTime > 0) {
//         this.remainingTime--; // Decrement the remaining time by 1 second
//       }
//     }, 1000); // Run the interval every 1 second
//   }

//   getFormattedTime(): string {
//     const hours: number = Math.floor(this.remainingTime / 3600);
//     const minutes: number = Math.floor((this.remainingTime % 3600) / 60);
//     const seconds: number = this.remainingTime % 60;
//     return `${this.formatTimeUnit(hours)}:${this.formatTimeUnit(minutes)}:${this.formatTimeUnit(seconds)}`;
//   }

//   formatTimeUnit(unit: number): string {
//     return unit.toString().padStart(2, '0');
//   }

//   showProductDetails(product: product): void {
//     this.discountedProduct = product;
//   }

//   isDiscountExpired(): boolean {
//     // Implement your logic to check if the discount has expired
//     return false;
//   }

//   getRatingStars(rating: number): number[] {
//     return Array(Math.floor(rating)).fill(0);
//   }
//   isFrequentProduct(item: any): boolean {
//     // Assuming the 'item' object has a 'cartCount' property indicating the number of times it has been added to the cart
//     return item.cartCount >= 4 && item.cartCount <= 5;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts: product[] = [];
  trendyProducts: product[] = [];
  randomImages: any[] = [];
  remainingTime=environment.remainingTime //number = 86400; // Set the initial countdown time to 1 day (in seconds)
  discountedProduct: product | undefined;
  popularDiscount: number = 10; // Assign the appropriate discount value

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.popularProducts().subscribe((data: product[]) => {
      this.popularProducts = data;
      this.setRandomImages();
    });

    this.productService.trendyProducts().subscribe((data: product[]) => {
      this.trendyProducts = data;
    });

    // Start the countdown timer
    this.startCountdownTimer();
  }

  setRandomImages(): void {
    this.randomImages = [
      {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ7l2FsFt9HGz_3FLxxoi6aqxY2aHQakFovw&usqp=CAU',
        name: ' A GOOD FURNITURE GIVES A GOOD MIND',
        description: 'Summer sale, Flat 50% OFF, Hurry up before the stock ends'
      },
      {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlTIVTNvDogDfvd4RUkEu3XMIx4-r2PyLe4g&usqp=CAU',
        name: 'STYLISH FURNITURES',
        description: 'FURNITURE SETUP'
      },
      {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-rstrTezFF90QtVUPMs41AB2Nr6icdYTpuQ&usqp=CAU',
        name: 'STYLISH FURNITURES',
        description: 'FURNITURE SETUP'
      },
      {
        image: 'data:image/jpeg;base64,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',
        name: ' A GOOD FURNITURE GIVES A GOOD MIND',
        description: 'Summer sale, Flat 50% OFF, Hurry up before the stock ends'
      }
    ];
  }

  startCountdownTimer(): void {
    setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--; // Decrement the remaining time by 1 second
      }
    }, 1000); // Run the interval every 1 second
  }

  getFormattedTime(): string {
    const hours: number = Math.floor(this.remainingTime / 3600);
    const minutes: number = Math.floor((this.remainingTime % 3600) / 60);
    const seconds: number = this.remainingTime % 60;
    return `${this.formatTimeUnit(hours)}:${this.formatTimeUnit(minutes)}:${this.formatTimeUnit(seconds)}`;
  }

  formatTimeUnit(unit: number): string {
    return unit.toString().padStart(2, '0');
  }

  showProductDetails(product: product): void {
    this.discountedProduct = product;
  }

  isDiscountExpired(): boolean {
    // Implement your logic to check if the discount has expired
    return false;
  }

  getRatingStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
  isFrequentProduct(item: any): boolean {
    // Assuming the 'item' object has a 'cartCount' property indicating the number of times it has been added to the cart
    return item.cartCount >= 4 && item.cartCount <= 5;
  }
}
