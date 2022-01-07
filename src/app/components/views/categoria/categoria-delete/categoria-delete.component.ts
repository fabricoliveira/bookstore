import { CategoriaService } from './../categoria.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria.model';

@Component({
  selector: "app-categoria-delete",
  templateUrl: "./categoria-delete.component.html",
  styleUrls: ["./categoria-delete.component.css"],
})
export class CategoriaDeleteComponent implements OnInit {
  
  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(private categoriaService: CategoriaService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }
  
  findById(): void {
    this.categoriaService.findById(this.categoria.id!).subscribe((response) => {
      this.categoria = response;
    });
  }

  deletar(): void {
    this.categoriaService.delete(this.categoria.id!).subscribe((response) => {
      this.router.navigate(['categorias']);
      this.categoriaService.mensagem("Categoria deletada com sucesso!");
    }, err => {
      this.categoriaService.mensagem(err.error.error);
    });
  }

  cancelar(): void {
    this.router.navigate(['categorias']);
  }
}
