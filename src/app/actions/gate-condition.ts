import { getContract } from "thirdweb";
import { avalancheFuji } from "thirdweb/chains";
import { client } from "../consts/client";
import { balanceOf as balanceOfERC721 } from "thirdweb/extensions/erc721";
import { balanceOf as balanceOfERC20 } from "thirdweb/extensions/erc20";

export async function hasAccess(address: string): Promise<boolean> {
  return await example_hasSomeErc721Tokens(address);
  // return await example_hasSomeErc20Tokens(address);
}

//
//
//
//
//
//
//
//
/**
 * Check out some of the examples below
 * The use cases are not limited to token-balance, you can basically do anything you want.
 *
 * For example: You can leverage some third-party api to check for the "age" of the wallet and
 * only allow wallet older than 2 years to access.
 *
 * Or you can allow only wallets that have interacted with Uniswap to access the page!
 *
 * The sky is the limit.
 */

async function example_hasSomeErc721Tokens(address: string) {
  const requiredQuantity = 1n;

  const erc721Contract = getContract({
    // replace with your own NFT contract address
    address: "0xE90D7479933E3CA7f4cC0D7A3be362008baa9f59",

    // replace with the chain that your nft contract was deployed on
    // if that chain isn't included in our default list, use `defineChain`
    chain: avalancheFuji,

    client,
  });

  const ownedBalance = await balanceOfERC721({
    contract: erc721Contract,
    owner: address,
  });

  console.log({ ownedBalance });

  return ownedBalance >= requiredQuantity;
}

async function example_hasSomeErc20Tokens(address: string) {
  const requiredQuantity = 10n; // 10 erc20 token

  const erc20Contract = getContract({
    // replace with your own erc20 contract address
    address: "0x34d63a572194F61e53b16A97Dda2fE82BF4C7e4d",

    // replace with the chain that your erc20 contract was deployed on
    // if that chain isn't included in our default list, use `defineChain`
    chain: avalancheFuji,

    client,
  });

  const ownedBalance = await balanceOfERC20({
    contract: erc20Contract,
    address,
  });

  console.log({ ownedBalance });

  return ownedBalance >= requiredQuantity;
}
