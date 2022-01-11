import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: "app-livro-update",
  templateUrl: "./livro-update.component.html",
  styleUrls: ["./livro-update.component.css"],
})
export class LivroUpdateComponent implements OnInit {
  idCategoria: string = "";

  livro: Livro = {
    id: "",
    titulo: "",
    nomeAutor: "",
    texto: "",
  };

  titulo = new FormControl("", [Validators.minLength(3)]);
  nomeAutor = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(10)]);

  constructor(
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idCategoria = this.route.snapshot.paramMap.get("id_categoria")!;
    this.livro.id = this.route.snapshot.paramMap.get("id_livro")!;
    this.findById();
  }

  findById(): void {
    this.livroService.findById(this.livro.id!).subscribe((response) => {
      this.livro = response;
    });
  }

  update(): void {
    this.livroService.update(this.livro).subscribe((response) => {
        this.router.navigate([`categorias/${this.idCategoria}/livros`]);
        this.livroService.mensagem("Livro atualizado com sucesso!");
      },
      (err) => {
        this.router.navigate([`categorias/${this.idCategoria}/livros`]);
        this.livroService.mensagem(
          "Erro ao atualizar o livro, tente novamente mais tarde!"
        );
      }
    );
  }

  cancelar(): void {
    this.router.navigate([`categorias/${this.idCategoria}/livros`]);
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
}
