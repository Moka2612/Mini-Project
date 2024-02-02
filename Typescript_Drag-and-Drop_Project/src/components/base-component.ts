// Component Base Class
export abstract class ComponentGeneral<
  T extends HTMLElement,
  U extends HTMLElement
> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostELementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    // link position Template
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;

    // link position Render
    this.hostElement = document.getElementById(hostELementId)! as T;

    // Copy template content
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // Set this.element
    this.element = importedNode.firstElementChild as U;
    // Set id for this.element
    if (newElementId) {
      this.element.id = newElementId;
    }

    // execute render this.element
    this.attach(insertAtStart);
  }

  //****** METHOD ******\\
  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
