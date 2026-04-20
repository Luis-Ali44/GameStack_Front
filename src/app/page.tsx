'use client';

import { FaHome, FaGamepad, FaCrosshairs, FaTrophy, FaLightbulb, FaChartLine, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import Inicio from './views/Inicio';
import Juegos from './views/Juegos';
import Torneos from './views/Torneos';
import Partidas from './views/Partidas';
import Tips from './views/Tips';
import Rankings from './views/Rankings';
import Perfil from './views/Perfil';

export default function Home() {
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Inicio />;
      case 'games':
        return <Juegos />;
      case 'tournaments':
        return <Torneos />;
      case 'matches':
        return <Partidas />;
      case 'tips':
        return <Tips />;
      case 'rankings':
        return <Rankings />;
      case 'profile':
        return <Perfil />;
      default:
        return <Inicio />;
    }
  };

  const menuItems = [
    { key: 'home', label: 'Inicio', icon: FaHome },
    { key: 'games', label: 'Juegos', icon: FaGamepad },
    { key: 'matches', label: 'Partidas', icon: FaCrosshairs },
    { key: 'tournaments', label: 'Torneos', icon: FaTrophy },
    { key: 'tips', label: 'Tips & Estrategias', icon: FaLightbulb },
    { key: 'rankings', label: 'Rankings', icon: FaChartLine },
    { key: 'profile', label: 'Perfil', icon: FaUser }
  ];

  return (
    <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f1016', color: '#f5f5f5' }}>
      <aside style={{
        width: '320px',
        backgroundColor: '#0d0d14',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              backgroundColor: '#7c23ff',
              display: 'grid',
              placeItems: 'center'
            }}>
              <span style={{ color: '#fff', fontSize: '20px' }}><FaGamepad /></span>
            </div>
            <div>
              <p style={{ margin: 0, color: '#8a8fb6', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Bienvenido a
              </p>
              <h1 style={{ margin: 0, fontSize: '28px', color: '#fff' }}>GameCenter</h1>
            </div>
          </div>

          <nav style={{ display: 'grid', gap: '8px' }}>
            {menuItems.map(item => {
              const active = currentView === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setCurrentView(item.key)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 16px',
                    borderRadius: '18px',
                    backgroundColor: active ? '#7c23ff' : 'transparent',
                    color: active ? '#fff' : '#a5a8c9',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '15px'
                  }}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <button
          style={{
            marginTop: '24px',
            width: '100%',
            padding: '14px 18px',
            backgroundColor: '#8a23ff',
            color: '#fff',
            border: 'none',
            borderRadius: '18px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 600,
            boxShadow: '0 16px 28px rgba(138, 35, 255, 0.24)'
          }}
        >
          + Crear Partida
        </button>
      </aside>

      <section style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
        {renderView()}
      </section>
    </main>
  );
}
