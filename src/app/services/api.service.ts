import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://localhost:7058/api/User/';
  constructor(private http: HttpClient) {}
  private apiUrl='http://localhost:3000/';
  getUsers() {
    return this.http.get<any>(this.baseUrl);
  }
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    if(!token){console.warn("no data in localstroage");
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getProducts(userId: string) {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/products?userId=${userId}`, { headers });
  }

  addProduct(product: any, userId: string) {
    const headers = this.getAuthHeaders();
    const body = { ...product, userId };
    return this.http.post(`${this.apiUrl}/products`, body, { headers });
  }

}
