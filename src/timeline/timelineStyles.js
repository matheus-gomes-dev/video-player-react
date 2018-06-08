import styled from 'styled-components';

export const SpeechBubble = styled.div`
	z-index: 100;
	position: absolute;
	bottom: 50px;
	background: #d9d9d9;
	border-radius: 15px;
	height: 150px;
	width: 250px;

	&:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 0;
		height: 0;
		border: 42px solid transparent;
		border-top-color: #d9d9d9;
		border-bottom: 0;
		border-left: 0;
		margin-left: -21px;
		margin-bottom: -42px;
	}

	.input-area{
		width: 80%;
		margin: auto;
		margin-top: 20px;
	}

	input{
		width: 100%;
	}

	.control-btns{
		margin-top: 30px;
	}

	.control-btns button{
		width: 80px;
		margin: 10px;
	}
`;

export const TimelineDiv = styled.div`
	height: 30px;
	background-color: black;
	width: 850px;
	margin: auto;
	border-radius: 10px;

	&:hover {
		cursor: pointer;
	}

	&:focus {
		background-color:yellow;
	}

	.timelineBar{
		height: 5px;
		border: 2px solid gray;
		border-radius: 10px;
		background-color: gray;
		margin: auto;
		position: relative;
		top: 12px;
	}

	.marker{
		height: 19px;
		background-color: #009900;
		top: -8px;
		position: absolute;
		display: inline-block;
		border-radius: 10px;
	}

	.marker:hover{
		cursor: pointer;
	}
`