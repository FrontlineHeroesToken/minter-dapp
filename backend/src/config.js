require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Frontline Heroes";
const description = "Support Those that Serve";
const baseUri = "ipfs://TobeReplaced"; // This will be replaced automatically

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 1000,
    layersOrder: [
      { name: "Healthcare Male Background" },
      { name: "Healthcare Male Base" },
      { name: "Healthcare Male Shirt" },
      { name: "Healthcare Male Face" },
      { name: "Healthcare Male NeckWear" },
      { name: "Healthcare Male Hair" },
      { name: "Healthcare Male HeadWear" },
      { name: "Healthcare Male FaceCover" },
      { name: "Healthcare Male HoldItem" },
    ],
  },  {
    growEditionSizeTo: 2000,
    layersOrder: [
      { name: "Healthcare Female Background" },
      { name: "Healthcare Female Base" },
      { name: "Healthcare Female Shirt" },
      { name: "Healthcare Female Face" },
      { name: "Healthcare Female NeckWear" },
      { name: "Healthcare Female Hair" },
      { name: "Healthcare Female HeadWear" },
      { name: "Healthcare Female FaceCover" },
      { name: "Healthcare Female HoldItem" },
    ],
  },
  {
    growEditionSizeTo: 3000,
    layersOrder: [
      { name: "Firefighter Male Background" },
      { name: "Firefighter Male Base" },
      { name: "Firefighter Male Shirt" },
      { name: "Firefighter Male Face" },
      { name: "Firefighter Male Hair" },
      { name: "Firefighter Male FaceCover" },
      { name: "Firefighter Male HeadWear" },
      { name: "Firefighter Male HoldItem" },
    ],
  },
  {
    growEditionSizeTo: 4000,
    layersOrder: [
      { name: "Firefighter Female Background" },
      { name: "Firefighter Female Base" },
      { name: "Firefighter Female Shirt" },
      { name: "Firefighter Female Face" },
      { name: "Firefighter Female Hair" },
      { name: "Firefighter Female FaceCover" },
      { name: "Firefighter Female HeadWear" },
      { name: "Firefighter Female HoldItem" },
    ],
  },
  {
    growEditionSizeTo: 5000,
    layersOrder: [
      { name: "lawEnforcement Male Background" },
      { name: "lawEnforcement Male Base" },
      { name: "lawEnforcement Male Shirt" },
      { name: "lawEnforcement Male Face" },
      { name: "lawEnforcement Male Hair" },
      { name: "lawEnforcement Male FaceCover" },
      { name: "lawEnforcement Male HeadWear" },
      { name: "lawEnforcement Male HoldItem" },
    ],
  },
  {
    growEditionSizeTo: 6000,
    layersOrder: [
      { name: "lawEnforcement Female Background" },
      { name: "lawEnforcement Female Base" },
      { name: "lawEnforcement Female Shirt" },
      { name: "lawEnforcement Female Face" },
      { name: "lawEnforcement Female Hair" },
      { name: "lawEnforcement Female FaceCover" },
      { name: "lawEnforcement Female HeadWear" },
      { name: "lawEnforcement Female HoldItem" },
    ],
  },
  {
    growEditionSizeTo: 7000,
    layersOrder: [
      { name: "Military Male Background" },
      { name: "Military Male Base" },
      { name: "Military Male Shirt" },
      { name: "Military Male Face" },
      { name: "Military Male Hair" },
      { name: "Military Male NeckWear" },
      { name: "Military Male HeadWear" },
      { name: "Military Male FaceCover" },
      { name: "Military Male HoldItem" },
    ],
  },
  {
    growEditionSizeTo: 8000,
    layersOrder: [
      { name: "Military Female Background" },
      { name: "Military Female Base" },
      { name: "Military Female Shirt" },
      { name: "Military Female Face" },
      { name: "Military Female Hair" },
      { name: "Military Female NeckWear" },
      { name: "Military Female HeadWear" },
      { name: "Military Female FaceCover" },
      { name: "Military Female HoldItem" },
    ],
  },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 1300,
  height: 1300,
  smoothing: false,
};

const extraMetadata = {
  external_url: "https://frontlineheroestoken.com", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 4; // Your API key rate limit
const CHAIN = 'rinkeby'; // only rinkeby or polygon

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'FrontlineHeroesTEST';
const CONTRACT_SYMBOL = 'FHNFTsTEST';
const METADATA_UPDATABLE = false; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0x9217E338A416CB3C38F93f871629fbF24db62f4d';
const TREASURY_ADDRESS = '0x9217E338A416CB3C38F93f871629fbF24db62f4d';
const MAX_SUPPLY = 8000; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 0.003; // Minting price per NFT. Rinkeby = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 5; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2022-04-11T11:30:48+00:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = null; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 2000; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0x8f020DB49E4bd2C97C7C95eA9775bf84b95C576A"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = []; // only update if you want to manually set the whitelisted addresses

// ** OPTIONAL **
let CONTRACT_ADDRESS = "YOUR CONTRACT ADDRESS"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = "FrontlineHeroesTEST"; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "Which Frontline Heroe Are You Getting?"; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/bafybeigrc7xyjhtatlnwl6hk2rsk5t5vus4s7raigx4dywlpis6trfv43e"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK" && contractData.error === null) {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 2000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://frontlineheroestoken.com",
  creators: [
    {
      address: "0x8f020DB49E4bd2C97C7C95eA9775bf84b95C576A",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
