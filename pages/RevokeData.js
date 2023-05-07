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
        <div className="max-w-md mx-auto"> 
            <h2 className="py-5 text-4xl font-bold dark:text-yellow">Revoking Grant</h2>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <label class="block text-gray-700 font-bold mb-2" for="dataRequester">
                    Data requester:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="dataRequester"
                        type="text"
                        value={dataRequester}
                        placeholder="Enter dataRequester Address"
                        onChange={handleDataRequesterChange}
                    />
                </label>
                <label class="block text-gray-700 font-bold mb-2" for="kycField">
                    KYC field:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="kycField"
                        type="text"
                        placeholder="Enter the KycField"
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
