import { Comment } from '../types/comment';

export const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    content: 'This is an excellent implementation! The user interface is intuitive and the performance is outstanding. I particularly appreciate the attention to detail in the animations.',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'Senior Developer'
    },
    timestamp: new Date('2025-01-15T10:30:00'),
    isEdited: false,
    likes: 12,
    isLiked: true,
    priority: 'high',
    tags: ['ui', 'performance'],
    replies: [
      {
        id: '1-1',
        content: 'Thank you for the feedback! We spent a lot of time on the animation details.',
        author: {
          name: 'Alex Rodriguez',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          role: 'Product Manager'
        },
        timestamp: new Date('2025-01-15T11:15:00'),
        isEdited: false,
        likes: 5,
        isLiked: false,
        replies: []
      }
    ]
  },
  {
    id: '2',
    content: 'Could we consider adding dark mode support? Many users have requested this feature and it would greatly improve accessibility.',
    author: {
      name: 'Marcus Johnson',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'UX Designer'
    },
    timestamp: new Date('2025-01-15T09:45:00'),
    isEdited: true,
    likes: 8,
    isLiked: false,
    priority: 'medium',
    tags: ['accessibility', 'feature-request'],
    replies: []
  },
  {
    id: '3',
    content: 'The mobile responsiveness needs some work. On smaller screens, the navigation menu overlaps with the content area.',
    author: {
      name: 'Emma Thompson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'QA Engineer'
    },
    timestamp: new Date('2025-01-15T08:20:00'),
    isEdited: false,
    likes: 3,
    isLiked: true,
    priority: 'high',
    tags: ['mobile', 'bug'],
    replies: []
  }
];

export const PRIORITY_COLORS = {
  low: 'bg-neutral-100 text-neutral-600',
  medium: 'bg-accent-100 text-accent-600',
  high: 'bg-danger-100 text-danger-600'
};

export const TAG_COLORS = [
  'bg-primary-100 text-primary-600',
  'bg-success-100 text-success-600',
  'bg-accent-100 text-accent-600',
  'bg-neutral-100 text-neutral-600'
];
