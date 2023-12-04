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

  constructor(private servicio: ServicioService){
 
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
