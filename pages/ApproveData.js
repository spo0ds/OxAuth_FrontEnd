import { useState } from "react"
import { ethers } from "ethers"
import { getContract } from "./contract"

export default function Home() {
    const [dataRequester, setDataRequester] = useState("")
    const [kycField, setKycField] = useState("")
    const [status, setStatus] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        const contract = await getContract()

        const result = await contract.grantAccessToRequester(dataRequester, kycField)
        setStatus("Access granted")
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="max-w-md w-full mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="dataRequester" className="block font-medium mb-2">
                                Data requester address:
                            </label>
                            <input
                                type="text"
                                id="dataRequester"
                                value={dataRequester}
                                onChange={(event) => setDataRequester(event.target.value)}
                                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="kycField" className="block font-medium mb-2">
                                KYC field:
                            </label>
                            <input
                                type="text"
                                id="kycField"
                                value={kycField}
                                onChange={(event) => setKycField(event.target.value)}
                                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Grant Access
                        </button>
                    </form>
                    <p className="mt-4 text-center">{status}</p>
                </div>
            </div>
        </div>
    )
}
