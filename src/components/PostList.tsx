import { motion } from 'framer-motion';
import { HeartIcon, ChatBubbleLeftIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Post } from '../types/post';
import { StoryGroup } from '../types/story';
import StoryPreview from './StoryPreview';

const mockStories: StoryGroup[] = [
  {
    userId: '1',
    userName: 'Satoshi.eth',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    hasUnviewed: true,
    stories: [
      {
        id: '1',
        content: 'Working on a new blockchain project! 🚀',
        author: {
          id: '1',
          name: 'Satoshi.eth',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'
        },
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        viewedBy: [],
        interactions: { likes: 24, comments: 3, shares: 5 },
        tags: ['blockchain', 'development'],
        mood: 'excited'
      }
    ]
  },
  {
    userId: '2',
    userName: 'CryptoNinja',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    hasUnviewed: true,
    stories: [
      {
        id: '2',
        content: 'Check out this new DeFi protocol! 💫',
        author: {
          id: '2',
          name: 'CryptoNinja',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'
        },
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        viewedBy: [],
        interactions: { likes: 18, comments: 7, shares: 2 },
        tags: ['defi', 'crypto']
      }
    ]
  }
];

const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Building a decentralized future together! 🚀\nLet\'s shape the Web3 world! #blockchain #web3 #cryptocurrency',
    author: {
      name: 'Satoshi.eth',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'
    },
    createdAt: '2024-01-26T10:00:00Z',
    likes: 42,
    comments: 12,
    shares: 8
  },
  {
    id: '2',
    content: 'The potential of blockchain is limitless ✨\nLet\'s reclaim our data sovereignty! 💪\n#decentralization #privacy #freedom',
    author: {
      name: 'CryptoNinja',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'
    },
    createdAt: '2024-01-26T09:30:00Z',
    likes: 38,
    comments: 5,
    shares: 15
  },
  {
    id: '3',
    content: 'Designing new protocols... 👩‍💻\nP2P network optimization is key\nTestnet coming soon! Stay tuned!',
    author: {
      name: 'Web3Builder',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3'
    },
    createdAt: '2024-01-26T08:45:00Z',
    likes: 56,
    comments: 23,
    shares: 12
  }
];

interface PostListProps {
  posts?: Post[];
  stories?: StoryGroup[];
}

const PostList = ({ posts = mockPosts, stories = mockStories }: PostListProps) => {
  return (
    <div className="space-y-6">
      {/* Stories row */}
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-4 px-2">
          {stories.map((story) => (
            <StoryPreview
              key={story.userId}
              storyGroup={story}
              className="flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          className="card post-item"
        >
          <div className="flex items-start space-x-4">
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-base text-gradient hover-lift">
                    {post.author.name}
                  </h3>
                  <span className="text-gray-400 text-sm">
                    {new Date(post.createdAt).toLocaleDateString('ja-JP')}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-base leading-relaxed whitespace-pre-wrap text-gray-700 hover:text-gray-900 transition-colors duration-200">
                {post.content}
              </p>
              
              <div className="mt-4 flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors duration-200 hover-lift hover-glow px-3 py-1.5 rounded-full accent-border"
                >
                  <HeartIcon className="h-5 w-5" />
                  <span className="font-medium">{post.likes}</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-gray-500 hover:text-secondary transition-colors duration-200 hover-lift hover-glow px-3 py-1.5 rounded-full accent-border"
                >
                  <ChatBubbleLeftIcon className="h-5 w-5" />
                  <span className="font-medium">{post.comments}</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-gray-500 hover:text-accent-2 transition-colors duration-200 hover-lift hover-glow px-3 py-1.5 rounded-full accent-border"
                >
                  <ArrowPathRoundedSquareIcon className="h-5 w-5" />
                  <span className="font-medium">{post.shares}</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PostList;