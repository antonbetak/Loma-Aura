import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [['/', 'Inicio'], ['/casas', 'Casas'], ['/nosotros', 'Loma Aura'], ['/contacto', 'Contacto']]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isImageHero = pathname === '/' || pathname === '/nosotros' || pathname.startsWith('/casas/')

  useEffect(() => {
    const updateHeader = () => setScrolled(scrollY > 40)
    updateHeader()
    addEventListener('scroll', updateHeader, { passive: true })
    return () => removeEventListener('scroll', updateHeader)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return <header className={`site-header ${isImageHero ? 'overlay-header' : 'solid-header'} ${scrolled ? 'scrolled' : ''} ${open ? 'menu-open' : ''}`}>
    <Link to="/" className="wordmark" aria-label="Loma Aura, inicio"><strong>LOMA AURA</strong><span>PRIVATE STAYS</span></Link>
    <nav className="desktop-nav" aria-label="Navegación principal">
      {links.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
      <Link className="nav-cta" to="/contacto">Consultar disponibilidad</Link>
    </nav>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>{open ? <X /> : <Menu />}</button>
    <div className="mobile-menu">
      {links.map(([to, label], i) => <NavLink key={to} to={to} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}</NavLink>)}
      <Link to="/contacto" onClick={() => setOpen(false)} className="button button-light">CONSULTAR DISPONIBILIDAD</Link>
    </div>
  </header>
}
