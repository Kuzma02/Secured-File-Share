import React from "react";
import { useState } from "react";
import { AdvancedPasswordInput, FilePreview, ProgressBar, CopyToClipboardBtn } from "../components";
import axios from "axios";
import { toast } from "react-toastify";
import { z } from "zod";



const receiversEmailSchema = z.string().email();

const UploadForm = ({ progress }) => {
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [receiverEmail, setReceiverEmail] = useState("");
  const [ filePassword, setFilePassword ] = useState("");
  const [ seePassword, setSeePassword ] = useState(false);

  const onFileSelect = (file) => {
    if (file && file.size > 10000000) {
      console.log("Size is more than 10MB");
      setErrorMsg("Max file upload size is 10MB");
      return;
    }
    setErrorMsg(null);
    setFile(file);
  };

  async function generateKey(password, salt, keyLength = 256) {
    const algo = {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: new TextEncoder().encode(salt),
      iterations: 1000,
    };
    const baseKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    const aesKey = await crypto.subtle.deriveKey(
      algo,
      baseKey,
      { name: "AES-GCM", length: keyLength },
      true,
      ["encrypt", "decrypt"]
    );

    return aesKey;
  }

  const encryptFile = async (file, password) => {
    const salt = crypto.getRandomValues(new Uint8Array(16)); // Generiši nasumičan salt
    const key = await generateKey(password, salt);

    const iv = crypto.getRandomValues(new Uint8Array(12)); // Generiši IV za AES-GCM
    const encryptedContent = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      await file.arrayBuffer()
    );

    return new Blob([salt, iv, new Uint8Array(encryptedContent)]);
  };

  const upload = async (e) => {
    e.preventDefault();

    if (receiverEmail.length === 0) {
      toast.warn("Please enter value for email");
      return;
    }

    if (!receiversEmailSchema.safeParse(receiverEmail).success) {
      toast.warn("Please enter valid email");
      return;
    }

    if(filePassword.length < 20){
      toast.warn("File password must be minimum 20 characters");
      return;
    }

    if(!hasUpperCase(filePassword)){
      toast.warn("File password should have at least 1 uppercase character");
      return;
    }


    try {

      const hashedPassword = await hashPassword(filePassword);

      // Enkriptuj fajl pre slanja
      const encryptedFile = await encryptFile(file, filePassword);

      // Pripremi enkriptovani fajl, originalno ime fajla i e-mail adresu primaoca za slanje
      let formData = new FormData();
      formData.append("encryptedFile", encryptedFile);
      formData.append("originalName", file.name); // Dodaj originalno ime fajla
      formData.append("receiverEmail", receiverEmail); // Dodaj e-mail adresu primaoca
      formData.append("password", hashedPassword);

      // Slanje enkriptovanog fajla, originalnog imena fajla i e-maila primaoca
      await axios.post("http://localhost:4000", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("File successfully uploaded");
    } catch (error) {
      console.log(error);
      toast.error("Error uploading file");
    }
  };

  const hasUpperCase = (str) => {
    return str !== str.toLowerCase();
}

const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};


  return (
    <div className="text-center">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-12 h-12 mb-4 text-blue-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-lg md:text-2xl text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or{" "}
              <strong className="text-blue-500">drag</strong> and{" "}
              <strong className="text-blue-500">drop</strong>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              (Max Size: 10MB )
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(event) => onFileSelect(event.target.files[0])}
          />
        </label>
      </div>

      {file && <FilePreview file={file} removeFile={() => setFile(null)} />}

      <div className="my-6 flex flex-col items-start">
        <label
          htmlFor="receiver-email-input"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
          Enter Receiver's Email Adress
        </label>
        <input
          required={true}
          type="email"
          placeholder="Enter Receiver's Email Adress"
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)}
          id="receiver-email-input"
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <AdvancedPasswordInput seePassword={seePassword} setSeePassword={setSeePassword} filePassword={filePassword} setFilePassword={setFilePassword} idValue="file-password-encrypt" placeValue="Set File Password" />
      

      {errorMsg && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-white font-bold">Error! {errorMsg}</span>
        </div>
      )}
      <p className="font-bold py-5 max-sm:text-sm">Note: Remember to copy your password and send to the receiver. Because of our security policy, we don't store and send file passwords.</p>
      <div className="flex flex-col w-full items-center">

      

        {/* COPY TO CLIPBOARD BTN */}
        <CopyToClipboardBtn filePassword={filePassword} />



      {progress === 0 ? (
        <ProgressBar progress={progress} />
      ) : (
        <button
          disabled={!file}
          className="p-2 bg-blue-500 text-white w-[30%] rounded-full mt-5 disabled:bg-gray-400"
          onClick={(e) => upload(e)}
        >
          Send Now
        </button>
      )}
      </div>
    </div>
  );
};

export default UploadForm;
