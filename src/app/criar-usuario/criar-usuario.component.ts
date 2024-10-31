import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {

  //construtor para injeção de dependência
  constructor(
    private httpClient: HttpClient
  ) {}

  //estrutura do formulário
  formulario = new FormGroup({
    nome : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required]),
    senha : new FormControl('', [Validators.required])
  });

  //função para capturar o SUBMIT do formulário
  criarUsuario() {

    this.httpClient.post(
      'http://localhost:8081/api/usuarios/criar', //endereço do endpoint
      this.formulario.value, //dados enviados
      { responseType : 'text' } //capturando a resposta
    ).subscribe({ //aguardando o retorno da API
      next: (data) => { //capturando resposta de sucesso
        console.log(data);
      },
      error: (e) => { //capturando resposta de erro
        console.log(e.error);
      }
    })
  }

}
