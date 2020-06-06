import React, {useState} from '../react'
import ReactDom from './../react-dom'

const App = () => {
  const [value, setValue] = useState(false)

  return (
    <h1 className="test" data-test="test" style={{ color: 'red' }}>
      Hello, world!
      <AppContainer />
    </h1>
  )
}

const AppContainer = () => {
  return <span>Hello, React!</span>
}

console.log(document.getElementById('root'))
ReactDom.render(<App />, document.getElementById('root'))
