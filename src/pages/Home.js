import { Link } from '../Link.js';

export default function HomePage({ userCount }) {
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
                    <h1>Home</h1>
                </div>
            </header>
            <main style={{ padding: '20px' }}>
                <h2>Total de Usuarios Registrados: {userCount}</h2>
            </main>
        </div>
    );
}
