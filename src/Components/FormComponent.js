import React from 'react';
import '../App.css';
import Button from '../shared/Button';
import Input from '../shared/Input';

export default class FormComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: "",
            content: "",
            h1Tag: "",
            titleTag: "",
            description: "",
            keyword: "",
            url: ""
        }
    }
    // handleSubmit = () => {
    //     console.log("on handleSubmit");
    //     let dataObject = {};

    // }

    clearFields = () => {
        console.log("onclear click");
        this.setState({
            type: "",
            content: "",
            h1Tag: "",
            titleTag: "",
            description: "",
            keyword: "",
            url: ""
        });
    }

    onSave = () => {
        console.log('onsave click');
        let id = Math.floor(Math.random() * 100) + 1;
        let dataObject = {
            id,
            type: this.state.type,
            content: this.state.content,
            h1Tag: this.state.h1Tag,
            titleTag: this.state.titleTag,
            description: this.state.description,
            keyword: this.state.keyword,
            url: this.state.url
        };

        console.log("onObjectCreated::", dataObject);


    }

    onHandleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="formContainer">
                <div className="rowDiv">
                    <Input
                        name="type"
                        id="type"
                        handleChange={this.onHandleChange}
                        value={this.state.type}
                        labelTitle="Type"
                    />
                    <Input
                        name="url"
                        id="url"
                        handleChange={this.onHandleChange}
                        value={this.state.url}
                        labelTitle="Url"
                    />
                </div>
                <>
                    <label for="content">Content:
                    </label>
                    <textarea id="content" name="content" rows="3" cols="50">
                        {this.state.content}
                    </textarea>
                </>

                <Input
                    name="h1Tag"
                    id="h1Tag"
                    handleChange={this.onHandleChange}
                    value={this.state.h1Tag}
                    labelTitle="H1tag"
                />
                <Input
                    name="titleTag"
                    id="titleTag"
                    handleChange={this.onHandleChange}
                    value={this.state.titleTag}
                    labelTitle="Titletag"
                />
                <Input
                    name="description"
                    id="description"
                    handleChange={this.onHandleChange}
                    value={this.state.description}
                    labelTitle="Description"
                />
                <Input
                    name="keyword"
                    id="keyword"
                    handleChange={this.onHandleChange}
                    value={this.state.keyword}
                    labelTitle="keyword"
                />
                <div>
                    <Button title="Save" onClickCall={this.onSave} />
                    <Button title="Clear" onClickCall={this.clearFields} />
                </div>
            </div>
        );
    }
}

