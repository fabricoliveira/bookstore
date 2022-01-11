import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: "app-livro-read",
  templateUrl: "./livro-read.component.html",
  styleUrls: ["./livro-read.component.css"],
})
export class LivroReadComponent implements OnInit {
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

  voltar(): void {
    this.router.navigate([`categorias/${this.idCategoria}/livros`]);
  }
}
