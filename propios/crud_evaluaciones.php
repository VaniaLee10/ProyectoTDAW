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
        case 'agregar':
            actionUpdatePHP($conexion);
            break;
        
        case 'read_id':
            actionReadByIdPHP($conexion);
            break;

        case 'read':
            actionReadPHP($conexion);
            break;
        
        case 'ver':
            actionVerPHP($conexion);
            break;
        
        default:
            # code...
            break;
    }


    function actionReadPHP($conexion){
        $QueryRead = "SELECT * FROM proyecto";
        $ResultadoRead = mysqli_query($conexion, $QueryRead);
        $numeroRegistros = mysqli_num_rows($ResultadoRead);
        if ($numeroRegistros > 0 ) {
            $Respuesta['estado']=1;
            $Respuesta['mensaje']="Los proyectos se listan correctamente";
            $Respuesta['proyectos']=array();
            while ($RenglonEntrega = mysqli_fetch_assoc($ResultadoRead)) {
                $Entrega = array();
                $Entrega['id'] = $RenglonEntrega['id'];
                $Entrega['nombre'] = $RenglonEntrega['nombre'];
                $Entrega['fecha'] = $RenglonEntrega['fecha'];
                $Entrega['revisor1'] = $RenglonEntrega['revisor1'];
                $Entrega['revisor2'] = $RenglonEntrega['revisor2'];
                $Entrega['revisor3'] = $RenglonEntrega['revisor3'];
                $Entrega['revisor4'] = $RenglonEntrega['revisor4'];
                $Entrega['revisor5'] = $RenglonEntrega['revisor5'];
                $Entrega['proyecto_img'] = $RenglonEntrega['proyecto_img'];
                array_push($Respuesta['proyectos'], $Entrega);
            }
        }else {
            $Respuesta['estado']=0;
            $Respuesta['mensaje']="Lo siento, no hay registros";
        }

        echo json_encode($Respuesta);
    }


    function actionReadByIdPHP($conexion){
        $id = $_POST['id'];
        $QueryReadById = "SELECT * FROM proyecto WHERE id=".$id;

        $ResultadoById = mysqli_query($conexion, $QueryReadById);
        $numeroRegistrosById = mysqli_num_rows($ResultadoById);
        if ($numeroRegistrosById > 0) {

            $Respuesta['estado']=1; 
            $Respuesta['mensaje']="Registro encontrado";
            $RenglonEntregaById = mysqli_fetch_assoc($ResultadoById);

            $Respuesta['id'] = $RenglonEntregaById['id'];
            $Respuesta['nombre'] = $RenglonEntregaById['nombre'];
            $Respuesta['revisor1'] = $RenglonEntregaById['revisor1'];
            $Respuesta['revisor2'] = $RenglonEntregaById['revisor2'];
            $Respuesta['revisor3'] = $RenglonEntregaById['revisor3'];
            $Respuesta['revisor4'] = $RenglonEntregaById['revisor4'];
            $Respuesta['revisor5'] = $RenglonEntregaById['revisor5'];

        }else {
            $Respuesta['estado']=0; 
            $Respuesta['mensaje']="No se encuentra el registro";
        }
        echo json_encode($Respuesta);
        mysqli_close($conexion);
    }


    function actionUpdatePHP($conexion){
        $id = $_POST['id'];
        $nombre_revisor = $_POST['nombre_revisor'];
        $numero_revisor = $_POST['numero_revisor']+1;

        //echo($nombre_revisor);

        $QueryUpdate = "UPDATE proyecto SET revisor".$numero_revisor." ='".$nombre_revisor."'  WHERE id=".$id;
        $ResultadoUpdate = mysqli_query($conexion, $QueryUpdate);
        //$numeroRegistrosUpdated = mysqli_num_rows($ResultadoUpdate);
        if($ResultadoUpdate){
            $Respuesta['estado']=1; 
            $Respuesta['mensaje']="Registro actualizado";
            $Respuesta['nombre_revisor']=$nombre_revisor; 
            $Respuesta['numero_revisor']=$numero_revisor;
        }else {
            $Respuesta['estado']=0; 
            $Respuesta['mensaje']="Registro no actualizado";
        }
            
        
        echo json_encode($Respuesta);
        mysqli_close($conexion);
    }


    function actionVerPHP($conexion){
        $id = $_POST['id'];
        $QueryReadById = "SELECT * FROM proyecto WHERE id=".$id;
        $ResultadoById = mysqli_query($conexion, $QueryReadById);
        $numeroRegistrosById = mysqli_num_rows($ResultadoById);
        if ($numeroRegistrosById == 1) {
            $Respuesta['estado']=1; 
            $Respuesta['mensaje']="Registro encontrado";

            $RenglonEntregaById = mysqli_fetch_assoc($ResultadoById);

            $Respuesta['id'] = $RenglonEntregaById['id'];
            $Respuesta['nombre'] = $RenglonEntregaById['nombre'];
            $Respuesta['proyecto_img'] = $RenglonEntregaById['proyecto_img'];
        }else {
            $Respuesta['estado']=0; 
            $Respuesta['mensaje']="No se encuentra el registro";
        }
        echo json_encode($Respuesta);
        mysqli_close($conexion);
    }
?>
