import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class AddArt extends Component {

    emptyItem = {
        title: '',
        description: '',
        price:''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    // async componentDidMount() {
    //     if (this.props.match.params.id !== 'new') {
    //         const painting = await (await fetch(`/paintings/${this.props.match.params.id}`)).json();
    //         this.setState({item: painting});
    //     }
    // }

    // handleChange(event) {
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;
    //     let item = {...this.state.item};
    //     item[name] = value;
    //     this.setState({item});
    // }

    // async handleSubmit(event) {
    //     event.preventDefault();
    //     const {item} = this.state;

    //     await fetch('/paintings' + (item.id ? '/' + item.id : ''), {
    //         method: (item.id) ? 'PUT' : 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(item),
    //     });
    //     this.props.history.push('/');
    // }

    render() {
        const {item} = this.state;
        const title = <h2 style={{fontWeight:"bold"}}>{item.id ? 'Edit Art' : 'Add Art'}</h2>;

        return <div>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="title">Name of the Art</Label>
                        <Input type="text" name="title" id="title" value={item.title || ''}
                               onChange={this.handleChange} autoComplete="title"/>                       
                    </FormGroup>
                    {/* <FormGroup>
                        <Label for="artistName">Name of the Artist</Label>
                        <Input type="text" name="artistName" id="artistName" value={item.artistName || ''}
                               onChange={this.handleChange} autoComplete="artistName"/>                       
                    </FormGroup> */}
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input type="price" name="price" id="price" value={item.price || ''}
                               onChange={this.handleChange} autoComplete="price"/>                       
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="textarea" rows="2" name="description" id="description" value={item.description || ''}
                               onChange={this.handleChange} autoComplete="description"/>
                    </FormGroup>                   
                    <FormGroup>
                        <Button color="success" type="submit" style={{ margin: '.5rem' }}>Save</Button>
                        <Button color="secondary" tag={Link} to="/" style={{ margin: '.5rem' }}>Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default AddArt;