const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('MetaverseSlayerGame');
  const gameContract = await gameContractFactory.deploy(
    ["Leo", "Aang", "Pikachu"],       // Names
    ["https://i.imgur.com/pKd5Sdk.png", // Images
    "https://i.imgur.com/xVu4vFL.png", 
    "https://i.imgur.com/WMB6g9u.png"],
    [100, 200, 300],                    // HP values
    [100, 50, 25],                       // Attack damage values
    "Elon Musk", // Boss name
    "https://i.imgur.com/AksR0tt.png", // Boss image
    10000, // Boss hp
    50 // Boss attack damage  
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  // let txn;
  // txn = await gameContract.mintCharacterNFT(0);
  // await txn.wait();
  // console.log("Minted NFT #1");

  // txn = await gameContract.mintCharacterNFT(1);
  // await txn.wait();
  // console.log("Minted NFT #2");

  // txn = await gameContract.mintCharacterNFT(2);
  // await txn.wait();
  // console.log("Minted NFT #3");

  // txn = await gameContract.mintCharacterNFT(1);
  // await txn.wait();
  // console.log("Minted NFT #4");

  // console.log("Done deploying and minting!");
  
  // Get the value of the NFT's URI.
  // let returnedTokenUri = await gameContract.tokenURI(1);
  // console.log("Token URI:", returnedTokenUri);

  // txn = await gameContract.attackBoss();
  // await txn.wait();

  // txn = await gameContract.attackBoss();
  // await txn.wait();

  console.log("Done!");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
