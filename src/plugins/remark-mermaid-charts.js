import { visit } from "unist-util-visit";

export function remarkMermaidCharts() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (node.lang === "mermaid") {
        console.log("node", node);
        node.type = "html";
        node.value = `<div class="mermaid">${node.value}</div>`;
      }
    });
  };
}
