import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: "app-livro-create",
  templateUrl: "./livro-create.component.html",
  styleUrls: ["./livro-create.component.css"],
})
export class LivroCreateComponent implements OnInit {
  idCategoria: string = "";

  titulo = new FormControl("", [Validators.minLength(3)]);
  nomeAutor = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(10)]);

  livro: Livro = {
    titulo: '',
    nomeAutor: '',
    texto: ''
  }

  constructor(
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idCategoria = this.route.snapshot.paramMap.get("id_categoria")!;
  }

  getMessage() {
    if (this.titulo.invalid) {
      return "O campo TITULO deve conter entre 3 e 100 caracteres";
    }
    if (this.nomeAutor.invalid) {
      return "O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres";
    }
    if (this.texto.invalid) {
      return "O campo TEXTO deve conter entre 10 e 2.000.000 caracteres";
    }
    return false;
  }

  create(): void {
    this.livroService.create(this.idCategoria, this.livro).subscribe(
      (response) => {
        this.router.navigate([`categorias/${this.idCategoria}/livros`]);
        this.livroService.mensagem("Livro criado com sucesso!");
      },
      (err) => {
        this.router.navigate([`categorias/${this.idCategoria}/livros`]);
        this.livroService.mensagem("Erro ao criar o novo livro, tente novamente mais tarde!");
      }
    );
  }

  cancelar(): void {
    this.router.navigate([`categorias/${this.idCategoria}/livros`]);
  }
}
