import React from 'react';

const Header = (props) => {
	return (
		<div id="header">
			<h1 id="title">Memory Card Game</h1>
			<div id="scores">
				<div id="score">Score: {props.score}</div>
				<div id="high-score">High Score: {props.highScore}</div>
				<div id="instructions">Click on any card but do not click on any card more than once.</div>
			</div>
		</div>
	);
};

export default Header;