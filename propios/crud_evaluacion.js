

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
    //alert("La evaluación de la entrega es "+id);
    let titulo = "";
    $.ajax({
      method:"POST",
      url: "propios/crud_evaluacion.php",
      data: {
        id : id,
        accion : "read_id"
      },
      success: function( respuesta ) {
        JSONRespuesta = JSON.parse(respuesta);
        if (JSONRespuesta.estado == 1) {
          if (JSONRespuesta.estadoe == 1){
            titulo = document.getElementById("titulo").innerHTML ='Entrega: '+JSONRespuesta.nombre_entrega+' - Revisor: Efraín Arreondo Morales - Estado: <p class="text-success"> Aprobado</p>';
          }else{
            titulo = document.getElementById("titulo").innerHTML ='Entrega: '+JSONRespuesta.nombre_entrega+' - Revisor: Efraín Arreondo Morales - Estado: <p class="text-danger">No Aprobado</p>';
          }
          
          //alert(JSONRespuesta.portada_1);
          switch (JSONRespuesta.portada_1) {
            case ("0.000"):
              $('#portada_1_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#portada_1_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#portada_1_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#portada_1_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#portada_1_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.portada_2) {
            case ("0.000"):
              $('#portada_2_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#portada_2_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#portada_2_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#portada_2_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#portada_2_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.portada_3) {
            case ("0.000"):
              $('#portada_3_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#portada_3_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#portada_3_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#portada_3_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#portada_3_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.portada_4) {
            case ("0.000"):
              $('#portada_4_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#portada_4_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#portada_4_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#portada_4_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#portada_4_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.portada_5) {
            case ("0.000"):
              $('#portada_5_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#portada_5_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#portada_5_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#portada_5_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#portada_5_1').prop('checked', true);
              break;
            default:
              break;
          }


          switch (JSONRespuesta.indice) {
            case ("0.000"):
              $('#indice_1_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#indice_1_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#indice_1_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#indice_1_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#indice_1_1').prop('checked', true);
              break;
            default:
              break;
          }


          switch (JSONRespuesta.resumen_1) {
            case ("0.000"):
              $('#resumen_1_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#resumen_1_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#resumen_1_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#resumen_1_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#resumen_1_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.resumen_2) {
            case ("0.000"):
              $('#resumen_2_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#resumen_2_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#resumen_2_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#resumen_2_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#resumen_2_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.resumen_3) {
            case ("0.000"):
              $('#resumen_3_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#resumen_3_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#resumen_3_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#resumen_3_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#resumen_3_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.resumen_4) {
            case ("0.000"):
              $('#resumen_4_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#resumen_4_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#resumen_4_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#resumen_4_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#resumen_4_1').prop('checked', true);
              break;
            default:
              break;
          }


          switch (JSONRespuesta.def_prob_1) {
            case ("0.000"):
              $('#def_prob_1_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#def_prob_1_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#def_prob_1_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#def_prob_1_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#def_prob_1_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.def_prob_2) {
            case ("0.000"):
              $('#def_prob_2_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#def_prob_2_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#def_prob_2_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#def_prob_2_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#def_prob_2_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.def_prob_3) {
            case ("0.000"):
              $('#def_prob_3_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#def_prob_3_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#def_prob_3_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#def_prob_3_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#def_prob_3_1').prop('checked', true);
              break;
            default:
              break;
          }


          switch (JSONRespuesta.edo_arte_1) {
            case ("0.000"):
              $('#edo_arte_1_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#edo_arte_1_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#edo_arte_1_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#edo_arte_1_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#edo_arte_1_1').prop('checked', true);
              break;
            default:
              break;
          }
          
          switch (JSONRespuesta.edo_arte_2) {
            case ("0.000"):
              $('#edo_arte_2_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#edo_arte_2_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#edo_arte_2_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#edo_arte_2_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#edo_arte_2_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.edo_arte_3) {
            case ("0.000"):
              $('#edo_arte_3_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#edo_arte_3_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#edo_arte_3_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#edo_arte_3_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#edo_arte_3_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.edo_arte_4) {
            case ("0.000"):
              $('#edo_arte_4_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#edo_arte_4_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#edo_arte_4_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#edo_arte_4_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#edo_arte_4_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.edo_arte_5) {
            case ("0.000"):
              $('#edo_arte_5_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#edo_arte_5_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#edo_arte_5_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#edo_arte_5_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#edo_arte_5_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.edo_arte_6) {
            case ("0.000"):
              $('#edo_arte_6_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#edo_arte_6_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#edo_arte_6_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#edo_arte_6_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#edo_arte_6_1').prop('checked', true);
              break;
            default:
              break;
          }


          switch (JSONRespuesta.desc_proyec_1) {
            case ("0.000"):
              $('#desc_proyec_1_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#desc_proyec_1_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#desc_proyec_1_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#desc_proyec_1_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#desc_proyec_1_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.desc_proyec_2) {
            case ("0.000"):
              $('#desc_proyec_2_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#desc_proyec_2_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#desc_proyec_2_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#desc_proyec_2_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#desc_proyec_2_1').prop('checked', true);
              break;
            default:
              break;
          }

          
          switch (JSONRespuesta.obj_gen_proy_1) {
            case ("0.000"):
              $('#obj_gen_proy_1_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#obj_gen_proy_1_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#obj_gen_proy_1_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#obj_gen_proy_1_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#obj_gen_proy_1_1').prop('checked', true);
              break;
            default:
              break;
          }


          switch (JSONRespuesta.obj_part_proy_1) {
            case ("0.000"):
              $('#obj_part_proy_1_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#obj_part_proy_1_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#obj_part_proy_1_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#obj_part_proy_1_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#obj_part_proy_1_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.obj_part_proy_2) {
            case ("0.000"):
              $('#obj_part_proy_2_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#obj_part_proy_2_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#obj_part_proy_2_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#obj_part_proy_2_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#obj_part_proy_2_1').prop('checked', true);
              break;
            default:
              break;
          }


          switch (JSONRespuesta.justificacion_1) {
            case ("0.000"):
              $('#justificacion_1_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#justificacion_1_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#justificacion_1_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#justificacion_1_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#justificacion_1_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.justificacion_2) {
            case ("0.000"):
              $('#justificacion_2_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#justificacion_2_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#justificacion_2_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#justificacion_2_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#justificacion_2_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.justificacion_3) {
            case ("0.000"):
              $('#justificacion_3_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#justificacion_3_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#justificacion_3_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#justificacion_3_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#justificacion_3_1').prop('checked', true);
              break;
            default:
              break;
          }


          switch (JSONRespuesta.hipotesis_1) {
            case ("0.000"):
              $('#hipotesis_1_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#hipotesis_1_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#hipotesis_1_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#hipotesis_1_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#hipotesis_1_1').prop('checked', true);
              break;
            default:
              break;
          }


          switch (JSONRespuesta.marco_teo_1) {
            case ("0.000"):
              $('#marco_teo_1_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#marco_teo_1_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#marco_teo_1_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#marco_teo_1_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#marco_teo_1_1').prop('checked', true);
              break;
            default:
              break;
          }


          switch (JSONRespuesta.factibilidad_1) {
            case ("0.000"):
              $('#factibilidad_1_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#factibilidad_1_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#factibilidad_1_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#factibilidad_1_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#factibilidad_1_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.factibilidad_2) {
            case ("0.000"):
              $('#factibilidad_2_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#factibilidad_2_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#factibilidad_2_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#factibilidad_2_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#factibilidad_2_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.factibilidad_3) {
            case ("0.000"):
              $('#factibilidad_3_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#factibilidad_3_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#factibilidad_3_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#factibilidad_3_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#factibilidad_3_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.factibilidad_4) {
            case ("0.000"):
              $('#factibilidad_4_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#factibilidad_4_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#factibilidad_4_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#factibilidad_4_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#factibilidad_4_1').prop('checked', true);
              break;
            default:
              break;
          }


          switch (JSONRespuesta.bibliografia_1) {
            case ("0.000"):
              $('#bibliografia_1_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#bibliografia_1_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#bibliografia_1_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#bibliografia_1_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#bibliografia_1_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.bibliografia_2) {
            case ("0.000"):
              $('#bibliografia_2_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#bibliografia_2_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#bibliografia_2_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#bibliografia_2_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#bibliografia_2_1').prop('checked', true);
              break;
            default:
              break;
          }

          switch (JSONRespuesta.bibliografia_3) {
            case ("0.000"):
              $('#bibliografia_3_0').prop('checked', true);
              break;
            case ("0.250"):
              $('#bibliografia_3_25').prop('checked', true);
              break;
            case ("0.500"):
              $('#bibliografia_3_50').prop('checked', true);
              break;
            case ("0.750"):
              $('#bibliografia_3_75').prop('checked', true);
              break;
            case ("0.999"):
              $('#bibliografia_3_1').prop('checked', true);
              break;
            default:
              break;
          }

          let observaciones = document.getElementById("observacion");
          observaciones.value = JSONRespuesta.observaciones;
          //alert(observaciones);

          let iframe = document.getElementById('pdf_observaciones');
          //alert(iframe);
          iframe.src="http://localhost/ProyectoTDAW/pdfpropios/"+JSONRespuesta.nombre_archivo;


          idActualizar = JSONRespuesta.id;
          //toastr.success(JSONRespuesta.mensaje);
          //alert(JSONRespuesta.mensaje);
        }
        //alert(respuesta);
        //console.log(respuesta);
        //alert("Respuesta del servidor: "+respuesta);
      },
  });
  }