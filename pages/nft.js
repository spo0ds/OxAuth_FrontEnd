import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import NTNFT from "../contracts/NTNFT.json"

export default function nft() {
    const [minting, setMinting] = useState(false)
    const [burning, setBurning] = useState(false)
    const [hasNFT, setHasNFT] = useState(false)
    const [tokenId, setTokenId] = useState(null)
    const [tokenURI, setTokenURI] = useState("")
    const [txHash, setTxHash] = useState("")
    const [error, setError] = useState("")

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
            "0x5FbDB2315678afecb367f032d93F642f64180aa3",
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
            "0x5FbDB2315678afecb367f032d93F642f64180aa3",
            abi,
            signer
        )

        // Get the user's Ethereum address
        const walletAddress = await signer.getAddress()

        // Check if the user has an NFT
        const tokenCounter = await contract.getTokenCounter()
        if (!tokenCounter) {
            setError("Unable to retrieve token counter")
            return
        }

        let tokenId = null
        for (let i = 0; i < parseInt(tokenCounter); i++) {
            try {
                // Check if the NFT exists using the token ID
                await contract.ownerOf(i)
            } catch (e) {
                // If the token ID is invalid, skip to the next iteration
                continue
            }
            const owner = await contract.ownerOf(i)
            if (owner === walletAddress) {
                tokenId = i
                break
            }
        }
        if (tokenId !== null) {
            setTokenId(tokenId)
            setHasNFT(true)

            // Get the token URI of the user's NFT
            const tokenUri = await contract.tokenURI(tokenId)
            setTokenURI(tokenUri)
        } else {
            setHasNFT(false)
            setError("You don't have an NFT to burn")
        }
    }

    async function handleBurn(tokenId) {
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
            "0x5FbDB2315678afecb367f032d93F642f64180aa3",
            abi,
            signer
        )

        // Get the user's Ethereum address
        const walletAddress = await signer.getAddress()

        try {
            // Check if the user owns the NFT
            const owner = await contract.ownerOf(tokenId)
            if (owner !== walletAddress) {
                setError("You do not own this NFT")
                setBurning(false)
                return
            }

            // Call the contract's burn function
            const tx = await contract.burn(tokenId)

            // Wait for the transaction to be confirmed
            const receipt = await tx.wait()

            // Update the transaction hash
            setTxHash(receipt.transactionHash)

            // Check if the user still has any NFTs
            const walletBalance = await contract.balanceOf(walletAddress)
            if (walletBalance.lte(0)) {
                setHasNFT(false)
            }

            setTokenId(null)
            setTokenURI(null)
        } catch (error) {
            setError(error.message)
        }

        setBurning(false)
    }

    return (
        <div class="p-4">
            <h1 class="text-2xl font-bold mb-4">Mint an NFT</h1>
            {minting ? (
                <p class="mb-4">Minting NFT...</p>
            ) : (
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                    onClick={handleMint}
                >
                    Mint NFT
                </button>
            )}
            {txHash && <p class="mb-4">Transaction Hash: {txHash}</p>}
            {tokenId && <p class="mb-4">Token ID: {tokenId}</p>}
            {tokenURI && (
                <div class="mb-4">
                    <p class="mb-2">Token URI:</p>
                    <pre class="bg-gray-100 p-2 rounded">{tokenURI}</pre>
                </div>
            )}
            {error && <p class="text-red-500 mb-4">Error: {error}</p>}
            <h1 class="text-2xl font-bold mb-4">Burn NFT</h1>

            {/* Check NFT */}
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={handleCheckNFT}
            >
                Check for NFT
            </button>
            {error && <p class="text-red-500 mb-4">{error}</p>}
            {hasNFT && <p class="mb-4">You have an NFT!</p>}
            {tokenId && <p class="mb-4">NFT ID: {tokenId}</p>}
            {tokenURI && (
                <img
                    class="mb-4 object-contain hover:object-scale-down"
                    src={tokenURI}
                    alt="NFT"
                />
            )}

            {/* Burn NFT */}
            {hasNFT && (
                <div>
                    <button
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
                        onClick={() => handleBurn(tokenId)}
                    >
                        Burn
                    </button>

                    {burning && <p class="mb-4">Burning...</p>}
                    {txHash && <p class="mb-4">Transaction hash: {txHash}</p>}
                </div>
            )}
        </div>
    )
}
