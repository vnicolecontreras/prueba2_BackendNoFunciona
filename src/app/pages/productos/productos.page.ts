import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/Interfaces/producto.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ProductoSService } from 'src/app/services/producto-s.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  // Lista Productos
  products: Product[] = []; 

  // Cantidad Cargada
  skip: number = 0; 

  // Total productos
  total: number = 0;

  constructor(
    // Servicio para obtener los productos de la API
    private productService: ProductoSService, 

    // Servicio de Aunteticacion para cerrar sesion
    private authService: AutenticacionService, 

    // Servicio de navegacion 
    private navCtrl: NavController 
  ) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    // Resetear productos y skip al volver a la página
    // Esto asegura que se carguen los datos desde 0
    this.products = [];
    this.skip = 0; // Resetea el contador de productos cargados
    this.cargar_productos(); // Carga la primera tanda de productos
  }

  cargar_productos(event?: any) {
    // Se obtienen los productos del servicio
    this.productService.obtener_productos_s(this.skip).subscribe(
      // Manejo de respuesta en caso de ser Exitoso
      (response) => {
        // Se añade los productos cargados despues a la lista
        this.products = [...this.products, ...response.products];
        this.total = response.total; // Tiene el total de productos
        this.skip += response.limit; // Trae productos segun un limite

        if (event) {
          event.target.complete();
        }

        // Desactivar Scroll
        if (this.products.length >= this.total && event && event.target) {
          event.target.disabled = true;
        }
      },
      // Manejo de errores
      (error) => {
        console.error('Error al cargar productos', error);
        if (event) {
          event.target.complete();
        }
      }
    );
  }

  cargar_mas_productos(event: any) {
    this.cargar_productos(event);
  }

  cerrar_sesion() {
    // Metodo de cerrar sesion del servicio
    this.authService.cerrar_sesion();
    // Redirigir al usuario a la página de login
    this.navCtrl.navigateRoot('/inicio-sesion'); 
  }

}
