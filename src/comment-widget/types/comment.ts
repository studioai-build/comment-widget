export interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  timestamp: Date;
  isEdited: boolean;
  replies?: Comment[];
  likes: number;
  isLiked: boolean;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}

export interface CommentFormData {
  content: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}
