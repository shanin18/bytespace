export type Course = {
  id: string;
  title: string;
  category: string;
  image: string;
  teacher: string;
  avatar: string;
  price: number;
  rating: string;
  students: string;
  lessons: number;
  hours: string;
  level: string;
  color: string;
  description: string;
};
export const photo = (id: string, _width = 800) => `/images/${id}.jpg`;
export const portrait = '/images/learner-cutout.png';
export const avatars = [
  photo('photo-1472099645785-5658abf4ff4e', 80),
  photo('photo-1494790108377-be9c29b29330', 80),
  photo('photo-1500648767791-00dcc994a43e', 80),
  photo('photo-1534528741775-53994a69daeb', 80),
];
export const courses: Course[] = [
  {
    id: 'graphic-design',
    title: 'Learn Graphic Design: From Idea to Impact',
    category: 'Design',
    image: photo('photo-1626785774573-4b799315345d'),
    teacher: 'Alex Morgan',
    avatar: avatars[0],
    price: 29,
    rating: '4.9',
    students: '2.4k',
    lessons: 24,
    hours: '6h 20m',
    level: 'Beginner',
    color: '#f6e9e3',
    description:
      'Turn your creative ideas into thoughtful, beautiful design. Build a strong foundation in typography, color, and composition with practical projects you can add to your portfolio.',
  },
  {
    id: 'digital-asset',
    title: 'Build Digital Assets: A Comprehensive Guide',
    category: 'Development',
    image: photo('photo-1558655146-9f40138edfeb'),
    teacher: 'Emily Johnson',
    avatar: avatars[1],
    price: 25,
    rating: '4.8',
    students: '1.8k',
    lessons: 18,
    hours: '5h 45m',
    level: 'All levels',
    color: '#eae9ed',
    description:
      'Learn to create digital products people love. From your first idea to a polished, launch-ready asset, discover a practical process for designing, building, and sharing your work.',
  },
  {
    id: 'web-design',
    title: 'The Power of Digital Web Design',
    category: 'Design',
    image: photo('photo-1555066931-4365d14bab8c'),
    teacher: 'James Wilson',
    avatar: avatars[2],
    price: 35,
    rating: '4.9',
    students: '3.1k',
    lessons: 32,
    hours: '8h 10m',
    level: 'Intermediate',
    color: '#dcebea',
    description:
      'Create exceptional websites with a complete, modern design workflow. Explore responsive layouts, accessible interfaces, and the details that turn a good website into a great experience.',
  },
  {
    id: 'interior-design',
    title: 'Building Beautiful Spaces: Interior Design',
    category: 'Lifestyle',
    image: photo('photo-1600210492486-724fe5c67fb0'),
    teacher: 'Sophia Chen',
    avatar: avatars[3],
    price: 39,
    rating: '4.7',
    students: '1.2k',
    lessons: 22,
    hours: '4h 50m',
    level: 'Beginner',
    color: '#eee9e2',
    description:
      'Bring spaces to life with thoughtful layouts, materials, and lighting. Learn the principles of interior design and develop your own visual language.',
  },
  {
    id: 'digital-marketing',
    title: 'Mastering Digital Marketing & Growth',
    category: 'Marketing',
    image: photo('photo-1460925895917-afdab827c52f'),
    teacher: 'Alex Morgan',
    avatar: avatars[0],
    price: 29,
    rating: '4.8',
    students: '2.7k',
    lessons: 28,
    hours: '7h 15m',
    level: 'All levels',
    color: '#e5efe6',
    description:
      'Connect with the right people and grow your business. Build a practical marketing strategy with audience research, engaging content, and meaningful analytics.',
  },
  {
    id: 'photography',
    title: 'Photography Essentials: Capture Your World',
    category: 'Photography',
    image: photo('photo-1452587925148-ce544e77e70d'),
    teacher: 'Emily Johnson',
    avatar: avatars[1],
    price: 25,
    rating: '4.9',
    students: '1.9k',
    lessons: 20,
    hours: '5h 30m',
    level: 'Beginner',
    color: '#f3e7dc',
    description:
      'See the world through a new lens. Understand exposure, light, and visual storytelling with approachable exercises you can do with any camera.',
  },
  {
    id: 'business',
    title: 'From First Idea to Your Own Business',
    category: 'Business',
    image: photo('photo-1521737711867-e3b97375f902'),
    teacher: 'James Wilson',
    avatar: avatars[2],
    price: 45,
    rating: '4.8',
    students: '980',
    lessons: 26,
    hours: '6h 40m',
    level: 'Beginner',
    color: '#e4e9ec',
    description:
      'Build a business with a clear purpose. Validate your idea, understand your customers, and create an actionable plan for your first launch.',
  },
  {
    id: 'ui-design',
    title: 'UI Design Fundamentals in Figma',
    category: 'Design',
    image: photo('photo-1559028012-481c04fa702d'),
    teacher: 'Sophia Chen',
    avatar: avatars[3],
    price: 32,
    rating: '4.9',
    students: '2.2k',
    lessons: 30,
    hours: '7h 20m',
    level: 'Intermediate',
    color: '#ede8f3',
    description:
      'Design intuitive digital experiences in Figma. Work through real interface challenges, from wireframes and components to polished interactive prototypes.',
  },
  {
    id: 'coding',
    title: 'Your First Website with HTML & CSS',
    category: 'Development',
    image: photo('photo-1498050108023-c5249f4df085'),
    teacher: 'Alex Morgan',
    avatar: avatars[0],
    price: 19,
    rating: '4.7',
    students: '4.1k',
    lessons: 16,
    hours: '4h 10m',
    level: 'Beginner',
    color: '#e0e9eb',
    description:
      'Start your journey into web development. Learn the building blocks of the web and publish your own responsive website through hands-on lessons.',
  },
];
export const categories = [
  'All courses',
  'Design',
  'Development',
  'Marketing',
  'Business',
  'Photography',
  'Lifestyle',
];
export const lessonGroups = [
  {
    title: 'Getting started',
    lessons: ['Welcome to the course', 'Your creative toolkit', 'Setting your learning goals'],
  },
  {
    title: 'Building a strong foundation',
    lessons: [
      'Understanding the fundamentals',
      'Finding inspiration & research',
      'From ideas to a clear direction',
      'Your first practical project',
    ],
  },
  {
    title: 'Bringing it all together',
    lessons: ['Refining your work', 'Presenting your final project', 'Your next steps'],
  },
];
