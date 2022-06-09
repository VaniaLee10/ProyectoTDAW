

function actionRead() {
    //alert("Funcionando");
    $.ajax({
      method:"POST",
      url: "propios/crud_evaluacion.php",
      data: {
        accion : "read"
      },
      success: function( respuesta ) {
        JSONRespuesta = JSON.parse(respuesta);
        let boton_estado= "";
        
        if (JSONRespuesta.estado == 1) {
          //Mostrar los registros (categorias) en la tabla
          tabla = $("#tabla_evaluacion").DataTable();            
          JSONRespuesta.entregas.forEach(entrega => {    
            let boton_revisores = '<a href="#" data-toggle="tooltip" data-placement="top" title="Update"> <i class="mdi mdi-check"></i> </a>';
                boton_revisores += '<a href="#" data-toggle="tooltip" data-placement="top" title="Delete"> </i><i class="mdi mdi-close"></i> </a>';    
            if (entrega.estadoe == 1){
                boton_estado = '<button type="button" class="btn btn-success btn-lg text-white" data-toggle="modal" data-target="#Modal_Aprobado" onclick=identificarVer('+entrega.id+') >Aprobado </button>';
            }else{
                boton_estado = '<button type="button" class="btn btn-danger btn-lg text-white" data-toggle="modal" data-target="#Modal_Aprobado" onclick=identificarVer('+entrega.id+') >No Aprobado</button>';
            }
                
            tabla.row.add([entrega.nombre_entrega,boton_revisores, boton_estado]).draw().node().id="renglon_"+entrega.id;
          });

        }
        //console.log(respuesta);
        //alert("Respuesta del servidor: "+respuesta);
      },
  });
}


function identificarVer(id) {
    alert("La evaluación de la entrega es "+id);
    $.ajax({
      method:"POST",
      url: "plantilla/phppropios/crud-categorias.php",
      data: {
        id : id,
        accion : "read_id"
      },
      success: function( respuesta ) {
        //JSONRespuesta = JSON.parse(respuesta);
        //alert("EL elemento a elimnar es "+id);
        //if (JSONRespuesta.estado == 1) {
        //  let titulo = document.getElementById("exampleModalLabel");
        //  titulo.value = 'Entrega: '+JSONRespuesta.nombrecategoria+' - Revisor: Efraín Arreondo Morales - Estado: '+JSONRespuesta.estadoe;
        //  
        //  
        //  idActualizar = JSONRespuesta.id;
        //}
        ////alert(respuesta);
        ////console.log(respuesta);
        //alert("Respuesta del servidor: "+respuesta);
      },
  });
  }