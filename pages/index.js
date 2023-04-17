import Head from "next/head"
import Image from "next/image"
import { useMoralis } from "react-moralis"

export default function Home() {
    const { isWeb3Enabled } = useMoralis()
    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Your NFT</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? <div>Web3 Enabled</div> : <div>Web3 Currently Not Enabled</div>}
            </div>
        </div>
    )
}
