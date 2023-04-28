import { useState } from 'react';
import { getContract } from './contract';
import { aes } from '../utils/aes';
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
    aes.encryptMessage(name, "hello"),
    aes.encryptMessage(fatherName, "hello"),
    aes.encryptMessage(motherName, "hello"),
    aes.encryptMessage(grandfatherName, "hello"),
    aes.encryptMessage(phoneNumber, "hello"),
    aes.encryptMessage(dob, "hello"),
    aes.encryptMessage(bloodGroup, "hello"),
    aes.encryptMessage(citizenshipNumber, "hello"),
    aes.encryptMessage(panNumber, "hello"),
    aes.encryptMessage(location, "hello"), {
        gasLimit: 300000 // manually specify the gas limit
    });
  };

  return (
    <form onSubmit={handleSubmit} class="w-full max-w-sm">
      <div class="mb-4">
      </div>
  <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
      Name:
    </label>
    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" value={name} onChange={(e) => setName(e.target.value)} />
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
      Father's Name:
    </label>
    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
      Mother's Name:
    </label>
    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" value={motherName} onChange={(e) => setMotherName(e.target.value)} />
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
      Grandfather's Name:
    </label>
    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" value={grandfatherName} onChange={(e) => setGrandfatherName(e.target.value)} />
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
      Phone Number:
    </label>
    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
      Date of Birth:
    </label>
    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={dob} onChange={(e) => setDOB(e.target.value)} />

 </div>
 <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
      Blood Group:
    </label>
    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} />
 </div>
 <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
      Citizenship Number:
    </label>
    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={citizenshipNumber} onChange={(e) => setCitizenshipNumber(e.target.value)} />
 </div>
 <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
      PAN Number:
    </label>
    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={panNumber} onChange={(e) => setPANNumber(e.target.value)} />
 </div>
 <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="inline-full-name">
      Location:
    </label>
    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
 </div>
 <div class="flex items-center justify-between">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
      Submit
    </button>
    
 </div>
 <hr class="border-b border-gray-400 w-full my-2" />
</form>

  );
}