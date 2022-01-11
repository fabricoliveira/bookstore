import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: "app-livro-read-all",
  templateUrl: "./livro-read-all.component.html",
  styleUrls: ["./livro-read-all.component.css"],
})
export class LivroReadAllComponent implements OnInit {
  
  idCategoria: string = '';
  livros: Livro[] = [];
  displayedColumns: string[] = ["id", "titulo", "livros", "acoes"];

  constructor(private livroService: LivroService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.idCategoria = this.route.snapshot.paramMap.get("id_categoria")!;
    this.findAllByCategoria();
  }

  navegarParaCriarLivro() {
    this.idCategoria = this.route.snapshot.paramMap.get('id_categoria')!;
    this.router.navigate([`categorias/${this.idCategoria}/livros/create`]);
  }

  voltar(): void {
    this.router.navigate([`categorias`]);
  }

  findAllByCategoria(): void {
    this.livroService.findAllByCategoria(this.idCategoria!).subscribe((response) => {
        this.livros = response;
      });
  }
}
