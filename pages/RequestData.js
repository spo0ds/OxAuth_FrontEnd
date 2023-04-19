import { useState } from 'react';
import { getContract } from './contract';

export default function RequestData() {
    const [dataProvider, setDataProvider] = useState('');
    const [kycField, setKycField] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const contract = await getContract();

            await contract.requestApproveFromDataProvider(
                dataProvider,
                kycField,
                {
                    gasLimit: 300000
                }
            );
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                DataProvider Address:
                <input type="text" value={dataProvider} onChange={(e) => setDataProvider(e.target.value)} />
            </label>
            <br />
            <hr />
            <label>
                KYC Field:
                <input type="text" value={kycField} onChange={(e) => setKycField(e.target.value)} />
            </label>
            <br />
            <hr />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Request KYC</button>
        </form>
    );
}