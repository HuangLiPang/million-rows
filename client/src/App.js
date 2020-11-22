import React, { Component } from "react";
import SearchInput from "react-search-input";
import { search } from "./query";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            searchResult: [],
            time: 0,
        };
        this.searchUpdated = this.searchUpdated.bind(this);
    }

    render() {
        return (
            <div>
                <SearchInput
                    className="search-input"
                    onChange={this.searchUpdated}
                />
                <div>Query time: {this.state.time} milliseconds</div>
                {this.state.searchResult.map((dic, index) => {
                    return (
                        <div className="mail" key={index}>
                            <div className="from">Word: </div>
                            <div>{dic.word}</div>
                            <div className="subject">Definition: </div>
                            <div>{dic.definition}</div>
                        </div>
                    );
                })}
            </div>
        );
    }

    searchUpdated(term) {
        this.setState({ searchTerm: term });
        if (term === "") {
            this.setState({
                searchResult: [],
                time: 0,
            });
            return;
        }
        const start = new Date().getTime();
        search({ word: term })
            .then((res) => {
                return res;
            })
            .then((json) => {
                const elapsed = new Date().getTime() - start;
                this.setState({
                    searchResult: json.data,
                    time: elapsed,
                });
                console.log(json.data, term);
            })
            .catch((error) => {
                this.setState({
                    searchResult: ["Server Error"],
                });
            });
    }
}

export default App;
