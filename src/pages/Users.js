import { navigate } from '../Link.js';
import React, { useEffect, useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import validator from 'validator';
import { EVENTS } from '../utils/consts.js';
import { Link } from '../Link.js';

export default function UsersPage({ users, setUsers }) {
  
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true); // Estado para la validación de email
    const [isPasswordValid, setIsPasswordValid] = useState(true); // Estado para la validación de contraseña
  
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
      id: '',
      nombre: '',
      contraseña: '',
      email: '',
      fechaCreacion: '',
      fechaModificacion: ''
    });
  
    const seleccionarUsuario = (elemento, caso) => {
      setUsuarioSeleccionado(elemento);
      (caso === 'Editar') ? setModalEditar(true) : setModalEliminar(true);
    };
  
    const handleChange = e => {
      const { name, value } = e.target;
      setUsuarioSeleccionado(prevState => ({
        ...prevState,
        [name]: value
      }));
  
      // Validación del email
      if (name === 'email') {
        setIsEmailValid(validator.isEmail(value));
      }
  
      // Validación de la contraseña (entre 6 y 12 caracteres)
      if (name === 'contraseña') {
        setIsPasswordValid(validator.isLength(value, { min: 6, max: 12 }));
      }
    };
  
    const editar = () => {
      if (!isEmailValid || !isPasswordValid) {
        alert('Revise los campos de email y contraseña');
        return;
      }
  
      const usuariosActualizados = users.map(usuario => {
        if (usuario.id === usuarioSeleccionado.id) {
          return { 
            ...usuario,
            ...usuarioSeleccionado,
            fechaModificacion: new Date().toLocaleString() // Actualizar la fecha de modificación
          };
        }
        return usuario;
      });
  
      setUsers(usuariosActualizados);
      setModalEditar(false);
    };
  
    const eliminar = () => {
      const usuariosActualizados = users.filter(usuario => usuario.id !== usuarioSeleccionado.id);
      setUsers(usuariosActualizados);
      setModalEliminar(false);
    };
  
    const abrirModalInsertar = () => {
      setUsuarioSeleccionado({
        id: users[users.length - 1]?.id + 1 || 1, // Nuevo ID
        nombre: '',
        contraseña: '',
        email: '',
        fechaCreacion: '',
        fechaModificacion: ''
      });
      setModalInsertar(true);
    };
  
    const insertar = () => {
      if (!isEmailValid || !isPasswordValid) {
        alert('Revise los campos de email y contraseña');
        return;
      }
  
      const nuevoUsuario = {
        ...usuarioSeleccionado,
        id: usuarioSeleccionado.id,
        fechaCreacion: new Date().toLocaleString(), // Fecha de creación actual
        fechaModificacion: new Date().toLocaleString() // Inicialmente igual a la fecha de creación
      };
      setUsers([...users, nuevoUsuario]);
      setModalInsertar(false);
    };
  
    return (
      <div className="App">
        <header>
          <div className="menu">
            <nav>
              <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/listado'>Listado</Link></li>
                <li><Link to='/users'>Usuarios</Link></li>
              </ul>
            </nav>
            <h1>Usuarios</h1>
          </div>
        </header>

        <br />
        <button className="btn btn-success" onClick={() => abrirModalInsertar()}>Insertar</button>
        <br /><br />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Contraseña</th>
              <th>Email</th>
              <th>Fecha de Creación</th>
              <th>Fecha de Modificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(elemento => (
              <tr key={elemento.id}>
                <td>{elemento.id}</td>
                <td>{elemento.nombre}</td>
                <td>{elemento.contraseña}</td>
                <td>{elemento.email}</td>
                <td>{elemento.fechaCreacion}</td>
                <td>{elemento.fechaModificacion}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => seleccionarUsuario(elemento, 'Editar')}>Editar</button> {"   "}
                  <button className="btn btn-danger" onClick={() => seleccionarUsuario(elemento, 'Eliminar')}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal para editar usuario */}
        <Modal isOpen={modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar Usuario</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>ID</label>
              <input
                className="form-control"
                readOnly
                type="text"
                name="id"
                value={usuarioSeleccionado && usuarioSeleccionado.id}
              />
              <br />

              <label>Usuario</label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                value={usuarioSeleccionado && usuarioSeleccionado.nombre}
                onChange={handleChange}
              />
              <br />

              <label>Contraseña</label>
              <input
                className="form-control"
                type="text"
                name="contraseña"
                value={usuarioSeleccionado && usuarioSeleccionado.contraseña}
                onChange={handleChange}
              />
              {!isPasswordValid && <span style={{ color: 'red' }}>La contraseña debe tener entre 6 y 12 caracteres</span>}
              <br />

              <label>Email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                value={usuarioSeleccionado && usuarioSeleccionado.email}
                onChange={handleChange}
              />
              {!isEmailValid && <span style={{ color: 'red' }}>Email inválido</span>}
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => editar()}>
              Actualizar
            </button>
            <button className="btn btn-danger" onClick={() => setModalEditar(false)}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        {/* Modal para eliminar usuario */}
        <Modal isOpen={modalEliminar}>
          <ModalBody>
            Estás seguro que deseas eliminar el usuario {usuarioSeleccionado && usuarioSeleccionado.nombre}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => eliminar()}>
              Sí
            </button>
            <button className="btn btn-secondary" onClick={() => setModalEliminar(false)}>
              No
            </button>
          </ModalFooter>
        </Modal>

        {/* Modal para insertar usuario */}
        <Modal isOpen={modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar Usuario</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>ID</label>
              <input
                className="form-control"
                readOnly
                type="text"
                name="id"
                value={usuarioSeleccionado && usuarioSeleccionado.id}
              />
              <br />

              <label>Usuario</label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                value={usuarioSeleccionado ? usuarioSeleccionado.nombre : ''}
                onChange={handleChange}
              />
              <br />

              <label>Contraseña</label>
              <input
                className="form-control"
                type="text"
                name="contraseña"
                value={usuarioSeleccionado ? usuarioSeleccionado.contraseña : ''}
                onChange={handleChange}
              />
              {!isPasswordValid && <span style={{ color: 'red' }}>La contraseña debe tener entre 6 y 12 caracteres</span>}
              <br />

              <label>Email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                value={usuarioSeleccionado ? usuarioSeleccionado.email : ''}
                onChange={handleChange}
              />
              {!isEmailValid && <span style={{ color: 'red' }}>Email inválido</span>}
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => insertar()}>
              Insertar
            </button>
            <button className="btn btn-danger" onClick={() => setModalInsertar(false)}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
