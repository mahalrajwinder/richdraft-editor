# RichDraftEditor
RichDraftEditor is a Medium style rich text editor built upon [draft-js](https://draftjs.org/) with an emphasis on allowing writing code blocks like an IDE within a rich text document, while offering all features of a rich text editor. It provides flexibility to both export and save content in the database.

## Getting Started
Currently RichDraftEditor can only be cloned from Github. Soon I will start distributing it via npm. Please note that RichDraftEditor depends on React and React DOM which must also be installed.
```
npm install --save draft-js react react-dom

git clone https://github.com/mahalrajwinder/richdraft-editor.git
cd richdraft-editor
npm install
npm start
```

## Features
- [x] Support for keyboard shortcuts.
- [x] Undo / redo-until the end of times.
- [x] Common text types: headings, paragraphs, quotes, lists.
- [x] Common text styles: **Bold**, *Italic*, and many more.
- [x] API to build custom controls for toolbar.
- [x] Flexibility to choose between inline, static, or side toolbar.

## Code-Block Features
- [x] Insert new line with correct indentation with <kbd>ENTER</kbd>
- [x] Exit the code block with <kbd>Shift</kbd> + <kbd>ENTER</kbd>
- [x] Indent with <kbd>TAB</kbd>
- [x] Remove indentation with <kbd>DELETE</kbd>
- [x] Remove indentation with <kbd>Shift</kbd> + <kbd>TAB</kbd>
- [x] Handle input of pair characters like `()`, `[]`, `{}`, `""`, etc.
- [ ] Language specific syntax highlighting.

## API Notice
Before getting started, please note that the RichDraftEditor is currently in development phase.

## License
The RichDraftEditor is licensed under the terms of the MIT license. See [LICENSE](LICENSE) for more information.
