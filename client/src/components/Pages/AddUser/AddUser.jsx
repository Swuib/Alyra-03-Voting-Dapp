import React, { useContext, useState } from 'react';
import "./AddUser.css"
import { useEth } from "../../../contexts/EthContext";
import Header from '../../Layouts/Header/Header';
import UidContext from '../../../contexts/App/AppContext';
import toast from 'react-hot-toast';
import Loader from '../../Layouts/Loader/Loader';

const AddUser = () => {
    const { state: { contract, accounts } } = useEth();
    const { RegisteredAdress, setRegisteredAdress } = useContext(UidContext);

    const [loading, setLoading] = useState(false);

    const handleSubmitAddAdress = async (e) => {
        e.preventDefault();
        setLoading(true)
        const data = e.target[0].value;
        let testIsAlreadyRegistered = false;
        if (RegisteredAdress.length > 0) {
            for (let i = 0; i < RegisteredAdress.length; i++) {
                if(RegisteredAdress[i].address === data) {
                    testIsAlreadyRegistered = true;
                };
            };
        };
        if (testIsAlreadyRegistered === false) {
            await contract.methods.addVoter(data.toString()).send({ from: accounts[0] }).then(res => {
                const add = res.events.VoterRegistered.returnValues.voterAddress;
                setLoading(false);
                setRegisteredAdress(prevArray => [...prevArray, {address:add.toLowerCase(), voteCount:'0'}]);
                toast(`${res.events.VoterRegistered.returnValues.voterAddress} registred !`,
                {style: { height:'50px', minWidth:'500px', background:'#1dc200',color:'white', fontSize:"15px", padding:'0px 15px'}});
                setLoading(false);
            }).catch(error => {
                if(error.code === 4001)
                    toast(`${error.message}`,
                    {style: { height:'50px', minWidth:'500px', background:'#ff2626',color:'white', fontSize:"15px", padding:'0px 15px'}});
                else {
                    const errorObject = JSON.parse(error.message.replace("[ethjs-query] while formatting outputs from RPC '", "").slice(0, -1));
                    toast(errorObject.value.data.message.replace("VM Exception while processing transaction:",""),
                    {style: { height:'50px', background:'#ff2626',color:'white', fontSize:"15px", padding:'0px 15px'}});
                }
                setLoading(false);
            });
            setLoading(false);
        } else {
            toast("revert Already registered",
            {style: { height:'50px', background:'#ff2626',color:'white', fontSize:"15px", padding:'0px 15px'}});
            setLoading(false);
        };
    };
    
    return (
        <>
            {accounts && (<Header/>)}
            <main>
                {accounts ? (
                    <div className='user-container'>
                        <form onSubmit={handleSubmitAddAdress}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Enter an Eth address to register a new voter </label>
                                <input type="text" name="address" id="address" className="form-control" required />
                            </div>
                            <div className="btn-group">
                                {loading ? (
                                    <Loader size={"small"}/>
                                ) : (
                                    <button  className="myButton" type="submit"> Register the Voter </button>
                                )}
                            </div>
                        </form>
                    </div>
                ) : (
                    <h1>Please connect Metamask</h1>
                )}
            </main>
        </>
    );
};

export default AddUser;