import React from 'react'

const PageHeader = ({ title, path }) => {
  return (
    <div className='bg-blue-500 text-white h-60 flex flex-col gap-y-2 justify-center items-center mt-2'>
        <h1 className='text-6xl text-white font-bold max-lg:text-5xl max-sm:text-4xl max-[420px]:text-3xl max-[350px]:text-2xl'>{ title }</h1>
        <h4 className='text-2xl text-white font-bold max-sm:text-xl max-[420px]:text-lg max-[350px]:text-base'>{ path }</h4>
    </div>
  )
}

export default PageHeader