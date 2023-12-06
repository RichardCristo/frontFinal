import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SubirVideoComponent } from './subir-video/subir-video.component';
import { LogOutComponent } from './log-out/log-out.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EditarVideosComponent } from './editar-videos/editar-videos.component';
import { BorrarVideosComponent } from './borrar-videos/borrar-videos.component';

const routes: Routes = [
  {
    path: "register",
    component: RegisterComponent,
    title: "register"
  },
  {
    path: "login",
    component: LoginComponent,
    title: "login"
  },
  {
    path: "home",
    component: HomeComponent,
    title: "home"
  },
  {
    path: "subirVideo",
    component: SubirVideoComponent,
    title: "subirVideo"
  },
  {
    path: "logOut",
    component: LogOutComponent,
    title: "logout"
  },
  {
    path: "perfil",
    component: PerfilComponent,
    title: "perfil"
  },
  {
    path: "editarVideos",
    component: EditarVideosComponent,
    title: "editarVideos"
  },
  {
    path: "borrarVideos",
    component: BorrarVideosComponent,
    title: "borrarVideos"
  },
  {
    path: "**",
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
