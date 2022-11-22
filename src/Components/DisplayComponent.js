import React from 'react';
import '../App.css';
import Data from '../Data/Data.json';
import LinkButton from '../shared/LinkButton';

export default class DisplayComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listArray: []
        }
    }
    onClickEdit = () => {
        console.log("onclick Edit:");
    }

    onClickDelete = () => {
        console.log("onclick Delete:");
    }

    componentDidMount() {
        this.getLists();
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
                                    <LinkButton title="Edit" onClickCall={this.onClickEdit} />
                                </td>
                                <td>
                                    <LinkButton title="Delete" onClickCall={this.onClickDelete} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

