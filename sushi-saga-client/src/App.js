import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';
import Wallet from './components/Wallet';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    sushis: [],
    startDisplayIdx: 0,
    remainingMoney: 100
  }

  componentDidMount() {
    fetch(API)
    .then(res => res.json())
    .then(sushis => {
      for(let sushi of sushis) {
        sushi.eaten = false
      }
      this.setState({ sushis })
    })
  }

  displaySushis = () => {
    const sushisLength = this.state.sushis.length
    const start = this.state.startDisplayIdx
    const end = start + 4

    if (end < sushisLength) {
      return this.state.sushis.slice(start, end)
    } else {
      const numRemaining = sushisLength - start
      const newEnd = 4 - numRemaining
      return this.state.sushis.slice(start, sushisLength).concat(this.state.sushis.slice(0, newEnd))
    }
  }

  moreSushi = () => {
    this.setState(prevState => {
      const newIdx = prevState.startDisplayIdx + 4
      const numRemaining = prevState.sushis.length - prevState.startDisplayIdx
      if (newIdx <  prevState.sushis.length) {
        return { startDisplayIdx: prevState.startDisplayIdx + 4 }
      } else {
        return { startDisplayIdx: 4 - numRemaining }
      }
    })
  }

  eatSushi = (id, price) => {
    this.setState(prevState => {
      let updatedSushis = [...prevState.sushis]
      updatedSushis.find(sushi => sushi.id === id).eaten = true
      return { 
        sushis: updatedSushis,
        remainingMoney: prevState.remainingMoney - price 
      }
    })
  }

  addMoney = (amount) => {
    this.setState(prevState => {
      return { remainingMoney: prevState.remainingMoney + amount }
    })
  }

  render() {
    return (
      <div className="app">
        <SushiContainer sushis={this.displaySushis()} moreSushi={this.moreSushi} eatSushi={this.eatSushi} remainingMoney={this.state.remainingMoney}/>
        <br/>
        <Wallet addMoney={this.addMoney}/>
        <Table remainingMoney={this.state.remainingMoney}/>
      </div>
    );
  }
}

export default App;