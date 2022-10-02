import Link from 'next/link';
import React, { useEffect, useState } from 'react'
const baseEndpoint = "https://api.publicapis.org";

export async function getStaticPaths() {
    const res = await fetch(baseEndpoint + "/entries");
    const data = await res.json();

    const paths = data.entries.map((ele) => {
        return {
            params: {
                APIname: ele.API.toLowerCase(),
            },
        };
    });

    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({ params }) {
    const title = params.APIname;
    const res = await fetch(`https://api.publicapis.org/entries?title=${title}`);
    const data = await res.json();
    return {
        props: {
            data
        }
    }
}


function Index({ data }) {
    const [array, setArray] = useState([])
    useEffect(() => {
        setArray(data.entries);
    }, [data.entries])
    console.log(array[0])
    return (
        <div className='flex flex-col'>
            <div className='main m-4 flex flex-col flex-wrap justify-center items-center bg-blue-100 rounded-lg py-10 px-2'>
                {array.map((val, key) => (
                    <div key={key} className='m-auto flex flex-col gap-10 mb-20'>
                        <p className='font-bold flex'>API Name: <p className='font-light ml-2'>{val.API}</p></p>
                        <p className='font-bold flex'>API Description: <p className='font-light ml-2'>{val.Description}</p></p>
                        <p className='font-bold flex'>Category: <p className='font-light ml-2'>{val.Category}</p></p>
                        <div className='flex gap-4'>
                            <p className='font-semibold flex'>Does the API Support Cors ? : <p className='font-light ml-2'>{val.Cors === "yes" ? "Yes" : "No"}</p></p>
                            <p className='font-semibold flex'>HTTPS : <p className='font-light ml-2'>{val.HTTPS === true ? "Yes" : "No"}</p></p>
                        </div>

                        <button className='p-3 bg-blue-300 hover:scale-105 transition-all ease-in-out w-fit m-auto rounded-xl'><a href={val.Link}>Go to API Website</a></button>
                        <button className='p-3 bg-blue-300 hover:scale-105 transition-all ease-in-out w-fit m-auto rounded-xl'><a href={`/categories/${val.Category.toLowerCase()}`}>Go Back</a></button>

                    </div>
                ))}
            </div>


        </div>

    )
}

export default Index