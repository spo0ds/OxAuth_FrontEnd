import { useState } from 'react';
import { getContract } from './contract';

export default function FillUpForm() {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [grandfatherName, setGrandfatherName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDOB] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [citizenshipNumber, setCitizenshipNumber] = useState('');
  const [panNumber, setPANNumber] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const contract = await getContract();
    
   await contract.setUserData(
    name, 
    fatherName, 
    motherName, 
    grandfatherName, 
    phoneNumber, 
    dob, 
    bloodGroup, 
    citizenshipNumber, 
    panNumber, 
    location, {
        gasLimit: 300000 // manually specify the gas limit
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Father's Name:
        <input type="text" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
      </label>
      <br />
      <label>
        Mother's Name:
        <input type="text" value={motherName} onChange={(e) => setMotherName(e.target.value)} />
      </label>
      <br />
      <label>
        Grandfather's Name:
        <input type="text" value={grandfatherName} onChange={(e) => setGrandfatherName(e.target.value)} />
      </label>
      <br />
      <label>
        Phone Number:
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Date of Birth:
        <input type="text" value={dob} onChange={(e) => setDOB(e.target.value)} />
      </label>
      <br />
      <label>
        Blood Group:
        <input type="text" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}/>
      </label>
      <br />
      <label>
        Citizenship Number:
        <input type="text" value={citizenshipNumber} onChange={(e) => setCitizenshipNumber(e.target.value)} />
      </label>
      <br />
      <label>
        PAN Number:
        <input type="text" value={panNumber} onChange={(e) => setPANNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Location:
        <input type="text" value={location} onChange={(e)=>setLocation(e.target.value)}/>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
