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
        //$id = $_POST['id'];
        //$QueryReadById = "SELECT * FROM evaluacion WHERE id=".$id;
        //$ResultadoById = mysqli_query($conexion, $QueryReadById);
        //$numeroRegistrosById = mysqli_num_rows($ResultadoById);
        //if ($numeroRegistrosById == 1) {
        //    $Respuesta['estado']=1; 
        //    $Respuesta['mensaje']="Registro encontrado";
//
        //    $RenglonEvaluacionById = mysqli_fetch_assoc($ResultadoById);
//
        //    $Respuesta['id'] = $RenglonEvaluacionById['id'];
        //    //												def_prob_3	edo_arte_1	edo_arte_2	edo_arte_3	edo_arte_4	edo_arte_5	edo_arte_6	desc_proyec_1	desc_proyec_2	obj_gen_proy_1	obj_part_proy_1	obj_part_proy_2	justificacion_1	justificacion_2	justificacion_3	hipotesis_1	marco_teo_1	factibilidad_1	factibilidad_2	factibilidad_3	factibilidad_4	bibliografia_1	bibliografia_2	bibliografia_3	Operaciones sobre los resultados de la consulta
        //    $Respuesta['portada_1'] = $RenglonEvaluacionById['portada_1'];
        //    $Respuesta['portada_2'] = $RenglonEvaluacionById['portada_2'];
        //    $Respuesta['portada_3'] = $RenglonEvaluacionById['portada_3'];
        //    $Respuesta['portada_4'] = $RenglonEvaluacionById['portada_4'];
        //    $Respuesta['portada_5'] = $RenglonEvaluacionById['portada_5'];
        //    $Respuesta['indice'] = $RenglonEvaluacionById['indice'];
        //    $Respuesta['resumen_1'] = $RenglonEvaluacionById['resumen_1'];
        //    $Respuesta['resumen_2'] = $RenglonEvaluacionById['resumen_2'];
        //    $Respuesta['resumen_3'] = $RenglonEvaluacionById['resumen_3'];
        //    $Respuesta['resumen_4'] = $RenglonEvaluacionById['resumen_4'];
        //    $Respuesta['def_prob_1'] = $RenglonEvaluacionById['def_prob_1'];
        //    $Respuesta['def_prob_2'] = $RenglonEvaluacionById['def_prob_2'];
        //    $Respuesta['portada_2'] = $RenglonEvaluacionById['portada_2'];
        //    $Respuesta['portada_2'] = $RenglonEvaluacionById['portada_2'];
//
//
        //}else {
        //    $Respuesta['estado']=0; 
        //    $Respuesta['mensaje']="No se encuentra el registro";
        //}
        //echo json_encode($Respuesta);
        //mysqli_close($conexion);
    }

?>