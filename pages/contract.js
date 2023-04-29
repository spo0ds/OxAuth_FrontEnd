import { ethers } from "ethers"
import abi from "../contracts/KYC.json"

export const getContract = async () => {
    if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
        const contract = new ethers.Contract(contractAddress, abi.abi, signer)
        return contract
    } else {
        throw new Error("No Ethereum provider detected")
    }
}
