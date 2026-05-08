export default function About() {
  return (
    <>
      {/* HERO ABOUT */}
      <section id="about-hero">
        <div className="about-hero-content section-p1">
          <h2>Acerca de <span>Pandea</span></h2>
          <p>Somos una tienda de moda comprometida con la calidad, el estilo y la comodidad de nuestros clientes.</p>
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section id="about-mission" className="section-p1">
        <div className="mission-grid">
          <div className="mission-card">
            <i className="fas fa-bullseye" />
            <h4>Nuestra Misión</h4>
            <p>Ofrecer prendas de alta calidad a precios accesibles, democratizando la moda para todos.</p>
          </div>
          <div className="mission-card">
            <i className="fas fa-eye" />
            <h4>Nuestra Visión</h4>
            <p>Ser la tienda de moda digital más reconocida de Latinoamérica para el 2030.</p>
          </div>
          <div className="mission-card">
            <i className="fas fa-heart" />
            <h4>Nuestros Valores</h4>
            <p>Calidad, honestidad, sostenibilidad y pasión por la moda guían cada decisión.</p>
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section id="about-team" className="section-p1">
        <h2>Nuestro Equipo</h2>
        <p>Las personas detrás de Pandea</p>
        <div className="team-grid">
          {[
            { name: "Daniel Pedreros", role: "Fundador & CEO",      icon: "fa-user-tie" },
            { name: "Equipo Diseño",   role: "Diseño & UX",         icon: "fa-palette" },
            { name: "Equipo Tech",     role: "Desarrollo",          icon: "fa-code" },
            { name: "Soporte",         role: "Atención al Cliente", icon: "fa-headset" },
          ].map((member, i) => (
            <div className="team-card" key={i}>
              <div className="team-avatar">
                <i className={`fas ${member.icon}`} />
              </div>
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section id="about-stats" className="section-p1">
        <div className="stats-grid">
          {[
            { number: "500+",  label: "Productos" },
            { number: "2K+",   label: "Clientes felices" },
            { number: "24/7",  label: "Soporte" },
            { number: "100%",  label: "Calidad garantizada" },
          ].map((stat, i) => (
            <div className="stat-card" key={i}>
              <h2>{stat.number}</h2>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
