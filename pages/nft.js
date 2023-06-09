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

            // Get the token URI for the minted NFT if tokenId is not null
            if (tokenId !== null) {
                const tokenUri = await contract.tokenURI(tokenId)
                setTokenURI(tokenUri)
            }
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
  <div className="bg-purple-900 min-h-screen flex flex-col md:flex-row items-center justify-center">
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 mb-8 md:mr-8 md:mb-0">
      <h1 className="text-3xl font-bold mb-8 text-center">Mint an NFT</h1>
      {minting ? (
        <p className="mb-4">Minting NFT...</p>
      ) : (
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded mb-8"
          onClick={handleMint}
        >
          Mint NFT
        </button>
      )}
      {txHash && <p className="mb-4 break-words">Transaction Hash: {txHash}</p>}
      {tokenId && <p className="mb-4">Token ID: {tokenId}</p>}
      {tokenURI && (
        <div className="mb-4">
          <p className="mb-2 break-words">Token URI:</p>
          <p className="bg-gray-800 p-2 rounded text-white break-words">
            {tokenURI}
          </p>
        </div>
      )}
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
    </div>

    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Burn NFT</h1>
      {/* Check NFT */}
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded mb-8"
        onClick={handleCheckNFT}
      >
        Check for NFT
      </button>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {hasNFT && (
        <div className="mb-4">
          <p className="mb-4">You have an NFT!</p>
          {tokenId && (
            <div className="grid md:grid-cols-2 gap-2">
              <div className="max-w-full rounded-lg shadow-lg overflow-hidden">
                <img className="h-auto w-full" src={tokenURI} alt="NFT" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-bold text-xl mb-2">NFT ID:</p>
                <p className="mb-2">{tokenId}</p>
                <button
                  className="py-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
                  onClick={() => handleBurn(tokenId)}
                >
                  Burn
                </button>
                {burning && <p className="mb-4">Burning...</p>}
                {txHash && <p className="mb-4 break-words">Transaction hash: {txHash}</p>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);

}
