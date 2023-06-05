import { Song } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/heaers';

const getSongs = async (): Promise<Song []> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const { data, error } = supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });

    if (error) {
        console.log(error)
    }

    return (data as any) || [];
}

export default getSongs();