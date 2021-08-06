import { Livro } from './../livro.model';
import { LivroService } from "./../livro.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-livro-create",
  templateUrl: "./livro-create.component.html",
  styleUrls: ["./livro-create.component.css"],
})
export class LivroCreateComponent implements OnInit {
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
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Livro adicionado com sucesso');
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Erro ao criar novo livro. Tente mais tarde!');
    });
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
