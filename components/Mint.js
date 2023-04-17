import React, { useState } from "react"
import { ethers } from "ethers"
import NTNFT from "./artifacts/NTNFT.json"

export default function Mint() {
    const [minting, setMinting] = useState(false)
    const [txHash, setTxHash] = useState("")
    const [tokenId, setTokenId] = useState(null)
    const [error, setError] = useState(null)
    const [tokenURI, setTokenURI] = useState(null)
    async function handleMint() {
        setMinting(true)
        setError(null)
        setTxHash("")
        setTokenId(null)

        // Check if the user has MetaMask installed and connected
        if (!window.ethereum) {
            setError("Please install MetaMask to mint an NFT")
            setMinting(false)
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

        // Check if the wallet has already minted an NFT
        const walletAddress = await signer.getAddress()
        const walletBalance = await contract.balanceOf(walletAddress)
        if (walletBalance > 0) {
            setError("You have already minted an NFT")
            setMinting(false)
            return
        }

        try {
            // Call the contract's mintNft function
            const tx = await contract.mintNft()

            // Wait for the transaction to be confirmed
            const receipt = await tx.wait()

            // Update the transaction hash and token ID
            setTxHash(receipt.transactionHash)
            setTokenId(receipt.events[0].args.tokenId.toNumber()) // retrieve the token ID from the first event

            // Get the token URI for the minted NFT
            const tokenUri = await contract.tokenURI(tokenId)
            setTokenURI(tokenUri)
        } catch (error) {
            setError(error.message)
        }

        setMinting(false)
    }


    return (
        <div>
            <h1>Mint an NFT</h1>
            {minting ? <p>Minting NFT...</p> : <button onClick={handleMint}>Mint NFT</button>}
            {txHash && <p>Transaction Hash: {txHash}</p>}
            {tokenId && <p>Token ID: {tokenId}</p>}
            {tokenURI && (
                <div>
                    <p>Token URI:</p>
                    <pre>{tokenURI}</pre>
                </div>
            )}
            {error && <p>Error: {error}</p>}
        </div>
    )
}