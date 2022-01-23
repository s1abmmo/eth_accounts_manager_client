import { ethers } from "ethers";
import { ResponseSignMessageModel } from "./Model/ResponseSignMessageModel";

declare global {
    interface Window {
        ethereum?: any;
        web3?: any
    }
}

export class ResponseSignMesage {
    public message: string;
    public signature: string;
    public address: string;
    constructor(message: string, signature: string, address: string) {
        this.message = message;
        this.signature = signature;
        this.address = address;
    }
}

export function signMessage(message: string): Promise<ResponseSignMessageModel> {
    return new Promise(async (resolve, reject) => {
        try {
            console.log({ message });
            if (!window.ethereum)
                throw new Error("No crypto wallet found. Please install it.");

            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const signature = await signer.signMessage(message);
            const address = await signer.getAddress();

            resolve(new ResponseSignMessageModel(address, signature));
        } catch (err) {
            reject(err);
        }
    });
};