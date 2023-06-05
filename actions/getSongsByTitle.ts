import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/heaers';

import { Song } from '@/types';
import getSongs from '@/actions/getSongs';

interface

const getSongsByTitle = async (): Promise<Song []> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    if (!title) {
        const allSongs = await getSongs();
        return allSongs;
    }

    const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', { ascending: false});
    if (error) {
        console.log(error)
    }

    return (data as any) || [];
}

export default getSongsByTitle;