import React, { Component, useRef} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import axios from "axios";
import getConnection  from './connection.js';
import { ethers, providers } from 'ethers';

class AddArt extends Component {

    emptyItem = {
        title: '',
        description: '',
        price:'',
        image: null
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // getConnection().then(({provider, contract}, err) => {
        //     this.contract = contract;
        //     this.provider = provider;
        // });
    }


    handleChange(event) {
        const target = event.target;
        if(target.name !== "image"){
            const value = target.value;
            const name = target.name;
            let item = {...this.state.item};
            item[name] = value;
            this.setState({item});            
        }
        else{
            const file = (event.target.files[0]);
            console.log(event.target.files[0]);
            this.state.item["image"] = file;
            let item = {...this.state.item};
            this.setState({item});
        }
        // const value = target.value;
        // const name = target.name;
        // let item = {...this.state.item};
        // item[name] = name !== "image" ? value : target.files[0];
        // this.setState({item}); 
        
    }

    async handleSubmit(event) {
        var newId;
        event.preventDefault();
        const item = {...this.state.item};
        const formData = new FormData();
        formData.append("title", item.title);
        formData.append("description", item.description);
        formData.append("price", item.price);
        formData.append("image", item.image);
        formData.append("owner", window.addressArray[0]);
        console.log(formData);
        await fetch('http://localhost:4000/addart', {
            method: 'POST',
        
            body: formData,
        }).then((res) => res.json())
        .then(data => {
            newId = data.id;
            alert("Upload success");
        })
        .catch((err) => alert("File Upload Error" + err));
        const cryptocontract = window.contract;
        const addArt = await cryptocontract.addArt(parseInt(newId), item.description, item.price, {value:String(ethers.utils.parseEther(String(0)))})
        .catch(function(e){
            console.log("Exception while trying to Add Art to contract." + e);
        });
        if(addArt == undefined){
            console.log("Add Art smart contract function not executed.");
        }

        this.props.history.push('/');
    }

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
                        <Input type="file"  name="image" /*ref={fileInput}*/
                               onChange={this.handleChange} style={{margin: '.5rem'}}/>
                        {/* <Button  className='upload-btn' color="dark" style={{margin: '.5rem'}} onChange={() => fileInput.current.click()}>Choose File</Button> */}
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