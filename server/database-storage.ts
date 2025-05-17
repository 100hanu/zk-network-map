import { 
  type Project, type InsertProject, 
  type Technology, type InsertTechnology,
  type ProjectTechnology, type InsertProjectTechnology,
  type Contact, type InsertContact,
  projects, technologies, projectTechnologies, contacts
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.slug, slug));
    return project;
  }
  
  // Technology methods
  async getAllTechnologies(): Promise<Technology[]> {
    return await db.select().from(technologies);
  }

  async getTechnologyById(id: number): Promise<Technology | undefined> {
    const [technology] = await db.select().from(technologies).where(eq(technologies.id, id));
    return technology;
  }
  
  // Project-Technology methods
  async getProjectTechnologies(projectId: number): Promise<ProjectTechnology[]> {
    return await db.select()
      .from(projectTechnologies)
      .where(eq(projectTechnologies.projectId, projectId));
  }
  
  // Contact methods
  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db.insert(contacts)
      .values(contact)
      .returning();
    return newContact;
  }
}