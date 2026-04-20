import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Image src="/consola.png" alt="Mando de juego" width={50} height={50} /> 
        <h3>Game Hub</h3>
      </div>
      
     <h2>Bienvenido a GameCenter</h2>
     <p>Tu paltaforma para gestionar partidas, torneos y compartir tu conocimiento.</p>
    </main>
  );
}
