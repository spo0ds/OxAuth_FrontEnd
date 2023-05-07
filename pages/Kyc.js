import { useState } from "react"
import { getContract } from "./contract"
import { aes } from "../utils/aes"

export default function FillUpForm() {
    const [name, setName] = useState("")
    const [fatherName, setFatherName] = useState("")
    const [motherName, setMotherName] = useState("")
    const [grandfatherName, setGrandfatherName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [dob, setDOB] = useState("")
    const [bloodGroup, setBloodGroup] = useState("")
    const [citizenshipNumber, setCitizenshipNumber] = useState("")
    const [panNumber, setPANNumber] = useState("")
    const [location, setLocation] = useState("")
    const [encryptionKey, setEncryptionKey] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const contract = await getContract()
            const encryptedName = aes.encryptMessage(name, encryptionKey)
            const encryptedFatherName = aes.encryptMessage(fatherName, encryptionKey)
            const encryptedMotherName = aes.encryptMessage(motherName, encryptionKey)
            const encryptedGrandfatherName = aes.encryptMessage(grandfatherName, encryptionKey)
            const encryptedPhoneNumber = aes.encryptMessage(phoneNumber, encryptionKey)
            const encryptedDOB = aes.encryptMessage(dob, encryptionKey)
            const encryptedBloodGroup = aes.encryptMessage(bloodGroup, encryptionKey)
            const encryptedCitizenshipNumber = aes.encryptMessage(citizenshipNumber, encryptionKey)
            const encryptedPANNumber = aes.encryptMessage(panNumber, encryptionKey)
            const encryptedLocation = aes.encryptMessage(location, encryptionKey)

            const usersData = await contract.setUserData(
                encryptedName,
                encryptedFatherName,
                encryptedMotherName,
                encryptedGrandfatherName,
                encryptedPhoneNumber,
                encryptedDOB,
                encryptedBloodGroup,
                encryptedCitizenshipNumber,
                encryptedPANNumber,
                encryptedLocation,
                { gasLimit: 800000 }
            )

            console.log(usersData)
            resetForm()
        } catch (error) {
            setError(error.message)
        }
    }

    // Function to reset the form
    const resetForm = () => {
        setName("")
        setFatherName("")
        setMotherName("")
        setGrandfatherName("")
        setPhoneNumber("")
        setDOB("")
        setBloodGroup("")
        setCitizenshipNumber("")
        setPANNumber("")
        setLocation("")
        setEncryptionKey("")
        setError(null)
    }

    return (
        <div class="max-w-md mx-auto">
            <h2 class="py-5 text-4xl font-bold dark:text-yellow">KYC FORM</h2>
            <form onSubmit={handleSubmit} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="encryption-key-input">
                        Encryption Key:
                    </label>
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="encryption-key-input"
                        type="password"
                        value={encryptionKey}
                        onChange={(e) => setEncryptionKey(e.target.value)}
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="name-input">
                        Name:
                    </label>
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="name-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="father-name-input">
                        Father's Name:
                    </label>
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="father-name-input"
                        type="text"
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="mother-name-input">
                        Mother's Name:
                    </label>
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="mother-name-input"
                        type="text"
                        value={motherName}
                        onChange={(e) => setMotherName(e.target.value)}
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="grandfather-name-input">
                        Grandfather's Name:
                    </label>
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="grandfather-name-input"
                        type="text"
                        value={grandfatherName}
                        onChange={(e) => setGrandfatherName(e.target.value)}
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="phone-number-input">
                        Phone Number:
                    </label>
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="phone-number-input"
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="dob-input">
                        Date of Birth:
                    </label>
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="dob-input"
                        type="date"
                        value={dob}
                        onChange={(e) => setDOB(e.target.value)}
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="blood-group-input">
                        Blood Group:
                    </label>
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="blood-group-input"
                        type="text"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                    />
                </div>
                <div class="mb-4">
                    <label
                        class="block text-gray-700 font-bold mb-2"
                        for="citizenship-number-input"
                    >
                        Citizenship Number:
                    </label>
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="citizenship-number-input"
                        type="text"
                        value={citizenshipNumber}
                        onChange={(e) => setCitizenshipNumber(e.target.value)}
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="pan-number-input">
                        PAN Number:
                    </label>
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="pan-number-input"
                        type="text"
                        value={panNumber}
                        onChange={(e) => setPANNumber(e.target.value)}
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="location-input">
                        Location:
                    </label>
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="location-input"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                {error && <p class="text-red-500">{error}</p>}
                <button
                    class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
