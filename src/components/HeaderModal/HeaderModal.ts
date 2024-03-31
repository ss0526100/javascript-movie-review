import "./style.css";

import Modal from "../Modal/Modal";
import createElement from "../../utils/createElement";

class HeaderModal extends Modal {
  protected titleElement = createElement("h2", {
    attrs: { class: "modal--title" },
  });
  constructor(option?: {
    contents?: (string | HTMLElement)[];
    isOpen?: boolean;
    title?: string;
    closeAction?: (event?: Event) => void;
  }) {
    super(option);
    const header = this.#createHeader({
      title: option?.title,
      closeAction: option?.closeAction,
    });
    this.container.prepend(header);
  }

  setTitle(title: string) {
    this.titleElement.textContent = title;
  }

  #createHeader(option?: {
    title?: string;
    closeAction?: (event?: Event) => void;
  }) {
    const { title, closeAction } = option ?? {};
    const header = createElement("header", {
      attrs: { class: "modal--header" },
    });

    if (title) this.setTitle(title);

    const closeButton = this.#createCloseButton(closeAction);

    header.append(this.titleElement, closeButton);

    return header;
  }

  #createCloseButton(closeAction?: (event?: Event) => void) {
    const closeButton = createElement<HTMLButtonElement>("button", {
      attrs: { class: "modal--close-button" },
      content: "X",
    });

    closeButton.addEventListener("click", this.close.bind(this));
    if (closeAction) closeButton.addEventListener("click", closeAction);

    return closeButton;
  }
}

export default HeaderModal;
