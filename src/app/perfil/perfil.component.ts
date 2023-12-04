import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})



export class PerfilComponent {
  usuario: any
  datosUsuario : any
  videosPublicados: Array<String> = []

  constructor(private servicio: ServicioService){
   
  }

  ngOnInit(){
    this.usuario = localStorage.getItem("usuario")

    this.servicio.getVideos().subscribe({
      next:(data: any) => {
        data.forEach((element: any) => {
         if(element.publicador == this.usuario){
          this.videosPublicados.push(element.titulo)
         } 
        });
      }
    })

    this.servicio.getUsuario(this.usuario).subscribe({
      next: (data: any) => {
        this.datosUsuario = data.usuario
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
