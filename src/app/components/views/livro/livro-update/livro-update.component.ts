import { Livro } from './../livro.model';
import { LivroService } from './../livro.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  titulo = new FormControl("", [Validators.min(3)]);
  nomeAutor = new FormControl("", [Validators.min(3)]);
  texto = new FormControl("", [Validators.min(10)]);

  id_cat: String = ''
  
  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }

  constructor(
    private service: LivroService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!
    this.livro.id = this.route.snapshot.paramMap.get("id")!
    
    this.findById();
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta;
    })
  }

  update(): void {
    this.service.update(this.livro).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Livro atualizado com sucesso')
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Erro ao atualizar livro. Teste mais tarde!')
    })
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  getMessage() {
    if (this.titulo.invalid) {
      return "O campo Titulo deve conter entre 3 e 100 caracteres";
    }
    if (this.nomeAutor.invalid) {
      return "O campo Nome do Autor deve conter entre 3 e 50 caracteres";
    }
    if (this.texto.invalid) {
      return "O campo Texto deve conter entre 3 e 1000000 caracteres";
    }
    return false;
  }

}
