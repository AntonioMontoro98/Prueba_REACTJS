import { Link } from '../Link.js';

export default function ListadoPage({ users }) {
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
          <h1>Listado</h1>
        </div>
      </header>

      <br />
      <h2>Información de Usuarios</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha de Creación</th>
            <th>Fecha de Modificación</th>
          </tr>
        </thead>
        <tbody>
          {users.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.fechaCreacion}</td>
              <td>{usuario.fechaModificacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
