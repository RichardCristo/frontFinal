import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-borrar-videos',
  templateUrl: './borrar-videos.component.html',
  styleUrls: ['./borrar-videos.component.css']
})
export class BorrarVideosComponent {
  verTabla: boolean=false
  texto: boolean=false
  titulo: string=""
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

  elegirVideo(tituloActual: any){
    this.titulo = tituloActual
    console.log(this.titulo)
  }

  a(){
    this.texto = true
  }

  async borrarVideo(){
    if(!this.titulo ){
      alert("Por favor rellene los campos")
      return
    }
    
    let video : any
    await this.servicio.getUnVideo(this.titulo).subscribe(
      (response: any) => {
        video = response[0]
        if(video.publicador == localStorage.getItem("usuario")){
          this.servicio.borrarVideo(this.titulo).subscribe(
            response => {
              console.log(response);
              this.verTabla = true;
            },
            error => {
              console.log(localStorage.getItem("token"))
              console.log(error);
            }
        )
        }
       }
      )
    }
}
