import React, { Component } from "react";
import { connect } from "react-redux";
import { getSearchCountry, onPageChanged } from "../../redux/actions";
import styles from './SearchBar.module.css'





export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }
  handleChange(event) {
    this.setState({ name: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.getSearchCountry(this.state.name);
  }
  
  render() {
    const { name } = this.state;
    return (
      <div className={styles.box}>
        <form className={styles.forma} onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label  htmlFor="name">Country: </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <button type="submit">BUSCAR</button>
        </form>
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {
    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSearchCountry: name=> dispatch(getSearchCountry(name)),
    onPageChanged: data => dispatch(onPageChanged(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
