import React, { Component } from 'react'

class Wallet extends Component {
    state = {
        addAmount: ""
    }

    handleFormOnSubmit = (e) => {
        e.preventDefault()
        this.props.addMoney(parseInt(this.state.addAmount, 10))
        this.setState({ addAmount: "" })
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <form onSubmit={(e) => this.handleFormOnSubmit(e)}>
                    <label>$</label>
                    <input placeholder="Add Money..." value={this.state.addAmount} onChange={(e) => this.setState({addAmount: e.target.value})}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Wallet 