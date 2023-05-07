import { useState } from "react"
import { getContract } from "./contract"
import { aes } from "../utils/aes"

export default function UpdateData() {
    const [data, setData] = useState("")
    const [kycField, setKycField] = useState("")
    const [error, setError] = useState(null)
    const [status, setStatus] = useState("")
    const [encryptionKey, setEncryptionKey] = useState("")

    const handleUpdate = async (event) => {
        event.preventDefault()
        setError(null)

        try {
            const contract = await getContract()
            const encryptedData = aes.encryptMessage(data, encryptionKey)
            const updateData = await contract.updateKYCDetails(kycField, encryptedData, {
                gasLimit: 300000,
            })
            setStatus(updateData)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="max-w-md mx-auto">
            <h2 className="py-5 text-4xl font-bold dark:text-yellow">Updating Data </h2>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label className="block text-gray-700 font-bold mb-2" for="inline-full-name">
                    Kyc Field
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="inline-full-name"
                    type="text"
                    value={kycField}
                    placeholder="enter the Kyc Field"
                    onChange={(e) => setKycField(e.target.value)}
                />
            </div>
            <div class="mb-4">
                <label className="block text-gray-700 font-bold mb-2" for="inline-full-name">
                    Data:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="inline-full-name"
                    type="text"
                    placeholder="enter the Data"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
            </div>
            <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="encryption-key-input">
                        Encryption Key:
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="encryption-key-input"
                        type="password"
                        value={encryptionKey}
                        onChange={(e) => setEncryptionKey(e.target.value)}
                    />
            </div>
            <hr className="mb-4" />
            {error && (
                <p className="text-red-500">
                    {error} Either Choosed Wrong field Name or Wrong Address
                </p>
            )}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleUpdate}
            >
                Update Data
            </button>
            </div>
            </div>
    )
}
