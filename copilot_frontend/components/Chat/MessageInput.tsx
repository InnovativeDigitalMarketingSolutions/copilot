import React, { useState, useRef } from 'react';
import { Send, Mic, Paperclip, Smile } from 'lucide-react';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (content: string, attachments?: File[]) => void;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
  placeholder = "Type a message..."
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() || attachments.length > 0) {
      onSend(value, attachments);
      setAttachments([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-white/[0.08] backdrop-blur-2xl rounded-2xl px-4 py-2 shadow-lg shadow-black/10"
            >
              <span className="text-sm text-white/90 font-medium">{file.name}</span>
              <button
                onClick={() => removeAttachment(index)}
                className="text-white/50 hover:text-white transition-colors duration-200"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input container */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="bg-white/[0.08] backdrop-blur-3xl rounded-3xl border border-white/[0.12] focus-within:border-blue-400/60 focus-within:shadow-2xl focus-within:shadow-blue-500/20 transition-all duration-300 ease-out shadow-2xl shadow-black/20">
          <div className="flex items-end space-x-4 p-6">
            {/* Attachment button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-12 h-12 rounded-2xl bg-white/[0.08] backdrop-blur-2xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.15] hover:shadow-lg hover:shadow-white/10 hover:scale-105 transition-all duration-300 ease-out"
            >
              <Paperclip size={20} />
            </button>

            {/* Text input */}
            <div className="flex-1">
              <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full bg-transparent text-white placeholder-white/40 resize-none focus:outline-none min-h-[28px] max-h-32 text-base leading-relaxed"
                rows={1}
                style={{ 
                  height: 'auto',
                  minHeight: '28px'
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ease-out ${
                  isRecording 
                    ? 'bg-red-500/90 backdrop-blur-xl text-white shadow-2xl shadow-red-500/30 scale-105' 
                    : 'bg-white/[0.08] backdrop-blur-2xl text-white/50 hover:text-white hover:bg-white/[0.15] hover:shadow-lg hover:shadow-white/10 hover:scale-105'
                }`}
              >
                <Mic size={20} />
              </button>

              <button
                type="submit"
                disabled={!value.trim() && attachments.length === 0}
                className="w-12 h-12 rounded-2xl bg-blue-500/90 backdrop-blur-xl text-white flex items-center justify-center hover:bg-blue-600/90 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 ease-out shadow-2xl shadow-blue-500/25"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </form>
    </div>
  );
};