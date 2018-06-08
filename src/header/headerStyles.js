import styled from 'styled-components';

export const Navbar = styled.nav`
	margin-top: 20px;
	background-color: black !important;
	box-shadow: 0 0 10px white;
	font-family: 'Bungee', cursive;
	border-radius: 30px !important;

	form{
		position: relative;
		left: 45%;
		@media (max-width: 1000px) {
	  		display: none;
		}
	}

	span{
		position: relative;
		color: white !important;
		left: 30px;
	}

`