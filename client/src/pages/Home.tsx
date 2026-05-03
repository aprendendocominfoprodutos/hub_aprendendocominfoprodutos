import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Página Home - Redirecionamento
 * 
 * Esta página redireciona para a landing page de Mitologia por padrão.
 * O roteamento é feito no App.tsx
 */
export default function Home() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirecionar para Mitologia por padrão
    setLocation('/mythcuriotvbrasil');
  }, [setLocation]);

  return null;
}
