import { useState, useCallback } from 'react';
import { Comment, CommentFormData } from '../types/comment';
import { MOCK_COMMENTS } from '../constants/mockData';
import _ from 'lodash';

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [isLoading, setIsLoading] = useState(false);

  const addComment = useCallback(async (formData: CommentFormData, parentId?: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newComment: Comment = {
      id: Date.now().toString(),
      content: formData.content,
      author: {
        name: 'Current User',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        role: 'Developer'
      },
      timestamp: new Date(),
      isEdited: false,
      likes: 0,
      isLiked: false,
      priority: formData.priority || 'medium',
      tags: formData.tags || [],
      replies: []
    };

    setComments(prevComments => {
      if (parentId) {
        return prevComments.map(comment => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newComment]
            };
          }
          return comment;
        });
      }
      return [newComment, ...prevComments];
    });
    
    setIsLoading(false);
  }, []);

  const updateComment = useCallback(async (commentId: string, content: string, parentId?: string) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setComments(prevComments => {
      if (parentId) {
        return prevComments.map(comment => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: comment.replies?.map(reply => 
                reply.id === commentId 
                  ? { ...reply, content, isEdited: true }
                  : reply
              ) || []
            };
          }
          return comment;
        });
      }
      
      return prevComments.map(comment => 
        comment.id === commentId 
          ? { ...comment, content, isEdited: true }
          : comment
      );
    });
    
    setIsLoading(false);
  }, []);

  const deleteComment = useCallback(async (commentId: string, parentId?: string) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setComments(prevComments => {
      if (parentId) {
        return prevComments.map(comment => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: comment.replies?.filter(reply => reply.id !== commentId) || []
            };
          }
          return comment;
        });
      }
      
      return prevComments.filter(comment => comment.id !== commentId);
    });
    
    setIsLoading(false);
  }, []);

  const toggleLike = useCallback(async (commentId: string, parentId?: string) => {
    setComments(prevComments => {
      if (parentId) {
        return prevComments.map(comment => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: comment.replies?.map(reply => 
                reply.id === commentId 
                  ? { 
                      ...reply, 
                      isLiked: !reply.isLiked,
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                    }
                  : reply
              ) || []
            };
          }
          return comment;
        });
      }
      
      return prevComments.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
            }
          : comment
      );
    });
  }, []);

  const sortedComments = _.orderBy(comments, ['timestamp'], ['desc']);

  return {
    comments: sortedComments,
    isLoading,
    addComment,
    updateComment,
    deleteComment,
    toggleLike
  };
};
