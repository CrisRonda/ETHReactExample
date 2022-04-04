import { useCallback, useEffect, useState } from 'react'
import './App.css'
import useWeb3, { useAccount, useTransactions } from './hooks/useWeb3'

function App() {
    const [account, setAccount] = useState(null)
    const [reload, setReload] = useState(null)
    const onReload = useCallback(() => setReload((bef) => !bef), [])

    const { getAccounts, loadProvider, connectToWallet } = useWeb3({
        setAccount,
    })
    const [web3API, setWeb3API] = useState({
        provider: null,
        web3: null,
        contract: null,
        isProviderLoaded: false,
    })
    const { balance } = useAccount(web3API, reload)

    const { addFunds, withDraw } = useTransactions({
        web3API,
        account,
        reload: onReload,
    })
    const canConnectedContract = account && web3API.contract

    useEffect(() => {
        loadProvider(setWeb3API)
    }, [loadProvider])

    useEffect(() => {
        getAccounts({ callback: setAccount, web3API })
    }, [getAccounts, web3API])

    return (
        <>
            <div className="faucet-wrapper">
                <div className="faucet">
                    {!web3API.isProviderLoaded ? (
                        <>Loading for Web 3...</>
                    ) : (
                        <div className="is-flex is-align-items-center">
                            <strong>Account: </strong>
                            {account ? (
                                <h2>{account}</h2>
                            ) : !web3API.provider ? (
                                <>
                                    <div className="notification is-warning is-small is-rounded">
                                        Wallet is not connected {` `}
                                        <a
                                            target="_black"
                                            href="https://docs.metamask.io"
                                        >
                                            Install Metamask
                                        </a>
                                    </div>
                                </>
                            ) : (
                                <button
                                    className="button is-info is-small ml-2"
                                    onClick={() => connectToWallet(web3API)}
                                >
                                    Connect Wallet
                                </button>
                            )}
                        </div>
                    )}
                    <div className="blance-view is-size-2 my-5">
                        Current Balance: <strong>{balance}</strong> ETH
                    </div>

                    {!canConnectedContract && (
                        <>
                            <i className="is-blocked">Connect to Ganache</i>
                            <br />
                        </>
                    )}
                    <button
                        disabled={!canConnectedContract}
                        className="button is-primary is-light mr-4"
                        onClick={addFunds}
                    >
                        Donate 1ETH
                    </button>
                    <button
                        disabled={!canConnectedContract}
                        onClick={withDraw}
                        className="button is-link is-light"
                    >
                        Withdraw 0.1ETH
                    </button>
                </div>
            </div>
        </>
    )
}

export default App
