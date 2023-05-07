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
    const [publicKey, setPublicKey] = useState(null)
    const [encryptedMessage, setEncryptedMessage] = useState(null)
    const [encryptionKey, setEncryptionKey] = useState("")

    const handleDataRequesterChange = (event) => {
        setDataRequester(event.target.value)
    }

    const handleKycFieldChange = (event) => {
        setKycField(event.target.value)
    }

    // const generateKeyPair = async () => {
    //     const keyPair = await window.crypto.subtle.generateKey(
    //         {
    //             name: "RSA-OAEP",
    //             modulusLength: 2048,
    //             publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    //             hash: "SHA-256",
    //         },
    //         true,
    //         ["encrypt", "decrypt"]
    //     )

    //     // setPrivateKey(keyPair.privateKey)
    //     setPublicKey(keyPair.publicKey)
    // }
      const generateKeyPair = async () => {
        const keyPair = await window.crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: 2048,
                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                hash: "SHA-256",
            },
            true,
            ["encrypt", "decrypt"],
            false,
            ["deriveKey"],
            { name: "AES-CBC", length: 256 },
            true,
            ["encrypt", "decrypt"]
        )

        //setPrivateKey(keyPair.privateKey)
        console.log(keyPair.privateKey)
        setPublicKey(keyPair.publicKey)
    }

    // const encryptMessage = async () => {
    //     const encoder = new TextEncoder()
    //     const data = encoder.encode(decryptedData)

    //     const encrypted = await window.crypto.subtle.encrypt(
    //         {
    //             name: "RSA-OAEP",
    //         },
    //         publicKey,
    //         data
    //     )

    //     setEncryptedMessage(new Uint8Array(encrypted))
    // }

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
            const encoder = new TextEncoder()
            const data = encoder.encode(decryptedData)
            console.log(typeof data)

            // const publicKey1 = await crypto.subtle.importKey(
            //     "spki",
            //     new TextEncoder().encode(data),
            //     {
            //         name: "RSA-OAEP",
            //         hash: { name: "SHA-256" },
            //     },
            //     true,
            //     ["encrypt"]
            // )

            const encrypted = await window.crypto.subtle.encrypt(
                {
                    name: "RSA-OAEP",
                },
                publicKey,
                data
            )

            setEncryptedMessage(new Uint8Array(encrypted))
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
            setStatus("Error submitting data wrong field of data or wrong address")
        }
    }

    return (
        <div className="max-w-md mx-auto">
            <h1 className="py-5 text-4xl font-bold dark:text-yellow">RSA Encryption </h1>
            <div className="mb-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generateKeyPair}>Generate Key Pair</button>
            </div>
            <div>
                {/* <p>Private Key: {privateKey ? privateKey.type : "Not generated"}</p> */}
                <p>Public Key: {publicKey ? publicKey.type : "Not generated"}</p>
            </div>
            {/* <div>
                <p>
                    Encrypted Message:{" "}
                    {encryptedMessage ? encryptedMessage.join(", ") : "Not encrypted"}
                </p>
            </div> */}

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                 <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="dataProvider">
                        Data provider address:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="dataProvider"
                        type="text"
                        placeholder="Enter data provider address"
                        value={dataProvider}
                        onChange={(event) => setDataProvider(event.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="dataRequester">
                        Data requester address:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="dataRequester"
                        type="text"
                        placeholder="Enter data requester address"
                        value={dataRequester}
                        onChange={(event) => setDataRequester(event.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="data">
                        Data:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="kycField"
                        type="text"
                        placeholder="Enter data"
                        value={kycField}
                        onChange={(event) => setKycField(event.target.value)}
                    />
                </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="encryption-key"
                        >
                            Encryption key:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="inline-full-name"
                            type="password"
                            value={encryptionKey}
                            onChange={(e) => setEncryptionKey(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
