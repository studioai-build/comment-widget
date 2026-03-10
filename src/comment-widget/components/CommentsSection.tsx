import { MessageSquare } from 'lucide-react';
import React from 'react';
import { useComments } from '../hooks/useComments';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';

export const CommentsSection: React.FC = () => {
  const { comments, isLoading, addComment, updateComment, deleteComment, toggleLike } = useComments();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Add New Comment</h2>
        <CommentForm onSubmit={addComment} isLoading={isLoading} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 text-neutral-600">
          <MessageSquare size={20} />
          <span className="font-medium">{comments?.length} Comments</span>
        </div>
      </div>

      <div className="space-y-6">
        {comments?.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare size={48} className="mx-auto text-neutral-300 mb-4" />
            <h3 className="text-lg font-medium text-neutral-500 mb-2">No comments found</h3>
            <p className="text-neutral-400">
              {searchTerm || filterPriority !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Be the first to share your thoughts!'
              }
            </p>
          </div>
        ) : (
          comments?.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={addComment}
              onEdit={updateComment}
              onDelete={deleteComment}
              onLike={toggleLike}
              isLoading={isLoading}
            />
          ))
        )}
      </div>
    </div>
  );
};
