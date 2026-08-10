# Experiment 0 — Baseline Task v1

## Repository

GitPromptAssistant

## Task

GitHub Issueから生成するAI向けMarkdownに、
元のIssue URLを含める。

## Implementation Constraints

特に指定しない。

## Completion Criteria

1. Issue URLがAI向けMarkdownに含まれる。
2. 既存のMarkdown変換機能が維持される。
3. `Copy for AI`で生成される内容にもURLが含まれる。
4. 既存機能を壊していないことを確認できる。

## Observation

- Repositoryの調査方法
- 変更対象の判断
- 実装方針の判断
- テスト・検証の判断
- 変更内容の説明
- 人間による介入
- 所要時間

## Result

### Completion Criteria

- [x] Issue URLがAI向けMarkdownに含まれる。
- [x] 既存のMarkdown変換機能が維持される。
- [x] `Copy for AI`で生成される内容にもURLが含まれる。
- [x] 既存機能を壊していないことを確認できる。

### Repository Investigation

Claude Codeはリポジトリを調査し、主要ロジックが`content.js`に集約されていることを確認した。

`checkIssue` → `createPrompt` → `createCopyButton`の処理フローを把握し、Markdown生成を担当する`createPrompt()`を変更対象として特定した。

### Implementation Decision

`createPrompt()`内で`location.href`を取得し、生成Markdownの`# GitHub Issue`直下に`## URL`セクションを追加した。

変更対象は`content.js`のみとし、既存のMarkdown変換処理には変更を加えなかった。

### Verification

Claude Codeによる検証:

- `node --check content.js`によるJavaScript構文確認
- `git diff`による変更差分確認

人間による検証:

- ChromeでGitPromptAssistantを実行
- GitHub Issueで`Copy for AI`を実行
- Issue URLがコピー結果に含まれることを確認
- Title、Description、見出し、リスト、コードブロック、テーブル等の既存Markdown変換が維持されていることを確認

### Human Intervention

あり。

- `content.js`の編集を承認
- `node --check content.js`の実行を承認
- Chrome上で最終動作確認を実施

実装方法や変更対象についての指示・修正介入は行っていない。

### Time

Claude Codeの主要な調査・実装・検証処理: 約54秒。

人間による承認およびブラウザ動作確認を含む総所要時間は未計測。

### Outcome

Experiment 0 — Baseline Task v1はCompletion Criteriaをすべて満たした。

AI Development OSを適用していないClaude Code単体でも、リポジトリ調査、変更対象判断、実装、構文検証、変更説明まで自律的に実行できた。

一方で、ファイル編集・コマンド実行には人間の承認が必要であり、実ブラウザでの最終動作確認は人間が担当した。