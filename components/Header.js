import { ConnectButton } from "web3uikit"
import Link from "next/link"

export default function Header() {
    return (
        <nav className="p-5 border-b-2 flex flex-wrap items-center justify-between">
            <div className="flex items-center mr-6">
                <h1 className="font-bold text-3xl">OxAuth</h1>
            </div>
            <div className="flex-grow">
                <div className="flex items-center justify-end">
                    <div className="flex flex-col lg:flex-row">
                        <Link href="/">
                            <a className="block px-3 py-2 rounded hover:bg-gray-200 lg:mx-3 lg:my-0 my-1">
                                Home
                            </a>
                        </Link>
                        <Link href="/nft">
                            <a className="block px-3 py-2 rounded hover:bg-gray-200 lg:mx-3 lg:my-0 my-1">
                                NFT
                            </a>
                        </Link>
                        <Link href="/Kyc">
                            <a className="block px-3 py-2 rounded hover:bg-gray-200 lg:mx-3 lg:my-0 my-1">
                                KYC
                            </a>
                        </Link>
                        <Link href="/RequestData">
                            <a className="block px-3 py-2 rounded hover:bg-gray-200 lg:mx-3 lg:my-0 my-1">
                                Request
                            </a>
                        </Link>
                        <Link href="/DisplayData">
                            <a className="block px-3 py-2 rounded hover:bg-gray-200 lg:mx-3 lg:my-0 my-1">
                                Display Data
                            </a>
                        </Link>
                        <Link href="/ApproveStatus">
                            <a className="block px-3 py-2 rounded hover:bg-gray-200 lg:mx-3 lg:my-0 my-1">
                                Approve Condition
                            </a>
                        </Link>
                        <Link href="/DecryptMyData">
                            <a className="block px-3 py-2 rounded hover:bg-gray-200 lg:mx-3 lg:my-0 my-1">
                                Decrypt Data
                            </a>
                        </Link>
                        <Link href="/Approve">
                            <a className="block px-3 py-2 rounded hover:bg-gray-200 lg:mx-3 lg:my-0 my-1">
                                Store KYC
                            </a>
                        </Link>
                        <Link href="/UpdateData">
                            <a className="block px-3 py-2 rounded hover:bg-gray-200 lg:mx-3 lg:my-0 my-1">
                                Update Data
                            </a>
                        </Link>
                        <Link href="/RevokeAccess">
                            <a className="block px-3 py-2 rounded hover:bg-gray-200 lg:mx-3 lg:my-0 my-1">
                                Revoke Data
                            </a>
                        </Link>
                    </div>
                    <ConnectButton moralisAuth={false} className="ml-4" />
                </div>
            </div>
        </nav>
    )
}
