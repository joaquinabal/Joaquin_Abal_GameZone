import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { BienvenidosComponent } from './componentes/bienvenidos/bienvenidos.component';
import { ErrorComponent } from './componentes/error/error.component';
import { RegisterComponent } from './componentes/register/register.component';
import { QuienSoyComponent } from './componentes/quiensoy/quiensoy.component';
import { RankingComponent } from './componentes/ranking/ranking.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';


export const routes: Routes = [


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
        path: 'encuesta',
        component: EncuestaComponent
    },
    {
        path: 'ranking',
        component: RankingComponent
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
        path:'juegos',
    loadChildren: () =>
    import('./componentes/juegos/juegos/juegos.module').then(m => m.JuegosModule)
  },
    {
        path: '**',
        component: ErrorComponent
    },
];
