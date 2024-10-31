import { Routes } from '@angular/router';
import { CadastrarClientesComponent } from './cadastrar-clientes/cadastrar-clientes.component';
import { ConsultarClientesComponent } from './consultar-clientes/consultar-clientes.component';
import { EditarClientesComponent } from './editar-clientes/editar-clientes.component';
import { AutenticarUsuarioComponent } from './autenticar-usuario/autenticar-usuario.component';
import { CriarUsuarioComponent } from './criar-usuario/criar-usuario.component';

export const routes: Routes = [
    {
        path: 'app/autenticar-usuario',
        component: AutenticarUsuarioComponent
    },
    {
        path: 'app/criar-usuario',
        component: CriarUsuarioComponent
    },
    {
        path: 'app/cadastrar-clientes',
        component: CadastrarClientesComponent
    },
    {
        path: 'app/consultar-clientes',
        component: ConsultarClientesComponent
    },
    {
        path: 'app/editar-clientes/:id',
        component: EditarClientesComponent
    },
    {
        path: '', pathMatch: 'full', //página inicial do projeto
        redirectTo: '/app/autenticar-usuario'
    }
];
