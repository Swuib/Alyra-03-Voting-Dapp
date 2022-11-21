# Dapp for 'Voting' contract (exercise n°3) [Alyra](https://alyra.fr/)

***

## Notes :

For this exercise, I bet on your contract 'voting.sol' that I slightly modified by adding the function 'resetDataVote'.
I let you discover the video for the final rendering, and if you wish it to make a turn, on the deployed version. 

---

## Short video presentation of the Dapp :


[![Watch the video](https://img.youtube.com/vi/LpCtarxDl8M/maxresdefault.jpg)](https://youtu.be/LpCtarxDl8M)


---

## Website link :

This Dapp is accessible for testing purpose at this address : 

---

## Contract address on Göerli Test Network :

```
 0x21952c1266804F8d0fdCB48f703e8B639a49c3D2
```    
 Link : [goerli.etherscan](https://goerli.etherscan.io/address/0x21952c1266804f8d0fdcb48f703e8b639a49c3d2)

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

   Deploying 'Voting'
   ------------------
   > block number:        7990506
   > block timestamp:     1668996127
   > account:             0x9B35Fa8639bB06712600840184c3707f0eBbF012
   > balance:             0.35519266511282059
   > gas used:            2318950 (0x236266)
   > gas price:           2.500000889 gwei
   > value sent:          0 ETH
   > total cost:          0.00579737706154655 ETH

   -------------------------------------
   > Total cost:     0.00579737706154655 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.00579737706154655 ETH




Starting migrations...
======================
> Network name:    'goerli'
> Network id:      5
> Block gas limit: 30000000 (0x1c9c380)


1_deploy_simple_voting.js
=========================

   Deploying 'Voting'
   ------------------
   > transaction hash:    0xad5909d699bb5655884f21f270ed9302a202cc370b0fd497e64bbf27540d767b
   > Blocks: 1            Seconds: 12
   > contract address:    0x21952c1266804F8d0fdCB48f703e8B639a49c3D2
   > block number:        7990511
   > block timestamp:     1668996144
   > account:             0x9B35Fa8639bB06712600840184c3707f0eBbF012
   > balance:             0.35519266485773609
   > gas used:            2318950 (0x236266)
   > gas price:           2.500000999 gwei
   > value sent:          0 ETH
   > total cost:          0.00579737731663105 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:     0.00579737731663105 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.00579737731663105 ETH

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
  $ cd ../
  $ cd truffle
  $ npm install
  $ truffle compile
  $ truffle migrate
  ```
* Now open a third terminal window and run the following command:  

  ```
  $ cd ../
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
