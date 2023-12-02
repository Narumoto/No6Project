import React, { Component } from 'react';
import axios from 'axios';

class Annotation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            annotations: '',
            token: ''
        };
    }

    handleFileChange = (event) => {
        this.setState({
            file: event.target.files[0]
        });
    }

    handleAnnotationChange = (event) => {
        this.setState({
            annotations: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('annotations', this.state.annotations);

        axios.post('/api/files/annotate', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${this.state.token}`
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <h2>Annotate File</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>File:</label>
                        <input type="file" onChange={this.handleFileChange} />
                    </div>
                    <div>
                        <label>Annotations:</label>
                        <textarea onChange={this.handleAnnotationChange}></textarea>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Annotation;