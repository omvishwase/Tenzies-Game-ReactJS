import React from 'react'
import Die from './Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

const Base = () => { 
    const [numbers, setNumbers] = React.useState(allNewDice())

    const [tenzies, setTenzies] = React.useState(false)
    React.useEffect(function() {
        const allHeld = numbers.every(item => item.isHeld)
        const firstValue = numbers[0].value
        const allSameValue = numbers.every(item => item.value === firstValue)

        if(allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [numbers])

    function allNewDice() {
        let newDice = []
        for(let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.floor(Math.random() *6) + 1, 
                isHeld: false,
                id: nanoid()
            })
        }
        return newDice
    }

    function rollDice() {
        if(!tenzies) {
            setNumbers(oldDice => oldDice.map(item => {
                return (item.isHeld ? 
                    item :
                    {
                        value: Math.floor(Math.random() *6) + 1, 
                        isHeld: false,
                        id: nanoid()
                    }) 
            }))
        } else {
            setTenzies(false)
            setNumbers(allNewDice())
        }
    }
    function holdDice(id) {
        setNumbers((oldDice) => oldDice.map(function(item) {
            return (item.id === id ? {...item, isHeld: !item.isHeld} : item)
        }))
    }

    const components = numbers.map(function(item) {
        return <Die key={item.id} value={item.value} isHeld={item.isHeld} holdDice={() => holdDice(item.id)}/>
    })

    
  return (
    <div className='one'>
        <div className='two'>
            <h1 className='heading'>Tenzies</h1>
            <p className='sub-heading'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

            <div className='boxes'>
                {components}
            </div>
            <button className='btn' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
            {tenzies && <h2>You won!</h2>}
            {tenzies && <Confetti
                width= {window.innerWidth}
                height={window.innerHeight}
                numberOfPieces = {500}
                recycle = {false}
            />}
        </div>

    </div>
  )
}

export default Base