"use client";

import { Song } from '@/types';
import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({
  songs
}) => {
  if (songs.length === 0){
    return (
      <div className="flex flex-col w-full px-6 gap-y-2 text-neutral-400">
        No songs found.
      </div>
    )
  }
  return (
    <div className="flex flex-col w-full px-6 gap-y-2">
      {
        songs.map((song) => (
          <div key={song.id} className="flex items-center w-full gap-x-4">
            <div className="flex-1">
              <MediaItem 
                onClick={() => {}}
                data={song}
              />
            </div>
            <LikeButton songId={song.id} />
          </div>
        ))
      }
    </div>
  )
}

export default SearchContent