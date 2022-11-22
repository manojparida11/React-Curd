import React from 'react';
import './App.css';
import Button from './shared/Button';
import Input from './shared/Input';
import LinkButton from './shared/LinkButton';


export default class App extends React.Component {
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
      listArray: [],
      isEditClicked: false,
      tobeUpdated: {}
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
      this.clearFields(),
      console.log("Added  Successfully:::"),
      alert("Your Data Added Successfully")
    );
  }

  onHandleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  onClickEdit = (index, item) => {
    console.log("onclick Edit:", index);
    this.setState({
      tobeUpdated: { ...item },
      isEditClicked: true,
      type: item.type,
      content: item.content,
      h1Tag: item.content,
      titleTag: item.titleTag,
      description: item.description,
      keyword: item.keyword,
      url: item.url
    })
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
      }
    })
      .then(result => {
        console.log("result::", result);
      });
    this.getLists();
  }


  updateList = () => {
    console.log("update Object:::", this.state.tobeUpdated);
    let newObject = {
      id: this.state.tobeUpdated.id,
      type: this.state.type,
      content: this.state.content,
      h1Tag: this.state.h1Tag,
      titleTag: this.state.titleTag,
      description: this.state.description,
      keyword: this.state.keyword,
      url: this.state.url
    }
    fetch("http://localhost:3002/List/" + this.state.tobeUpdated.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newObject)
    })
      .then(res => res.json())
      .then(result => {
        console.log("updated List:::", result);
        this.getLists();
        this.clearFields();
      });
  }

  render() {
    return (
      <div className="App">
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
            {this.state.isEditClicked ? <Button title="Update" onClickCall={() => this.updateList()} /> : <Button title="Save" onClickCall={this.onSave} />}
            <Button title="Clear" onClickCall={this.clearFields} />
          </div>
        </div>
        <div className="displaybox">
          <div className="header">
            <h6>List</h6>
          </div>
          <table id="list">
            <tbody>
              <tr className="tableHeader">
                <th>S.No</th>
                <th>ID</th>
                <th>Type</th>
                <th>H1 Tag</th>
                <th></th>
                <th></th>
              </tr>
              {this.state.listArray.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.type}</td>
                  <td>{item.h1Tag}</td>
                  <td>
                    <LinkButton title="Edit" onClickCall={() => this.onClickEdit(index, item)} />
                  </td>
                  <td>
                    <LinkButton title="Delete" onClickCall={() => this.onClickDelete(index, item.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

