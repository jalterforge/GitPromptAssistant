# Experiment 1 — AI Development OS

## Purpose

AI Development OSの最小構成をClaude Codeに適用し、
Experiment 0と同一Taskに対する行動の違いを観察する。

## AI Development OS

参照したドキュメント:

- `00_PHILOSOPHY.md`
- `01_PROJECT_CONTEXT.md`
- `02_DESIGN_PRINCIPLES.md`
- `06_AI_AGENT_RULES.md`

その他のAI Development OSドキュメントは参照しない。

## Task

GitHub Issueから生成するAI向けMarkdownに、
元のIssue URLを含める。

## Implementation Constraints

特に指定しない。

## Completion Criteria

- [x] Issue URLがAI向けMarkdownに含まれる。
- [x] 既存のMarkdown変換機能が維持される。
- [x] `Copy for AI`で生成される内容にもURLが含まれる。
- [x] 既存機能を壊していないことを確認できる。

## Observation

### Repository Investigation

Claude Codeはリポジトリを調査し、
IssueからMarkdownを生成する処理と`Copy for AI`の処理フローを確認した。

変更対象として`content.js`の`checkIssue()`と`createPrompt()`を特定した。

### Context Management

AI Development OS読み込み時、
`01_PROJECT_CONTEXT.md`がテンプレート状態であることを検出した。

`06_AI_AGENT_RULES.md`の
「Contextが不足している場合は推測ではなく確認を優先する」
というルールに基づき、Context不足を明示した。

その後TaskとCompletion Criteriaが与えられると、
追加質問を行わず実装可能と判断した。

### Implementation Decision

`checkIssue()`でIssue情報としてURLを取得し、
`createPrompt()`へ渡す構造を採用した。

URLには以下を使用した。

`location.origin + location.pathname`

これにより、クエリパラメータやフラグメントを除いたIssue URLを生成する。

Experiment 0の`location.href`を直接`createPrompt()`で参照する実装とは異なる判断となった。

### Verification

Claude Codeによる検証:

- `node --check content.js`による構文確認
- 一時領域にDOMモックを使用した検証スクリプトを作成
- URL、Title、本文、コードブロック、Markdown構造を検証
- 検証スクリプトを必要に応じて修正し再実行

恒久的なテスト基盤の新規導入については、
今回の変更規模では過剰設計になると判断して行わなかった。

人間による検証:

- Chrome上でGitPromptAssistantを実行
- 同一のGitHub Issueで`Copy for AI`を実行
- Issue URLがコピー結果に含まれることを確認
- Title、Description、見出し、リスト、コードブロック、テーブル等の既存Markdown変換が維持されていることを確認

### Human Intervention

あり。

- `node --check content.js`の実行を承認
- 一時検証スクリプトの実行を承認
- Chrome上で最終動作確認を実施

実装方法、変更対象、検証方法についての修正指示は行っていない。

### Instruction Following

4つのAI Development OSドキュメントのみを参照する指示には従った。

一方、
「読み終えたらその旨だけ報告する」という指示に対しては、
ドキュメント内容の要約とContext不足についての補足も行った。

### Time

Claude Codeによる処理時間は短時間だったが、
Experiment全体の正確な総所要時間は未計測。

## Outcome

Experiment 1はCompletion Criteriaをすべて満たした。

Experiment 0と最終的なユーザー向け出力品質はほぼ同等だった。

一方、AI Development OS適用時には、
設計判断の理由がより明示され、
既存機能を確認するための追加検証をClaude Code自身が設計・実行した。

特に「過剰設計を避ける」というDesign Principlesを、
テスト基盤を新設せず軽量な検証方法を選択する判断理由として明示的に使用した。