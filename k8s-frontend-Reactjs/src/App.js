import React, { Component } from 'react';
import AnswerForm from './AnswerForm';
import AnswerForm_side_tab from './AnswerForm_side_tab';
import { Container, Typography, Box, Avatar, CssBaseline } from '@mui/material';
// import 'fontsource-roboto';
import './App.css';

class App extends Component {
	componentDidMount() { 
	}
	
	  
	render() {
		

		return (

			<Container component='article' maxWidth='lg'>
				<CssBaseline />

				<Box sx={{
					marginTop: 2,
					marginBottom: 5,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
					<Typography component='h1' variant='h4' align='center' >
						Answer Form
					</Typography>
				</Box>
				{/* <AnswerForm /> */}
				<AnswerForm_side_tab />
			</Container>
		);
	}
}

export default App;
