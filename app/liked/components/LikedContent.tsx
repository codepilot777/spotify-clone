"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({
  songs
}) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  useEffect(() =>{
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router])


  if (songs.length === 0) {
    return (
      <div className="flex flex-col w-full px-6 gap-y-2 text-400">
        No Liked Songs
      </div>
    )
  }
  return (
    <div className="flex flex-col w-full p-6 gap-y-2">
      {
        songs.map((song) => (
          <div className="flex items-center w-full gap-x-4" key={song.id}>
            <div className="flex-1">
              <MediaItem data={song} onClick={()=>{}} />
            </div>
            <LikeButton songId={song.id} />
          </div>
        ))
      }
    </div>
  )
}

export default LikedContent;