import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryGroup } from '../types/story';
import StoryViewer from './StoryViewer';

interface StoryPreviewProps {
  storyGroup: StoryGroup;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StoryPreview: React.FC<StoryPreviewProps> = ({
  storyGroup,
  size = 'md',
  className = ''
}) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative ${className}`}
        onClick={() => setIsViewerOpen(true)}
      >
        <div className={`${sizeClasses[size]} relative`}>
          {/* Story ring gradient background */}
          <div
            className={`absolute inset-0 rounded-full ${storyGroup.hasUnviewed ? 'bg-gradient-to-tr from-primary via-secondary to-accent-1' : 'bg-gray-300'}`}
          >
            <div className="absolute inset-[2px] rounded-full bg-white">
              <motion.img
                src={storyGroup.userAvatar}
                alt={storyGroup.userName}
                className="w-full h-full rounded-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
        {/* Username */}
        <span className="mt-1 block text-xs text-center font-medium text-gray-700 truncate">
          {storyGroup.userName}
        </span>
      </motion.button>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {isViewerOpen && (
          <StoryViewer
            storyGroups={[storyGroup]}
            onClose={() => setIsViewerOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default StoryPreview;
