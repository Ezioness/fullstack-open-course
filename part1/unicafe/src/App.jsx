import { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const allReviews = good + neutral + bad
  const average = (good - bad) / allReviews
  const positive = good / allReviews * 100

  if (!allReviews) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={allReviews} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} isPourcentage={true} />
          </tbody>
        </table>
      </div>
    )
  }
}

const StatisticLine = ({ text, value, isPourcentage }) => {
  if(isPourcentage) {
    return (
      <tr>
        <td>{text}</td><td>{value} %</td>
      </tr>
    )
  } else {
    return (
      // <p>{text} {value}</p>
      <tr>
        <td>{text}</td><td>{value}</td>
      </tr>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newGood => setGood(newGood)
  const setToNeutral = newNeutral => setNeutral(newNeutral)
  const setToBad = newBad => setBad(newBad)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setToGood(good+1)} />
      <Button text="neutral" handleClick={() => setToNeutral(neutral+1)} />
      <Button text="bad" handleClick={() => setToBad(bad+1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App