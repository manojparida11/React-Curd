import React from 'react';
import '../App.css';
import LinkButton from '../shared/LinkButton';

export default class DisplayComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listArray: []
        }
    }

    componentDidMount() {
        this.getLists();
    }

    // componentDidUpdate() {
    //     this.getLists();
    // }

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
                                    <LinkButton title="Edit" onClickCall={() => this.onClickEdit(index, item.id)} />
                                </td>
                                <td>
                                    <LinkButton title="Delete" onClickCall={() => this.onClickDelete(index, item.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

