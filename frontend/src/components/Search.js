import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            fileType: 'all',
        };
    }

    handleInputChange = (event) => {
        this.setState({
            query: event.target.value
        });
    }

    handleSelectChange = (event) => {
        this.setState({
            fileType: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Call the API to search for files
        // This is just a placeholder and needs to be replaced with actual API call
        console.log(`Searching for ${this.state.fileType} files with query: ${this.state.query}`);
    }

    render() {
        return (
            <div className="search">
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        value={this.state.query} 
                        onChange={this.handleInputChange} 
                    />
                    <select value={this.state.fileType} onChange={this.handleSelectChange}>
                        <option value="all">All</option>
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                        <option value="audio">Audio</option>
                        <option value="text">Text</option>
                    </select>
                    <button type="submit">Search</button>
                </form>
            </div>
        );
    }
}

export default Search;