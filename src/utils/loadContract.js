import contract from '@truffle/contract'

export const loadContract = async (name, provider) => {
    const res = await fetch(`/contracts/${name}.json`)
    const Artifact = await res.json()
    const _contract = contract(Artifact)
    _contract.setProvider(provider)
    let deployedContract
    try {
        deployedContract = await _contract.deployed()
    } catch (error) {
        alert(
            'You are connected to the wrong network. Please switch to the main network.'
        )
    }
    return deployedContract
}
