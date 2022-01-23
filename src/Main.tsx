import React from 'react';
import { store } from './App';
import { MyAccountActionType } from './Reducer/MyAccountReducer';
import { signMessage } from './SignMessage';
import metamaskImage from './metamask.svg';
import { MyAccountModel } from './Model/MyAccountModel';
import { AddPegaContainer } from './AddPegaContainer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export interface MainProps {
}

export interface MainState {
    myAccount?: MyAccountModel
}

export class Main extends React.Component<MainProps, MainState> {

    constructor(props: MainProps) {
        super(props)
        this.state = {
            myAccount: undefined
        }


        store.subscribe(() => {
            let myAccount: MyAccountModel = store.getState();
            console.log('myAccount', myAccount);
            this.setState({ myAccount: myAccount });
        });

        this.setAccount = this.setAccount.bind(this);
        this.connectMetamask = this.connectMetamask.bind(this);
        this.buttonWallet = this.buttonWallet.bind(this);
        this.navigateToListAccount = this.navigateToListAccount.bind(this);
    }

    componentDidMount() {
        let userAddress = localStorage.getItem('userAddress');
        let signature = localStorage.getItem('signature');
        if (userAddress != null && signature != null) {
            this.setAccount(userAddress, signature);
        }
    }

    setAccount(userAddress: string, signature: string) {
        store.dispatch({
            type: MyAccountActionType.SET_ACCOUNT,
            xUserAddress: userAddress,
            signature: signature
        });
    }

    async connectMetamask() {
        let response = await signMessage('Batngua');
        console.log(response);
        localStorage.setItem('userAddress', response.userAddress);
        localStorage.setItem('signature', response.signature);
        this.setAccount(response.userAddress, response.signature);
    }

    buttonWallet() {
        return typeof this.state.myAccount === 'undefined' ? <button type="button" className="btn btn-primary row nav-right" onClick={() => this.connectMetamask()}>
            <img className='metamaskImage' src={metamaskImage} />
            <span className="sr-only">Connect Metamask</span>
        </button> :
            <button type="button" className="btn btn-primary row nav-right">
                <span className="sr-only">{this.state.myAccount.xUserAddress}</span>
            </button>
            ;
    }

    navigateToListAccount() {
        // this.props.navigate("/listAccount");
    }

    render(): React.ReactNode {
        return <>
            <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                <div className='ms-auto'>
                    {this.buttonWallet()}
                </div>
            </nav>
            <div className='container-xxl my-md-4 bd-layout row'>
                <div className="bd-sidebar col-sm-3" style={{ width: '300px' }}>
                    <div className="accordion" id="accordionExample" >
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Pegaxy
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body btn-outline-primary">
                                    Add Account
                                </div>
                            </div>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample" onClick={this.navigateToListAccount}>
                                <div className="accordion-body  btn-outline-primary">
                                    List Account
                                </div>
                            </div>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body  btn-outline-primary">
                                    Check Logs
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bd-main col'>
                    <Router>
                        <div className='container-fluid'>
                            <Routes>
                                <Route path='/' element={<AddPegaContainer />}>
                                </Route>
                                <Route path='/listAccount' element={<AddPegaContainer />}></Route>
                                <Route path='/checkLogs' element={<AddPegaContainer />}></Route>
                            </Routes>
                        </div>
                    </Router>
                </div>
            </div>
        </>
    }
}