console.log("GitPromptAssistant loaded");

const style = document.createElement("style");
style.textContent = `
    .git-prompt-assistant-button {
        margin-left: 8px;
        padding: 5px 12px;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
        background-color: #1f883d;
        border: 1px solid rgba(31, 35, 40, 0.15);
        border-radius: 6px;
        cursor: pointer;
    }

    .git-prompt-assistant-button:hover {
        background-color: #1a7f37;
    }
`;
document.head.appendChild(style);

function isIssuePage() {
    return location.pathname.includes("/issues/");
}

function cleanText(text) {
    return text
        .replace(/\n\s*\n+/g, "\n\n")
        .trim();
}

function convertHtmlToMarkdown(element) {
    console.log("Converting element:");
    console.log(element);

    const parts = [];

    for (const child of element.children) {
        console.log("Child:");
        console.log(child);

        let converted = "";

        if (child.tagName === "H1") {
            converted = `# ${child.textContent.trim()}`;
        }

        if (child.tagName === "H2") {
            converted = `## ${child.textContent.trim()}`;
        }

        if (child.tagName === "H3") {
            converted = `### ${child.textContent.trim()}`;
        }

        if (child.tagName === "P") {
            converted = child.textContent.trim();
        }

        if (child.tagName === "PRE") {
            const code = child.querySelector("code");

            const codeText = code
                ? code.textContent
                : child.textContent;

            converted =
                "```\n" +
                codeText.trim() +
                "\n```";
        }

        if (child.tagName === "OL") {
            converted = Array.from(child.children)
                .map((li, index) => {
                    return `${index + 1}. ${li.textContent.trim()}`;
                })
                .join("\n");
        }

        if (child.tagName === "UL") {
            converted = Array.from(child.children)
                .map(li => {
                    return `- ${li.textContent.trim()}`;
                })
                .join("\n");
        }

        if (
            child.tagName === "MARKDOWN-ACCESSIBLITY-TABLE"
        ) {
            const table = child.querySelector("table");

            if (table) {
                converted = convertTableToMarkdown(table);
            }
        }

        if (child.tagName === "DETAILS") {
            const summary = child.querySelector("summary");

            const title = summary
                ? summary.textContent.trim()
                : "";

            const content = convertHtmlToMarkdown(child);

            converted = `### ${title}

${content}`;
        }

        if (child.tagName === "TABLE") {
            converted = convertTableToMarkdown(child);
        }

        if (
            child.tagName === "DIV" ||
            child.tagName === "SECTION"
        ) {
            converted = convertHtmlToMarkdown(child);
        }

        if (converted) {
            parts.push(converted);
        }
    }

    return parts.join("\n\n");
}

function convertTableToMarkdown(table) {
    const rows = [];

    for (const tr of table.querySelectorAll("tr")) {
        const cells = Array.from(
            tr.querySelectorAll("th, td")
        );

        const row = cells.map(cell => {
            return cell.textContent.trim();
        });

        rows.push(row);
    }

    if (rows.length === 0) {
        return "";
    }

    const header = `| ${rows[0].join(" | ")} |`;

    const separator = `| ${rows[0]
        .map(() => "---")
        .join(" | ")} |`;

    const body = rows
        .slice(1)
        .map(row => `| ${row.join(" | ")} |`);

    return [
        header,
        separator,
        ...body
    ].join("\n");
}

function getCommentAuthor(bodyElement) {
    let node = bodyElement.parentElement;

    while (node && node !== document.body) {
        const avatar = node.querySelector('[data-testid="github-avatar"]');

        if (avatar) {
            const alt = (avatar.getAttribute("alt") || "").trim();

            return alt.startsWith("@") ? alt : `@${alt}`;
        }

        node = node.parentElement;
    }

    return "@unknown";
}

function getComments(issueBodyElement) {
    const bodies = document.querySelectorAll(
        '[data-testid="markdown-body"]'
    );

    return Array.from(bodies)
        .filter(body => body !== issueBodyElement)
        .map(body => {
            return {
                author: getCommentAuthor(body),
                body: convertHtmlToMarkdown(body)
            };
        });
}

let currentUrl = location.href;

function checkIssue() {
    console.log("checkIssue called");

    // issueページ以外の時は処理しない
    if (!isIssuePage()) {
        return;
    }

    const existingButton = document.querySelector(
        ".git-prompt-assistant-button"
    );

    const issue = {
        title: document.querySelector('[data-testid="issue-title"]'),
        body: document.querySelector('[data-testid="markdown-body"]')
    };

    if (issue.title && issue.body && !existingButton) {
        console.log("Title and body found");

        const button = createCopyButton(issue);

        issue.title.parentElement.appendChild(button);
    }
}

function createPrompt(issue) {
    const title = cleanText(issue.title.textContent);
    const body = convertHtmlToMarkdown(issue.body);
    const url = location.href;
    const comments = getComments(issue.body);

    let prompt = `# GitHub Issue

## URL

${url}

## Title

${title}

## Description

${body}`;

    if (comments.length > 0) {
        const commentsMarkdown = comments
            .map(comment => `### ${comment.author}\n\n${comment.body}`)
            .join("\n\n");

        prompt += `\n\n## Comments\n\n${commentsMarkdown}`;
    }

    return prompt;
}

function createCopyButton(issue) {
    const button = document.createElement("button");

    button.textContent = "Copy for AI";
    button.className = "git-prompt-assistant-button";

    button.addEventListener("click", () => {
        const prompt = createPrompt(issue);

        navigator.clipboard.writeText(prompt).then(() => {
            button.textContent = "Copied!";

            setTimeout(() => {
                button.textContent = "Copy for AI";
            }, 2000);
        });
    });

    return button;
}

// 最初に一度確認
checkIssue();

setInterval(() => {
    if (location.href !== currentUrl) {
        currentUrl = location.href;

        console.log("URL changed");

        setTimeout(() => {
            console.log("Checking issue after URL change");
            checkIssue();
        }, 1000);
    }
}, 500);

const observer = new MutationObserver(() => {
    checkIssue();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});