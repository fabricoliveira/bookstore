import { CategoriaService } from './../categoria.service';
import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categoria.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(private categoriaService: CategoriaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!;
    this.findBydId();
  }

  update(): void {
    this.categoriaService.update(this.categoria).subscribe((response) => {
      this.router.navigate(['categorias']);
      this.categoriaService.mensagem("Categoria atualizada com sucesso!");
    }, err => {
      let errorMessage: string = "";
      for (let i = 0; i < err.error.fieldErrors.length; i++) {
        errorMessage += err.error.fieldErrors[i].message + "\n\n";
      }
      this.categoriaService.mensagem(errorMessage);
    });
  }

  findBydId(): void {
    this.categoriaService.findById(this.categoria.id!).subscribe((response) => {
      this.categoria = response;
    });
  }

  cancelar(): void {
    this.router.navigate(['categorias']);
  }

}
