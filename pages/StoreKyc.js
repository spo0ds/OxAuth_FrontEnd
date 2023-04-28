import { useState } from 'react';
import { getContract } from './contract';

export default function StoreKyc() {
  const [dataRequester, setDataRequester] = useState('');
  const [kycField, setKycField] = useState('');
  const [data, setData] = useState('');
  const [status, setStatus] = useState('');

  const handleDataRequesterChange = (event) => {
    setDataRequester(event.target.value);
  };

  const handleKycFieldChange = (event) => {
    setKycField(event.target.value);
  };

  const handleDataChange = (event) => {
    setData(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Submitting data...');

    try {
      const contract = await getContract();

      // Call the function on the contract and pass the arguments
      const tx = await contract.storeRsaEncryptedinRetrievable(dataRequester, kycField, data);

      // Wait for the transaction to be confirmed and update the status
      const receipt = await tx.wait();
      setStatus(`Transaction confirmed: ${receipt.transactionHash}`);
    } catch (error) {
      console.error(error);
      setStatus(`Error submitting data: ${error.message}`);
    }
  };

  return (
    <div>
      <h2 className="py-5 text-4xl font-bold dark:text-yellow">Storing KYC</h2>
      <form onSubmit={handleSubmit}>
        <label className="block text-gray-700 font-bold mb-2" htmlFor="dataRequesterInput">
          Data requester:
          <input
            id="dataRequesterInput"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            value={dataRequester}
            onChange={handleDataRequesterChange}
          />
        </label>
        <label className="block text-gray-700 font-bold mb-2" htmlFor="kycFieldInput">
          KYC field:
          <input
            id="kycFieldInput"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            value={kycField}
            onChange={handleKycFieldChange}
          />
        </label>
        <label className="block text-gray-700 font-bold mb-2" htmlFor="dataInput">
          Data:
          <input
            id="dataInput"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            value={data}
            onChange={handleDataChange}
          />
        </label>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
          Submit
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
