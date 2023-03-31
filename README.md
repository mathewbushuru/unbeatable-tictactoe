### Tic Tac Toe

This project uses the `module pattern`. I recently learnt about it and made this simple project using it. [The module pattern](https://dev.to/tomekbuszewski/module-pattern-in-javascript-56jm) allows us to use and create encapsulation in our code as if we were using a language like Java. Here, I'm differentiating 'private' variables from 'public' ones by prefexing an `_` before them. For example, `renderBoard` will be accessible outside the `Render` module as `Render.renderBoard()` while `_gameBoard` is only  visible inside it. Note that this module pattern is different from the modules introduced by ES6.

For better user experience, I also designed the app to be usable as a Single Page Application like React/Vue. This means, there are no network reloads after the initial bundle. The render methods manipulate the DOM dynamically when needed e.g to restart a new game.

##### Design
I have been experimenting with achromatic designs a lot lately so this is another black and white design. It's mobile responsive and uses a flex column for mobile which changes to a CSS Grid for viewports greater than 750px