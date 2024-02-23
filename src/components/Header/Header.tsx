import Container from '../Container/Container.js';
import './Header.css';
import logo from '../../assets/img/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    // Função para logout
    const logout = () => {
        // Limpar os dados de autenticação
        // Exemplo: remover token do localStorage
        localStorage.removeItem('id');

        
        navigate('/'); // Substitua '/login' pelo URL da sua página de login
    };

    return (
        <header className="headerpage">
            <Container>
                <nav className='navbar'>
                    <div className="logo">
                        <img
                            className='logo-image'
                            src={logo}
                            alt="Logo Secure Pass"
                        />
                    </div>
                    <div className="itens-nav">
                        <Link className='navbar__item' to="/cadastro">Cadastro</Link>
                        <Link className='navbar__item' to="/logs">Acessos</Link>
                        <Link className='navbar__item' to="/" onClick={logout}>Logout</Link>
                        {/* Adicione o link de LogOut com o evento onClick */}
                        {/* <button className='navbar__item' onClick={logout}>LogOut</button> */}
                    </div>
                </nav>
            </Container>
        </header>
    );
};

export default Header;
