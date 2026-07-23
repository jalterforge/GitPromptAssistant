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

        const prompt = createPrompt(issue);
        const button = createCopyButton(prompt);

        issue.title.parentElement.appendChild(button);
    }
}

function createPrompt(issue) {
    return `# GitHub Issue

Title:
${issue.title.textContent}

Body:
${issue.body.textContent}`;
}

function createCopyButton(prompt) {
    const button = document.createElement("button");

    button.textContent = "Copy for AI";
    button.className = "git-prompt-assistant-button";

    button.addEventListener("click", () => {
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