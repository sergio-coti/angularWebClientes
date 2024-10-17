import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cadastrar-clientes',
  standalone: true,
  imports: [
    CommonModule, //bilbioteca de funções básicas do angular
    FormsModule, //biblioteca para construção de formulários
    ReactiveFormsModule, //biblioteca para construção de formulários
    NgxMaskDirective //biblioteca de máscara de campos
  ],
  providers: [
    provideNgxMask() //habilitar a biblioteca de máscara
  ],
  templateUrl: './cadastrar-clientes.component.html',
  styleUrl: './cadastrar-clientes.component.css'
})
export class CadastrarClientesComponent {

  //atributos
  mensagem: string = '';

  //declarar e inicializar a biblioteca HttpClient
  constructor(
    private httpClient: HttpClient
  ) {}

  //criando um objeto para capturar os campos do formulário
  formulario = new FormGroup({
    nome : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required]),
    telefone : new FormControl('', [Validators.required])
  });

  //função executada no SUBMIT do formulário
  cadastrarCliente() {
    
    //fazendo uma requisição POST para o ENDPOINT de cadastro de clientes
    this.httpClient.post(
        'http://localhost:8080/api/clientes', //endereço da API
        this.formulario.value, //dados do formulário
        { responseType: 'text' } //a API irá retornar uma resposta em texto
      )
      .subscribe({ //capturar a resposta obtida da API
        next: (resposta) => {
          //guardar o valor da resposta obtida da API
          this.mensagem = resposta;
          //limpar os campos do formulário
          this.formulario.reset();
        }
      })
  }

}
