import { visit } from "unist-util-visit";

export function remarkGithubCallouts() {
  return (tree) => {
    visit(tree, "blockquote", (node, index, parent) => {
      const [firstChild] = node.children;
      if (firstChild && firstChild.type === "paragraph") {
        const [firstInline] = firstChild.children;
        if (firstInline && firstInline.type === "text") {
          const match = firstInline.value.match(
            /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i,
          );
          if (match) {
            const type = match[1].toLowerCase();
            node.type = "html";
            node.value = `<callout type=${type}>
            ${firstInline.value.slice(match[0].length)}\n${node.children
              .slice(1)
              .map((child) => toMarkdown(child))
              .join("\n")}
            </callout>`;
            return [visit.SKIP, index + 1];
          }
        }
      }
    });
  };
}
