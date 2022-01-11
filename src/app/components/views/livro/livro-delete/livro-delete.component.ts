import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: "app-livro-delete",
  templateUrl: "./livro-delete.component.html",
  styleUrls: ["./livro-delete.component.css"],
})
export class LivroDeleteComponent implements OnInit {
  idCategoria: string = "";

  livro: Livro = {
    id: "",
    titulo: "",
    nomeAutor: "",
    texto: "",
  };

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

  deletar(): void {
    this.livroService.deletar(this.livro.id!).subscribe((response) => {
        this.router.navigate([`categorias/${this.idCategoria}/livros`]);
        this.livroService.mensagem("Livro deletado com sucesso!");
      }, (err) => {
        this.router.navigate([`categorias/${this.idCategoria}/livros`]);
        this.livroService.mensagem("Erro ao atualizar o livro, tente novamente mais tarde!");
      }
    );
  }

  cancelar(): void {
    this.router.navigate([`categorias/${this.idCategoria}/livros`]);
  }
}
