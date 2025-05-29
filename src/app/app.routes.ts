import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { BienvenidosComponent } from './componentes/bienvenidos/bienvenidos.component';
import { ErrorComponent } from './componentes/error/error.component';
import { RegisterComponent } from './componentes/register/register.component';
import { QuienSoyComponent } from './componentes/quiensoy/quiensoy.component';


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
    import('./componentes/juegos/juegos/juegos.routes').then(m => m.juegosRoutes)
  },
    {
        path: '**',
        component: ErrorComponent
    },
];
