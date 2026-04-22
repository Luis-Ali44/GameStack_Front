'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { Trophy, Calendar, Users, Globe, ClipboardList } from 'lucide-react';
import { tournamentsService } from '@/services/tournaments.service';
import { Tournament } from '@/types/tournament.types';

const TYPE_LABEL: Record<string, string> = {
  single: 'Eliminación simple',
  double: 'Doble eliminación',
  round_robin: 'Round Robin',
};

export default function TorneosPage() {
  const [myTournaments, setMyTournaments] = useState<Tournament[]>([]);
  const [communityTournaments, setCommunityTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMy, setLoadingMy] = useState(true);

  useEffect(() => {
    // Cargar mis torneos desde la API
    tournamentsService.getMy()
      .then((res) => setMyTournaments(res.tournaments))
      .catch(() => {})
      .finally(() => setLoadingMy(false));

    // Cargar torneos de la comunidad desde la API
    tournamentsService.getAll()
      .then((res) => setCommunityTournaments(res.tournaments))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch { return dateStr; }
  };

  return (
    <MainLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#FFFFFF', marginBottom: '4px' }}>Torneos</h1>
          <p style={{ fontSize: '14px', color: '#8892A4' }}>Participa en competencias organizadas</p>
        </div>
        <Link href="/torneos/nueva" style={{ padding: '10px 18px', backgroundColor: '#7C3AED', borderRadius: '8px', color: '#FFFFFF', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
          + Crear Torneo
        </Link>
      </div>

      {/* ── Mis torneos creados ── */}
      {loadingMy ? (
        <p style={{ color: '#8892A4', textAlign: 'center', padding: '32px' }}>Cargando mis torneos...</p>
      ) : myTournaments.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '13px', fontWeight: '600', color: '#A78BFA', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Trophy size={13} /> Mis torneos creados ({myTournaments.length})
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {myTournaments.map((t) => (
              <div key={t.id} style={{ backgroundColor: '#0F1424', border: '1px solid #7C3AED44', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ height: '100px', backgroundColor: '#7C3AED22', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <Trophy size={36} color="#A78BFA" />
                  <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#7C3AED', color: '#FFFFFF', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px' }}>
                    ID: {t.id}
                  </span>
                  <span style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: '#16A34A', color: '#FFFFFF', fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '20px' }}>
                    {t.status === 'registration' ? 'Inscripción' : t.status === 'active' ? 'Activo' : 'Finalizado'}
                  </span>
                </div>
                <div style={{ padding: '14px' }}>
                  <p style={{ fontSize: '11px', color: '#A78BFA', fontWeight: '600', marginBottom: '4px' }}>{t.game_name || `Game ID: ${t.game_id}`}</p>
                  <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF', marginBottom: '10px', lineHeight: 1.3 }}>{t.name}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', color: '#8892A4', marginBottom: '10px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ClipboardList size={11} /> {TYPE_LABEL[t.type] || t.type}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={11} /> {t.current_participants || 0}/{t.max_participants} participantes</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={11} /> {formatDate(t.start_date)}</span>
                  </div>
                  {t.description && (
                    <p style={{ fontSize: '11px', color: '#8892A4', lineHeight: 1.5, marginBottom: '10px', borderTop: '1px solid #1E2540', paddingTop: '8px' }}>
                      {t.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Torneos destacados (API) ── */}
      <div>
        <p style={{ fontSize: '13px', fontWeight: '600', color: '#8892A4', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Globe size={13} /> Torneos destacados
        </p>

        {/* Banner */}
        <div style={{ backgroundColor: '#0F1424', border: '1px solid #1E2540', borderRadius: '12px', padding: '18px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Calendar size={20} color="#A78BFA" />
          <div>
            <p style={{ fontSize: '15px', fontWeight: '700', color: '#FFFFFF', margin: 0 }}>Próximos Torneos</p>
            <p style={{ fontSize: '13px', color: '#8892A4', margin: '2px 0 0' }}>No te pierdas las próximas competencias y asegura tu lugar</p>
          </div>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {['Todos', 'Próximos', 'En vivo', 'Finalizados'].map((f, i) => (
            <button key={f} style={{ padding: '7px 16px', borderRadius: '20px', border: `1px solid ${i === 0 ? '#7C3AED' : '#1E2540'}`, backgroundColor: i === 0 ? '#7C3AED' : 'transparent', color: i === 0 ? '#FFFFFF' : '#8892A4', fontSize: '12px', cursor: 'pointer' }}>{f}</button>
          ))}
        </div>

        {loading && <p style={{ color: '#8892A4', textAlign: 'center', padding: '32px' }}>Cargando torneos...</p>}

        {!loading && communityTournaments.length === 0 && (
          <p style={{ color: '#8892A4', textAlign: 'center', padding: '32px' }}>No hay torneos disponibles aún</p>
        )}

        {!loading && communityTournaments.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {communityTournaments.map((t) => {
              const badgeBg = t.status === 'active' ? '#16A34A' : t.status === 'finished' ? '#374151' : '#7C3AED';
              const badge = t.status === 'active' ? 'En vivo' : t.status === 'finished' ? 'Finalizado' : 'Próximamente';
              
              return (
                <div key={t.id} style={{ backgroundColor: '#0F1424', border: '1px solid #1E2540', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ height: '140px', backgroundColor: '#161B2E', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Trophy size={40} color="#A78BFA" />
                    <span style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '11px', fontWeight: '700', color: '#FFFFFF', backgroundColor: badgeBg, padding: '3px 10px', borderRadius: '20px' }}>{badge}</span>
                  </div>
                  <div style={{ padding: '14px' }}>
                    <p style={{ fontSize: '11px', color: '#A78BFA', fontWeight: '600', marginBottom: '4px' }}>{t.game_name || `Game ID: ${t.game_id}`}</p>
                    <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF', marginBottom: '10px', lineHeight: 1.3 }}>{t.name}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', color: '#8892A4', marginBottom: '14px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={11} /> {formatDate(t.start_date)}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={11} /> {t.current_participants || 0}/{t.max_participants} participantes</span>
                    </div>
                    <button style={{ width: '100%', padding: '9px 0', backgroundColor: t.status === 'finished' ? 'transparent' : '#7C3AED', border: t.status === 'finished' ? '1px solid #1E2540' : 'none', borderRadius: '8px', color: t.status === 'finished' ? '#8892A4' : '#FFFFFF', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                      {t.status === 'active' ? 'Ver en vivo' : t.status === 'finished' ? 'Ver resultados' : 'Inscribirse'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
}