import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import Header from "../components/Header"
import FillUpForm from "../components/FillUpForm"
import RequestData from "../components/RequestData"
import ApproveData from "../components/ApproveData"
import Mint from "../components/Mint"
import Burn from "../components/Burn"
import Head from "next/head"
import { NotificationProvider } from "web3uikit"

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>OxAuth</title>
                <meta name="description" content="OxAuth" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <NotificationProvider>
                    <Header />
                    <h1>filling up the Form</h1>
                    <FillUpForm />
                    <h1> Request KYC Data</h1>
                    <RequestData />
                    <h1>Minting NFT</h1>

                    <Mint />
                    <hr/>
                    <Burn/>
                    <ApproveData />
                    <Component {...pageProps} />
                </NotificationProvider>
            </MoralisProvider>
        </div>
    )
}

export default MyApp
