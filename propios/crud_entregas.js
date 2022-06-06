let idEliminar;
let idActualizar;

function actionCreate() {
    let tipo_entrega = document.getElementById("tipo_entrega").value;
    //alert(tipo_entrega);
    let Botones = "";
    let fecha;

    $.ajax({
        method:"POST",
        url: "propios/crud_entregas.php",
        //JSON
        data: {
          tipo_entrega: tipo_entrega,
          accion : "create"
        },
        success: function( respuesta ) {
          JSONRespuesta = JSON.parse(respuesta);
          //alert(respuesta);

          if (JSONRespuesta.estado == 1){
            Botones = '<button type="button" class="btn btn-info btn-lg text-white" data-toggle="modal" data-target="#Modal_Ver"> Ver</button>';
            Botones += '<button type="button" class="btn btn-primary btn-lg text-white" data-toggle="modal" data-target="#Modal_Actualizar">Edit </button>';
            Botones += '<button type="button" class="btn btn-danger btn-lg text-white" data-toggle="modal" data-target="#Modal-Eliminar" onclick="identificarEliminar('+JSONRespuesta.id+')" href="#">Del</button>';

            tabla = $("#zero_config").DataTable();
            tabla.row.add([tipo_entrega, JSONRespuesta.fecha_entrega, Botones]).draw().node().id="renglon_"+JSONRespuesta.id;
            //alert("Tipo de entrega: "+JSONRespuesta.tipo_entrega);
            //alert("Id: "+JSONRespuesta.id);
            //alert("Estado del JSON: "+ JSONRespuesta.estado);            
          }
          //console.log(respuesta);
        },
    });
    //alert(respuesta);
    //alert(JSONRespuesta);
}



function actionRead() {
    //alert("Funcionando");
    $.ajax({
      method:"POST",
      url: "propios/crud_entregas.php",
      data: {
        accion : "read"
      },
      success: function( respuesta ) {
        JSONRespuesta = JSON.parse(respuesta);
        
        if (JSONRespuesta.estado == 1) {
          //Mostrar los registros (categorias) en la tabla
          tabla = $("#zero_config").DataTable();            
          JSONRespuesta.entregas.forEach(entrega => {    
            let Botones = '<button type="button" class="btn btn-info btn-lg text-white" data-toggle="modal" data-target="#Modal_Ver"> Ver</button>';
            Botones += '<button type="button" class="btn btn-primary btn-lg text-white" data-toggle="modal" data-target="#Modal_Actualizar">Edit </button>';
            Botones += '<button type="button" class="btn btn-danger btn-lg text-white" data-toggle="modal" data-target="#Modal-Eliminar" onclick="identificarEliminar('+entrega.id+')" href="#">Del</button>';
            tabla.row.add([entrega.nombre_entrega,entrega.fecha_entrega,Botones]).draw().node().id="renglon_"+entrega.id;
          });

        }
        //console.log(respuesta);
        //alert("Respuesta del servidor: "+respuesta);
      },
  });
}

function actionUpdate() {
    
}

function identificarEliminar(id) {
  alert("EL elemento a elimnar es "+id);
  idEliminar = id;
}

function actionDelete() {
  
  $.ajax({
    method:"POST",
    url: "propios/crud_entregas.php",
    data: {
      id: idEliminar,
      accion : "delete"
    },
    success: function( respuesta ) {
      alert(idEliminar);
      JSONRespuesta = JSON.parse(respuesta);
      alert("Respuesta del servidor: "+respuesta);
      if (JSONRespuesta.estado == 1) {
        let tabla = $("#zero_config").DataTable();
        //Eliminar un renglon del DataTable
        tabla.row("#renglon_"+idEliminar).remove().draw();
      }else{
      }
    },
  });
}
