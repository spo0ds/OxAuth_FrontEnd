import { useState } from 'react';
import { getContract } from './contract';

export default function ApproveCondition() {
    const [dataRequester, setDataRequester] = useState('');
    const [dataProvider, setDataProvider] = useState('');
    const [data, setData] = useState('');
    const [approved, setApproved] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const contract = await getContract();
            const result = await contract.approveCondition(dataRequester, dataProvider, data);
            setApproved(result);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
             <h2 class="py-5 text-4xl font-bold dark:text-yellow">Approve Condition</h2>
            <div className="mb-4">
                <label htmlFor="data-requester" className="block text-gray-700 font-bold mb-2">
                    DataRequester Address:
                </label>
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="data-requester"
                    type="text"
                    value={dataRequester}
                    onChange={(e) => setDataRequester(e.target.value)}
                />
            </div>
            <hr className="my-4" />
            <div className="mb-4">
                <label htmlFor="data-provider" className="block text-gray-700 font-bold mb-2">
                    DataProvider Address:
                </label>
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="data-provider"
                    type="text"
                    value={dataProvider}
                    onChange={(e) => setDataProvider(e.target.value)}
                />
            </div>
            <hr className="my-4" />
            <div className="mb-4">
                <label htmlFor="data" className="block text-gray-700 font-bold mb-2">
                    Data:
                </label>
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="data"
                    type="text"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
            </div>
            <hr className="my-4" />
            {error && <p className="text-red-500">{error}</p>}
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" type="submit">
                Check Approval
            </button>
            <br className="mt-4" />
            {approved && <p className="text-green-500">Data is approved</p>}
            {!approved && error === null && <p className="text-red-500">Data is not approved</p>}
        </form>
    );
}
