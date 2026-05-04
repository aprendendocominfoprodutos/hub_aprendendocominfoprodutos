import SecondaryHub from '@/components/SecondaryHub';

const mythologyCategories = [
  {
    id: 'grega',
    title: 'Mitologia Grega',
    description: 'Deuses e heróis da Grécia Antiga',
    image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800&h=600&fit=crop',
  },
  {
    id: 'nordica',
    title: 'Mitologia Nórdica',
    description: 'Deuses nórdicos e o Ragnarok',
    image: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=800&h=600&fit=crop',
  },
  {
    id: 'egipcia',
    title: 'Mitologia Egípcia',
    description: 'Deuses do Nilo',
    image: 'https://images.unsplash.com/photo-1570158268183-d296b2892211?w=800&h=600&fit=crop',
  },
  {
    id: 'asteca',
    title: 'Mitologia Asteca',
    description: 'Cosmologia Asteca',
    image: 'https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=800&h=600&fit=crop',
  },
];

export default function MythologySecondary() {
  return (
    <SecondaryHub
      title="Mitologia"
      description="Explore os mistérios das civilizações antigas"
      categories={mythologyCategories}
      backLink="/"
      baseLink="/mitologia"
    />
  );
}
