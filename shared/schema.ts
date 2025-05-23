import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Project entity
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  logo: text("logo").notNull(),
  year: integer("year").notNull(),
  status: text("status").notNull(),
  logoColor: text("logo_color").notNull(),
  mainTechnologies: text("main_technologies").array(),
  introduction: text("introduction").notNull(),
  introductionEn: text("introduction_en"),
  integrationDetails: text("integration_details").array(),
  integrationDetailsEn: text("integration_details_en").array(),
  partnershipHighlights: text("partnership_highlights").array(),
  partnershipHighlightsEn: text("partnership_highlights_en").array(),
});

// Technology entity
export const technologies = pgTable("technologies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  description: text("description").notNull(),
  descriptionEn: text("description_en"),
  benefits: text("benefits").array(),
  benefitsEn: text("benefits_en").array(),
  documentationLink: text("documentation_link").notNull(),
});

// Project-Technology relationship
export const projectTechnologies = pgTable("project_technologies", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  technologyId: integer("technology_id").notNull(),
  details: text("details"),
});

// Contact entity
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  projectName: text("project_name").notNull(),
  interestArea: text("interest_area").notNull(),
  message: text("message").notNull(),
});

// Create insert schemas
const projectInsertBase = createInsertSchema(projects).omit({ id: true });
export const insertProjectSchema = projectInsertBase.extend({
  introductionEn: z.string().nullable().optional(),
  integrationDetailsEn: z.array(z.string()).nullable().optional(),
  partnershipHighlightsEn: z.array(z.string()).nullable().optional(),
});

const techInsertBase = createInsertSchema(technologies).omit({ id: true });
export const insertTechnologySchema = techInsertBase.extend({
  descriptionEn: z.string().nullable().optional(),
  benefitsEn: z.array(z.string()).nullable().optional(),
});

export const insertProjectTechnologySchema = createInsertSchema(projectTechnologies).omit({
  id: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
});

// Define types
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect & {
  introductionEn?: string | null;
  integrationDetailsEn?: string[] | null;
  partnershipHighlightsEn?: string[] | null;
};

export type InsertTechnology = z.infer<typeof insertTechnologySchema>;
export type Technology = typeof technologies.$inferSelect & {
  descriptionEn?: string | null;
  benefitsEn?: string[] | null;
};

export type InsertProjectTechnology = z.infer<typeof insertProjectTechnologySchema>;
export type ProjectTechnology = typeof projectTechnologies.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
