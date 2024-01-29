import React from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";



const FilePreview = ({ file, removeFile }) => {
  return (
    <div className="flex items-center  gap-2 justify-between mt-5 border rounded-md p-2 border-blue-200">
      <div className="flex items-center p-2">
        <img src="src/assets/file.png" width={50} height={50} alt="file" className='mr-5' />
        <div className="text-left">
          <h2>{file.name}</h2>
          <h2 className="text-[12px] text-gray-400">
            {file.type} - {(file.size / 1024 / 1024).toFixed(2)}MB
          </h2>
        </div>
      </div>
      <IoIosCloseCircleOutline className="text-red-500 cursor-pointer text-4xl" onClick={() => removeFile()} />
    </div>
  )
}

export default FilePreview