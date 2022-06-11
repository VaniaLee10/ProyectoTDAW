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
        
        case 'ver':
            actionVerPHP($conexion);
            break;
        
        default:
            # code...
            break;
    }


    function actionCreatePHP($conexion){
        $entrega = $_POST['tipo_entrega'];
        if (move_uploaded_file($_FILES["file"]["tmp_name"], "../pdfpropios/".$_FILES['file']['name'])) {
            $QueryCreate = "INSERT INTO entrega (id, nombre_entrega, fecha_entrega, boleta, nombre_archivo)
            VALUES (null, '".$entrega."', current_timestamp(), 2021679183, '".$_FILES['file']['name']."')";

            if (mysqli_query($conexion, $QueryCreate)) {
                $Respuesta['estado']=1; 
                $Respuesta['mensaje']="El registro se guardo correctamente";
                $Respuesta['tipo_entrega'] = $_POST['tipo_entrega'];
                $Respuesta['fecha_entrega'] = date('Y-m-d');
                $Respuesta['nombre_archivo'] = $_FILES['file']['name'];
                $Respuesta['id']=mysqli_insert_id($conexion); 
            }else{
                $Respuesta['estado']=0; 
                $Respuesta['mensaje']="No se guardo en la base de datos";
                $Respuesta['id'] = 0;
            }
        }else{
            $Respuesta['estado']=0; 
            $Respuesta['mensaje']="No se pudo subir el archivo";
            $Respuesta['id'] = 0;
        }
        echo json_encode($Respuesta);
        mysqli_close($conexion);
    }


    function actionDeletePHP($conexion){
        $id = $_POST['id'];

        $QueryReadEliminar = "SELECT * FROM entrega WHERE id=".$id;
        $ResultadoReadEliminar = mysqli_query($conexion, $QueryReadEliminar);
        $numeroRegistrosById = mysqli_num_rows($ResultadoReadEliminar);
        if ($numeroRegistrosById == 1) {
            $RenglonEntregaById = mysqli_fetch_assoc($ResultadoReadEliminar);

            $Respuesta['id'] = $RenglonEntregaById['id'];
            $Respuesta['nombre_entrega'] = $RenglonEntregaById['nombre_entrega'];
            $Respuesta['nombre_archivo'] = $RenglonEntregaById['nombre_archivo'];
            $file_pointer = "../pdfpropios/".$RenglonEntregaById['nombre_archivo'];

            // Use unlink() function to delete a file
            if (!unlink($file_pointer)) {
                echo ("$file_pointer cannot be deleted due to an error");
            }
            else {
                $QueryDelete = "DELETE FROM entrega WHERE id=".$id;

                if (mysqli_query($conexion, $QueryDelete)) {
                    $Respuesta['estado']=1; 
                    $Respuesta['mensaje']="El registro se elimino correctamente";
                    //$Respuesta['id']=$id;
                }else{
                    $Respuesta['estado']=0; 
                    $Respuesta['mensaje']="Ocurrio un error desconocido";
                    $Respuesta['id'] = 0;
                }
            }
        }

        
        echo json_encode($Respuesta);
        mysqli_close($conexion);
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
                $Entrega['nombre_archivo'] = $RenglonEntrega['nombre_archivo'];
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
        $QueryReadById = "SELECT * FROM entrega WHERE id=".$id;
        $ResultadoById = mysqli_query($conexion, $QueryReadById);
        $numeroRegistrosById = mysqli_num_rows($ResultadoById);
        if ($numeroRegistrosById == 1) {
            $Respuesta['estado']=1; 
            $Respuesta['mensaje']="Registro encontrado";

            $RenglonEntregaById = mysqli_fetch_assoc($ResultadoById);

            $Respuesta['id'] = $RenglonEntregaById['id'];
            $Respuesta['nombre_entrega'] = $RenglonEntregaById['nombre_entrega'];
            $Respuesta['nombre_archivo'] = $RenglonEntregaById['nombre_archivo'];


        }else {
            $Respuesta['estado']=0; 
            $Respuesta['mensaje']="No se encuentra el registro";
        }
        echo json_encode($Respuesta);
        mysqli_close($conexion);
    }


    function actionUpdatePHP($conexion){
        $id = $_POST['id'];
        $entrega = $_POST['nombre_entrega'];
        $fecha = date('Y-m-d');
        //$archivos = $_FILES['file']['name'];

        // Si se cambia de archivo
        if (key_exists('file', $_FILES)) {

            $QueryReadEliminar2 = "SELECT * FROM entrega WHERE id=".$id;
            $ResultadoReadEliminar2 = mysqli_query($conexion, $QueryReadEliminar2);
            $numeroRegistrosById = mysqli_num_rows($ResultadoReadEliminar2);
            if ($numeroRegistrosById == 1) {
                $RenglonEntregaById = mysqli_fetch_assoc($ResultadoReadEliminar2);

                $Respuesta['id'] = $RenglonEntregaById['id'];
                $Respuesta['nombre_archivo_anterior'] = $RenglonEntregaById['nombre_archivo'];
                $file_pointer = "../pdfpropios/".$RenglonEntregaById['nombre_archivo'];

                //Borra el archivo anterior
                unlink($file_pointer);
                //Subir de nuevo el archivo
                if (move_uploaded_file($_FILES["file"]["tmp_name"], "../pdfpropios/".$_FILES['file']['name'])) {    
                    if(key_exists('nombre_entrega', $_POST)){
                        $QueryUpdate = "UPDATE entrega SET nombre_entrega ='".$entrega."', nombre_archivo = '".$_FILES['file']['name']."' WHERE id=".$id;
                        mysqli_query($conexion, $QueryUpdate);
                        if (mysqli_affected_rows($conexion)>=1) {
                            $Respuesta['estado']=1; 
                            $Respuesta['mensaje']="El registro se actualizo correctamente";
                            $Respuesta['nombre_entrega'] = $entrega;
                            $Respuesta['fecha_entrega'] = $fecha;
                            $Respuesta['nombre_archivo'] = $_FILES['file']['name'];
                        }else {
                            $Respuesta['estado']=0; 
                            $Respuesta['mensaje']="No se pudo actualizar en la base de datos";
                        }
                    }else{
                        $QueryUpdate = "UPDATE entrega SET nombre_archivo = '".$_FILES['file']['name']."' WHERE id=".$id;
                        mysqli_query($conexion, $QueryUpdate);
                        if (mysqli_affected_rows($conexion)>=1) {
                            $Respuesta['estado']=1; 
                            $Respuesta['mensaje']="El registro se actualizo correctamente";
                            $Respuesta['nombre_entrega'] = $RenglonEntregaById['nombre_archivo'];
                            $Respuesta['fecha_entrega'] = $fecha;
                            $Respuesta['nombre_archivo'] = $_FILES['file']['name'];
                        }else {
                            $Respuesta['estado']=0; 
                            $Respuesta['mensaje']="No se pudo actualizar en la base de datos";
                        }
                    }
                }else {
                    $Respuesta['estado']=0; 
                    $Respuesta['mensaje']="No se pudo actualizar el archivo";
                }
            }
        }else{//Si no se camnbia el archivo
            $QueryUpdate = "UPDATE entrega SET nombre_entrega ='".$entrega."' WHERE id=".$id;
            mysqli_query($conexion, $QueryUpdate);
            if (mysqli_affected_rows($conexion)>=1) {
                $Respuesta['estado']=1; 
                $Respuesta['mensaje']="El registro se actualizo correctamente";
                $Respuesta['nombre_entrega'] = $entrega;
                $Respuesta['fecha_entrega'] = $fecha;
            }else {
                $Respuesta['estado']=0; 
                $Respuesta['mensaje']="No se pudo actualizar en la base de datos";
            }
        }
        
        echo json_encode($Respuesta);
        mysqli_close($conexion);
    }


    function actionVerPHP($conexion){
        $id = $_POST['id'];
        $QueryReadById = "SELECT * FROM entrega WHERE id=".$id;
        $ResultadoById = mysqli_query($conexion, $QueryReadById);
        $numeroRegistrosById = mysqli_num_rows($ResultadoById);
        if ($numeroRegistrosById == 1) {
            $Respuesta['estado']=1; 
            $Respuesta['mensaje']="Registro encontrado";

            $RenglonEntregaById = mysqli_fetch_assoc($ResultadoById);

            $Respuesta['id'] = $RenglonEntregaById['id'];
            $Respuesta['nombre_entrega'] = $RenglonEntregaById['nombre_entrega'];
            $Respuesta['nombre_archivo'] = $RenglonEntregaById['nombre_archivo'];
        }else {
            $Respuesta['estado']=0; 
            $Respuesta['mensaje']="No se encuentra el registro";
        }
        echo json_encode($Respuesta);
        mysqli_close($conexion);
    }
?>
