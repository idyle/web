import { BiSearch } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import Result from './Result';

const Search = () => {

    const [data] = useState([
        { title: 'Accounts', route: '/accounts' },
        { title: 'Profile' , route: '/accounts/profile' },
        { title: 'Editor', route: '/editor' },
        { title: 'Canvas', route: '/editor/canvas' },
        { title: 'Codebase', route: '/editor/codebase' }
    ]);

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {

        const parseQuery = () => {

            // 1st: phrase match (a===b)
            const phraseMatch = data.find(({ title }) => query === title);
            console.log('phrasematch', phraseMatch);
            if (phraseMatch) return [ phraseMatch ];
        
            // 2nd: character match (a[i] === b[i]) - highest character match
            let characterMatches = [];
            for (let { title, route } of data) {
                let score = 0;
                for (let i = 0; i < query.length; i++) {
                    const letterQuery = query[i];
                    const item = title[i];
                    if (letterQuery === item) score++;
                };
                if (score) characterMatches.push({ title, route, score });
                // only routes with a score > 0 will be included
            };
            console.log('charac match', characterMatches);
            if (characterMatches.length) return characterMatches.sort((a, b) => b.score - a.score);
    
            // 3rd: character inclusion (a.includes(b[i]) - highest character inclusion
            let characterIncls = [];
            for (let { title, route } of data) {
                let score = 0;
                for (let i = 0; i < query.length; i++) {
                    const letterTitle = title[i];
                    if (query.includes(letterTitle)) score++
                };
                console.log('for title query', title, query, 'score', score);
                if (score) characterIncls.push({ title, route, score });
            };
            console.log('charac incl', characterIncls);
            if (characterIncls.length) return characterIncls.sort((a, b) => b.score - a.score);
    
            // 4th: phrase inclusion (a.includes(b))
            const phraseIncl = data.filter(({ title }) => title.includes(query));
            console.log('phrase match', phraseIncl);
            if (phraseIncl.length) return phraseIncl;
    
            // if no match at all
            return [];
        };
        if (query) return setResults(parseQuery());
        return setResults([]);

    }, [query]);



    const test = (e) => {
        setQuery(e.target.value);
    };

    const [active, setActive] = useState(false);
    const onFocus = (e) => {
        setActive(true);
        e.target.select();
    };
    const onBlur = () => setActive(false);

    // onFocus triggers an active state, onUnFocus triggers an inactive state

    return (
        <div onFocus={onFocus} onBlur={onBlur} className="relative flex gap-1 h-[2rem] w-[20rem] border p-2 rounded-lg border-black items-center">
            <BiSearch color="black" size="10px"/>
            <input onChange={test} className="outline-none placeholder:text-black text-lg w-full" type="text" placeholder="Search" />
            { active && <div className="absolute top-8 left-0 right-0 bg-white z-10 p-3 bg-black text-white border border-black rounded-lg h-max h-full max-h-60 overflow-auto">
                <div className="grid gap-1">
                    <h1 className="text-lg">Search Results</h1>
                    {
                        results.length ? 
                        results.map(({ title, route }, i) => (<Result title={title} route={route} key={`r${i}`}/>)) :
                        <div className="p-1 rounded-lg border border-white text-white">
                            <h1 className="text-lg">No Results Found</h1>
                        </div>
                    }
                </div>

            </div> }
        </div>
    )
};

export default Search;