import express, { Router, Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";

const router: Router = express.Router();
// In-memory jobs store (mock database)
// In-memory jobs store (mock database)
let jobs: Array<any> = [
  {
    id: uuidv4(),
    name: "Sample Job 1",
    submittedTime: new Date("2024-10-10T08:00:00Z"),
    executionTime: new Date("2024-10-15T10:00:00Z"),
    status: "scheduled",
    apiDetails: {
      type: "POST",
      endPoint: "/api/sample1",
    },
    headers: [
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: "Bearer sampletoken1" },
    ],
    body: {
      sampleData: "This is sample data for job 1",
    },
    favorite: false,
  },
  {
    id: uuidv4(),
    name: "Sample Job 2",
    submittedTime: new Date("2024-10-09T09:00:00Z"),
    executionTime: new Date("2024-10-11T14:00:00Z"),
    status: "completed",
    apiDetails: {
      type: "GET",
      endPoint: "/api/sample2",
    },
    headers: [
      { key: "Accept", value: "application/json" },
      { key: "Authorization", value: "Bearer sampletoken2" },
    ],
    body: {},
  },
  {
    id: uuidv4(),
    name: "Sample Job 3",
    submittedTime: new Date("2024-10-08T10:30:00Z"),
    executionTime: new Date("2024-10-20T12:00:00Z"),
    status: "scheduled",
    apiDetails: {
      type: "PATCH",
      endPoint: "/api/sample3",
    },
    headers: [
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: "Bearer sampletoken3" },
    ],
    body: {
      updatedField: "This is updated data for job 3",
    },
    favorite: true,
  },
];

// Utility to calculate status
const calculateStatus = (executionDate: Date): string => {
  return new Date(executionDate) < new Date() ? "completed" : "scheduled";
};

// 1. GET all jobs (id, name, submittedDate, executionDate)
router.get("/", (_req: Request, res: Response) => {
  console.log("jobs", jobs);
  const jobList = jobs.map((job) => ({
    id: job.id,
    name: job.name,
    submittedDate: job.submittedTime,
    executionDate: job.executionTime,
    status: calculateStatus(job.executionTime),
  }));
  res.json(jobList);
});

// // 2. PATCH job/:id to set favorite (favorite = true or false)
// router.patch("/:id", (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { favorite } = req.query;

//   const job = jobs.find((job) => job.id === id);
//   if (!job) {
//     return res.status(404).json({ message: "Job not found" });
//   }

//   if (favorite !== "true" && favorite !== "false") {
//     return res.status(400).json({ message: "Invalid favorite value" });
//   }

//   job.favorite = favorite === "true";
//   return res.json({ message: "Job updated", job });
// });

// // 3. GET job/:id to get specific job details
// router.get("/:id", (req: Request, res: Response) => {
//   const { id } = req.params;

//   const job = jobs.find((job) => job.id === id);
//   if (!job) {
//     return res.status(404).json({ message: "Job not found" });
//   }

//   return res.json(job);
// });

// // 4. PUT job/:id to update job data
// router.put("/:id", (req: Request<{ id: string }>, res: Response) => {
//   const { id } = req.params;
//   const updatedData = req.body;

//   const jobIndex = jobs.findIndex((job) => job.id === id);
//   if (jobIndex === -1) {
//     return res.status(404).json({ message: "Job not found" });
//   }

//   const updatedJob = {
//     ...jobs[jobIndex],
//     ...updatedData,
//     status: calculateStatus(
//       updatedData.executionTime || jobs[jobIndex].executionTime
//     ),
//   };

//   jobs[jobIndex] = updatedJob;
//   res.json({ message: "Job updated", job: updatedJob });
// });

// // POST new job for testing purposes (you can remove this)
// router.post("/", (req, res) => {
//   const { name, executionTime, apiDetails, headers, body } = req.body;

//   const newJob = {
//     id: uuidv4(),
//     name,
//     submittedTime: new Date(),
//     executionTime: new Date(executionTime),
//     status: calculateStatus(new Date(executionTime)),
//     apiDetails,
//     headers,
//     body,
//     favorite: false,
//   };

//   jobs.push(newJob);
//   res.json({ message: "Job created", job: newJob });
// });

export default router;
