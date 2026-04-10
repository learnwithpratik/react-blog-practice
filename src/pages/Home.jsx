import React from 'react'
import Articles from '../components/Articles'

const Home = () => {
  return (
    <div className="w-full h-full px-4 sm:px-6 md:px-10 lg:px-16 py-8">

      {/* 🔥 Hero Section */}
      <div className="flex flex-col items-center justify-center text-center">

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-lexreg leading-tight">
          Welcome to{" "}
          <span className="text-blue-600">Inkwell</span>
        </h1>

        <p className="w-full sm:w-3/4 md:w-1/2 lg:w-[40%] pt-4 text-sm sm:text-base text-gray-500 font-lexreg">
          Discover thoughtful articles on technology, programming, and software engineering from passionate writers.
        </p>
      </div>

      {/* 🔥 Articles Section */}
      <div className="mt-10 sm:mt-12 w-full">
        <Articles />
      </div>
    </div>
  )
}

export default Home