import { useState } from 'react';
import { getContract } from './contract';

export default function ApproveData() {
    const [dataRequester, setDataRequester] = useState('');
    const [kycField, setkycField] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const contract = await getContract();

        await contract.requestApproveFromDataProvider(
            dataRequester,
            kycField,
            {
                gasLimit: 300000
            }
        );
    };

    return (
        <form onSubmit ={handleSubmit}>
            <label>
                DataRequester Address:
                <input type="text" value={dataRequester} onChange={(e) => setDataRequester(e.target.value)} />
            </label>
            <br />
            <hr />
            <label>
                KYC Field:
                <input type="text" value={kycField} onChange={(e) => setkycField(e.target.value)} />
            </label>
            <br />
            <hr />
            <button type="submit">Approve KYC</button>
        </form>
    )
}