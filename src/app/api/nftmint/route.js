import { NextResponse } from "next/server";
import { Aggregator, FEE, generateMintCotaTx } from "@nervina-labs/cota-sdk";
import { Collector } from "@nervina-labs/cota-sdk";
import * as pkg from "@nervosnetwork/ckb-sdk-utils";
import { ANMOL_COTA_ID, ANMOL_MINTER_ADDRESS } from "@/app/components/constant";
const { addressToScript, serializeScript } = pkg;
// import prisma from "@/app/libs/prismadb";

const secp256k1CellDep = (isMainnet) => {
  if (isMainnet) {
    return {
      outPoint: {
        txHash:
          "0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c",
        index: "0x0",
      },
      depType: "depGroup",
    };
  }
  return {
    outPoint: {
      txHash:
        "0xf8de3bb47d055cdf460d93a2a6e1b05f7432f9777c8c474abf4eec1d4aee5d37",
      index: "0x0",
    },
    depType: "depGroup",
  };
};

export async function POST(request) {
  try {
    const body = await request.json();

    const { address, email } = body;
    console.log("Email", email);
    console.log("Address", address);

    // Config for Nervos Cota NFT Minter

    // True for mainnet and false for testnet
    const isMainnet = false;

    const service = {
      collector: new Collector({
        ckbNodeUrl: "https://testnet.ckbapp.dev/rpc",
        ckbIndexerUrl: "https://testnet.ckbapp.dev/rpc",
      }),
      aggregator: new Aggregator({
        registryUrl: "https://cota.nervina.dev/registry-aggregator",
        cotaUrl: "https://cota.nervina.dev/aggregator",
      }),
    };
    const ckb = service.collector.getCkb();
    const mintLock = addressToScript(ANMOL_MINTER_ADDRESS);

    // If any tokenIndex of MintCotaInfo is not set, the tokenIndex will be set automatically with issued count.
    const mintCotaInfo = {
      cotaId: ANMOL_COTA_ID,
      withdrawals: [
        {
          // tokenIndex: '0x00000000',
          state: "0x00",
          characteristic: "0x0505050505050505050505050505050505050505",
          toLockScript: serializeScript(addressToScript(address)),
        },
      ],
    };

    let rawTx = await generateMintCotaTx(
      service,
      mintLock,
      mintCotaInfo,
      FEE,
      isMainnet
    );
    rawTx.cellDeps.push(secp256k1CellDep(isMainnet));

    const signedTx = ckb.signTransaction(process.env.MINTER_PRIVATE_KEY)(rawTx);
    let txHash = await ckb.rpc.sendTransaction(signedTx, "passthrough");
    console.info(`Mint cota nft tx has been sent with tx hash ${txHash}`);

    return NextResponse.json({ status: true, txHash: txHash });
  } catch (error) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Error", { status: 500 });
  }
}
