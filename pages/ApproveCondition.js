import { getContract } from "./contract"
import { useState } from "react"
import { ethers } from "ethers"

export default function Home() {
    const [dataRequester, setDataRequester] = useState("")
    const [dataProvider, setDataProvider] = useState("")
    const [data, setData] = useState("")
    const [status, setStatus] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        const contract = await getContract()

        const result = await contract.approveCondition(dataRequester, dataProvider, data)
        setStatus(result ? "Approved" : "Not approved")
    }

    return (
        <div className="max-w-md mx-auto">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
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
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="data">
                        Data:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="data"
                        type="text"
                        placeholder="Enter data"
                        value={data}
                        onChange={(event) => setData(event.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Check Approval
                    </button>
                </div>
            </form>
            <p className="text-center">{status}</p>
        </div>
    )
}
