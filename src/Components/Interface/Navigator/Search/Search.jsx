import { BiSearch } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import Result from './Result';
import { routes } from './routes';

const Search = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {

        const parseQuery = () => {

            const search = query.toLowerCase();
            // 1st: phrase match (a === b)
            const phraseMatch = routes.find(({ title }) => search === title.toLowerCase());
            if (phraseMatch) return [ phraseMatch ];
        
            // 2nd: character match (a[i] === b[i]) - highest character match
            let characterMatches = [];
            for (let { title, route } of routes) {
                let score = 0;
                for (let i = 0; i < title.length; i++) {
                    const letterQuery = search[i];
                    const item = title[i]?.toLowerCase();
                    if (letterQuery === item) score++;
                };
                if ((score / title.length) >= 0.75) return [{ title, route }];
                // if there is 75% certainty of a result, return
                if (score) characterMatches.push({ title, route, score, relative: (score / title.length) });
                // only routes with a score > 0 will be included
            };
            // if a character match was found 
            if (characterMatches?.length) characterMatches = characterMatches.sort((a, b) => b.score - a.score);
            // limiting our pool to 3 results
            if (characterMatches?.length > 3) characterMatches.splice(1, 3);
            if (characterMatches?.length) return characterMatches;
    
            // 3rd: character inclusion (a.includes(b[i]) - highest character inclusion
            let characterIncls = [];
            for (let { title, route } of routes) {
                let score = 0;
                for (let i = 0; i < search.length; i++) {
                    const letterTitle = title[i].toLowerCase();
                    if (search.includes(letterTitle)) score++
                };
                if (score) characterIncls.push({ title, route, score });
            };
            if (characterIncls.length) return characterIncls.sort((a, b) => b.score - a.score);
    
            // 4th: phrase inclusion (a.includes(b))
            const phraseIncl = routes.filter(({ title }) => title.toLowerCase().includes(search));
            if (phraseIncl.length) return phraseIncl;
    
            // if no match at all
            return [];
        };
        if (query) return setResults(parseQuery());
        return setResults([]);

    }, [query]);



    const onChange = (e) => setQuery(e.currentTarget.value);
    const [active, setActive] = useState(false);
    const onFocus = (e) => {
        setActive(true);
        e.target.select();
    };
    const onBlur = () => setActive(false);

    // onFocus triggers an active state, onUnFocus triggers an inactive state

    return (
        <div onFocus={onFocus} onBlur={onBlur} className="relative hidden lg:flex gap-1 h-[2rem] w-[400px] border-2 p-2 rounded-lg border-inherit items-center">
            <BiSearch className="text-white md:h-[15px] md:w-[15px]" />
            <input onChange={onChange} className="outline-none placeholder:text-white md:text-xl w-full bg-black" type="text" placeholder="Search" value={query} />
            { (active && query) && <div className="absolute top-8 left-0 right-0 bg-white z-10 p-3 bg-black text-black border border-inherit rounded-lg h-max h-full max-h-60 overflow-auto">
                <div className="grid gap-1">
                    <h1 className="text-lg">Search Results</h1>
                    {
                        results.length ? 
                        results.map(({ title, route }, i) => (<Result title={title} route={route} setQuery={setQuery} key={`r${i}`}/>)) :
                        <div className="p-1 rounded-lg border border-white text-black">
                            <h1 className="text-lg">No Results Found</h1>
                        </div>
                    }
                </div>

            </div> }
        </div>
    )
};

export default Search;