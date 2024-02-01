import React, { useEffect, useState } from "react";
import axios from "axios";
import { AdvancedPasswordInput, PageHeader } from "../components";
import { toast } from 'react-toastify'
import { z } from "zod";

const FileDownload = () => {
  const [password, setPassword] = useState("");
  const [fileId, setFileId] = useState("");
  const [ seePassword, setSeePassword ] = useState(false);

  const downloadSchema = z.object({
    fileId: z.string().min(5, "File ID field must be valid length and value"),
    password: z.string().min(20, "Password field must be valid length and value")
  });

  const handleDownload = async () => {
    
    const validationResult = downloadSchema.safeParse({ fileId, password });
    if (!validationResult.success) {
      validationResult.error.issues.forEach(issue => {
        toast.warn(issue.message);
      });
      return;
    }

    try {

      const hashedPassword = await hashPassword(password);

      const response = await axios.get(
        `http://localhost:4000/download/${fileId}`,
        { responseType: "blob",
        headers: {
          'Password': hashedPassword
        }
      }
      );


      let filename = "decrypted_file";
      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition) {
        const matches =
          /filename\*?=['"]?(?:UTF-8'['"]*)?([^;'\"]+)['"]?;?/i.exec(
            contentDisposition
          );
        if (matches && matches[1]) {
          filename = decodeURIComponent(matches[1]);
        }
      }


      const decryptedFile = await decryptFile(
        new Blob([response.data]),
        password
      );
      const url = URL.createObjectURL(decryptedFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setPassword("");
      setFileId("");
      toast.success("File successfully downloaded and deleted from the server");
    } catch (error) {
      console.error("Greška prilikom preuzimanja ili dešifrovanja:", error);
      toast.error("Wrong File ID or password");
    }
  };

  const decryptFile = async (encryptedBlob, password) => {

    const buffer = await encryptedBlob.arrayBuffer();


    const salt = new Uint8Array(buffer.slice(0, 16));
    const iv = new Uint8Array(buffer.slice(16, 28));
    const encryptedData = buffer.slice(28);


    const key = await generateKey(password, salt);


    try {
      const decryptedContent = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encryptedData
      );

      return new Blob([decryptedContent]);
    } catch (err) {
      console.error("Greška prilikom dešifrovanja: ", err);
      throw err;
    }
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


  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };
  

  return (
    <div className="px-8 md:px-28 max-sm:px-2">
      <PageHeader title="File Download Page" path="Home > File Download" />

      <div className="py-16">
        <div className="mb-6">
          <label
            htmlFor="id-input"
            className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
          >
            Enter File ID
          </label>
          <input
            required={true}
            type="text"
            placeholder="Enter File ID"
            value={fileId}
            onChange={(e) => setFileId(e.target.value)}
            id="id-input"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
       

        <AdvancedPasswordInput seePassword={seePassword} setSeePassword={setSeePassword} filePassword={password} setFilePassword={setPassword} idValue="file-password-decrypt" placeValue="Enter File Password" />

        <button
          onClick={handleDownload}
          type="button"
          className="w-full px-6 mt-5 py-3.5 text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-600 uppercase max-sm:text-base"
        >
          Download and decrypt
        </button>
      </div>
    </div>
  );
};

export default FileDownload;
