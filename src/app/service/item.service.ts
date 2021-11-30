import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  public url = 'http://3.128.201.25:9090/api/items';
  constructor(public http: HttpClient) {}

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
