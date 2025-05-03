import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { BienvenidosComponent } from './componentes/bienvenidos/bienvenidos.component';
import { ErrorComponent } from './componentes/error/error.component';
import { PersonasComponent } from './componentes/personas/personas.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
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
        path: 'personas',
        component: PersonasComponent,
        children: [
            {   // Ruta hija, se puede acceder a ella desde /personas/detalle
                // o /personas/detalle/:nombre
                // El nombre es un parametro obligatorio
                // si se quita el nombre se agregar el parametro como opcional
                // /personas/detalle?nombre=Juan
                path: 'detalle/:nombre',
                component: DetalleComponent
            },
        ]
    },
    {
        path: '**',
        component: ErrorComponent
    },
];
