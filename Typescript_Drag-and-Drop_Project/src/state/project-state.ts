import * as Project from "../models/project";

type Listener<T> = (items: T[]) => void;

export class State<T> {
  // Copy data from Main
  protected listeners: Listener<T>[] = [];

  addListeners(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

// Project State Management (SINGLETONS)
export class ProjectState extends State<Project.Project> {
  private static instance: ProjectState;
  // Main data
  private project: Project.Project[] = [];

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project.Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      Project.ProjectStatus.Active
    );
    // This is a Main data
    this.project.push(newProject);

    // Create copy arr data from Main
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: Project.ProjectStatus) {
    const project = this.project.find((prj) => prj.id === projectId);

    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.project.slice());
    }
  }
}

// Instance global state
export const projectState = ProjectState.getInstance();
