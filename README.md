# Ethereum React Example

This example is from course `Solidity & Ethereum in React (Next JS): The Complete Guide`

## Installation

1. Install truffle globally

```bash
npm i -g truffle
```

2. Initializate truffle

```bash
truffle init
```

3. [Install Ganache for desktop](https://trufflesuite.com/ganache/index.html)
4. Open Ganache and create a network

# Run project

1. Install dependencies and run in dev env

```bash
yarn && yarn start
```

2. Go to [http://localhost:3000](http://localhost:3000)

# Project Structure

```bash
truffle-config.js --> Config file for contracts in blockchain
./src
├── App.css
├── App.js
├── hooks
│   └── useWeb3.js
├── index.css
├── index.js
├── logo.svg
├── reportWebVitals.js
├── setupTests.js
└── utils
    └── loadContract.js
```
