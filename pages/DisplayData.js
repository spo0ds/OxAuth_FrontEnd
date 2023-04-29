import { useState } from "react"
import { ethers } from "ethers"
import { getContract } from "./contract"

export default function Home() {
    const [dataProvider, setDataProvider] = useState("")
    const [kycField, setKycField] = useState("")
    const [data, setData] = useState("")
    const [status, setStatus] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const contract = await getContract()
            const result = await contract.getRequestedDataFromProvider(dataProvider, kycField)
            setData(result)
            setStatus("Data retrieved")
        } catch (error) {
            setStatus(error.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Data provider address:
                    <input
                        type="text"
                        value={dataProvider}
                        onChange={(event) => setDataProvider(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    KYC field:
                    <input
                        type="text"
                        value={kycField}
                        onChange={(event) => setKycField(event.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Get Data</button>
            </form>
            <p>Status: {status}</p>
            {data && <p>Data: {data}</p>}
        </div>
    )
}
