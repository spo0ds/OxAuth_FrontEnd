import Head from "next/head";
import Image from "next/image";
import { useMoralis } from "react-moralis";

export default function Home() {
  const { isWeb3Enabled, authenticate, isAuthenticated } = useMoralis();

  const handleWalletConnect = async () => {
    try {
      await authenticate({ provider: "walletconnect" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      <Head>
        <title>NFT KYC Authentication</title>
      </Head>
      <h1 className="py-4 px-4 font-bold text-2xl">Your NFT</h1>
      <div className="flex flex-wrap">
        {isWeb3Enabled ? (
          <div className="p-4 bg-green-200 rounded-md">Web3 Enabled</div>
        ) : (
          <div className="p-4 bg-red-200 rounded-md">
            Web3 Currently Not Enabled
          </div>
        )}
      </div>
      <main className="flex flex-wrap mt-8">
        <section className="w-full md:w-1/2 p-4">
          <h1 className="font-bold text-2xl mb-4">NFT KYC Authentication</h1>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            vel malesuada arcu. Maecenas sit amet nisi libero. Nullam in mauris
            non nibh rutrum dictum. Fusce hendrerit felis vitae dui dictum
            hendrerit. Integer vitae ultricies velit, in molestie nunc.
          </p>
          {!isAuthenticated && (
            <button
              onClick={handleWalletConnect}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Connect with Wallet
            </button>
          )}
          {isAuthenticated && (
            <p className="text-green-500 mt-4">Successfully authenticated</p>
          )}
        </section>
        <section className="w-full md:w-1/2 p-4">
          <Image
            src="/photo.png"
            alt="NFT"
            width={500}
            height={500}
            className="rounded-md"
          />
        </section>
      </main>
      <footer className="mt-8 text-center">
        <p>&copy; 2023 NFT KYC Authentication. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
