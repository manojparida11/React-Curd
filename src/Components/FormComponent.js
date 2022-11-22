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
            url: "",
            listArray: []
        }
    }

    componentDidMount() {
        this.getLists();
    }

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
        this.addDataToJson(dataObject);
    }

    addDataToJson = (dataObject) => {
        fetch("http://localhost:3002/List", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataObject)
        }).then(
            this.getLists(),
            console.log("Added  Successfully:::"),
            alert("Your Data Added Successfully")
        );
    }

    onHandleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    onClickEdit = (e) => {
        console.log("onclick Edit:", e);
    }

    onClickDelete = (index, id) => {
        console.log("onclick Delete:", index);
        this.deleteList(index, id);
    }

    getLists() {
        fetch("http://localhost:3002/List")
            .then(res => res.json())
            .then(result =>
                this.setState({
                    listArray: result
                })
            )
            .catch(console.log);
    }

    deleteList(index, id) {
        fetch("http://localhost:3002/List/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            //body: JSON.stringify(this.state.listArray[id])
        })
            // .then(res => res.json())
            .then(result => {
                console.log("result::", result);
            });
        this.getLists();
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
                    <Input
                        name="content"
                        id="content"
                        handleChange={this.onHandleChange}
                        value={this.state.content}
                        labelTitle="Content"
                    />
                </div>
                {/* <>
                    <label for="content">Content:
                    </label>
                    <textarea id="content" name="content" rows="3" cols="50">
                        {this.state.content}
                    </textarea>
                </> */}

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

