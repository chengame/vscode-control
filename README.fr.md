###### English version [here](https://github.com/johan-perso/vscode-control/blob/main/README.md).

# Visual Studio Code - Control

Une extension Raycast pour vous aider à interagir avec VS Code ou d'autres éditeurs basés sur celui-ci (Cursor, Windsurf, Trae, ...).

> Cette extension a été créée pour mon utilisation personnelle, mais peut-être qu'elle pourra aussi vous servir.  
> Compatible avec macOS uniquement, elle ne fonctionnera pas avec Raycast pour Windows.

https://github.com/user-attachments/assets/a121db46-a506-437e-8914-3aeecebe7e8d


## Commandes

- `VS Code Control: List Commands`
> Affiche une liste des commandes exécutables dans une interface unifiée

- `Scripts: npm`
> Liste les scripts NPM qui peuvent être exécutés

- `Scripts: Flutter`
> Liste les appareils compatibles qui peuvent être utilisés pour démarrer une app Flutter

- `Settings: Open UI`
> Ouvre directement l'interface des réglages dans VS Code

- `Settings: Open JSON File`
> Ouvre directement les réglages via le fichier `settings.json`

- `Terminal: Open New Session`
> Ouvre une nouvelle session dans le terminal

- `Terminal: Toggle Current Pane`
> Affiche/Masque le panneau de terminal actuel

- `Terminal: Close Current Session`
> Ferme et quitte la session de terminal actuelle

- `Format: Selected Code`
> Formatte le code actuellement sélectionné dans l'éditeur actif

- `Format: Current Document`
> Formatte le document actuellement ouvert dans l'éditeur actif

- `Flutter: New Project`
> Crée un nouveau projet Flutter

- `Flutter: Open DevTools`
> Ouvre les DevTools de Flutter dans votre navigateur par défaut

- `Flutter: Hot Reload`
> Exécute un hot reload dans l'application Flutter actuellement ouverte

- `Flutter: Hot Restart`
> Exécute un hot restart dans l'application Flutter actuellement ouverte

## Installation

> Vous aurez besoin d'installer [Remote Control for VS Code](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-remote-control) pour permettre à Raycast de contrôler votre éditeur.  
> Cette extension n'est pas disponible sur le store, vous aurez donc besoin de l'installer manuellement depuis la ligne de commande.

```bash
git clone https://github.com/johan-perso/vscode-control.git
cd vscode-control

npm install
npm run build
```

Vous pourrez ensuite modifier la configuration depuis les réglages Raycast (`⌘ + ,`).

## Licence

MIT © [Johan](https://johanstick.fr). [Soutenez ce projet](https://johanstick.fr/#donate) si vous souhaitez m'aider 💙
