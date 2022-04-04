// for Use Web3 you have to use "react-scripts": "4.0.3"
import detectEthereumProvider from '@metamask/detect-provider'
import { useCallback, useEffect, useState } from 'react'
import Web3 from 'web3'
import { loadContract } from '../utils/loadContract'

const useWeb3 = ({ setAccount }) => {
    const setAccountListener = useCallback((provider) => {
        provider.on('accountsChanged', (_) => {
            // this is recommendation from docs
            window.location.reload()
            // setAccount(accounts[0])
        })
        provider.on('chainChanged', (_) => {
            // this is recommendation from docs
            window.location.reload()
            // setAccount(accounts[0])
        })
        // provider._jsonRpcConnection.events.on('notification', (payload) => {
        //     const { method } = payload
        //     console.log(method)
        //     if (method === 'metamask_accountsChanged') {
        //         setAccount(null)
        //     }
        // })
    }, [])

    const loadProvider = useCallback(
        async (callback) => {
            try {
                const provider = await detectEthereumProvider()
                const contract = await loadContract('Faucet', provider)
                if (provider) {
                    setAccountListener(provider, callback)
                    callback?.({
                        provider,
                        web3: new Web3(provider),
                        contract,
                        isProviderLoaded: true,
                    })
                }
            } catch (error) {
                console.log(error)
            } finally {
                callback?.((bef) => ({
                    ...bef,
                    isProviderLoaded: true,
                }))
            }
        },
        [setAccountListener]
    )

    const getAccounts = async ({ callback, web3API }) => {
        if (!web3API?.web3) {
            return
        }
        const accounts = await web3API.web3.eth.getAccounts()
        callback?.(accounts[0])
    }
    const connectToWallet = (web3API) => {
        if (!web3API?.provider) {
            return
        }
        web3API.provider.request({ method: 'eth_requestAccounts' })
    }

    return {
        loadProvider,
        getAccounts,
        connectToWallet,
    }
}

export default useWeb3

export const useAccount = (web3API, reload) => {
    const [balance, setBalance] = useState(0)

    const loadBalance = useCallback(async () => {
        if (!web3API?.contract) {
            return
        }
        const { contract, web3 } = web3API
        const balance = await web3.eth.getBalance(contract.address)
        setBalance(Web3.utils.fromWei(balance, 'ether'))
    }, [web3API])

    useEffect(() => {
        loadBalance()
    }, [loadBalance, reload])
    return { balance }
}

export const useTransactions = ({ web3API, account, reload }) => {
    const addFunds = useCallback(async () => {
        if (!web3API?.contract) {
            return
        }
        const { contract, web3 } = web3API

        await contract.addFunds({
            from: account,
            value: web3.utils.toWei('1', 'ether'),
        })
        reload?.()
    }, [account, reload, web3API])

    const withDraw = async () => {
        try {
            if (!web3API?.contract) {
                return
            }
            const { contract, web3 } = web3API
            const amount = web3.utils.toWei('0.1', 'ether')
            await contract.withdraw(amount, {
                from: account,
            })
            reload?.()
        } catch (e) {
            alert('Some error occured')
        }
    }
    return { addFunds, withDraw }
}
