"use client"

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


function Header() {
    const router = useRouter();
    const [pokeName, setPokeName] = useState("");


    const handleInput = (e) => {
        setPokeName(e.target.value);
    }

    const handleForm = (e) => {
        e.preventDefault();

        router.push(`/PokeSearch/${pokeName}`)
    }

    return (
        <header className='bg-gradient-to-r from-cyan-500 via-teal-500 to-yellow-200 h-[300px] flex justify-center items-center'>
            <div className='text-center'>
                <h1 className='text-white text-5xl mb-5'>Let's find Pokemon here</h1>

                <form onSubmit={handleForm} className='flex mt-2'>
                    <input
                        type="text"
                        placeholder='Pokemon name...'
                        className='w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 shadow-md'
                        onChange={handleInput} />

                    <button className='inline-flex items-center mx-2 px-4 rounded-md bg-gray-600 hover:bg-cyan-600 text-white shadow-md'
                        type='submit'>GO!</button>
                </form>
            </div>
        </header>
    )
}

export default Header
