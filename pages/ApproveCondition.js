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
        <form class="w-full max-w-sm">
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
                DataRequester Address:
                </label>
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={dataRequester} onChange={(e) => setDataRequester(e.target.value)} />
            </div>
            <hr class="my-4"/>
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
            DataProvider Address:
                </label>
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={dataProvider} onChange={(e) => setDataProvider(e.target.value)} />
            </div>
    <hr class="my-4"/>
    <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
            Data:
        </label>
        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={data} onChange={(e) => setData(e.target.value)} />
    </div>
    <hr class="my-4"/>
    {error && <p class="text-red-500">{error}</p>}
    <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" type="submit">
        Check Approval
    </button>
    <br class="mt-4"/>
    {approved && <p class="text-green-500">Data is approved</p>}
    {!approved && error === null && <p class="text-red-500">Data is not approved</p>}
    </form>
    );
}
