import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
        <ul className="nav-links">
          <div className="logo">Links Vault</div>
          <li><a href="">Home</a></li>
          <li><a href="">Add Link</a></li>
          <li><a href="">My Links</a></li>
        </ul>
    </nav>
  )
}

export default Navbar
