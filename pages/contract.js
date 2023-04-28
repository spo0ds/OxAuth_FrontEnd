import { ethers } from "ethers"
import abi from "../contracts/KYC.json"

export const getContract = async () => {
    await window.ethereum.enable()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contractAddress = "0xDceA5C98b03ccC359cE64D87baAC6865728811a7"
    const contract = new ethers.Contract(contractAddress, abi.abi, signer)
    return contract
}
