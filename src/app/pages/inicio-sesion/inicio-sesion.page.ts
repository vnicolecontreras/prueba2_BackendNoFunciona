import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  formulario_login: FormGroup;

  constructor(
    private autenticacionS: AutenticacionService,
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) { 
    this.formulario_login = this.formBuilder.group({
      username : ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  iniciar(){
    // Se valida el formulario
    if(this.formulario_login.valid){
      
      // Se rescatan los datos del formulario Reactivo
      const { username, password } = this.formulario_login.value;

      // Se usa el servicio de autenticacion
      this.autenticacionS.iniciar_sesion(username, password).subscribe(
        (response) => {
          // Se guarda el token
          this.autenticacionS.guardar_token(response.accessToken);

          // Redirecciona a la pagina de productos
          this.navCtrl.navigateRoot('/productos')
        },
        (error) => {
          console.error("Usuario o contraseña incorrecta!")
        }
      )
    } else {
      console.error("Complete los campos, son obligatorios!")
    }
  }

}
