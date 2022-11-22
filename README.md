# Dapp for 'Voting' contract (exercise n°3) [Alyra](https://alyra.fr/)

***

## Notes :

For this exercise, I bet on your contract 'voting.sol' that I slightly modified by adding the function 'resetDataVote'.
I let you discover the video for the final rendering, and if you wish it to make a turn, on the deployed version.

After recording the video I added a filter according to the network on which they are located to limit access to the Göerli network

---

## Short video presentation of the Dapp :


[![Watch the video](https://img.youtube.com/vi/LpCtarxDl8M/maxresdefault.jpg)](https://youtu.be/LpCtarxDl8M)


---

## Website link :

This Dapp is accessible for testing purpose at this address : https://alyra-03-voting-dapp.vercel.app/

---

## Contract address on Göerli Test Network :

```
 0x9F6e0B55177adc9252C33B4bb18cdb56228EB286
```    
 Link : [goerli.etherscan](https://goerli.etherscan.io/address/0x9F6e0B55177adc9252C33B4bb18cdb56228EB286)

---

## Göerli deployment :

```
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Migrations dry-run (simulation)
===============================
> Network name:    'goerli-fork'
> Network id:      5
> Block gas limit: 30000000 (0x1c9c380)


1_deploy_simple_voting.js
=========================

   Replacing 'Voting'
   ------------------
   > block number:        7997381
   > block timestamp:     1669097247
   > account:             0x9B35Fa8639bB06712600840184c3707f0eBbF012
   > balance:             0.427953364648587172
   > gas used:            2311323 (0x23449b)
   > gas price:           55.050419266 gwei
   > value sent:          0 ETH
   > total cost:          0.127239300209148918 ETH

   -------------------------------------
   > Total cost:     0.127239300209148918 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.127239300209148918 ETH




Starting migrations...
======================
> Network name:    'goerli'
> Network id:      5
> Block gas limit: 30000000 (0x1c9c380)


1_deploy_simple_voting.js
=========================

   Replacing 'Voting'
   ------------------
   > transaction hash:    0xb355e0a26615bcfab683b37882bac80de7ef806a536814dd78a339afa8ef0060
   > Blocks: 0            Seconds: 4
   > contract address:    0x9F6e0B55177adc9252C33B4bb18cdb56228EB286
   > block number:        7997386
   > block timestamp:     1669097256
   > account:             0x9B35Fa8639bB06712600840184c3707f0eBbF012
   > balance:             0.389532763539716044
   > gas used:            2311323 (0x23449b)
   > gas price:           71.673193802 gwei
   > value sent:          0 ETH
   > total cost:          0.165659901318020046 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:     0.165659901318020046 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.165659901318020046 ETH

```

---

## Instructions for users who want to use the project locally :


  #### Please note that you need to have Ganache installed on your machine before continuing the instructions [Ganache](https://trufflesuite.com/ganache/)

* Start Ganache.
* Download the code then open in Visual Studio Code.
* Open a window in the VSC terminal and type the following command:

  ```
  $ cd client
  $ npm install
  ```
* Open a second window in the VSC terminal and type the following command:  

  ```
  $ cd truffle
  $ npm install
  $ truffle compile
  $ truffle migrate
  ```
* Now open a third terminal window and run the following command:  

  ```
  $ cd client
  $ npm start
  ```

* Note : 
    
    Compiler configuration "0.8.17"

    Using network 'development'.

    If you want to launch the contract on the Göerli testnet create a '.env' file in the truffle folder, with INFURA_ID and your MNEMONIC as variables.

---

## License :
* [MIT License](https://choosealicense.com/licenses/mit/)

---
