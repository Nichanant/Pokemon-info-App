"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation' //using Parameter for receiving and sending to URL
import Link from 'next/link'
import Image from 'next/image'

function PokeInfo() {
    const params = useParams(); //รับค่า Parameter จาก URL ที่ถูกส่งมาจากPrperty as และ router

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        const fetchPokemonDetail = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
                const pokeData = await response.json();

                setPokemon(pokeData)
            } catch (error) {
                console.log("สาเหตุ error ", error)
            }
            setLoading(false);
        }
        fetchPokemonDetail();
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
                            <div className='text-3xl'>{pokemon.name}</div>
                             {/* ********<Image/>*********** */}
                            <img src={pokemon.sprites?.other.home.front_default}
                                    width={300} height={300} alt={pokemon.name} />

                            <p className='my-3'>Weight: {pokemon.weight}</p>

                            <p className='my-3'>
                                Abilities:
                                {pokemon.abilities?.map((val) => (
                                    <span key={val.ability.name} className='bg-gray-500 text-white px-3 py-1 rounded-md'>{val.ability.name}</span>
                                ))}
                            </p>

                            <p className='my-3'>
                                Abilities:
                                {pokemon.types?.map((val) => (
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

export default PokeInfo
