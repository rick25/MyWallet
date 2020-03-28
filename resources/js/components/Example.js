import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TransferForm from './TransferForm';
import TransferList from './TransferList';
import url from './../url';

class Example extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            money: 0.00,
            transfers: [],
            error: null,
            form: {
                description: '',
                amount: '',
                wallet_id: 1,
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount()
    {
        try {
            let response = await fetch(`${url}/api/wallet`);
            let data = await response.json();
            this.setState({
                money: data.money,
                transfers: data.transfers
            })
        } catch (error) {
            this.setState({
                error
            })
        }
    }

    handleChange(e)
    {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        });
    }

    async handleSubmit(e)
    {
        e.preventDefault();
        const {form, transfers, money} = this.state;
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'Application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }
            let res = await fetch(`${url}/api/transfer`, config);
            let data = await res.json();
            this.setState({
                transfers: transfers.concat(data),
                money: money + parseInt(data.amount)
            });
        } catch (error) {
            this.setState({
                error
            })
        }
    }

    render()
    {
        const {money, transfers, error, form} = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 m-t-md">
                        <p className="title"> $ { parseFloat(money) } </p>
                    </div>
                    <div className="col-md-12">
                        <TransferForm 
                            form={ form } 
                            onChange={ this.handleChange }
                            onSubmit={ this.handleSubmit }
                        />
                    </div>
                </div>
                <div className="m-t-md">
                    <TransferList 
                        transfers={ transfers }
                    />
                </div>
            </div>
        );
    }
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
