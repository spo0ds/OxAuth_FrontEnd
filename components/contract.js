import { ethers } from 'ethers';
import abi from './artifacts/KYC.json';

export const getContract = async () => {
  await window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractAddress = '0x84ecb5be1585f4d48ceda371c256b75ea240dcbe';
  const contract = new ethers.Contract(contractAddress, abi.abi, signer);
  return contract;
};
