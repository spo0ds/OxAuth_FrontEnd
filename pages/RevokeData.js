import { useState } from "react"
import { getContract } from "./contract"

export default function RevokeGrantToRequester() {
    const [dataRequester, setDataRequester] = useState("")
    const [kycField, setKycField] = useState("")
    const [status, setStatus] = useState("")

    const handleDataRequesterChange = (event) => {
        setDataRequester(event.target.value)
    }

    const handleKycFieldChange = (event) => {
        setKycField(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setStatus("Revoking grant...")

        if (!dataRequester || !kycField) {
            setStatus("Please fill in all fields.")
            return
        }

        try {
            const contract = await getContract()

            // Call the function on the contract and pass the arguments
            const tx = await contract.revokeGrantToRequester(dataRequester, kycField, {
                gasLimit: 300000,
            })

            // Wait for the transaction to be confirmed and update the status
            const receipt = await tx.wait()
            setStatus(`Transaction confirmed: ${receipt.transactionHash}`)
        } catch (error) {
            console.error(error)
            setStatus("Error revoking grant")
        }
    }

    return (
        <div class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <h2 class="py-5 text-4xl font-bold dark:text-yellow">Revoking Grant</h2>
            <form onSubmit={handleSubmit}>
                <label class="block text-gray-700 font-bold mb-2" for="dataRequester">
                    Data requester:
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="dataRequester"
                        type="text"
                        value={dataRequester}
                        onChange={handleDataRequesterChange}
                    />
                </label>
                <label class="block text-gray-700 font-bold mb-2" for="kycField">
                    KYC field:
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="kycField"
                        type="text"
                        value={kycField}
                        onChange={handleKycFieldChange}
                    />
                </label>
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    Revoke
                </button>
            </form>
            <p>{status}</p>
        </div>
    )
}
