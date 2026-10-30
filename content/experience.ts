import type { Experience } from "@/lib/schema";

// Newest first is not required; the site sorts by start date.
// Example entry:
// {
//   title: "Informatics student",
//   org: "Your university",
//   kind: "education",
//   start: "2022-08",
//   summary: "One sentence about what you learned or built there.",
//   draft: true,
// },
export const experience: Experience[] = [
  {
    title: "Web Developer Intern",
    org: "PT. Duta Idaman Property",
    kind: "internship",
    start: "2024-01",
    end: "2024-08",
    summary:
      "Built the company's Real Estate Management Information System and property e-catalog with Laravel and MySQL, with modules for housing data, service portfolios, and cooperative partnerships.",
    stack: ["laravel", "php", "mysql"],
    draft: true,
  },
];
