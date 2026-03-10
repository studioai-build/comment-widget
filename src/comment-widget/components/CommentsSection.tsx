import React from 'react';
import { MessageSquare, Filter, Search } from 'lucide-react';
import { CommentItem } from './CommentItem';
import { CommentForm } from './CommentForm';
import { useComments } from '../hooks/useComments';
import { useState } from 'react';

export const CommentsSection: React.FC = () => {
  const { comments, isLoading, addComment, updateComment, deleteComment, toggleLike } = useComments();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || comment.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Add New Comment</h2>
        <CommentForm onSubmit={addComment} isLoading={isLoading} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 text-neutral-600">
          <MessageSquare size={20} />
          <span className="font-medium">{filteredComments.length} Comments</span>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              data-name="search-comments-input"
              data-description="Search through comments by content or author"
              placeholder="Search comments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
            />
          </div>
          
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <select
              data-name="filter-priority-select"
              data-description="Filter comments by priority level"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as any)}
              className="pl-10 pr-8 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredComments.length === 0 ? (
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
          filteredComments.map((comment) => (
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
