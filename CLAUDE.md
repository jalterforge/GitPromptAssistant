\# GitPromptAssistant Project Context



\## Project



GitPromptAssistant is a Chrome extension that converts GitHub Issues into AI-friendly Markdown and copies the result to the clipboard.



\## Goal



Keep the extension simple, reliable, and easy to maintain while improving usefulness for AI-assisted development workflows.



\## Scope



\- GitHub Issue content extraction

\- Markdown conversion

\- AI-friendly prompt generation

\- `Copy for AI` clipboard output

\- Chrome Extension behavior related to these features



\## Constraints



\- Preserve existing Markdown conversion behavior.

\- Avoid unnecessary dependencies and overengineering.

\- Prefer small, reviewable changes.

\- Keep compatibility with the current Chrome Extension architecture.



\## Development Notes



\- Main logic is currently implemented in `content.js`.

\- Validate JavaScript syntax after changes when applicable.

\- For browser-dependent behavior, use lightweight verification and final manual Chrome testing when needed.

