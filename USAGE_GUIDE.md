# Portfolio Site Usage Guide

This guide explains how to add new projects and create employer-specific homepages for your portfolio site.

## Table of Contents

- [Adding a New Project](#adding-a-new-project)
- [Creating a New Homepage](#creating-a-new-homepage)
- [Running the Build Script](#running-the-build-script)
- [File Structure](#file-structure)
- [Examples](#examples)

---

## Adding a New Project

To add a new project to your portfolio:

### Step 1: Edit `data/projects.json`

Open `data/projects.json` and add a new project object to the `projects` array. Here's the structure:

```json
{
  "id": "unique-project-id",
  "title": "Project Title",
  "summary": "Brief summary shown on homepage (1-2 sentences)",
  "technologies": "Technology Stack (e.g., 'Python, SQL, Tableau')",
  "date": "Month Year (e.g., 'January 2024')",
  "filename": "project-filename.html",
  "overview": "Detailed overview paragraph describing the project",
  "objectives": [
    "Objective 1",
    "Objective 2",
    "Objective 3"
  ],
  "methodology": "Detailed description of your approach, tools, and techniques",
  "keyFindings": "Description of key findings, insights, or results",
  "technologiesList": [
    "Technology 1",
    "Technology 2",
    "Technology 3"
  ],
  "lessonsLearned": "What you learned from this project",
  "codeSamples": [
    {
      "title": "Sample 1: Description",
      "code": "Your code here\n# Can be multi-line\nprint('Hello World')"
    },
    {
      "title": "Sample 2: Description",
      "code": "More code here"
    }
  ]
}
```

### Step 2: Important Notes

- **`id`**: Must be unique. Use lowercase with hyphens (e.g., `"customer-churn-analysis"`)
- **`filename`**: Should match the project ID but with `.html` extension (e.g., `"customer-churn-analysis.html"`)
- **`summary`**: This is what appears on the homepage project cards. Keep it concise (1-2 sentences)
- **`codeSamples`**: You can have any number of code samples. Each should have a `title` and `code` field
- **Arrays**: For `objectives`, `technologiesList`, and `codeSamples`, you can add or remove items as needed

### Step 3: Run the Build Script

After adding your project, run:
```bash
node build.js
```

This will generate the new project page in the `projects/` directory.

---

## Creating a New Homepage

To create a new employer-specific homepage (e.g., for a job application):

### Step 1: Edit `data/homepages.json`

Open `data/homepages.json` and add a new entry to the `homepages` array:

```json
{
  "id": "employer-name",
  "url": "employer-name.html",
  "projects": ["project-id-1", "project-id-2", "project-id-3"]
}
```

### Step 2: Select Projects

In the `projects` array, list the IDs of exactly 3 projects you want to showcase. These must match the `id` values from `data/projects.json`.

**Example:**
```json
{
  "id": "acme-corp",
  "url": "acme-corp.html",
  "projects": ["new-product-analysis", "project-2", "project-3"]
}
```

### Step 3: Important Notes

- **`id`**: A unique identifier (e.g., company name in lowercase)
- **`url`**: The filename for the homepage. This will be accessible at `yourdomain.com/employer-name.html`
- **`projects`**: Must contain exactly 3 project IDs that exist in `data/projects.json`
- The order matters - projects will appear in the order you list them

### Step 4: Run the Build Script

After adding your homepage configuration, run:
```bash
node build.js
```

This will generate the new homepage file in the root directory.

---

## Running the Build Script

The build script generates all HTML pages from your templates and data files.

### Basic Usage

```bash
node build.js
```

### What the Build Script Does

1. Reads `data/projects.json` and generates all project detail pages in `projects/` directory
2. Reads `data/homepages.json` and generates:
   - Default `index.html` homepage
   - All employer-specific homepages (e.g., `acme-corp.html`)
3. Sets up navigation links with proper URL parameters so project pages know which homepage they came from

### When to Run the Build Script

Run `node build.js` whenever you:
- Add a new project
- Create a new homepage
- Update project content in `data/projects.json`
- Change homepage configurations in `data/homepages.json`
- Modify templates (though this is less common)

---

## File Structure

```
steveportfolio/
├── data/
│   ├── projects.json          # All project data
│   └── homepages.json         # Homepage configurations
├── templates/
│   ├── homepage-template.html # Template for homepages
│   └── project-template.html # Template for project pages
├── projects/                  # Generated project pages
│   ├── new-product-analysis.html
│   └── ...
├── build.js                   # Build script
├── index.html                 # Default homepage (generated)
├── acme-corp.html             # Example employer homepage (generated)
└── [other files...]
```

### Important Files

- **`data/projects.json`**: Edit this to add/modify projects
- **`data/homepages.json`**: Edit this to create new homepages
- **`build.js`**: Run this to generate all HTML pages
- **`templates/`**: Only edit if you want to change the HTML structure

---

## Examples

### Example 1: Adding a New Project

Let's say you want to add a "Customer Segmentation Analysis" project:

1. Open `data/projects.json`
2. Add this to the `projects` array:

```json
{
  "id": "customer-segmentation",
  "title": "Customer Segmentation Analysis",
  "summary": "Used clustering algorithms to identify distinct customer segments for targeted marketing campaigns.",
  "technologies": "Python, scikit-learn, pandas, matplotlib",
  "date": "March 2024",
  "filename": "customer-segmentation.html",
  "overview": "This project analyzed customer purchase behavior to identify distinct segments...",
  "objectives": [
    "Identify distinct customer segments",
    "Develop marketing strategies for each segment",
    "Measure segment profitability"
  ],
  "methodology": "Used K-means clustering with feature engineering...",
  "keyFindings": "Identified 5 distinct customer segments with varying profitability...",
  "technologiesList": [
    "Python",
    "scikit-learn",
    "pandas",
    "matplotlib",
    "Jupyter Notebooks"
  ],
  "lessonsLearned": "Learned the importance of feature scaling in clustering algorithms...",
  "codeSamples": [
    {
      "title": "K-means Clustering Implementation",
      "code": "from sklearn.cluster import KMeans\nimport pandas as pd\n\n# Load data\ndata = pd.read_csv('customers.csv')\n\n# Fit model\nkmeans = KMeans(n_clusters=5)\nclusters = kmeans.fit_predict(data)"
    }
  ]
}
```

3. Run `node build.js`
4. The project page will be generated at `projects/customer-segmentation.html`

### Example 2: Creating a Homepage for "TechStart Inc"

1. Open `data/homepages.json`
2. Add this to the `homepages` array:

```json
{
  "id": "techstart-inc",
  "url": "techstart-inc.html",
  "projects": ["new-product-analysis", "customer-segmentation", "project-2"]
}
```

3. Run `node build.js`
4. The homepage will be generated at `techstart-inc.html`
5. You can now share the URL: `yourdomain.com/techstart-inc.html`

### Example 3: Updating an Existing Project

1. Open `data/projects.json`
2. Find the project you want to update (by `id`)
3. Modify any fields (e.g., update `keyFindings` with new results)
4. Run `node build.js`
5. The project page will be regenerated with your updates

---

## Tips and Best Practices

1. **Project IDs**: Use descriptive, lowercase IDs with hyphens (e.g., `"sales-forecast-model"` not `"project4"`)

2. **Project Summaries**: Keep homepage summaries concise (1-2 sentences). Save detailed descriptions for the `overview` field.

3. **Homepage Selection**: Choose projects that best match the job requirements. You can create multiple homepages highlighting different projects for different applications.

4. **Code Samples**: Use proper code formatting in your JSON. For multi-line code, use `\n` for line breaks.

5. **Testing**: After running the build script, open the generated HTML files in a browser to verify everything looks correct.

6. **Backup**: Before making major changes, consider backing up your `data/` directory.

---

## Troubleshooting

### Build Script Errors

- **"Cannot find module"**: Make sure you're running the script from the project root directory
- **"Unexpected token"**: Check your JSON syntax - use a JSON validator if needed
- **"Project not found"**: Ensure project IDs in `homepages.json` match IDs in `projects.json`

### Navigation Issues

- Project pages use URL parameters (`?from=homepage.html`) to track which homepage linked to them
- The back link is automatically updated by JavaScript in `script.js`
- If navigation doesn't work, check browser console for JavaScript errors

### Missing Projects on Homepage

- Verify the project IDs in `homepages.json` exactly match the `id` fields in `projects.json`
- Check the build script output for warnings about missing projects

---

## Quick Reference

| Task | File to Edit | Command to Run |
|------|--------------|----------------|
| Add new project | `data/projects.json` | `node build.js` |
| Create new homepage | `data/homepages.json` | `node build.js` |
| Update project content | `data/projects.json` | `node build.js` |
| Change homepage projects | `data/homepages.json` | `node build.js` |
| Modify HTML structure | `templates/*.html` | `node build.js` |

---

For questions or issues, refer to the build script output for specific error messages.
