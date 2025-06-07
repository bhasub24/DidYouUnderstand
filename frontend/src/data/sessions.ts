import type { LearningSession, Resource } from '../types';

export const learningSessions: LearningSession[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Learning core JavaScript concepts including variables, functions, and loops',
    createdAt: new Date('2024-01-15'),
    lastAccessed: new Date('2024-01-20'),
    progress: 65,
    totalConcepts: 8,
    masteredConcepts: 5,
    subject: 'JavaScript',
    hasAttachment: true,
    attachmentName: 'javascript-guide.pdf'
  },
  {
    id: '2',
    title: 'React Components',
    description: 'Understanding React component lifecycle and state management',
    createdAt: new Date('2024-01-10'),
    lastAccessed: new Date('2024-01-18'),
    progress: 40,
    totalConcepts: 12,
    masteredConcepts: 4,
    subject: 'React',
    hasAttachment: false
  },
  {
    id: '3',
    title: 'Data Structures',
    description: 'Exploring arrays, objects, and advanced data structures',
    createdAt: new Date('2024-01-05'),
    lastAccessed: new Date('2024-01-16'),
    progress: 85,
    totalConcepts: 6,
    masteredConcepts: 5,
    subject: 'Computer Science',
    hasAttachment: true,
    attachmentName: 'data-structures.pdf'
  }
];

export const suggestedResources: Resource[] = [
  {
    id: '1',
    title: 'MDN JavaScript Guide',
    description: 'Comprehensive guide to JavaScript fundamentals',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
    type: 'article',
    difficulty: 'beginner'
  },
  {
    id: '2',
    title: 'React Official Documentation',
    description: 'Official React documentation with examples',
    url: 'https://react.dev/learn',
    type: 'tutorial',
    difficulty: 'intermediate'
  },
  {
    id: '3',
    title: 'Algorithms and Data Structures',
    description: 'Free course on fundamental algorithms',
    url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
    type: 'tutorial',
    difficulty: 'intermediate'
  }
];