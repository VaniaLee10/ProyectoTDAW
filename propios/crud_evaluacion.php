<?php
    //Establecer la conexión con la base de datos
    //$conexion = 1;
    $conexion=mysqli_connect('localhost','root','','proyectof');

    //Verificar que se pudo conectar a la base de datos
    if(!$conexion){
        die("Error al conectarse a la base de datos: ".mysqli_connect_error());
    }

    $Respuesta = array();
    $accion = $_POST['accion'];

    switch ($accion) {
        case 'create':
            actionCreatePHP($conexion);
            break;

        case 'update':
            actionUpdatePHP($conexion);
            break;
        
        case 'delete':
            actionDeletePHP($conexion);
            break;
        
        case 'read_id':
            actionReadByIdPHP($conexion);
            break;

        case 'read':
            actionReadPHP($conexion);
            break;
        
        default:
            # code...
            break;
    }


    function actionReadPHP($conexion){
        $QueryRead = "SELECT * FROM entrega";
        $ResultadoRead = mysqli_query($conexion, $QueryRead);
        $numeroRegistros = mysqli_num_rows($ResultadoRead);
        if ($numeroRegistros > 0 ) {
            $Respuesta['estado']=1;
            $Respuesta['mensaje']="Los registros se listan correctamente";
            $Respuesta['entregas']=array();
            while ($RenglonEntrega = mysqli_fetch_assoc($ResultadoRead)) {
                $Entrega = array();
                $Entrega['id'] = $RenglonEntrega['id'];
                $Entrega['nombre_entrega'] = $RenglonEntrega['nombre_entrega'];
                $Entrega['fecha_entrega'] = $RenglonEntrega['fecha_entrega'];
                $Entrega['boleta'] = $RenglonEntrega['boleta'];
                $Entrega['estadoe'] = $RenglonEntrega['estado'];
                array_push($Respuesta['entregas'], $Entrega);
            }
        }else {
            $Respuesta['estado']=0;
            $Respuesta['mensaje']="Lo siento, no hay registros";
        }

        echo json_encode($Respuesta);
    }


    function actionReadByIdPHP($conexion){
        $id = $_POST['id'];
        $QueryReadById = "SELECT * FROM evaluacion, entrega WHERE evaluacion.id_entrega=".$id." AND entrega.id=".$id;
        $ResultadoById = mysqli_query($conexion, $QueryReadById);
        $numeroRegistrosById = mysqli_num_rows($ResultadoById);
        if ($numeroRegistrosById >= 1) {
            $Respuesta['estado']=1; 
            $Respuesta['mensaje']="Registro encontrado";

            $RenglonEvaluacionById = mysqli_fetch_assoc($ResultadoById);

            $Respuesta['id_entrega'] = $RenglonEvaluacionById['id_entrega'];
            $Respuesta['nombre_entrega'] = $RenglonEvaluacionById['nombre_entrega'];
            $Respuesta['estadoe'] = $RenglonEvaluacionById['estado'];
            $Respuesta['portada_1'] = $RenglonEvaluacionById['portada_1'];
            $Respuesta['portada_2'] = $RenglonEvaluacionById['portada_2'];
            $Respuesta['portada_3'] = $RenglonEvaluacionById['portada_3'];
            $Respuesta['portada_4'] = $RenglonEvaluacionById['portada_4'];
            $Respuesta['portada_5'] = $RenglonEvaluacionById['portada_5'];
            $Respuesta['indice'] = $RenglonEvaluacionById['indice'];
            $Respuesta['resumen_1'] = $RenglonEvaluacionById['resumen_1'];
            $Respuesta['resumen_2'] = $RenglonEvaluacionById['resumen_2'];
            $Respuesta['resumen_3'] = $RenglonEvaluacionById['resumen_3'];
            $Respuesta['resumen_4'] = $RenglonEvaluacionById['resumen_4'];
            $Respuesta['def_prob_1'] = $RenglonEvaluacionById['def_prob_1'];
            $Respuesta['def_prob_2'] = $RenglonEvaluacionById['def_prob_2'];
            $Respuesta['def_prob_3'] = $RenglonEvaluacionById['def_prob_3'];
            $Respuesta['edo_arte_1'] = $RenglonEvaluacionById['edo_arte_1'];
            $Respuesta['edo_arte_2'] = $RenglonEvaluacionById['edo_arte_2'];
            $Respuesta['edo_arte_3'] = $RenglonEvaluacionById['edo_arte_3'];
            $Respuesta['edo_arte_4'] = $RenglonEvaluacionById['edo_arte_4'];
            $Respuesta['edo_arte_5'] = $RenglonEvaluacionById['edo_arte_5'];
            $Respuesta['edo_arte_6'] = $RenglonEvaluacionById['edo_arte_6'];
            $Respuesta['desc_proyec_1'] = $RenglonEvaluacionById['desc_proyec_1'];
            $Respuesta['desc_proyec_2'] = $RenglonEvaluacionById['desc_proyec_2'];
            $Respuesta['obj_gen_proy_1'] = $RenglonEvaluacionById['obj_gen_proy_1'];
            $Respuesta['obj_part_proy_1'] = $RenglonEvaluacionById['obj_part_proy_1'];
            $Respuesta['obj_part_proy_2'] = $RenglonEvaluacionById['obj_part_proy_2'];
            $Respuesta['justificacion_1'] = $RenglonEvaluacionById['justificacion_1'];
            $Respuesta['justificacion_2'] = $RenglonEvaluacionById['justificacion_2'];
            $Respuesta['justificacion_3'] = $RenglonEvaluacionById['justificacion_3'];
            $Respuesta['hipotesis_1'] = $RenglonEvaluacionById['hipotesis_1'];
            $Respuesta['marco_teo_1'] = $RenglonEvaluacionById['marco_teo_1'];
            $Respuesta['factibilidad_1'] = $RenglonEvaluacionById['factibilidad_1'];
            $Respuesta['factibilidad_2'] = $RenglonEvaluacionById['factibilidad_2'];
            $Respuesta['factibilidad_3'] = $RenglonEvaluacionById['factibilidad_3'];
            $Respuesta['factibilidad_4'] = $RenglonEvaluacionById['factibilidad_4'];
            $Respuesta['bibliografia_1'] = $RenglonEvaluacionById['bibliografia_1'];
            $Respuesta['bibliografia_2'] = $RenglonEvaluacionById['bibliografia_2'];
            $Respuesta['bibliografia_3'] = $RenglonEvaluacionById['bibliografia_3'];

        }else {
            $Respuesta['estado']=0; 
            $Respuesta['mensaje']="No se encuentra el registro";
        }
        echo json_encode($Respuesta);
        mysqli_close($conexion);
    }


?>