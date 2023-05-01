import { useState } from "react"
import { getContract } from "./contract"

export default function StoreKyc() {
    const [dataRequester, setDataRequester] = useState("")
    const [dataProvider, setDataProvider] = useState("")
    const [kycField, setKycField] = useState("")
    const [status1, setStatus1] = useState("")
    const [status, setStatus] = useState("")
    const [decryptedData, setDecryptedData] = useState("")

    const handleDataRequesterChange = (event) => {
        setDataRequester(event.target.value)
    }

    const handleKycFieldChange = (event) => {
        setKycField(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setStatus("Submitting data...")

        if (!dataRequester || !kycField) {
            setStatus("Please fill in all fields.")
            return
        }

        try {
            const contract = await getContract()
            const result = await contract.grantAccessToRequester(dataRequester, kycField)
            setStatus1("Access granted")

            const decryptedData = await contract.decryptMyData(dataProvider, kycField, {
                gasLimit: 300000,
            })
            console.log(decryptedData)
            setDecryptedData(decryptedData)
            
        
            // Call the function on the contract and pass the arguments
            const tx = await contract.storeRsaEncryptedinRetrievable(
                dataRequester,
                kycField,
                decryptedData,
                {
                    gasLimit: 300000,
                }
            )

            // Wait for the transaction to be confirmed and update the status
            const receipt = await tx.wait()
            setStatus(`Transaction confirmed: ${receipt.transactionHash}`)
        } catch (error) {
            console.error(error)
            setStatus("Error submitting data")
        }
    }

    return (
        <div>
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
                    DataProvider address:
                </label>
                <input
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="text"
                    value={dataProvider}
                    onChange={(e) => setDataProvider(e.target.value)}
                />
            </div>
            <h2 class="py-5 text-4xl font-bold dark:text-yellow">Storing KYC</h2>
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
                {/* <label class="block text-gray-700 font-bold mb-2" for="data">
                    Data:
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="data"
                        type="text"
                        value={data}
                        onChange={handleDataChange}
                    />
                </label>  */}
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    Submit
                </button>
            </form>
            <p>{decryptedData}</p>
            <p>{status1}</p>
            <p>{status}</p>
        </div>
    )
}
