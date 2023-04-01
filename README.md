## Unbeatable Tic Tac Toe (Vanilla JS)

This project uses the `module pattern`. I recently learnt about it and made this simple project using it. [The module pattern](https://dev.to/tomekbuszewski/module-pattern-in-javascript-56jm) allows us to use and create encapsulation in our code as if we were using a language like Java. For example, our `renderBoard` is accessible outside the `Render` module as `Render.renderBoard()` while `_gameBoard` is only  visible inside it. Note that this module pattern is different from the modules introduced by ES6.

For better user experience, the app is designed to be a Single Page Application like a  React/Vue app. The render methods manipulate the DOM dynamically when needed with no need for network reloads. Designing the app as an SPA also requires state management which enables us to have different difficulties, etc.

### Algorithm
I designed two algorithms for the bot. A `minmax` algorithm for the unbeatable bot and a `random` algorithm for the trivial bot.

The [minmax algorithm](https://en.wikipedia.org/wiki/Minimax) always selects the move with the greatest payoff (minimize user's payoff and maximize the bot's payoff with the next move). Any sequence of moves leading to victory is evaluated as +10 payoff points, while those leading to loss are evaluated as -10. If it leads to a cat's game(tie), it's evaluated as 0 points. The steps are:

- (Recursive base case) Return payoff value (+10,0,-10) if terminal state is found.
- Check all empty boxes on board and recursively call minmax function for each.
- Evaluate the payoff values for each empty box if either an 'X' or 'O' is placed there.
- Play the next move that guarantees the bot wins, or prevents the user from winning.

Checkout the minmax implementation in the `_minimaxAlg` and `_botPlayMinmax` methods of the `GameControls` module. 

For the trivial bot's random algorithm, it randomly plays a randomly available empty box.

### Design
I have been experimenting with achromatic designs a lot lately so this is another black and white design. It's mobile responsive and uses a flex column for mobile which changes to a CSS Grid for viewports greater than 750px.