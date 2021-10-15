import React from 'react';

const Win = (props) => {
	return (
		<div id="win-screen">
			<h1 id="win-text">You Win!</h1>
			<button id="play-again-btn" type="button" onClick={props.playAgain}>Play Again</button>
		</div>
	);
};

export default Win;