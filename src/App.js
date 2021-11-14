import React, { useEffect, useState } from 'react';
import githubLogo from './assets/github-logo.svg'
import './App.css';
import SelectCharacter from './Components/SelectCharacter';
import { CONTRACT_ADDRESS, transformCharacterData } from './utils/constants';
import metaverseSlayerGame from './utils/MetaverseSlayerGame.json';
import { ethers } from 'ethers';
import Arena from './Components/Arena';
import LoadingIndicator from './Components/LoadingIndicator';

const GITHUB_HANDLE = 'ashutoshsaboo';
const GITHUB_LINK = `https://github.com/${GITHUB_HANDLE}`;

const App = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      /*
      * First make sure we have access to window.ethereum
      */
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
        /*
         * We set isLoading here because we use return in the next line
         */
        setIsLoading(false);
        return;
      } else {
        console.log('We have the ethereum object', ethereum);
        /*
        * Check if we're authorized to access the user's wallet
        */
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        /*
        * User can have multiple authorized accounts, we grab the first one if its there!
        */
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
        } else {
          console.log('No authorized account found');
        }
      }
    } catch(error) {
      console.error(error);
    }
    /*
    * We release the state property after all the function logic
    */
    setIsLoading(false);
  };

  // Render Methods
  const renderContent = () => {
    /*
    * If the app is currently loading, just render out LoadingIndicator
    */
    if (isLoading) {
      return <LoadingIndicator />;
    }
    /*
    * Scenario #1
    */
    if (!currentAccount) {
      return (
        <div className="connect-wallet-container">
          <img
            src="https://64.media.tumblr.com/tumblr_mbia5vdmRd1r1mkubo1_500.gifv"
            alt="Monty Python Gif"
          />
          <button
            className="cta-button connect-wallet-button"
            onClick={connectWalletAction}
          >
            Connect Wallet To Get Started
          </button>
        </div>
      );
      /*
      * Scenario #2
      */
    } else if (currentAccount && !characterNFT) {
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />;
    }	else if (currentAccount && characterNFT) {
      /*
      * If there is a connected wallet and characterNFT, it's time to battle!
      */      
      return <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />;
    }
  
  };

  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * This runs our function when the page loads.
   */
  useEffect(() => {
    /*
    * Anytime our component mounts, make sure to immiediately set our loading state
    */
    setIsLoading(true);
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    /*
    * The function we will call that interacts with out smart contract
    */
    const fetchNFTMetadata = async () => {
      console.log('Checking for Character NFT on address:', currentAccount);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        metaverseSlayerGame.abi,
        signer
      );
      console.log('Game contract: ', gameContract);

      const txn = await gameContract.checkIfUserHasNFT();
      console.log('Transaction checkIfUserHasNFT on smart contract: ', txn);
      if (txn.name) {
        console.log('User has character NFT from retrieved txn: ', txn);
        setCharacterNFT(transformCharacterData(txn));
      } else {
        console.log('No character NFT found');
      }
      /*
      * Once we are done with all the fetching, set loading state to false
      */
      setIsLoading(false);
    };

    /*
    * We only want to run this, if we have a connected wallet
    */
    if (currentAccount) {
      console.log('CurrentAccount:', currentAccount);
      fetchNFTMetadata();
    }
  }, [currentAccount]);

  
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚔️ Metaverse Slayer ⚔️</p>
          <p className="sub-text">Team up to protect the Metaverse!</p>
          {renderContent()}          
        </div>
        <div className="footer-container">
          <img alt="Github Logo" className="twitter-logo" src={githubLogo} />
          <a
            className="footer-text"
            href={GITHUB_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${GITHUB_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
