import { useState } from "react"
import { getContract } from "./contract"

export default function UpdateData() {
    const [data, setData] = useState("")
    const [kycField, setKycField] = useState("")
    const [error, setError] = useState(null)
    const [status, setStatus] = useState("")

    const handleUpdate = async (event) => {
        event.preventDefault()
        setError(null)

        try {
            const contract = await getContract()
            const updateData = await contract.updateKYCDetails(kycField, data, {
                gasLimit: 300000,
            })
            setStatus(updateData)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            <h2 class="py-5 text-4xl font-bold dark:text-yellow">Updating Data </h2>
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
                    Kyc Field
                </label>
                <input
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="text"
                    value={kycField}
                    onChange={(e) => setKycField(e.target.value)}
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
                    Data:
                </label>
                <input
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="text"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
            </div>
            <hr class="mb-4" />
            {error && (
                <p class="text-red-500">
                    {error} Either Choosed Wrong field Name or Wrong Address
                </p>
            )}
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleUpdate}
            >
                Update Data
            </button>
            {/* <div>{status}</div> */}
        </div>
    )
}
