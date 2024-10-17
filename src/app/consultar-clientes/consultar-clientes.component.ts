import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-consultar-clientes',
  standalone: true,
  imports: [
    CommonModule, //módulo de funções básicas do Angular
    NgxMaskDirective, //adicionando a biblioteca de máscara
    NgxMaskPipe, //exibir dados na página com máscara
    NgxPaginationModule, //adicionando a biblioteca de paginação
    RouterLink //biblioteca para navegação de rotas
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './consultar-clientes.component.html',
  styleUrl: './consultar-clientes.component.css'
})
export class ConsultarClientesComponent {

  //atributos
  clientes: any[] = []; //array (vetor) para aramzenar os clientes obtidos
  paginador: number = 1; //auxiliar na paginação dos dados da consulta
  mensagem: string = ''; //exibir a resposta obtida da API na exclusão

  //método construtor
  constructor(
    private httpClient: HttpClient
  ) {}

  //função do angular executada sempre que o componente
  //é carregado no navegador, ou seja, quando a página é aberta
  ngOnInit() {

    //fazendo uma requisição GET para consultar os clientes na API
    this.httpClient.get('http://localhost:8080/api/clientes')
      .subscribe({ //capturando o retorno da consulta
        next: (resposta) => {
          this.clientes = resposta as any[]; //guardando os dados obtidos
        }
      });
  }  

  //função para ser executada no momento em que clicarmos no botão de exclusão
  excluirCliente(id: string) {

    if(confirm('Deseja realmente excluir o cliente selecionado?')) {

      this.httpClient.delete('http://localhost:8080/api/clientes/' + id, 
        { responseType: 'text' })
        .subscribe({
          next: (resposta) => {
            this.mensagem = resposta; //exibindo mensagem
            this.ngOnInit(); //executar a consulta novamente
          }
        });
    }
  }

  //função para avançar e voltar na paginação
  handlePageChange(event: any) {
    this.paginador = event;
  }

}
