import React, { useState } from 'react';

function App() {
  const [yards, setYards] = useState(0);
  const [week, setWeek] = useState(1);
  const [year, setYear] = useState(2023);

  const [error, setError] = useState<null|string>(null);
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<null | number>(null);
  const sendRequest = async() => {
      if(yards < 0){
        setError("Yards can not be less than 0")
        return;
      } else if(yards > 1000){
        setError("Yards can not be greater than 1000")
        return;
      } else if(week < 1 || week > 17){
        setError("Week must be between 1 and 17")
        return;
      } else if(year < 2009 || year > 2030){
        setError("Year must be between 2009 and 2030")
        return;
      }

      setError(null);

      const data = {
        'Yards': yards, 
        'Week': week, 
        'Year': year
      };

      const url = 'http://0.0.0.0:8000/predict'

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };

      setLoading(true);

      fetch(url, requestOptions)
        .then(response => {
          if (!response.ok) {
            setError("http error")
          }
          return response.json();
        })
        .then(data => {
          setResult(data.prediction[0]);
        })
        .catch(error => {
          setError(JSON.stringify(error));
        });

        setLoading(false);
  }

  return (
    <>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between py-4 border-b md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-2xl font-bold">
                        Linear Regression for Personal Fouls in the NFL
                    </h3>
                    <p className="text-gray-600 mt-2">
                        This ML model is based on a dataset from 2009 - 2022.
                    </p>
                </div>
            </div>
        </div>
        {
            loading ? 
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div> :
            <>
            <div className="flex mt-12 px-12 gap-6">
        
              <div className="relative max-w-xs">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
                <input
                    type="number"
                    value={yards}
                    onChange={(e) => setYards(parseInt(e.target.value))}
                    placeholder="Yards"
                    className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>

              <div className="relative max-w-xs">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>

                <input
                    type="number"
                    placeholder="Week"
                    value={week}
                    onChange={(e) => setWeek(parseInt(e.target.value))}
                    className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>

            <div className="relative max-w-xs">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  placeholder="Year"
                  className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              </div>
          </div>

        <div className='mt-12 px-12'>
            <button onClick={sendRequest} className="px-6 py-3 text-white bg-indigo-600 rounded-lg shadow-md focus:shadow-none duration-100 ring-offset-2 ring-indigo-600 focus:ring-2"> Calculate </button>
          { error && <p className="text-red-700">{error}</p>}
        </div>
        {
          result && !error && 
          <div className='mt-6 px-12 w-full flex shadow-md gap-6 py-6 border-1 border-gray-500'>
            <h1>Amount of Flags</h1>
            <h1>{result}</h1>
          </div>
        }
          </> 
          }
    </>
  );
}

export default App;
