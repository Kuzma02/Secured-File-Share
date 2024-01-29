import React from 'react'
import { toast } from "react-toastify";

const CopyToClipboardBtn = ({filePassword}) => {

    const copyTextToClipboard = () => {
        navigator.clipboard.writeText(filePassword);
        toast.success("Password successfuly copied to clipboard!");
      }

  return (
    <button disabled={!filePassword} className="p-2 bg-blue-500 text-white w-[30%] rounded-full mt-5 disabled:bg-gray-400" onClick={() => {copyTextToClipboard()}}>Copy Password</button>

  )
}

export default CopyToClipboardBtn