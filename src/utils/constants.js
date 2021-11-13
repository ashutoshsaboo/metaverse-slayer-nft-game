const CONTRACT_ADDRESS = '0x99Ce98EA0B609aE3F6e21F955d49b287348DC8E5';

/*
* Add this method and make sure to export it on the bottom!
*/
const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxHp.toNumber(),
    attackDamage: characterData.attackDamage.toNumber(),
  };
};
  
export { CONTRACT_ADDRESS, transformCharacterData };
