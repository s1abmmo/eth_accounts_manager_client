export class ResponseSignMessageModel {
    public userAddress: string;
    public signature: string;
    constructor(userAddress: string, signature: string) {
        this.userAddress = userAddress;
        this.signature = signature;
    }
}