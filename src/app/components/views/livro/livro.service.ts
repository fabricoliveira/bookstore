import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findAllByCategoria(id_categoria: string): Observable<Livro[]> {
    const url = `${this.baseUrl}/livros?categoria=${id_categoria}`;
    return this.http.get<Livro[]>(url);
  }
}
