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
  constructor(private servicio: ServicioService){
 
  }

  async editarVideo(){
    
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

