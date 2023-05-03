import React, { useState } from "react"
import { getContract } from "./contract"
import { aes } from "../utils/aes"

export default function DecryptData() {
    const [data, setData] = useState("")
    const [kycField, setkycField] = useState("")
    const [dataProvider, setDataProvider] = useState("")
    const [data1, setData1] = useState("")
    const [error, setError] = useState(null)
    const [dataRequester, setDataRequester] = useState("")
    const [status, setStatus] = useState("")
    const [encryptionKey, setEncryptionKey] = useState("")
    const [decryptedData, setDecryptedData] = useState("")

    const handleDecrypt = async (event) => {
        event.preventDefault()
        setError(null)
        setDecryptedData("")

        try {
            const contract = await getContract()
            const encryptedData = await contract.decryptMyData(dataProvider, data, {
                gasLimit: 300000,
            })
            console.log(`encryptedData:${encryptedData}`)
            const decryptedData = aes.decryptMessage(encryptedData, encryptionKey)
            setDecryptedData(decryptedData)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <h2 className="py-5 text-4xl font-bold dark:text-yellow">Decrypting data</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="data-provider">
                    DataProvider address:
                </label>
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="data-provider"
                    type="text"
                    value={dataProvider}
                    onChange={(e) => setDataProvider(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="data-field">
                    Data Field:
                </label>
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="data-field"
                    type="text"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="encryption-key">
                    Encryption key:
                </label>
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="password"
                    value={encryptionKey}
                    onChange={(e) => setEncryptionKey(e.target.value)}
                />
            </div>
            <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleDecrypt}
            >
                Decrypt Data
            </button>
            <div className="my-5">
                {decryptedData && <p class="text-xl font-bold">Decrypted Data: {decryptedData}</p>}
                {error && <p className="text-red-500 font-bold">{error}</p>}
            </div>
        </div>
    )
}
