import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { BienvenidosComponent } from './componentes/bienvenidos/bienvenidos.component';
import { ErrorComponent } from './componentes/error/error.component';
import { RegisterComponent } from './componentes/register/register.component';
import { QuienSoyComponent } from './componentes/quiensoy/quiensoy.component';
import { MayorMenorComponent } from './componentes/mayoromenor/mayoromenor/mayoromenor.component';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcad/ahorcad.component';

export const routes: Routes = [
    {
  path: 'juegos',
  loadChildren: () => import('./componentes/juegos/juegos/juegos.module').then(m => m.JuegosModule)
},

    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'home',
        component: BienvenidosComponent
    },
    {
        path: 'quiensoy',
        component: QuienSoyComponent
        
    },
    {
        path: 'mayor-menor',
        component: MayorMenorComponent
    },
    {
        path: 'ahorcado',
        component: AhorcadoComponent
    },
    {
        path: '**',
        component: ErrorComponent
    },
];
