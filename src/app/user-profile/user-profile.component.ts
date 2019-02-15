import { Component, OnInit, ViewChild } from '@angular/core';
import {tipoinmueble} from "../model/tipoinmueble";
import { CrudUserProfileService } from './crud-user-profile-service';
import { ParkingDTO } from './parking-DTO';
import { ParkingRespDTO } from './parking-resp-DTO';
import { MatTableDataSource, MatPaginator } from '@angular/material';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  tiposimueble: tipoinmueble[] = [{id:1, descripcion: 'apartamento' },{id:2, descripcion: 'casa' },{id:3, descripcion: 'local' },];
  constructor(public crudUserProfileService: CrudUserProfileService, public parking:ParkingDTO , public prueba:ParkingRespDTO) { }
  
    @ViewChild(MatPaginator) paginator: MatPaginator;

     displayedColumns: string[] = ['idParking', 'fechaIngreso', 'fechaSalida', 'tarifa', 'idVigilante', 'numPlaca','cilindrajeVehiculo','tipoVehiculo','puesto','estado', 'accion'];
    // dataSource = ELEMENT_DATA;
   
    
    consultaSol: ParkingRespDTO[] = new Array<ParkingRespDTO>();
    dataSource = new MatTableDataSource<ParkingRespDTO>();

    listVehiculos: ParkingRespDTO[] = new Array<ParkingRespDTO>();

   
    
  ngOnInit() {
          
  }

  private enviarRegistro() {

      console.log("linea numero 26 :::: " + this.parking.cilindrajeDTO);
      console.log("linea numero 27 :::: " + this.parking.tipovehiculoDTO);
      console.log("linea numero 28 :::: " + this.parking.numPlacaDTO);

      var object = {
       // parking :  {
          numPlacaDTO : this.parking.numPlacaDTO,
          cilindrajeVehiculoDTO: this.parking.cilindrajeDTO,
          tipoVehiculoDTO : this.parking.tipovehiculoDTO
  
        //}
      }
      

     // console.log("linea numero 41 :::::::::: " + JSON.stringify(object))
     this.crudUserProfileService.post("/parking/ingreso", object).subscribe(
       (response: any) => {
       
         console.log("linea numero 24 :::::: " + JSON.stringify(response));
          //this.consultaSol =  <Array<ParkingRespDTO>> response;
          this.consultaSol.push(response);
          
        console.log("linea numero 24 :::::: " + response.idParking);
        // this.consultaSol[0].idParking = response.idParking;
         console.log("linea numero 58 :::: " + JSON.stringify(this.consultaSol[0]))
         this.dataSource = new MatTableDataSource<ParkingRespDTO>(this.consultaSol);
         

         this.dataSource.paginator = this.paginator;
       }
     )
  }

  private registroSalida(salida : any) {

    

    var object = {
          //parking :  {
              "idParkingDTO": salida.idParkingDTO,
              "fechaIngresoDTO": salida.fechaIngresoDTO,
              "fechaSalidaDTO": salida.fechaSalidaDTO,
              "tarifaDTO": salida.tarifaDTO,
              "idVigilanteDTO": salida.idVigilanteDTO,
              "numPlacaDTO": salida.numPlacaDTO,
              "cilindrajeVehiculoDTO": salida.cilindrajeVehiculoDTO,
              "tipoVehiculoDTO": salida.tipoVehiculoDTO,
              "puestoDTO": salida.puestoDTO,
              "estadoDTO": salida.estadoDTO

      //}
    }

 // console.log("linea numero 41 :::::::::: " + JSON.stringify(object))
 this.crudUserProfileService.post("/parking/salida", object).subscribe(
  (response: any) => {
  
    console.log("linea numero 24 :::::: " + JSON.stringify(response));
     //this.consultaSol =  <Array<ParkingRespDTO>> response;
     this.consultaSol.push(response);
     
   console.log("linea numero 24 :::::: " + response.idParking);
   // this.consultaSol[0].idParking = response.idParking;
    console.log("linea numero 100 :::: " + JSON.stringify(this.consultaSol[0]))
    this.dataSource = new MatTableDataSource<ParkingRespDTO>(this.consultaSol);
    

    this.dataSource.paginator = this.paginator;
  }
)

   

  }


  public  registrarSalida(ObjSalida: any) {
    
  
      var count = 0;
      console.log("linea numero 134 :::::::::")
      this.consultaSol.forEach((valor,item) => {

        if(valor.idParkingDTO === ObjSalida.idParkingDTO) {
          this.consultaSol.splice( count, 1);
         
         count --;
        }

        count ++;
        
        this.dataSource = new MatTableDataSource<ParkingRespDTO>(this.consultaSol);  

      }) 

      this.registroSalida(ObjSalida);


  }
  

}
