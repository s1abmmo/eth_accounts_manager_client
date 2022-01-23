import React from 'react';

export interface AddPegaContainerProps {
}

export interface AddPegaContainerState {
    listProxyString: string;
    xUserAddress: string;
    xUserSignature: string;
    privateKey: string;
    proxyUser: string;
    proxyPassword: string;
    proxyHost: string;
    proxyPort: string;
    notify: string;
}

export class AddPegaContainer extends React.Component<AddPegaContainerProps, AddPegaContainerState> {

    constructor(props: AddPegaContainerProps) {
        super(props)
        this.state = {
            listProxyString: '',
            xUserAddress: '',
            xUserSignature: '',
            privateKey: '',
            proxyUser: '',
            proxyPassword: '',
            proxyHost: '',
            proxyPort: '',
            notify: '',
        }
        this.addProxy = this.addProxy.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addAccount = this.addAccount.bind(this);
        this.xUserAddressOnChanged = this.xUserAddressOnChanged.bind(this);
        this.xUserSignatureOnChanged = this.xUserSignatureOnChanged.bind(this);
        this.privateKeyOnChanged = this.privateKeyOnChanged.bind(this);
        this.proxyUserOnChanged = this.proxyUserOnChanged.bind(this);
        this.proxyPasswordOnChanged = this.proxyPasswordOnChanged.bind(this);
        this.proxyHostOnChanged = this.proxyHostOnChanged.bind(this);
        this.proxyPortOnChanged = this.proxyPortOnChanged.bind(this);
    }

    addProxy() {
        let _listProxy: Array<string> = this.state.listProxyString.split('\n');
        if (_listProxy.length > 0) {
            let _proxySplited: Array<string> = _listProxy[0].split(':');
            _listProxy.splice(0, 1);
            let _newListProxyString: string = _listProxy.join('\n');
            console.log(_listProxy);
            if (_proxySplited.length == 4) {
                this.setState({
                    listProxyString: _newListProxyString,
                    proxyUser: _proxySplited[2],
                    proxyPassword: _proxySplited[3],
                    proxyHost: _proxySplited[0],
                    proxyPort: _proxySplited[1],
                });
            }
        }

    }

    onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ listProxyString: event.target.value });
    }

    addAccount() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                xUserAddress: this.state.xUserAddress,
                xUserSignature: this.state.xUserSignature,
                privateKey: this.state.privateKey,
                proxyHost: this.state.proxyHost,
                proxyPort: this.state.proxyPort,
                proxyUser: this.state.proxyUser,
                proxyPassword: this.state.proxyPassword
            })
        };
        fetch('/add', requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                console.log(data);

                this.setState({
                    notify: `${this.state.xUserAddress} ${data.message}`
                })
            }
            )
            .then(data => { }
            ).catch(err => {
                this.setState({
                    notify: `${this.state.xUserAddress} ${err}`
                })
            });
    }

    xUserAddressOnChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const value: string = event.target.value;
        this.setState({ xUserAddress: value });
    }

    xUserSignatureOnChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const value: string = event.target.value;
        this.setState({ xUserSignature: value });
    }

    privateKeyOnChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const value: string = event.target.value;
        this.setState({ privateKey: value });
    }

    proxyUserOnChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const value: string = event.target.value;
        this.setState({ proxyUser: value });
    }

    proxyPasswordOnChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const value: string = event.target.value;
        this.setState({ proxyPassword: value });
    }

    proxyHostOnChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const value: string = event.target.value;
        this.setState({ proxyHost: value });
    }

    proxyPortOnChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const value: string = event.target.value;
        this.setState({ proxyPort: value });
    }

    render(): React.ReactNode {
        return <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-6' style={{ marginBottom: '20px' }}>
                        <div className="form-group">
                            <label >xUserAddress</label>
                            <input className="form-control" id="xUserAddress" value={this.state.xUserAddress} onChange={event => this.xUserAddressOnChanged(event)} />
                        </div>
                        <div className="form-group">
                            <label >xUserSignature</label>
                            <input className="form-control" id="xUserSignature" value={this.state.xUserSignature} onChange={event => this.xUserSignatureOnChanged(event)} />
                        </div>
                        <div className="form-group">
                            <label >privateKey</label>
                            <input className="form-control" id="privateKey" value={this.state.privateKey} onChange={event => this.privateKeyOnChanged(event)} />
                        </div>
                        <div className="form-group">
                            <label >proxyUser</label>
                            <input className="form-control" id="proxyUser" value={this.state.proxyUser} onChange={event => this.proxyUserOnChanged(event)} />
                        </div>
                        <div className="form-group">
                            <label >proxyPassword</label>
                            <input className="form-control" id="proxyPassword" value={this.state.proxyPassword} onChange={event => this.proxyPasswordOnChanged(event)} />
                        </div>
                        <div className="form-group">
                            <label >proxyHost</label>
                            <input className="form-control" id="proxyHost" value={this.state.proxyHost} onChange={event => this.proxyHostOnChanged(event)} />
                        </div>
                        <div className="form-group">
                            <label >proxyPort</label>
                            <input className="form-control" id="proxyPort" value={this.state.proxyPort} onChange={event => this.proxyPortOnChanged(event)} />
                        </div>

                    </div>
                    <div className='col-lg-6' style={{ paddingTop: '20px' }}>
                        <textarea className="form-control" id="listProxy" value={this.state.listProxyString} style={{ height: '80%', marginBottom: '20px' }} onChange={this.onChange}></textarea>
                        <button className="btn btn-primary" id="addProxy" onClick={this.addProxy}>Add Proxy</button>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary" id="send" onClick={this.addAccount}>Add</button>
            <div className="alert alert-danger" role="alert">
                {this.state.notify}
            </div>
        </>
    }
}