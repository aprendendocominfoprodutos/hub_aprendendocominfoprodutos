// Estrutura de dados modular para todos os nichos
export const nichesData = {
  mitologia: {
    id: 'mitologia',
    title: 'Mitologia',
    description: 'Explore os mistérios das civilizações antigas',
    color: 'from-amber-600 to-amber-800',
    icon: '📚',
    categories: [
      {
        id: 'grega',
        title: 'Mitologia Grega',
        description: 'Deuses e heróis da Grécia Antiga',
        image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800&h=600&fit=crop',
        subNiches: [
          {
            id: 'deuses',
            title: 'Deuses Gregos',
            products: [
              { id: 1, name: 'Zeus', price: 'R$ 29,90' },
              { id: 2, name: 'Atena', price: 'R$ 29,90' },
              { id: 3, name: 'Poseidon', price: 'R$ 29,90' },
              { id: 4, name: 'Afrodite', price: 'R$ 29,90' },
            ]
          },
          {
            id: 'herois',
            title: 'Heróis Gregos',
            products: [
              { id: 1, name: 'Héracles', price: 'R$ 24,90' },
              { id: 2, name: 'Perseu', price: 'R$ 24,90' },
              { id: 3, name: 'Teseu', price: 'R$ 24,90' },
              { id: 4, name: 'Aquiles', price: 'R$ 24,90' },
            ]
          },
          {
            id: 'batalhas',
            title: 'Batalhas Gregas',
            products: [
              { id: 1, name: 'Troiana', price: 'R$ 34,90' },
              { id: 2, name: 'Maratona', price: 'R$ 34,90' },
              { id: 3, name: 'Salamina', price: 'R$ 34,90' },
              { id: 4, name: 'Termópilas', price: 'R$ 34,90' },
            ]
          },
          {
            id: 'geral',
            title: 'Mitologia Grega Geral',
            products: [
              { id: 1, name: 'Introdução', price: 'R$ 19,90' },
              { id: 2, name: 'Cosmologia', price: 'R$ 19,90' },
              { id: 3, name: 'Mitos Clássicos', price: 'R$ 19,90' },
              { id: 4, name: 'Legado Grego', price: 'R$ 19,90' },
            ]
          },
        ]
      },
      {
        id: 'nordica',
        title: 'Mitologia Nórdica',
        description: 'Deuses nórdicos e o Ragnarok',
        image: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=800&h=600&fit=crop',
        subNiches: [
          { id: 'deuses', title: 'Deuses Nórdicos', products: [{ id: 1, name: 'Odin', price: 'R$ 29,90' }, { id: 2, name: 'Thor', price: 'R$ 29,90' }, { id: 3, name: 'Loki', price: 'R$ 29,90' }, { id: 4, name: 'Freia', price: 'R$ 29,90' }] },
          { id: 'herois', title: 'Heróis Nórdicos', products: [{ id: 1, name: 'Sigurd', price: 'R$ 24,90' }, { id: 2, name: 'Ragnar', price: 'R$ 24,90' }, { id: 3, name: 'Beowulf', price: 'R$ 24,90' }, { id: 4, name: 'Leif', price: 'R$ 24,90' }] },
          { id: 'batalhas', title: 'Batalhas Nórdicas', products: [{ id: 1, name: 'Ragnarok', price: 'R$ 34,90' }, { id: 2, name: 'Valhala', price: 'R$ 34,90' }, { id: 3, name: 'Asgard', price: 'R$ 34,90' }, { id: 4, name: 'Midgard', price: 'R$ 34,90' }] },
          { id: 'geral', title: 'Mitologia Nórdica Geral', products: [{ id: 1, name: 'Introdução', price: 'R$ 19,90' }, { id: 2, name: 'Cosmologia', price: 'R$ 19,90' }, { id: 3, name: 'Mitos Clássicos', price: 'R$ 19,90' }, { id: 4, name: 'Legado Nórdico', price: 'R$ 19,90' }] },
        ]
      },
      {
        id: 'egipcia',
        title: 'Mitologia Egípcia',
        description: 'Deuses do Nilo',
        image: 'https://images.unsplash.com/photo-1570158268183-d296b2892211?w=800&h=600&fit=crop',
        subNiches: [
          { id: 'deuses', title: 'Deuses Egípcios', products: [{ id: 1, name: 'Rá', price: 'R$ 29,90' }, { id: 2, name: 'Osíris', price: 'R$ 29,90' }, { id: 3, name: 'Ísis', price: 'R$ 29,90' }, { id: 4, name: 'Hórus', price: 'R$ 29,90' }] },
          { id: 'herois', title: 'Heróis Egípcios', products: [{ id: 1, name: 'Faraó', price: 'R$ 24,90' }, { id: 2, name: 'Cleópatra', price: 'R$ 24,90' }, { id: 3, name: 'Ramsés', price: 'R$ 24,90' }, { id: 4, name: 'Tutancâmon', price: 'R$ 24,90' }] },
          { id: 'batalhas', title: 'Batalhas Egípcias', products: [{ id: 1, name: 'Pirâmides', price: 'R$ 34,90' }, { id: 2, name: 'Templos', price: 'R$ 34,90' }, { id: 3, name: 'Nilo', price: 'R$ 34,90' }, { id: 4, name: 'Além-vida', price: 'R$ 34,90' }] },
          { id: 'geral', title: 'Mitologia Egípcia Geral', products: [{ id: 1, name: 'Introdução', price: 'R$ 19,90' }, { id: 2, name: 'Cosmologia', price: 'R$ 19,90' }, { id: 3, name: 'Mitos Clássicos', price: 'R$ 19,90' }, { id: 4, name: 'Legado Egípcio', price: 'R$ 19,90' }] },
        ]
      },
      {
        id: 'asteca',
        title: 'Mitologia Asteca',
        description: 'Cosmologia Asteca',
        image: 'https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=800&h=600&fit=crop',
        subNiches: [
          { id: 'deuses', title: 'Deuses Astecas', products: [{ id: 1, name: 'Huitzilopochtli', price: 'R$ 29,90' }, { id: 2, name: 'Tezcatlipoca', price: 'R$ 29,90' }, { id: 3, name: 'Quetzalcóatl', price: 'R$ 29,90' }, { id: 4, name: 'Tlaloc', price: 'R$ 29,90' }] },
          { id: 'herois', title: 'Heróis Astecas', products: [{ id: 1, name: 'Montezuma', price: 'R$ 24,90' }, { id: 2, name: 'Cortés', price: 'R$ 24,90' }, { id: 3, name: 'Cuauhtémoc', price: 'R$ 24,90' }, { id: 4, name: 'Axayácatl', price: 'R$ 24,90' }] },
          { id: 'batalhas', title: 'Batalhas Astecas', products: [{ id: 1, name: 'Tenochtitlan', price: 'R$ 34,90' }, { id: 2, name: 'Conquista', price: 'R$ 34,90' }, { id: 3, name: 'Sacrifícios', price: 'R$ 34,90' }, { id: 4, name: 'Calendário', price: 'R$ 34,90' }] },
          { id: 'geral', title: 'Mitologia Asteca Geral', products: [{ id: 1, name: 'Introdução', price: 'R$ 19,90' }, { id: 2, name: 'Cosmologia', price: 'R$ 19,90' }, { id: 3, name: 'Mitos Clássicos', price: 'R$ 19,90' }, { id: 4, name: 'Legado Asteca', price: 'R$ 19,90' }] },
        ]
      },
    ]
  },
  // Fitness & Saúde será adicionado em seguida
  // Mental & Financeiro será adicionado em seguida
};
