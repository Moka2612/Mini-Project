import { ComponentGeneral } from "./base-component";
import { Draggable } from "../models/drag-drop-interfaces";
import { Project } from "../models/project";
import { Autobind } from "../decorators/autobind";

// ProjectItem inside List
export class ProjectItem
  extends ComponentGeneral<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons(): string {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @Autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(event: DragEvent) {
    console.log("end");
  }

  @Autobind
  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assgined";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
