let numero_revisor;
let idActualizar;
let idVer;


function actionRead() {
    //alert("Funcionando");
    $.ajax({
      method:"POST",
      url: "propios/crud_evaluaciones.php",
      data: {
        accion : "read"
      },
      success: function( respuesta ) {
        JSONRespuesta = JSON.parse(respuesta);
        //alert(respuesta);
        if (JSONRespuesta.estado == 1) {
          //Mostrar los registros (categorias) en la tabla
          tabla = $("#tabla_proyecto").DataTable();            
          JSONRespuesta.proyectos.forEach(proyecto => {    
            let Botones = '<button type="button" class="btn btn-info btn-lg text-white" data-toggle="modal" data-target="#Modal_ver" onclick="identificarVer('+proyecto.id+')"> Ver</button>';
            Botones += '<button type="button" class="btn btn-primary btn-lg text-white" data-toggle="modal" data-target="#Modal_editar" onclick="identificarActualizar('+proyecto.id+')">Edit </button>';
            Botones += '<button type="button" class="btn btn-danger btn-lg text-white" data-toggle="modal" data-target="#Modal-Eliminar"> Rechazar </button>';
            tabla.row.add([proyecto.nombre, proyecto.fecha, Botones]).draw().node().id="renglon_"+proyecto.id;

          });
        }
        //console.log(respuesta);
        //alert("Respuesta del servidor: "+respuesta);
      },
  });
}

function identificarActualizar(id) {
  $.ajax({
    method:"POST",
    url: "propios/crud_evaluaciones.php",
    data: {
      id : id,
      accion : "read_id"
    },
    success: function( respuesta ) {
      //alert(respuesta);
      tabla = $("#tabla_revisores").DataTable();          
      var myTable = document.getElementById("tabla_revisores"); 
      var rowCount = myTable.rows.length; 
      for (var x=rowCount-1; x>0; x--) { tabla.row().remove().draw(); }
      
      JSONRespuesta = JSON.parse(respuesta);
      if (JSONRespuesta.estado == 1) {

        tabla = $("#tabla_revisores").DataTable();          
        let Boton = '<button type="button" class="btn btn-danger btn-lg text-white" data-toggle="modal" data-target="#Modal2"> Eliminar </button>';
        if(JSONRespuesta.revisor1!=null){
            tabla.row.add([JSONRespuesta.revisor1,Boton]).draw().node().id="renglon_1";
            numero_revisor=1;
        }
        if(JSONRespuesta.revisor2!=null){
            tabla.row.add([JSONRespuesta.revisor2,Boton]).draw().node().id="renglon_2";
            numero_revisor=2;
        }
        if(JSONRespuesta.revisor3!=null){
            tabla.row.add([JSONRespuesta.revisor3,Boton]).draw().node().id="renglon_3";
            numero_revisor=3;
        }
        if(JSONRespuesta.revisor4!=null){
            tabla.row.add([JSONRespuesta.revisor4,Boton]).draw().node().id="renglon_4";
            numero_revisor=4;
        }
        if(JSONRespuesta.revisor5!=null){
            tabla.row.add([JSONRespuesta.revisor5,Boton]).draw().node().id="renglon_5";
            numero_revisor=5;
        }

        idActualizar = JSONRespuesta.id;
      //console.log(respuesta);
    }
    alert("Respuesta del servidor: "+respuesta+" numero de revisores "+numero_revisor);
  }
});
}


function agregarRevisor() {
  let nombre_revisor = document.getElementById("revisores").value;
  //alert(tipo_entrega);
  //let nombre_archivo = document.getElementById("archivo_nombre_actualizar").value;
  //alert(nombre_revisor);
  //alert(idActualizar);
  //alert(numero_revisor);

  let Boton = '<button type="button" class="btn btn-danger btn-lg text-white" data-toggle="modal" data-target="#Modal2"> Eliminar </button>';

  $.ajax({
    method:"POST",
    url: "propios/crud_evaluaciones.php",
    data: {
        id : idActualizar,
        nombre_revisor : nombre_revisor,
        numero_revisor : numero_revisor,
        accion : "agregar"
      },
    success: function( respuesta ) {
      //alert(respuesta);
      JSONRespuesta = JSON.parse(respuesta);
      
      if (JSONRespuesta.estado == 1) {
        alert(JSONRespuesta.mensaje);
        tabla = $("#tabla_revisores").DataTable();     
        tabla.row.add(nombre_revisor, Boton).draw().node().id="renglon_"+JSONRespuesta.numero_revisor;
        //location.reload();
        //toastr.success(JSONRespuesta.mensaje);
        alert("Respuesta del servidor: "+respuesta);
      //alert(respuesta);
      }
    }

  });
}

function identificarEliminar(id) {
    //alert("EL elemento a elimnar es "+id);
    idEliminar = id;
  }

function elimnarRevisor(){

    $.ajax({
    method:"POST",
    url: "propios/crud_evaluaciones.php",
    data: {
      id: idEliminar,
      accion : "delete"
    },
    success: function( respuesta ) {
      //alert(idEliminar);
      //alert("Respuesta del servidor: "+respuesta);
      JSONRespuesta = JSON.parse(respuesta);
      
      //alert(JSONRespuesta.nombre_archivo)
      if (JSONRespuesta.estado == 1) {
        let tabla = $("#zero_config").DataTable();
        //Eliminar un renglon del DataTable
        tabla.row("#renglon_"+idEliminar).remove().draw();
        toastr.success(JSONRespuesta.mensaje);
        alert(JSONRespuesta.mensaje);
      }else{
      }
    },
  });     
}

function actionDelete() {
  alert("Proyecto rechazado");
}

function identificarVer(id) {
  //alert("EL elemento a ver es "+id);
  idVer = id;
  actionVer();
}

function actionVer(){
  $.ajax({
    method:"POST",
    url: "propios/crud_evaluaciones.php",
    data: {
      id: idVer,
      accion : "ver"
    },
    success: function( respuesta ) {
      //alert(idEliminar);
      //alert("Respuesta del servidor: "+respuesta);
      JSONRespuesta = JSON.parse(respuesta);
      
      //alert(JSONRespuesta.nombre_archivo)
      if (JSONRespuesta.estado == 1) {
        let imagen = document.getElementById('imagen');
        //alert(iframe);
        imagen.src="http://localhost/ProyectoTDAW/pdfpropios/"+JSONRespuesta.proyecto_img;
        //toastr.success(JSONRespuesta.mensaje);
        //alert(JSONRespuesta.mensaje);
      }
    },
  });

}