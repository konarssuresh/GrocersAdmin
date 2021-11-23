import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private url = 'http://localhost:9090/api/items';
  constructor(private http: HttpClient) {}

  getProducts = (): Observable<any> => {
    return this.http.get(`${this.url}/getItems`);
  };

  addProduct = (product: Object): Observable<any> => {
    return this.http.post(`${this.url}/addItem`, { ...product });
  };

  editProduct = (product: Object): Observable<any> => {
    return this.http.put(`${this.url}/updateItem`, { ...product });
  };

  deleteProduct = (product: Object): Observable<any> => {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        ...product,
      },
    };
    return this.http.delete(`${this.url}/deleteItem`, options);
  };
}
