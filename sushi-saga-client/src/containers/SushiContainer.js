import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  const sushis = props.sushis

  return (
    <Fragment>
      <div className="belt">
        {
          sushis.map(sushi => <Sushi key={sushi.id} sushi={sushi} eatSushi={props.eatSushi} remainingMoney={props.remainingMoney}/>)
        }
        <MoreButton moreSushi={props.moreSushi}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer