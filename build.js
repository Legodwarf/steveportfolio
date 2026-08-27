const fs = require('fs');
const path = require('path');

// Read data files
const projectsData = JSON.parse(fs.readFileSync('data/projects.json', 'utf8'));
const homepagesData = JSON.parse(fs.readFileSync('data/homepages.json', 'utf8'));

// Read templates
const homepageTemplate = fs.readFileSync('templates/homepage-template.html', 'utf8');
const projectTemplate = fs.readFileSync('templates/project-template.html', 'utf8');

// Create projects directory if it doesn't exist
if (!fs.existsSync('projects')) {
    fs.mkdirSync('projects');
}

// Helper function to replace template placeholders
function replaceTemplate(template, replacements) {
    let result = template;
    for (const [key, value] of Object.entries(replacements)) {
        result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return result;
}

// Generate project detail pages
function generateProjectPage(project) {
    // Build objectives list
    const objectivesHtml = project.objectives.map(obj => `                        <li>${obj}</li>`).join('\n').trim();
    
    // Build technologies list
    const technologiesListHtml = project.technologiesList.map(tech => `                        <li>${tech}</li>`).join('\n');
    
    // Build code samples
    const codeSamplesHtml = project.codeSamples.map((sample, index) => {
        return `                    <!-- Code Sample ${index + 1} -->
                    <div class="code-sample">
                        <div class="code-header">
                            <h3>${sample.title}</h3>
                            <button class="copy-button" onclick="copyCode(this)">Copy</button>
                        </div>
                        <pre><code>${sample.code}</code></pre>
                    </div>`;
    }).join('\n\n');

    const repoUrl = (project.repoUrl || '').trim();
    const repoSectionHtml = repoUrl
        ? `
                <!-- Full Documentation & Code Section -->
                <section class="content-section">
                    <h2>Full Documentation &amp; Code</h2>
                    <p>The complete documentation and source code for this project are available in the repository:</p>
                    <a href="${repoUrl}" class="project-link" target="_blank" rel="noopener noreferrer">View Repository →</a>
                </section>
`
        : '';
    
    const replacements = {
        'PROJECT_TITLE': project.title,
        'TECHNOLOGIES': project.technologies,
        'DATE': project.date,
        'OVERVIEW': project.overview,
        'OBJECTIVES': objectivesHtml,
        'METHODOLOGY': project.methodology,
        'KEY_FINDINGS': project.keyFindings,
        'CODE_SAMPLES': codeSamplesHtml,
        'REPO_SECTION': repoSectionHtml,
        'TECHNOLOGIES_LIST': technologiesListHtml,
        'LESSONS_LEARNED': project.lessonsLearned,
        'HOME_URL': '../index.html' // Default, will be overridden by JavaScript
    };
    
    return replaceTemplate(projectTemplate, replacements);
}

// Generate homepage
function generateHomepage(homepageConfig, projectsMap, isDefault = false) {
    // Build projects grid
    const projectsGridHtml = homepageConfig.projects.map(projectId => {
        const project = projectsMap[projectId];
        if (!project) {
            console.warn(`Warning: Project ${projectId} not found in projects.json`);
            return '';
        }
        
        // Determine the project URL with from parameter
        const homepageFilename = homepageConfig.url;
        const projectUrl = `projects/${project.filename}?from=${encodeURIComponent(homepageFilename)}`;
        
        return `                    <!-- ${project.title} -->
                    <article class="project-card">
                        <div class="project-content">
                            <h3 class="project-title">${project.title}</h3>
                            <p class="project-description">
                                ${project.summary}
                            </p>
                            <a href="${projectUrl}" class="project-link">View Details →</a>
                        </div>
                    </article>`;
    }).join('\n\n');
    
    // Determine page title
    const pageTitle = 'Stephen Parker - Data Analytics Portfolio';
    
    // Determine home URL (for navigation)
    const homeUrl = homepageConfig.url;
    
    const replacements = {
        'PAGE_TITLE': pageTitle,
        'HOME_URL': homeUrl,
        'PROJECTS_GRID': projectsGridHtml
    };
    
    return replaceTemplate(homepageTemplate, replacements);
}

// Create projects map for quick lookup
const projectsMap = {};
projectsData.projects.forEach(project => {
    projectsMap[project.id] = project;
});

// Generate all project pages
console.log('Generating project pages...');
projectsData.projects.forEach(project => {
    const projectHtml = generateProjectPage(project);
    const projectPath = path.join('projects', project.filename);
    fs.writeFileSync(projectPath, projectHtml, 'utf8');
    console.log(`  Generated: ${projectPath}`);
});

// Generate default homepage
console.log('\nGenerating default homepage...');
const defaultHomepageHtml = generateHomepage(homepagesData.default, projectsMap, true);
fs.writeFileSync('index.html', defaultHomepageHtml, 'utf8');
console.log('  Generated: index.html');

// Generate employer-specific homepages
console.log('\nGenerating employer-specific homepages...');
homepagesData.homepages.forEach(homepage => {
    const homepageHtml = generateHomepage(homepage, projectsMap, false);
    fs.writeFileSync(homepage.url, homepageHtml, 'utf8');
    console.log(`  Generated: ${homepage.url}`);
});

console.log('\nBuild complete!');
