import React, { useState } from 'react';
import { Heart, Reply, Edit2, Trash2, MoreHorizontal, Clock } from 'lucide-react';
import { Comment, CommentFormData } from '../types/comment';
import { CommentForm } from './CommentForm';
import { PRIORITY_COLORS, TAG_COLORS } from '../constants/mockData';
import { cn } from '../utils/cn';
import { formatDistanceToNow } from '../utils/dateUtils';

interface CommentItemProps {
  comment: Comment;
  onReply: (data: CommentFormData, parentId: string) => void;
  onEdit: (commentId: string, content: string, parentId?: string) => void;
  onDelete: (commentId: string, parentId?: string) => void;
  onLike: (commentId: string, parentId?: string) => void;
  isLoading?: boolean;
  parentId?: string;
  depth?: number;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onReply,
  onEdit,
  onDelete,
  onLike,
  isLoading = false,
  parentId,
  depth = 0
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [showMenu, setShowMenu] = useState(false);

  const handleReply = (data: CommentFormData) => {
    onReply(data, comment.id);
    setShowReplyForm(false);
  };

  const handleEdit = () => {
    onEdit(comment.id, editContent, parentId);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      onDelete(comment.id, parentId);
    }
  };

  const isNested = depth > 0;

  return (
    <div className={cn(
      "group animate-fade-in",
      isNested && "ml-8 border-l-2 border-neutral-100 pl-6"
    )}>
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start gap-4">
          <img
            src={comment.author.avatar}
            alt={comment.author.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-neutral-100"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h4 className="font-semibold text-neutral-900">{comment.author.name}</h4>
                {comment.author.role && (
                  <span className="px-2 py-1 bg-primary-100 text-primary-600 text-xs rounded-md font-medium">
                    {comment.author.role}
                  </span>
                )}
                {comment.priority && (
                  <span className={cn(
                    "px-2 py-1 text-xs rounded-md font-medium",
                    PRIORITY_COLORS[comment.priority]
                  )}>
                    {comment.priority}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-neutral-500">
                  <Clock size={12} />
                  {formatDistanceToNow(comment.timestamp)}
                  {comment.isEdited && <span className="text-neutral-400">(edited)</span>}
                </div>
                
                <div className="relative">
                  <button
                    data-name="comment-menu-button"
                    data-description="Open comment options menu"
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-1 rounded-lg hover:bg-neutral-100 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                  
                  {showMenu && (
                    <div className="absolute right-0 top-8 bg-white border border-neutral-200 rounded-lg shadow-lg py-1 z-10 min-w-32">
                      <button
                        data-name="edit-comment-button"
                        data-description="Edit this comment"
                        onClick={() => {
                          setIsEditing(true);
                          setShowMenu(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-50 flex items-center gap-2"
                      >
                        <Edit2 size={14} />
                        Edit
                      </button>
                      <button
                        data-name="delete-comment-button"
                        data-description="Delete this comment"
                        onClick={() => {
                          handleDelete();
                          setShowMenu(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-50 flex items-center gap-2 text-danger-600"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  data-name="edit-comment-textarea"
                  data-description="Edit comment content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    data-name="save-edit-button"
                    data-description="Save comment changes"
                    onClick={handleEdit}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    data-name="cancel-edit-button"
                    data-description="Cancel editing comment"
                    onClick={() => {
                      setIsEditing(false);
                      setEditContent(comment.content);
                    }}
                    className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-neutral-700 leading-relaxed mb-3">{comment.content}</p>
                
                {comment.tags && comment.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {comment.tags.map((tag, index) => (
                      <span
                        key={tag}
                        className={cn(
                          "px-2 py-1 text-xs rounded-md font-medium",
                          TAG_COLORS[index % TAG_COLORS.length]
                        )}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <button
                    data-name="like-comment-button"
                    data-description="Like or unlike this comment"
                    onClick={() => onLike(comment.id, parentId)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                      comment.isLiked
                        ? "bg-danger-50 text-danger-600 hover:bg-danger-100"
                        : "hover:bg-neutral-100 text-neutral-600"
                    )}
                  >
                    <Heart 
                      size={16} 
                      className={comment.isLiked ? "fill-current" : ""} 
                    />
                    {comment.likes}
                  </button>
                  
                  {!isNested && (
                    <button
                      data-name="reply-to-comment-button"
                      data-description="Reply to this comment"
                      onClick={() => setShowReplyForm(!showReplyForm)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-neutral-100 text-neutral-600 transition-all"
                    >
                      <Reply size={16} />
                      Reply
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {showReplyForm && (
          <div className="mt-6 pt-6 border-t border-neutral-100">
            <CommentForm
              onSubmit={handleReply}
              isLoading={isLoading}
              placeholder="Write a reply..."
              isReply={true}
              onCancel={() => setShowReplyForm(false)}
            />
          </div>
        )}
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              onLike={onLike}
              isLoading={isLoading}
              parentId={comment.id}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
