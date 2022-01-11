import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livro } from './livro.model';

@Injectable({
  providedIn: "root",
})
export class LivroService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  findAllByCategoria(id_categoria: string): Observable<Livro[]> {
    const url = `${this.baseUrl}/livros?categoria=${id_categoria}`;
    return this.http.get<Livro[]>(url);
  }

  create(idCategoria: string, livro: Livro): Observable<Livro> {
    const url = `${this.baseUrl}/livros?categoria=${idCategoria}`;
    return this.http.post<Livro>(url, livro);
  }

  mensagem(str: string): void {
    this._snack.open(`${str}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 15000,
      panelClass: "snack-bar-class",
    });
  }
}
