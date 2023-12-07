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
  titulo: string = ""
  usuario: any
  datosUsuario : any
  videosPublicados: any
  etiquetas: any
  mostrarEtiquetas: any

  constructor(private servicio: ServicioService){
 
  }


  ngOnInit(){
    this.usuario = localStorage.getItem("usuario")

    this.servicio.videosDelUsuario(this.usuario).subscribe({
      next:(data: any) => {
        this.videosPublicados = JSON.parse(JSON.stringify(data))
      }
    })

    this.servicio.getUsuario(this.usuario).subscribe({
      next: (data: any) => {
        this.datosUsuario = data.usuario
        console.log(this.datosUsuario)
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
    
  }

  elegirVideo(tituloActual: any, etiquetasActual: any){
    this.titulo = tituloActual
    this.etiquetas = etiquetasActual
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

