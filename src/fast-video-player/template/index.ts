import { DEFAULT_HTML } from "./html";
import { DEFAULT_STYLES } from "./style";

const DEFAULT_TEMPLATE_HTML = `
${DEFAULT_STYLES}
${DEFAULT_HTML}
`;

export const DEFAULT_TEMPLATE_CONTENT = () => {
  const template = document.createElement("template");
  template.innerHTML = DEFAULT_TEMPLATE_HTML;

  return template.content;
};
