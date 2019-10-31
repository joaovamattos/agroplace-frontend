import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Mockup from '../images/mockup-min.png';
import '../utils/index.css';

export class index extends Component {
    render() {
        return (
            <main className="presentation">
                <div>
                    <Typography variant="h2">Sua feira virtual</Typography>
                    <Typography variant="h5" style={{marginTop: 10}}>Compre e venda mais com Agroplace!</Typography>
                    <Typography variant="body1" style={{marginTop: 5}}>Disponível também para Android</Typography>
                    <Button
                        component={Link}
                        to="/signup"
                        variant="contained"
                        color="primary"
                        className="button"
                        style={{marginRight: 20}}
                    >Criar uma conta</Button>
                    <Button
                        component={Link}
                        to="/login"
                        variant="outlined"
                        color="primary"
                        className="button"
                    >Fazer login</Button>
                </div>                
                <img src={Mockup} className="mockup" alt="Agroplace em um smartphone e em notebook"/>
            </main>
        )
    }
}

export default index
