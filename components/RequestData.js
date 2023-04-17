import { useState } from 'react';
import { getContract } from './contract';

export default function RequestData() {
    const [dataProvider, setDataProvider] = useState('');
    const [kycField, setkycField] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const contract = await getContract();

        await contract.requestApproveFromDataProvider(
            dataProvider,
            kycField,
            {
                gasLimit: 300000
            }
        );
    };

    return (
        <form onSubmit ={handleSubmit}>
            <label>
                DataProvider Address:
                <input type="text" value={dataProvider} onChange={(e) => setDataProvider(e.target.value)} />
            </label>
            <br />
            <hr />
            <label>
                KYC Field:
                <input type="text" value={kycField} onChange={(e) => setkycField(e.target.value)} />
            </label>
            <br />
            <hr />
            <button type="submit">Request KYC</button>
        </form>
    )
}