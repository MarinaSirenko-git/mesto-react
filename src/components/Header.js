import logo from './../images/logo.svg';

function Header() {
  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="лого Mesto Russia"/>
    </header>
  );
}

export default Header;