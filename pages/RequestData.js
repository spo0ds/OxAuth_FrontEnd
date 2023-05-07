import { useState } from "react"
import { getContract } from "./contract"

export default function RequestData() {
    const [dataProvider, setDataProvider] = useState("")
    const [kycField, setKycField] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(null)

        try {
            const contract = await getContract()

            await contract.requestApproveFromDataProvider(dataProvider, kycField, {
                gasLimit: 300000,
            })
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div class="max-w-md mx-auto">
            <h2 className="py-5 text-4xl font-bold dark:text-yellow">Request Data for approval</h2>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div class="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" for="inline-full-name">
                        DataProvider Address:
                    </label>
                    <input
                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="inline-full-name"
                        type="text"
                        placeholder="Enter data provider address"
                        value={dataProvider}
                        onChange={(e) => setDataProvider(e.target.value)}
                    />
                </div>
                <hr class="mb-4" />
                <div class="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" for="inline-full-name">
                        KYC Field:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="inline-full-name"
                        type="text"
                        placeholder="Enter the KYC Field"
                        value={kycField}
                        onChange={(e) => setKycField(e.target.value)}
                    />
                </div>
                <hr class="mb-4" />
                {error && <p class="text-red-500">{error}</p>}
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    Request KYC
                </button>
            </form>
        </div>
    )
}
