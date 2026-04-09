import React from 'react'
import Articles from '../components/Articles'

const Home = () => {
  return (
    <div className='w-full h-full p-12'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-6xl font-lexreg font-bold'>Welcome to <span className='text-blue-600'>Inkwell</span></h1>
        <p className='w-[40%] text-center pt-4 text-md  font-lexreg text-gray-500'>Discover thoughtful articles on technology, programming, and software engineering from passionate writers.</p>
      </div>

     <div className='mt-12 w-full px-38'>
       <Articles />
     </div>
    </div>
  )
}

export default Home