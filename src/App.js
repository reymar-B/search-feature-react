import './App.css';
import { useEffect, useState } from 'react';


function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const API_KEY = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try { 
                const res = await fetch( `https://api.api-ninjas.com/v1/celebrity?name=${searchTerm}`,
                    {
                        headers: {
                            'X-Api-Key': `${API_KEY}`,
                        }
                    }
                );
                const data = await res.json();
                setSearchResults(data);
            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        }
        if (searchTerm.length > 0) {
            fetchData();
        }
    }, [searchTerm, API_KEY])


    return (
        <div className='container mx-auto text-center'>
            <form className='py-12'>
                <label className='block text-xl font-bold py-4' htmlFor="search">Search celebrity names and will display their networth</label>
                <input
                    className='p-1 text-l border-double border-4 border-sky-500 outline-sky-500 rounded w-1/2 h-12'
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                />
            </form>
            {error && <div>{ error.message }</div>}
            {isLoading ? <div>'Loading....'</div> : 
                <div className=''>
                    {searchResults.map((result, id) => (
                        <div className='w-1/2 mx-auto text-start' key={ id }>
                            <h2 className='text-2xl font-semibold text-blue-700'>Name: { result.name }</h2>
                            <p className='text-l'>Height: { result.height }</p>
                            <p className='text-l'>Occupation: { result.occupation }</p>
                            <p className='text-l'>Age: { result.age }</p>
                            <p className='text-l'>Net worth from 2023: ${ result.net_worth.toLocaleString() }</p>
                        </div> 
                    ) ) }
                </div> 
            }
        </div>

    );
}


export default App;
