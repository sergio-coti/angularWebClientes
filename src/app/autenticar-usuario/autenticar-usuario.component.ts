import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-autenticar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})
export class AutenticarUsuarioComponent {

  //construtor para injeção de dependência
  constructor(
    private httpClient: HttpClient
  ) {}

  //estrutura do formulário
  formulario = new FormGroup({
    email : new FormControl('', [Validators.required]),
    senha : new FormControl('', [Validators.required])
  });

  //função para capturar o SUBMIT do formulário
  autenticarUsuario() {

    //fazendo a requisição para a API
    this.httpClient.post( //chamada POST para o endpoint de autenticação
          'http://localhost:8081/api/usuarios/autenticar', //endereço da API 
          this.formulario.value, //enviando os dados do formulário
          { responseType : 'text' }) //definindo o tipo de resposta
        .subscribe({ //aguardando a resposta
            next: (data) => { //resposta de sucesso
              console.log(data);
            },
            error: (e) => { //resposta de erro
              console.log(e.error);
            }
        })
  }

}
