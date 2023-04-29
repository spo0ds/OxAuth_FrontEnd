import React, { useState } from "react"
import { getContract } from "./contract"

export default function DisplayData() {
    const [dataProvider, setDataProvider] = useState("")
    const [kycField, setKycField] = useState("")
    const [data, setData] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const contract = await getContract()
            const result = await contract.getRequestedDataFromProvider(dataProvider, kycField, {
                gasLimit: 300000,
            })
            setData(result)
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div>
            <h2 class="py-5 text-4xl font-bold dark:text-yellow">Get Retrieve Data</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="dataProvider" class="block text-gray-700 font-bold mb-2">
                    Data Provider:
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="dataProvider"
                        type="text"
                        value={dataProvider}
                        onChange={(e) => setDataProvider(e.target.value)}
                    />
                </label>
                <label htmlFor="kycField" class="block text-gray-700 font-bold mb-2">
                    KYC Field:
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="kycField"
                        type="text"
                        value={kycField}
                        onChange={(e) => setKycField(e.target.value)}
                    />
                </label>
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    Get Data
                </button>
            </form>
            {data && (
                <div>
                    <h2>Retrieved Data:</h2>
                    <p>{data}</p>
                </div>
            )}
            {error && (
                <div>
                    <h2>Error:</h2>
                    <p>{error}</p>
                </div>
            )}
        </div>
    )
}
