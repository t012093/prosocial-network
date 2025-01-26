export interface Story {
  id: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  expiresAt: string;
  viewedBy: string[];
  interactions: {
    likes: number;
    comments: number;
    shares: number;
  };
  tags?: string[];
  mood?: string;
  location?: {
    name: string;
    coordinates?: [number, number];
  };
}

export interface StoryGroup {
  userId: string;
  userName: string;
  userAvatar: string;
  stories: Story[];
  hasUnviewed: boolean;
}
