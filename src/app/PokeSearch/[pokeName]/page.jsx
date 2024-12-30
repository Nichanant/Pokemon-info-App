"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'


function PokeSearch() {
    const params = useParams();

    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(false);

    
    const fetchPokeData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokeName}`);
            const data = await response.json();

            setPokeData(data);
            setLoading(false);
        } catch (error) {
            console.log("สาเหตุ error ", error)
        }
    }

    useEffect(() => {
        fetchPokeData();
    }, [])

    return (
        <div className='p-24'>
            <Link href="/" className='bg-blue-500 text-white p-3 rounded-md'>GO BACK</Link>
            <div className='flex justify-center items-center mt-10 text-center'>
                <div className='shadow-md p-10 rounded-2xl border border-gray-500 bg-white'>
                    {loading ? (
                        <p className='text-red-700 text-5xl text-center'>Loading...</p>
                    ) : (
                        <>
                            <div className='text-3xl'>{pokeData.name}</div>
                            {/* ********<Image/>*********** */}
                            <img src={pokeData.sprites?.other.home.front_default}
                                width={300} height={300} alt={pokeData.name} />

                            <p className='my-3'>Weight: {pokeData.weight}</p>

                            <p className='my-3'>
                                Abilities:
                                {pokeData.abilities?.map((val) => (
                                    <span key={val.ability.name} className='bg-gray-500 text-white px-3 py-1 rounded-md'>{val.ability.name}</span>
                                ))}
                            </p>

                            <p className='my-3'>
                                Abilities:
                                {pokeData.types?.map((val) => (
                                    <span key={val.type.name} className='bg-gray-500 text-white px-3 py-1 rounded-md'>{val.type.name}</span>
                                ))}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PokeSearch
