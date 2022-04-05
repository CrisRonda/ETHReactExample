const ethUtil = require('ethereumjs-util')
const EthereumTx = require('ethereumjs-tx').Transaction

// hash
// 0xf86c01850c4b201000825208949cbfd6ebdb9cfcccd6b043f43e524583486d455e880490283b23ec8f768025a067da959a6d114d42016b5fb43ff8ae018efe6e4c784d40dfb2f2aad8fb2d4f6ca00b019b1e457b592e5bfd553e3b73742de625c7b65145494a57dbca17e5e9d842

const txParams = {
    nonce: '0x01',
    gasPrice: '0xC4B201000',
    gasLimit: '0x5208',
    value: '0x490283B23EC8F76',
    data: '0x', // null data
    to: '0x9cbfd6ebdb9cfcccd6b043f43e524583486d455e',
    v: '0x25',
    r: '0x67da959a6d114d42016b5fb43ff8ae018efe6e4c784d40dfb2f2aad8fb2d4f6c',
    s: '0x0b019b1e457b592e5bfd553e3b73742de625c7b65145494a57dbca17e5e9d842',
}

const tx = new EthereumTx(txParams, {
    chain: 'mainnet',
})

const key = tx.getSenderPublicKey()
const address = tx.getSenderAddress()
const isValid = tx.verifySignature()

console.log('unsigned')
console.log({
    key: key.toString('hex'),
    address: address.toString('hex'),
    isValid,
})
console.log('--------------SEE THE ADDRESS FIELD----------------')
const txParams1 = {
    nonce: '0x01',
    gasPrice: '0xC4B201000',
    gasLimit: '0x5208',
    value: '0x490283B23EC8F76',
    data: '0x', // null data
    to: '0x9cbfd6ebdb9cfcccd6b043f43e524583486d455e',
}
const tx2 = new EthereumTx(txParams1, { chain: 'mainnet' })

// Private key from Ganache
const privateKey = Buffer.from(
    '04c1713ee306c76db1158d69ee99e484e997ba5fe6e656e804d90b7ce2ef265b',
    'hex'
)

tx2.sign(privateKey)
const key2 = tx2.getSenderPublicKey()
const address2 = tx2.getSenderAddress()
const isValid2 = tx2.verifySignature()

console.log('signed')
console.log({
    key2: key2.toString('hex'),
    address2: address2.toString('hex'),
    isValid2,
})

console.log(
    '**********************\nWhen you have the transaction signed, make it change the address field to the address of the private key account\n**********************'
)
