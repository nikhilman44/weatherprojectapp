import React from 'react'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
    }
  }

  handleChange = event => {
    this.setState({city: event.target.value})
  }

  handleSubmit = event => {
    const {onSearch} = this.props
    const {city} = this.state
    event.preventDefault()
    onSearch(city)
    this.setState({city: ''})
  }

  render() {
    const {city} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={this.handleChange}
        />
        <button type="submit">Search</button>
      </form>
    )
  }
}

export default SearchBar
