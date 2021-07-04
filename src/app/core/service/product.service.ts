import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../domain/entities/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productURL = 'http://localhost:8080/product/';

  constructor(private httpClient: HttpClient) {}

  public findAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.baseEndpoint + 'product/list');
  }

  public detail(id: number): Observable<Product> {
    return this.httpClient.get<Product>(
      environment.baseEndpoint + `product/detail/${id}`
    );
  }

  public detailName(name: string): Observable<Product> {
    return this.httpClient.get<Product>(
      environment.baseEndpoint + `product/detail/${name}`
    );
  }

  public save(product: Product): Observable<any> {
    return this.httpClient.post<any>(
      environment.baseEndpoint + 'product/create',
      product
    );
  }

  public update(id: number, product: Product): Observable<any> {
    return this.httpClient.put<any>(
      environment.baseEndpoint + `product/update/${id}`,
      product
    );
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      environment.baseEndpoint + `product/delete/${id}`
    );
  }
}
