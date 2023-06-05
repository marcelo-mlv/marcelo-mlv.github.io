import logo from './logo.png';
import './App.css';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');  // Estado para o nome de usuário
  const [password, setPassword] = useState('');  // Estado para a senha
  const [confirmPassword, setConfirmPassword] = useState('');  // Estado para a confirmação da senha
  const [loggedIn, setLoggedIn] = useState(false);  // Estado para verificar se está logado
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);  // Estado para verificar se está na página de criação de conta

  const handleLogin = () => {
    // Lógica de autenticação do login
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Limpar os dados de autenticação
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setLoggedIn(false);
  };

  const handleCreateAccount = () => {
    // Criação de uma nova conta
    setLoggedIn(true);
  };

  const switchCreateAccountPage = () => {
    // Alterna entre a página de criação de nova conta e tela de login
    setIsCreatingAccount(!isCreatingAccount);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Site teste</h2>
        <img src={logo} className="App-logo" alt="logo" />
        {loggedIn ? (  // Se estiver logado
          <>
            <p>Welcome, {username}!</p>
            <button className='LogoutButton' onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            {isCreatingAccount ? (  // Se estiver criando uma conta
              <>
                <input
                  className='Login'
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className='Password'
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className='ConfirmPassword'
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className='CreateAccountButton' onClick={handleCreateAccount}>Create Account</button>
                <p>Already have an account? <a href="#" onClick={switchCreateAccountPage}>Login</a></p>
              </>
            ) : (  // Se não estiver criando uma conta nem estiver logado, está na tela inicial do site
              <>
                <input
                  className='Login'
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className='Password'
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className='LoginButton' onClick={handleLogin}>Login</button>
                <p>Don't have an account yet? <a href="#" onClick={switchCreateAccountPage}>Create Account</a></p>
              </>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
