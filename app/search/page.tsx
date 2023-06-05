import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import SearchContent from './components/SearchContent';
import getSongsByTitle from '@/actions/getSongsByTitle';

interface SearchProps {
    searchParams: {
        title: string;
    }
}

const Search = async ({ searchParams }: SearchProps) => {
    const songs = await getSongsByTitle(searchParams.title);

    return (
        <div className="w-full h-full overflow-hidden overflow-y-auto rounded-lg  bg-neutral-900">
            <Header className="from-bg-neutral-900">
                <div className="flex flex-col mb-2 gap-y-6">
                    <h1 className="text-3xl font-semibold text-white">
                        Search
                    </h1>
                    <SearchInput />
                </div>
            </Header>
            <SearchContent songs={songs} />
        </div>
    )
}

export default Search;