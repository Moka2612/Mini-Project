import { ComponentGeneral } from "./base-component";
import { DragTarget } from "../models/drag-drop-interfaces";
import * as Project from "../models/project";
import { Autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";
import { ProjectItem } from "./project-item";

// ProjectList Class
export class ProjectList
  extends ComponentGeneral<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project.Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  @Autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul");
      listEl!.classList.add("droppable");
    }
  }

  @Autobind
  dropHandler(event: DragEvent) {
    const priId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      priId,
      this.type === "active"
        ? Project.ProjectStatus.Active
        : Project.ProjectStatus.Finished
    );
  }

  @Autobind
  dragLeaveHandler(event: DragEvent) {
    const listEl = this.element.querySelector("ul");
    listEl!.classList.remove("droppable");
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    projectState.addListeners((projects: Project.Project[]) => {
      // Declare projectItem.status
      const relevantProjects = projects.filter((projectItem) => {
        if (this.type === "active") {
          return projectItem.status === Project.ProjectStatus.Active;
        } else {
          return projectItem.status === Project.ProjectStatus.Finished;
        }
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects_list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECT";
  }

  private renderProjects() {
    // get link
    const listEl = document.getElementById(
      `${this.type}-projects_list`
    )! as HTMLUListElement;

    // Declare listEl.innerHTML when reupdate
    listEl.innerHTML = "";

    // Loop arr assignedProject
    for (const projectItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, projectItem);
    }
  }
}
