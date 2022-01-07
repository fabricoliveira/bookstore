import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {

  categoria: Categoria = {
    nome: '',
    descricao: ''
  }

  constructor(private categoriaService: CategoriaService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.categoriaService.create(this.categoria).subscribe((resposta) => {
      this.categoriaService.mensagem('Categoria criada com sucesso!');
      this.router.navigate(['categorias']);
    }, err => {
      let errorMessage: string = '';
      for (let i = 0; i < err.error.fieldErrors.length; i++) {
        errorMessage += err.error.fieldErrors[i].message + '\n\n';
      }
      this.categoriaService.mensagem(errorMessage);
    });
  }

  cancelar(): void {
    this.router.navigate(['categorias']);
  }

}
