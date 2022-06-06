<?php
    //Establecer la conexión con la base de datos
    $conexion = 1;
    //$conexion=mysqli_connect('localhost','root','','proyectof');

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
        $Respuesta['estado']=1; 
        $Respuesta['mensaje']="El registro se guardo correctamente";
        $Respuesta['tipo_entrega'] = $_POST['tipo_entrega'];
        $Respuesta['id']= random_int(1,10); 
        echo json_encode($Respuesta);
        
    }  

    function actionDeletePHP($conexion){
        $Respuesta['estado']=1; 
        $Respuesta['mensaje']="El registro se eliminó correctamente";
        $Respuesta['tipo_entrega'] = $_POST['tipo_entrega'];
        echo json_encode($Respuesta);
        
    }  

    function actionReadPHP($conexion){
        //$QueryRead = "SELECT * FROM entregas";
        //$ResultadoRead = mysqli_query($conexion, $QueryRead);
        //$numeroRegistros = mysqli_num_rows($ResultadoRead);
        //if ($numeroRegistros > 0 ) {
        //    $Respuesta['estado']=1;
        //    $Respuesta['mensaje']="Los registros se listan correctamente";
        //    $Respuesta['entregas']=array();
        //    while ($RenglonEntrega = mysqli_fetch_assoc($ResultadoRead)) {
        //        $Entrega = array();
        //        $Entrega['id'] = $RenglonEntrega['id'];
        //        $Entrega['nombre_entrega'] = $RenglonEntrega['nombre_entrega'];
        //        $Entrega['fecha'] = $RenglonEntrega['fecha'];
        //        array_push($Respuesta['entregas'], $Entrega);
        //    }
        //}else {
        //    $Respuesta['estado']=0;
        //    $Respuesta['mensaje']="Lo siento, no hay registros";
        //}

        $Respuesta['estado']=0;
        $Respuesta['mensaje']="Lo siento, no hay registros";

        echo json_encode($Respuesta);
    }

?>