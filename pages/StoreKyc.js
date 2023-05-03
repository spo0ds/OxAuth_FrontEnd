import { useState } from "react"
import { getContract } from "./contract"
import { aes } from "../utils/aes"

export default function StoreKyc() {
    const [dataRequester, setDataRequester] = useState("")
    const [dataProvider, setDataProvider] = useState("")
    const [kycField, setKycField] = useState("")
    const [status1, setStatus1] = useState("")
    const [status, setStatus] = useState("")
    const [decryptedData, setDecryptedData] = useState("")
    const [encryptionKey, setEncryptionKey] = useState("")

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

            await contract.grantAccessToRequester(dataRequester, kycField)
            setStatus1("Access granted")

            const encryptedData = await contract.decryptMyData(dataProvider, kycField)
            console.log(`encryptedData:${encryptedData}`)
            const decryptedData = aes.decryptMessage(encryptedData, encryptionKey)
            console.log(decryptedData)
            setDecryptedData(decryptedData)

            // Call the function on the contract and pass the arguments
            const tx = await contract.storeRsaEncryptedinRetrievable(
                dataRequester,
                kycField,
                decryptedData,
                {
                    gasLimit: 800000,
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
        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <h2 className="py-5 text-4xl font-bold dark:text-yellow">Storing KYC</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="inline-full-name">
                    DataProvider address:
                </label>
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="text"
                    value={dataProvider}
                    onChange={(e) => setDataProvider(e.target.value)}
                />
            </div>
            <form onSubmit={handleSubmit}>
                <label className="block text-gray-700 font-bold mb-2" htmlFor="dataRequester">
                    Data requester:
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="dataRequester"
                        type="text"
                        value={dataRequester}
                        onChange={(e) => setDataRequester(e.target.value)}
                    />
                </label>
                <label className="block text-gray-700 font-bold mb-2" htmlFor="kycField">
                    KYC field:
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="kycField"
                        type="text"
                        value={kycField}
                        onChange={(e) => setKycField(e.target.value)}
                    />
                </label>
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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
