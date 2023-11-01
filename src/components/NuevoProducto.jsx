import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';

const NuevoProducto = () => {

    //Definiendo la navegacion
    const navigate = useNavigate()

    //State del componente
    const [ nombre, setNombre ] = useState('')
    const [ precio, setPrecio ] = useState('')

    //Utilizar useDispatch y devuelve una funcion

    const dispatch = useDispatch();

    //Acceder al state del store
    const cargando = useSelector( state => state.productos.loading );
    const error = useSelector( state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);

    //mandar a llamar el action de productoAction
    const agregarProducto = (producto) => dispatch( crearNuevoProductoAction(producto) );

    //Cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        //Validar Formuario
        if([nombre, precio].includes('')){

            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }

            dispatch(mostrarAlerta(alerta))
            return ;
        }

        //si no hay errores
        dispatch( ocultarAlertaAction() );

        //Crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        //redireccionar
        setTimeout(() => {
            navigate('/')
        }, 2000)
    }

  return (
    <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center mb-4 font-weight-bold">
                        Agregar Nuevo Producto
                    </h2>
                    { alerta ? <p className={alerta.classes}>{alerta.msg} </p> : null}
                    <form
                        onSubmit={submitNuevoProducto}
                    >
                        <div className="form-group">
                            <label>Nombre Producto</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre Producto"
                                name="nombre"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio Producto</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Precio Producto"
                                name="precio"
                                value={precio}
                                onChange={e => setPrecio(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                        >
                            Agregar
                        </button>
                    </form>
                    { cargando ? <p>Cargando...</p> : null}
                    {error ? <p className='alert alert-danger p2 mt-4 text-center'>Hubo un error</p> : null}
                </div>
            </div>
        </div>
    </div>
  )
}

export default NuevoProducto