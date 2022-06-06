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


    function actionCreatePHP($conexion){
        $entrega = $_POST['tipo_entrega'];
        $QueryCreate = "INSERT INTO entrega (id, nombre_entrega, fecha_entrega, boleta)
        VALUES (null, '".$entrega."', current_timestamp(), 2021679183)";

        if (mysqli_query($conexion, $QueryCreate)) {
            $Respuesta['estado']=1; 
            $Respuesta['mensaje']="El registro se guardo correctamente";
            $Respuesta['tipo_entrega'] = $_POST['tipo_entrega'];
            $Respuesta['fecha_entrega'] = date('Y-m-d');
            $Respuesta['id']=mysqli_insert_id($conexion); 
        }else{
            $Respuesta['estado']=0; 
            $Respuesta['mensaje']="Ocurrio un error desconocido";
            $Respuesta['id'] = 0;
        }
        echo json_encode($Respuesta);
        mysqli_close($conexion);
    }  

    function actionDeletePHP($conexion){
        $Respuesta['estado']=1; 
        $Respuesta['mensaje']="El registro se eliminó correctamente";
        $Respuesta['tipo_entrega'] = $_POST['tipo_entrega'];
        echo json_encode($Respuesta);
        
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
                array_push($Respuesta['entregas'], $Entrega);
            }
        }else {
            $Respuesta['estado']=0;
            $Respuesta['mensaje']="Lo siento, no hay registros";
        }

        echo json_encode($Respuesta);
    }

?>
