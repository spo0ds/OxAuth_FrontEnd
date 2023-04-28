import { useState } from 'react';
import { getContract } from './contract';
import { aes } from '../utils/aes';

export default function DecryptData(){
    const [data, setData] = useState('');
    const [decryptedData, setDecryptData] = useState('');
    const [dataProvider, setDataProvider] = useState('');
    const [error, setError] = useState(null);
    const [dataRequester, setDataRequester] = useState('');
    const [status, setStatus] = useState('');

    const handleDecrypt = async(event) => {
        event.preventDefault();
        setError(null);

        try{
            const contract = await getContract();
            const decryptedData = aes.decryptMessage(await contract.decryptMyData(

                dataProvider,
                data,
                {
                    gasLimit: 300000
                }), "hello");
            setDecryptData(decryptedData);
        } catch (err){
            setError(err.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('Submitting to Store data.....');

        try{
            const contract = await getContract();
            const tx = await contract.storeRsaEncryptedinRetrievable(dataRequester, data, decryptedData);
            // wait for the transaction to be confirmed and update the status

            const receipt = await tx.wait();
            setStatus(`Transaction confirmed: ${receipt.transactionHash}`);
        }catch (error){
            console.error(error);
            setStatus('Error submitting data');
        }
        
    }
    return (
        <div>
            <h2 class="py-5 text-4xl font-bold dark:text-yellow">Decrypting data </h2>
          <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
             DataProvider address:
          </label>
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={dataProvider} onChange={(e) => setDataProvider(e.target.value)} />
        </div>
         <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
             Data:
          </label>
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={data} onChange={(e) => setData(e.target.value)} />
        </div>
        <hr class="mb-4" />
        {error && <p class="text-red-500">{error}</p>}
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleDecrypt}>Decrypt Data</button>
        <div>{decryptedData}</div>
        <hr/>
        <hr/>
         <div>
            <h2 class="py-5 text-4xl font-bold dark:text-yellow">Storing data </h2>
      <form onSubmit={handleSubmit}>
        <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
          Data requester:
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={dataRequester} onChange={(e) => setDataRequester(e.target.value)} />
        </label>
        <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
          KYC field:
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
        </label>
        <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
          Data:
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
        </label>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
      </form>
      <p>{status}</p>
    </div>
    </div>
    )
}