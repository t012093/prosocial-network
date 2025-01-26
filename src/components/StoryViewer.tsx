import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Story, StoryGroup } from '../types/story';
import { XMarkIcon, HeartIcon, ChatBubbleLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface StoryViewerProps {
  storyGroups: StoryGroup[];
  initialGroupIndex?: number;
  initialStoryIndex?: number;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({
  storyGroups,
  initialGroupIndex = 0,
  initialStoryIndex = 0,
  onClose,
}) => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(initialGroupIndex);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const currentGroup = storyGroups[currentGroupIndex];
  const currentStory = currentGroup?.stories[currentStoryIndex];

  useEffect(() => {
    if (!isPaused && currentStory) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(timer);
    }
  }, [currentStory, isPaused]);

  const handleNext = () => {
    if (currentStoryIndex < currentGroup.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else if (currentGroupIndex < storyGroups.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
      setCurrentStoryIndex(0);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    } else if (currentGroupIndex > 0) {
      setCurrentGroupIndex(currentGroupIndex - 1);
      setCurrentStoryIndex(storyGroups[currentGroupIndex - 1].stories.length - 1);
      setProgress(0);
    }
  };

  if (!currentStory) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
    >
      <div className="relative w-full max-w-lg h-[80vh] bg-gradient-to-b from-gray-900 to-black rounded-3xl overflow-hidden">
        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2">
          {currentGroup.stories.map((_, index) => (
            <div
              key={index}
              className="h-1 flex-1 bg-gray-600/50 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-white"
                initial={{ width: index < currentStoryIndex ? '100%' : '0%' }}
                animate={{
                  width: index === currentStoryIndex ? `${progress}%` :
                         index < currentStoryIndex ? '100%' : '0%'
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <motion.img
              src={currentGroup.userAvatar}
              alt={currentGroup.userName}
              className="w-10 h-10 rounded-full ring-2 ring-primary/20"
              whileHover={{ scale: 1.1 }}
            />
            <div>
              <h3 className="font-semibold text-white">{currentGroup.userName}</h3>
              <p className="text-sm text-gray-300">
                {new Date(currentStory.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div
          className="relative h-full"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Navigation hitboxes */}
          <div
            className="absolute left-0 top-0 w-1/3 h-full z-10"
            onClick={handlePrevious}
          />
          <div
            className="absolute right-0 top-0 w-1/3 h-full z-10"
            onClick={handleNext}
          />

          {/* Media content */}
          <AnimatePresence mode='wait'>
            <motion.div
              key={`${currentGroupIndex}-${currentStoryIndex}`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="h-full flex items-center justify-center p-4"
            >
              {currentStory.mediaType === 'image' ? (
                <img
                  src={currentStory.mediaUrl}
                  alt="Story content"
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              ) : currentStory.mediaType === 'video' ? (
                <video
                  src={currentStory.mediaUrl}
                  autoPlay
                  loop
                  muted
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              ) : (
                <p className="text-white text-lg text-center p-6">
                  {currentStory.content}
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Interactions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between"
            >
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className="text-white hover:text-primary transition-colors"
                >
                  {isLiked ? (
                    <HeartIconSolid className="w-6 h-6 text-primary" />
                  ) : (
                    <HeartIcon className="w-6 h-6" />
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white hover:text-secondary transition-colors"
                >
                  <ChatBubbleLeftIcon className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white hover:text-accent-1 transition-colors"
                >
                  <ShareIcon className="w-6 h-6" />
                </motion.button>
              </div>
              {currentStory.location && (
                <span className="text-sm text-gray-300">
                  📍 {currentStory.location.name}
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StoryViewer;
