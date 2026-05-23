import { useEffect } from 'react';

export default function GreekMythology() {
  useEffect(() => {
    window.location.href = '/mitologia/grega/kit-completo/index.html';
  }, []);

  return (
    <div className="min-h-screen bg-[#050506] flex items-center justify-center text-[#c9a24a]">
      <p>Carregando Kit Completo...</p>
    </div>
  );
}
