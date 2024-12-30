"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function PokemonData() {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log(pokemon)

    useEffect(() => {
        setLoading(true);
        const fetchPokemonDATA = async () => {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon");
                const pokeData = await response.json();

                setPokemon(pokeData.results)
            } catch (error) {
                console.log("สาเหตุ error ", error)
            }
            setLoading(false);
        }
        fetchPokemonDATA();
    }, [])

    return (
        <div className='container text-center mx-auto'>
            {loading ? (
                <p className='text-red-700 text-5xl text-center'>Loading...</p>
            ) : (
                <div className='grid grid-cols-5'>

                    {pokemon.map((val, index) => (
                        <Link key={val.name} href={`/Pokeinfo/[id]`} as={`/Pokeinfo/${index + 1}`}>
                            <div key={index} className='flex justify-center items-center shadow-md transtion cursor-pointer hover:shadow-lg m-3 rounded-md bg-white'>
                                <div>
                                    <div>{val.name}</div>
                                    {/* ********<Image/>*********** */}
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`}
                                        width={150}
                                        height={150}
                                        alt={val.name} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

        </div>
    )
}

export default PokemonData
