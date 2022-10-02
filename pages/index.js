import Link from 'next/link';
import React, { useEffect, useState, useContext } from 'react'
import { AppConfig } from './context/AppConfig'


const baseEndpoint = "https://api.publicapis.org";
export async function getStaticProps() {
  const res = await fetch(baseEndpoint + "/entries");
  const data = await res.json();
  const res1 = await fetch(baseEndpoint + "/categories");
  const categories = await res1.json();
  return {
    props: {
      data, categories
    }
  }
}



export default function Index({ data, categories }) {
  const { toggle, toggleModes } = useContext(AppConfig)
  const [array, setArray] = useState([])
  const [cats, setCats] = useState([])
  const [searchtext, setSearchtext] = useState("");
  const [dropdown, setDropdown] = useState(false)
  console.log(array)
  console.log(toggle)
  useEffect(() => {
    setArray(data.entries)
    setCats(categories.categories)
  }, [categories.categories, data.entries])
  return (
    <>
      <div className={`navbar flex ${toggle === true ? "bg-gray-900" : "bg-green-300"} p-8 items-center rounded-b-2xl m-4 rounded-t-xl gap-10 shadow-blue-200 drop-shadow-sm`}>
        <div className='flex gap-10'>
          <Link href="/">
            <button className={`p-2 bg-blue-200 rounded-xl shadow-sm ${toggle === true ? "drop-shadow-sm shadow-white text-gray-800" : "drop-shadow-sm shadow-black text-black"} hover:rounded-2xl hover:bg-blue-300 transition-all ease-in-out`}>Home</button>
          </Link>

          <div className="relative inline-block text-left">
            <div>
              <button onClick={() => setDropdown(!dropdown)} type="button" className={`${toggle === true ? "drop-shadow-sm shadow-white text-gray-800" : "drop-shadow-sm shadow-black text-black"} inline-flex p-2 bg-blue-200 rounded-xl shadow-sm shadow-black hover:rounded-2xl hover:bg-blue-300 transition-all ease-in-out  focus:outline-none`} id="menu-button" aria-expanded="true" aria-haspopup="true">
                Categories
                {/* <!-- Heroicon name: mini/chevron-down --> */}
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <div className={dropdown === true ? `h-52 overflow-y-scroll absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none` : `h-52 overflow-y-scroll hidden absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
              <div className="py-1" role="none">
                {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                {cats.map((cat, key) => (
                  <Link key={key} href={`/categories/${cat.toLowerCase()}`}>
                    <a className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">{cat}</a>
                  </Link>

                ))}
              </div>
            </div>
          </div>


        </div>

        <div className='ml-4'>
          <input value={searchtext} onChange={e => setSearchtext(e.target.value)} className='p-2 rounded-xl' type="text" placeholder='Search for APIs' />
        </div>
        <div className="flex justify-center items-center ml-auto">
          <label className="inline-flex relative items-center cursor-pointer">
            <input onClick={() => toggleModes()} type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            <span className={`ml-3 text-sm font-medium ${toggle === true ? "text-white" : "text-black"}`}>{toggle === true ? "Light Mode" : "Dark Mode"}</span>
          </label>
        </div>
      </div >

      <div className={`main m-4 flex flex-col flex-wrap justify-center items-center ${toggle === true ? "bg-gray-900" : "bg-blue-100"} rounded-lg py-10 px-2`}>
        <h2 className={`title-font text-xl font-bold ${toggle === true ? "text-white" : "text-black"} mb-3`}>Public API Entries</h2>
        <div className='flex flex-wrap items-center w-full'>
          {array.filter((f) => {
            if (searchtext === "") {
              return f;
            }
            else if (f.Description.toLowerCase().includes(searchtext.toLowerCase())) {
              return f;
            }
          }).map((entry, key) => (

            <div key={key} className="p-4 w-1/3 h-1/3 ">
              <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden w-full shadow-gray-500 shadow-md hover:scale-110 transition-all ease-in-out">
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">{entry.Category}</h2>
                  <h1 className={`title-font text-lg font-medium ${toggle === true ? "text-white" : "text-black"} mb-3`}>{entry.API}</h1>
                  <p className={`leading-relaxed mb-3 ${toggle === true ? "text-gray-50" : "text-black"}`}>{entry.Description}</p>
                  <div className="flex items-center flex-wrap ">
                    <a href={`/learnmore/${(entry.API).toLowerCase()}`} className="text-indigo-400 inline-flex items-center md:mb-2 lg:mb-0 hover:text-indigo-600 transition-all ease-in">Learn More
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                    <span className="text-gray-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
                      Cors Support : {entry.Cors === "yes" ? "Yes" : "No"}
                    </span>
                    <span className="text-gray-500 inline-flex items-center leading-none text-sm">
                      HTTPS : {entry.HTTPS ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          ))}
        </div>

      </div>
    </>
  )
}






