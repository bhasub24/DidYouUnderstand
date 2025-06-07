import type { Concept, Assessment } from '../types';

export const concepts: Concept[] = [
  {
    id: 'variables',
    name: 'Variables',
    description: 'Understanding how to store and manipulate data',
    masteryLevel: 85,
    prerequisites: [],
    relatedConcepts: ['data-types', 'operators'],
    category: 'fundamentals'
  },
  {
    id: 'data-types',
    name: 'Data Types',
    description: 'Different types of data in programming',
    masteryLevel: 60,
    prerequisites: ['variables'],
    relatedConcepts: ['variables', 'arrays'],
    category: 'fundamentals'
  },
  {
    id: 'functions',
    name: 'Functions',
    description: 'Reusable blocks of code',
    masteryLevel: 40,
    prerequisites: ['variables', 'data-types'],
    relatedConcepts: ['parameters', 'return-values'],
    category: 'intermediate'
  },
  {
    id: 'loops',
    name: 'Loops',
    description: 'Repeating code execution',
    masteryLevel: 25,
    prerequisites: ['variables', 'data-types'],
    relatedConcepts: ['arrays', 'conditionals'],
    category: 'intermediate'
  },
  {
    id: 'arrays',
    name: 'Arrays',
    description: 'Collections of data',
    masteryLevel: 70,
    prerequisites: ['data-types'],
    relatedConcepts: ['loops', 'indexing'],
    category: 'intermediate'
  },
  {
    id: 'conditionals',
    name: 'Conditionals',
    description: 'Making decisions in code',
    masteryLevel: 90,
    prerequisites: ['variables', 'data-types'],
    relatedConcepts: ['boolean-logic', 'comparison'],
    category: 'fundamentals'
  }
];

export const assessments: Assessment[] = [
  {
    id: 'loops-basic',
    conceptId: 'loops',
    question: 'What will this loop output? for(let i = 0; i < 3; i++) { console.log(i); }',
    options: ['0, 1, 2', '1, 2, 3', '0, 1, 2, 3', 'Error'],
    correctAnswer: 0,
    explanation: 'The loop starts at 0, continues while i < 3, so it prints 0, 1, 2'
  },
  {
    id: 'functions-basic',
    conceptId: 'functions',
    question: 'What is the purpose of parameters in functions?',
    options: [
      'To make functions look more complex',
      'To pass data into functions',
      'To return values from functions',
      'To define function names'
    ],
    correctAnswer: 1,
    explanation: 'Parameters allow you to pass data into functions, making them flexible and reusable'
  }
];