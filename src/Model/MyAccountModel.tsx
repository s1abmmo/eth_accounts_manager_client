export class MyAccountModel {
    public xUserAddress?: string;
    public signature?: string;
    constructor(xUserAddress?: string, signature?: string) {
        this.xUserAddress = xUserAddress;
        this.signature = signature;
    }
}