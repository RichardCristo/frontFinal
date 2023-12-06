import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-videos',
  templateUrl: './editar-videos.component.html',
  styleUrls: ['./editar-videos.component.css']
})
export class EditarVideosComponent {
  nuevoTitulo: string =""
  nuevasEtiquetas: string ="" 
  verTabla: boolean=false
  titulo!: string
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

  async editarVideo(){
    
    console.log(this.titulo)
    
    if(!this.nuevasEtiquetas || !this.nuevoTitulo ){
      alert("Por favor rellene los campos")
      return
    }

    let etiquetasArray = this.nuevasEtiquetas.split(',');

    const data = {
      titulo: this.nuevoTitulo,
      etiquetas : etiquetasArray
    }

    let video : any
    await this.servicio.getUnVideo(this.titulo).subscribe(
      (response: any) => {
        video = response[0]
        if(video.publicador == localStorage.getItem("usuario")){
          this.servicio.editarVideo(this.titulo, data).subscribe(
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

