import { useState } from "react"
import { getContract } from "./contract"

export default function Home() {
    const [dataProvider, setDataProvider] = useState("")
    const [kycField, setKycField] = useState("")
    const [data, setData] = useState("")
    const [status, setStatus] = useState("")
    const [privateKey, setPrivateKey] = useState(null)
    const [publicKey, setPublicKey] = useState(null)
    const [message, setMessage] = useState("")
    const [encryptedMessage, setEncryptedMessage] = useState(null)
    const [decryptedMessage, setDecryptedMessage] = useState(null)

    const generateKeyPair = async () => {
        const keyPair = await window.crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: 2048,
                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                hash: "SHA-256",
            },
            true,
            ["encrypt", "decrypt"]
        )

        setPrivateKey(keyPair.privateKey)
        setPublicKey(keyPair.publicKey)
    }

    // const encryptMessage = async () => {
    //     const encoder = new TextEncoder()
    //     const data = encoder.encode(message)

    //     const encrypted = await window.crypto.subtle.encrypt(
    //         {
    //             name: "RSA-OAEP",
    //         },
    //         publicKey,
    //         data
    //     )

    //     setEncryptedMessage(new Uint8Array(encrypted))
    // }

    //const decryptMessage = async (data, privateKey) => {
    //   const decrypted = await window.crypto.subtle.decrypt(
    //     {
    //       name: "RSA-OAEP",
    //     },
    //     privateKey,
    //     data
    //   );

    //   const decoder = new TextDecoder();
    //   return decoder.decode(decrypted);
    // };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const contract = await getContract() // pass the provider to the getContract function
            console.log(contract)
            const result = await contract.getRequestedDataFromProvider(dataProvider, kycField) // use the correct contract method name
            console.log(result)

            const decryptedData = result
            setData(decryptedData)

            const encoder = new TextEncoder()
            const data = encoder.encode(new Uint8Array(decryptedData))

            const decrypted = await window.crypto.subtle.decrypt(
                {
                    name: "RSA-OAEP",
                },
                privateKey,
                data
            )

            const decoder = new TextDecoder()
            setDecryptedMessage(decoder.decode(new Uint8Array(decrypted)))

            setStatus("Data retrieved")
        } catch (error) {
            console.error(error)
            setStatus(error.message)
        }
    }

    return (
        <div>
            <h1>RSA Key Pair Generation Demo</h1>
            <div>
                <button onClick={generateKeyPair}>Generate Key Pair</button>
            </div>
            <div>
                <p>Private Key: {privateKey ? privateKey.type : "Not generated"}</p>
                <p>Public Key: {publicKey ? publicKey.type : "Not generated"}</p>
            </div>
            <div>
                <p>
                    Encrypted Message:{" "}
                    {encryptedMessage ? encryptedMessage.join(", ") : "Not encrypted"}
                </p>
            </div>
            <div class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                <h2 class="py-5 text-4xl font-bold dark:text-yellow">Displaying Data</h2>
                <form onSubmit={handleSubmit}>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
                            Data provider address:
                            <input
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="text"
                                value={dataProvider}
                                onChange={(event) => setDataProvider(event.target.value)}
                            />
                        </label>
                    </div>
                    <br />
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
                            KYC field:
                        </label>
                        <input
                            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            value={kycField}
                            onChange={(event) => setKycField(event.target.value)}
                        />
                        <br />
                    </div>
                    <button type="submit">Get Data</button>
                </form>
                {status && <p class="text-red-500">{status}</p>}
                {data && (
                    <p>
                        Data: {data} {decryptedMessage}
                    </p>
                )}
            </div>
        </div>
    )
}
