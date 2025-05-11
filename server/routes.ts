import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  });

  // Get project by slug
  app.get("/api/projects/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const project = await storage.getProjectBySlug(slug);
      
      if (!project) {
        return res.status(404).json({ message: "프로젝트를 찾을 수 없습니다." });
      }
      
      res.json(project);
    } catch (error) {
      console.error(`Error fetching project with slug ${req.params.slug}:`, error);
      res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  });

  // Get all technologies
  app.get("/api/technologies", async (req, res) => {
    try {
      const technologies = await storage.getAllTechnologies();
      res.json(technologies);
    } catch (error) {
      console.error("Error fetching technologies:", error);
      res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  });

  // Get technologies for a project
  app.get("/api/projects/:id/technologies", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id, 10);
      
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "잘못된 프로젝트 ID입니다." });
      }
      
      const projectTechnologies = await storage.getProjectTechnologies(projectId);
      
      // Get full technology details for each project-technology relationship
      const result = await Promise.all(
        projectTechnologies.map(async (pt) => {
          const technology = await storage.getTechnologyById(pt.technologyId);
          return {
            ...pt,
            technology
          };
        })
      );
      
      res.json(result);
    } catch (error) {
      console.error(`Error fetching technologies for project ${req.params.id}:`, error);
      res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  });

  // Create contact
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "입력 데이터가 유효하지 않습니다.", 
          errors: validationError.details 
        });
      }
      
      console.error("Error creating contact:", error);
      res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
