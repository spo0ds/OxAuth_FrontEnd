import React, { useState } from "react"
import { ethers } from "ethers"
import NTNFT from "./artifacts/NTNFT.json"

export default function Burn() {
const [burning, setBurning] = useState(false)
const [txHash, setTxHash] = useState("")
const [tokenId, setTokenId] = useState(null)
const [error, setError] = useState(null)
const [tokenURI, setTokenURI] = useState(null)
const [hasNFT, setHasNFT] = useState(false)

async function handleCheckNFT() {
    setError(null)

    // Check if the user has MetaMask installed and connected
    if (!window.ethereum) {
        setError("Please install MetaMask to check your NFT")
        return
    }

    // Get the connected Ethereum provider and signer
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const abi = Array.isArray(NTNFT) ? NTNFT : NTNFT.abi

    // Get the contract instance
    const contract = new ethers.Contract(
        "0x4bdef19c0d8db49ae843fa5be781902eb071f811",
        abi,
        signer
    )

    // Get the user's Ethereum address
    const walletAddress = await signer.getAddress()

    // Check if the user has an NFT
    const walletBalance = await contract.balanceOf(walletAddress)
    if (walletBalance.gt(0)) {
        setHasNFT(true)

        // Get the token ID of the user's NFT
        const tokenIds = []
        for (let i = 0; i < walletBalance; i++) {
            // const tokenIds = await contract.tokensOfOwner(walletAddress);
            const tokenId = await contract.getTokenCounter();
            tokenIds.push(tokenId)
        }
        setTokenId(tokenIds[0].toNumber()) // assume the user only has one NFT

        // Get the token URI of the user's NFT
        const tokenUri = await contract.tokenURI(tokenIds[0])
        setTokenURI(tokenUri)
    } else {
        setHasNFT(false)
        setError("You don't have an NFT to burn")
    }
}

async function handleBurn() {
    setBurning(true)
    setError(null)
    setTxHash("")

    // Check if the user has MetaMask installed and connected
    if (!window.ethereum) {
        setError("Please install MetaMask to burn your NFT")
        setBurning(false)
        return
    }

    // Get the connected Ethereum provider and signer
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const abi = Array.isArray(NTNFT) ? NTNFT : NTNFT.abi

    // Get the contract instance
    const contract = new ethers.Contract(
        "0x4bdef19c0d8db49ae843fa5be781902eb071f811",
        abi,
        signer
    )

    // Get the user's Ethereum address
    const walletAddress = await signer.getAddress()

    // Check if the user has an NFT to burn
    const balance = await contract.balanceOf(walletAddress)
    if (!balance || balance.lte(0)) {
        setError("You do not have an NFT to burn")
        setBurning(false)
        return
    }

    try {
        // Get the ID of the NFT owned by the wallet
        // const tokenIds = await contract.tokensOfOwner(walletAddress);
        const tokenId = await contract.getTokenCounter();
            // Call the contract's burnNft function to burn the NFT
    const tx = await contract.burn(tokenId)

    // Wait for the transaction to be confirmed
    const receipt = await tx.wait()

    // Update the transaction hash and token ID
    setTxHash(receipt.transactionHash)
    setTokenId(null)
    setTokenURI(null)
    setHasNFT(false)
} catch (error) {
    setError(error.message)
}

setBurning(false)
}
return (
    <div>
        <h1>Burn NFT</h1>

        {/* Check NFT */}
        <button onClick={handleCheckNFT}>Check for NFT</button>
        {error && <p>{error}</p>}
        {hasNFT && <p>You have an NFT!</p>}
        {tokenId && <p>NFT ID: {tokenId}</p>}
        {tokenURI && <img src={tokenURI} alt="NFT"/>}

        {/* Burn NFT */}
        {hasNFT && (
            <div>
                <button onClick={handleBurn} disabled={burning}>
                    Burn NFT
                </button>
                {burning && <p>Burning...</p>}
                {txHash && <p>Transaction hash: {txHash}</p>}
            </div>
        )}
    </div>
)
        }