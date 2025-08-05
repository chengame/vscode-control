###### Version française [ici](https://github.com/johan-perso/vscode-control/blob/main/README.fr.md).

# Visual Studio Code - Control

A Raycast extension to help you interact with VS Code or other code editors based on it (Cursor, Windsurf, Trae, ...).

> It has been created specifically for my personal use, but I thought it could be useful to others as well.  
> For macOS only. It will not work on Raycast for Windows.


## Commands

- `VS Code Control: List Commands`
> Show a list of all runnable commands

- `Scripts: npm`
> List the NPM scripts that can be executed

- `Scripts: Flutter`
> List the Flutter devices that can be used to run an app

- `Settings: Open UI`
> Directly open the settings UI inside of VS Code

- `Settings: Open JSON File`
> Directly open the settings.json file inside of VS Code

- `Terminal: Open New Session`
> Open a new terminal session

- `Terminal: Toggle Current Pane`
> Show/Hide the current terminal pane

- `Terminal: Close Current Session`
> Close and exit the current terminal session

- `Format: Selected Code`
> Format the currently selected code in the active editor

- `Format: Current Document`
> Format the currently open document in the active editor

- `Flutter: New Project`
> Create a new Flutter project

- `Flutter: Open DevTools`
> Open the Flutter DevTools in your default browser

- `Flutter: Hot Reload`
> Execute a hot reload in the current opened Flutter app

- `Flutter: Hot Restart`
> Execute a hot restart in the current opened Flutter app

## Installation

> You need to install [Remote Control for VS Code](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-remote-control) to allow Raycast to control your editor.  
> This extension is not yet available on the Raycast Store, so you will have to manually install it using the command line.

```bash
git clone https://github.com/johan-perso/vscode-control.git
cd vscode-control

npm install
npm run build
```

You can then edit the configuration from the Raycast settings (use `⌘ + ,` to open them).

## License

MIT © [Johan](https://johanstick.fr/). [Support this project](https://johanstick.fr/#donate) if you want to help me 💙
