let idEliminar;
let idActualizar;
let idVer;


function actionCreate() {
    let tipo_entrega = document.getElementById("tipo_entrega").value;
    //alert(tipo_entrega);
    var formData = new FormData();
    var files = $('#archivo_subir')[0].files[0];
    //alert(files);
    formData.append('file',files);
    formData.append('tipo_entrega',tipo_entrega);
    formData.append('accion','create');

    let Botones = "";
    let fecha;

    $.ajax({
        method:"POST",
        url: "propios/crud_entregas.php",
        //JSON
        data: formData,
        contentType: false,
        processData: false,
        success: function( respuesta ) {
          //alert(respuesta);
          JSONRespuesta = JSON.parse(respuesta);
          

          if (JSONRespuesta.estado == 1){
            Botones = '<button type="button" class="btn btn-info btn-lg text-white" data-toggle="modal" data-target="#Modal_Ver" onclick="identificarActualizar('+JSONRespuesta.id+')" > Ver</button>';
            Botones += '<button type="button" class="btn btn-primary btn-lg text-white" data-toggle="modal" data-target="#Modal_Actualizar" onclick="identificarActualizar('+JSONRespuesta.id+')" href="#" >Edit </button>';
            Botones += '<button type="button" class="btn btn-danger btn-lg text-white" data-toggle="modal" data-target="#Modal-Eliminar" onclick="identificarEliminar('+JSONRespuesta.id+')" href="#">Del</button>';

            tabla = $("#zero_config").DataTable();
            tabla.row.add([tipo_entrega, JSONRespuesta.fecha_entrega, Botones]).draw().node().id="renglon_"+JSONRespuesta.id;
            //alert("Tipo de entrega: "+JSONRespuesta.tipo_entrega);
            //alert("Id: "+JSONRespuesta.id);
            //alert("Estado del JSON: "+ JSONRespuesta.estado);    
            toastr.success(JSONRespuesta.mensaje);
            alert(JSONRespuesta.mensaje);
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
            let Botones = '<button type="button" class="btn btn-info btn-lg text-white" data-toggle="modal" data-target="#Modal_Ver" onclick="identificarVer('+entrega.id+')"> Ver</button>';
            Botones += '<button type="button" class="btn btn-primary btn-lg text-white" data-toggle="modal" data-target="#Modal_Actualizar" onclick="identificarActualizar('+entrega.id+')" href="#">Edit </button>';
            Botones += '<button type="button" class="btn btn-danger btn-lg text-white" data-toggle="modal" data-target="#Modal-Eliminar" onclick="identificarEliminar('+entrega.id+')" href="#">Del</button>';
            tabla.row.add([entrega.nombre_entrega,entrega.fecha_entrega,Botones]).draw().node().id="renglon_"+entrega.id;

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
    url: "propios/crud_entregas.php",
    data: {
      id : id,
      accion : "read_id"
    },
    success: function( respuesta ) {
      //alert(respuesta);
      JSONRespuesta = JSON.parse(respuesta);
      if (JSONRespuesta.estado == 1) {
        let nombre_entrega = document.getElementById("tipo_entrega_actualizar");
        nombre_entrega.value = JSONRespuesta.nombre_entrega	;

        if (JSONRespuesta.nombre_archivo){
          let nombre_archivo = document.getElementById("archivo_nombre_actualizar").innerHTML = JSONRespuesta.nombre_archivo;
        }else{
          let nombre_archivo = document.getElementById("archivo_nombre_actualizar").innerHTML = 'Selecciona un archivo';
        }

        $("#tipo_entrega_actualizar option[value='"+ nombre_entrega +"']").attr("selected",true);

        idActualizar = JSONRespuesta.id;
        
      //console.log(respuesta);
      
    }
    //alert("Respuesta del servidor: "+respuesta);
  }
});
}


function actionUpdate() {
  let tipo_entrega = document.getElementById("tipo_entrega_actualizar").value;
  //alert(tipo_entrega);
  //let nombre_archivo = document.getElementById("archivo_nombre_actualizar").value;
  //alert(nombre_archivo);
  var formData = new FormData();
  var files = $('#archivo_subir_actualizar')[0].files[0];
  //alert(files);
  formData.append('file',files);
  formData.append('id',idActualizar);
  formData.append('nombre_entrega',tipo_entrega);
  formData.append('accion','update');

  $.ajax({
    method:"POST",
    url: "propios/crud_entregas.php",
    data: formData,
    contentType: false,
    processData: false,
    success: function( respuesta ) {
      //alert(respuesta);
      JSONRespuesta = JSON.parse(respuesta);
      
      if (JSONRespuesta.estado == 1) {
        let Botones = '<button type="button" class="btn btn-info btn-lg text-white" data-toggle="modal" data-target="#Modal_Ver" onclick="identificarVer('+JSONRespuesta.id+')"> Ver</button>';
          Botones += '<button type="button" class="btn btn-primary btn-lg text-white" data-toggle="modal" data-target="#Modal_Actualizar" onclick="identificarActualizar('+JSONRespuesta.id+')" href="#">Edit </button>';
          Botones += '<button type="button" class="btn btn-danger btn-lg text-white" data-toggle="modal" data-target="#Modal-Eliminar" onclick="identificarEliminar('+JSONRespuesta.id+')" href="#">Del</button>';

        
        let tabla = $("#zero_config").DataTable();
        var temp = tabla.row("#renglon_"+idActualizar).data();
        //Nombre
        temp[0] = JSONRespuesta.nombre_entrega;
        //Descripcion
        temp[1] = JSONRespuesta.fecha_entrega;
        temp[2] = Botones;
        tabla.row("#renglon_"+idActualizar).data(temp).draw();
        //location.reload();
        toastr.success(JSONRespuesta.mensaje);
        alert(JSONRespuesta.mensaje);
      }
      //alert("Respuesta del servidor: "+respuesta);
      //alert(respuesta);
    },
  });
}

function identificarEliminar(id) {
  //alert("EL elemento a elimnar es "+id);
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

function identificarVer(id) {
  //alert("EL elemento a ver es "+id);
  idVer = id;
  actionVer();
}

function actionVer(){
  $.ajax({
    method:"POST",
    url: "propios/crud_entregas.php",
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
        let iframe = document.getElementById('pdf');
        //alert(iframe);
        iframe.src="http://localhost/ProyectoTDAW/pdfpropios/"+JSONRespuesta.nombre_archivo;
        //toastr.success(JSONRespuesta.mensaje);
        //alert(JSONRespuesta.mensaje);
      }
    },
  });

}