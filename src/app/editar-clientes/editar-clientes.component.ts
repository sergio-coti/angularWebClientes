import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-editar-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './editar-clientes.component.html',
  styleUrl: './editar-clientes.component.css'
})
export class EditarClientesComponent {

  //atributos
  mensagem: string = '';
  id: string = '';

  //construtor
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {    
  }

  //evento executado no momento em que a página é carregada
  ngOnInit() {
    
    //capturar o id enviado na URL da rota
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    //consultar os dados do cliente na API através do id
    this.httpClient.get('http://localhost:8080/api/clientes/' + this.id)
      .subscribe({
        next: (dados) => {
          //preenchendo o formulário com os dados do cliente
          this.formulario.patchValue(dados);
        }
      })
  }

  //formulário
  formulario = new FormGroup({
    nome : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required]),
    telefone : new FormControl('', [Validators.required])
  });

  //função para atualizar os dados do cliente
  atualizarCliente() {

    this.httpClient.put('http://localhost:8080/api/clientes/' + this.id, 
      this.formulario.value, 
      { responseType: 'text' }
    ).subscribe({
        next: (resposta) => {
          this.mensagem = resposta;
        }
      })
  }

}
