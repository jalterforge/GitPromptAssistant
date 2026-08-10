# GitPromptAssistant Project Context

## Project

GitPromptAssistantは、GitHub IssueをAI向けMarkdownへ変換し、クリップボードへコピーするChrome拡張機能である。

## Goal

シンプルで信頼性が高く、保守しやすい構成を維持しながら、AIを利用した開発ワークフローでの実用性を高める。

## Scope

- GitHub Issueの内容取得
- Markdown変換
- AI向け出力の生成
- `Copy for AI`によるクリップボード出力
- 上記機能に関連するChrome拡張機能としての動作

## Constraints

- 既存のMarkdown変換機能を維持する。
- 不要な依存関係や過剰設計を避ける。
- 小さくレビュー可能な変更を優先する。
- 現在のChrome拡張機能の構成との互換性を維持する。

## Development Notes

- 現在の主要ロジックは`content.js`に実装されている。
- JavaScriptを変更した場合は、必要に応じて構文確認を行う。
- ブラウザ依存の動作は、軽量な自動検証を行ったうえで、必要に応じてChrome上で最終確認する。