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
            fecha = "00 de enero del 2000";

            tabla = $("#zero_config").DataTable();
            tabla.row.add([tipo_entrega, fecha, Botones]).draw().node().id="renglon_"+JSONRespuesta.id;
            alert("Tipo de entrega: "+JSONRespuesta.tipo_entrega);
            alert("Id: "+JSONRespuesta.id);
            alert("Estado del JSON: "+ JSONRespuesta.estado);            
          }
          //console.log(respuesta);
        },
    });
    //alert(respuesta);
    //alert(JSONRespuesta);
}



function actionRead() {
    alert("Funcionando");
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
          JSONRespuesta.categorias.forEach(categoria => {    
            let Descripcion = "";
            let Botones = '<button type="button" class="btn btn-info btn-lg text-white" data-toggle="modal" data-target="#Modal_Ver"> Ver</button>';
            Botones += '<button type="button" class="btn btn-primary btn-lg text-white" data-toggle="modal" data-target="#Modal_Actualizar">Edit </button>';
            Botones += '<button type="button" class="btn btn-danger btn-lg text-white" data-toggle="modal" data-target="#Modal-Eliminar" href="#">Del</button>';
            tabla.row.add([categoria.nombrecategoria, Descripcion, Botones]).draw().node();
          });

        }
        //console.log(respuesta);
        alert("Respuesta del servidor: "+respuesta);
      },
  });
}

function actionUpdate() {
    
}

function identificarEliminar(id) {
  alert("EL elemento a elimnar es "+id);
  idEliminar = id;
}

function actionDelete(id) {
  $.ajax({
    method:"POST",
    url: "propios/crud_entregas.php",
    data: {
      id: idEliminar,
      accion : "delete"
    },
    success: function( respuesta ) {
      JSONRespuesta = JSON.parse(respuesta);
      if (JSONRespuesta.estado == 1) {
        let tabla = $("#example1").DataTable();
        //Eliminar un renglon del DataTable
        tabla.row("#renglon_"+idEliminar).remove().draw();
      }else{
      }
    },
  });
}
