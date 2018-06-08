import styled from 'styled-components';

export const PlayerControllerDiv = styled.div`
	border-top: 2px solid black;
	height: 40px;
	width: 410px;
	margin: auto;
	border-radius: 0px 0px 30px 30px;
	background-color: black;

	span{
		color: white;
		font-size: 13px;
		position: relative;
		bottom: 0px;
	}

	.player-timer{
		display: inline-block;
		margin: 20px;
		font-size: 20px;
		color: white;
		width: 150px;
		position: relative;
		bottom: 20px;
	}

	.player-volume-input{
		color: white;
		font-size: 20px;
		display: inline-block;
		position: relative;
		bottom: 15px;
	}

	.player-volume-icon{
		color: white;
		font-size: 20px;
		display: inline-block;
		position: relative;
		right: 10px;
		bottom: 18px;
	}

	.player-timer .play-btn{
		position: relative;
		right: 10px;
		top: 2px;
	}
`