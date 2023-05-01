import { ConnectButton } from "web3uikit"
import Link from "next/link"

export default function Header() {
    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <h1 className="py-4 px-4 font-bold text-3xl">OxAuth</h1>
            <div className="flex flex-row items-center">
                <Link href="/">
                    <a className="mr-4 p-6">Home</a>
                </Link>

                <Link href="/Kyc">
                    <a className="mr-4 p-6">KYC</a>
                </Link>

                <Link href="/nft">
                    <a className="mr-4 p-6">NFT</a>
                </Link>
                
                <Link href="/RequestData">
                    <a className="mr-4 p-6">Request</a>
                </Link>
                 <Link href="/DisplayData">
                    <a className="mr-4 p-6">Display Data</a>
                </Link>


                <Link href="/ApproveData">
                    <a className="mr-4 p-6">Approve</a>
                </Link>
                <Link href="/ApproveCondition">
                    <a className="mr-4 p-6">Approve Condition</a>
                </Link>
                <Link href="/DecryptData">
                    <a className="mr-4 p-6">Decrypt Data</a>
                </Link>
                <Link href="/StoreKyc">
                    <a className="mr-4 p-6">Store KYC</a>
                </Link>
                <Link href="/UpdateData">
                    <a className="mr-4 p-6">Update Data</a>
                </Link>
                <Link href="/RevokeData">
                    <a className="mr-4 p-6">Revoke Data</a>
                </Link>
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}
