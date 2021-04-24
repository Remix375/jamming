import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            search: ""
        }

        this.changeSearch = this.changeSearch.bind(this);
        this.search = this.search.bind(this);
    }

    changeSearch(e) {
        this.setState({
            search: e.target.value
        })
    }



    search() {
        this.props.onSearch(this.state.search)
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.changeSearch}/>
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}

export default SearchBar