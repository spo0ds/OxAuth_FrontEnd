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
        <div>
            <h2 class="py-5 text-4xl font-bold dark:text-yellow">Request Data for approval</h2>
            <form class="w-full max-w-sm" onSubmit={handleSubmit}>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
                        DataProvider Address:
                    </label>
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="text"
                        value={dataProvider}
                        onChange={(e) => setDataProvider(e.target.value)}
                    />
                </div>
                <hr class="mb-4" />
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
                        KYC Field:
                    </label>
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="text"
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
