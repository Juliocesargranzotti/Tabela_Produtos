import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produtos } from './produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  url = "http://localhost:4200";
  static id: any;


getClients(): Observable<Produtos[]>{
  return this.http.get<Produtos[]>(this.url);

}

  update(value: any) {
    return this.http.put<Produtos>(`${this.url}/${ProdutosService.id}`, ProdutosService);
  }
  save(value: any) {
    return this.http.post<Produtos>(this.url, ProdutosService);
  }
  delete(client: Produtos) {
    return this.http.delete<void>(`${this.url}/${client.id}`);
  }

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Produtos[]> {
    let url = "http://localhost:3000/produtos";
    return this.http.get<Produtos[]>(url);
  }


}
