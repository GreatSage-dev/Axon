import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

export async function POST(req: NextRequest) {
  try {
    const { payloadText } = await req.json();
    if (!payloadText) {
      return NextResponse.json({ error: 'Missing payloadText' }, { status: 400 });
    }

    const privateKey =
      process.env.XLAYER_TESTNET_PRIVATE_KEY ||
      process.env.NEXT_PUBLIC_XLAYER_TESTNET_PRIVATE_KEY ||
      '';

    const rpcUrl = 'https://testrpc.xlayer.tech';
    const keccakHash = ethers.keccak256(ethers.toUtf8Bytes(payloadText));

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    // Send real live transaction on OKX X Layer Testnet
    const tx = await wallet.sendTransaction({
      to: wallet.address,
      value: 0,
      data: keccakHash,
    });

    const receipt = await tx.wait();
    const blockNumber = receipt ? receipt.blockNumber : 0;
    const txHash = tx.hash;
    const fromAddress = wallet.address;
    const explorerUrl = `https://www.okx.com/web3/explorer/xlayer-test/tx/${txHash}`;

    return NextResponse.json({
      keccakHash,
      txHash,
      blockNumber,
      fromAddress,
      explorerUrl,
    });
  } catch (err: any) {
    console.error('API /api/v1/attestations error:', err);
    return NextResponse.json(
      { error: err.message || 'X Layer transaction failed' },
      { status: 500 }
    );
  }
}
