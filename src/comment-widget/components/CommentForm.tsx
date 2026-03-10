import { AlertCircle, Send } from 'lucide-react';
import React, { useState } from 'react';
import { CommentFormData } from '../types/comment';
import { cn } from '../utils/cn';

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void;
  isLoading?: boolean;
  placeholder?: string;
  isReply?: boolean;
  onCancel?: () => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  isLoading = false,
  placeholder = "Share your thoughts...",
  isReply = false,
  onCancel
}) => {
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit({
      content: content.trim(),
      priority,
      tags
    });

    setContent('');
    setTags([]);
    setTagInput('');
    setPriority('medium');
    setShowAdvanced(false);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <textarea
          data-name="comment-content-textarea"
          data-description="Text area for writing comment content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          rows={isReply ? 3 : 4}
          className="w-full px-4 py-3 border border-neutral-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 placeholder-neutral-400"
          disabled={isLoading}
        />
        <div className="absolute bottom-3 right-3 text-xs text-neutral-400">
          {content.length}/1000
        </div>
      </div>

      {showAdvanced && (
        <div className="space-y-4 p-4 bg-neutral-50 rounded-xl animate-slide-up">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Priority Level
            </label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  data-name={`priority-${level}-button`}
                  data-description={`Set comment priority to ${level}`}
                  onClick={() => setPriority(level)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                    priority === level
                      ? level === 'high' 
                        ? 'bg-danger-500 text-white'
                        : level === 'medium'
                        ? 'bg-accent-500 text-white'
                        : 'bg-neutral-500 text-white'
                      : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                  )}
                >
                  {level === 'high' && <AlertCircle size={14} className="inline mr-1" />}
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                data-name="tag-input"
                data-description="Input field for adding tags to comment"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add a tag..."
                className="flex-1 px-3 py-1.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="button"
                data-name="add-tag-button"
                data-description="Add the entered tag to the comment"
                onClick={addTag}
                className="px-3 py-1.5 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition-colors"
              >
                Add
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-600 rounded-md text-xs"
                  >
                    {tag}
                    <button
                      type="button"
                      data-name="remove-tag-button"
                      data-description={`Remove ${tag} tag from comment`}
                      onClick={() => removeTag(tag)}
                      className="hover:text-primary-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="text-xs text-neutral-500">
          {isReply ? 'Reply to comment' : 'Share your thoughts with the community'}
        </div>
        <div className="flex gap-2">
          {isReply && onCancel && (
            <button
              type="button"
              data-name="cancel-reply-button"
              data-description="Cancel replying to comment"
              onClick={onCancel}
              className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            data-name="submit-comment-button"
            data-description="Submit the comment or reply"
            disabled={!content.trim() || isLoading}
            className="flex items-center gap-2 px-6 py-2 bg-primary-500 text-white rounded-xl bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send size={16} />
            )}
            {isReply ? 'Reply' : 'Post'}
          </button>
        </div>
      </div>
    </form>
  );
};
