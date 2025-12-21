#!/usr/bin/env node

/**
 * Custom HTML Documentation Generator for Hammerspoon 2
 *
 * This generator creates clean, organized documentation that properly separates:
 * - Modules (hs.alert, hs.window, etc.) with their factory methods
 * - Types (HSAlert, HSFont, etc.) with their instance properties and methods
 */

const fs = require('fs');
const path = require('path');

const JSON_DIR = path.join(__dirname, '..', 'docs', 'json');
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'html');
const COMBINED_DIR = path.join(JSON_DIR, 'combined');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Generate the base HTML template
 */
function htmlTemplate(title, content, currentPage = '') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Hammerspoon 2 API</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="sidebar">
        <div class="sidebar-header">
            <h1><a href="index.html">Hammerspoon 2</a></h1>
            <p class="version">API Documentation</p>
        </div>

        <div class="nav-section">
            <h2>Modules</h2>
            <div id="modules-nav"></div>
        </div>

        <div class="nav-section">
            <h2>Types</h2>
            <div id="types-nav"></div>
        </div>
    </nav>

    <main class="content">
        ${content}
    </main>

    <script src="script.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            loadNavigation('${currentPage}');
        });
    </script>
</body>
</html>`;
}

/**
 * Convert Swift type to display type
 */
function formatType(swiftType) {
    const typeMap = {
        'String': 'string',
        'Int': 'number',
        'Double': 'number',
        'Float': 'number',
        'Bool': 'boolean',
        'TimeInterval': 'number',
        'UInt32': 'number',
        'Any': 'any'
    };

    // Handle arrays
    if (swiftType.match(/^\[([^\]:]+)\]$/)) {
        const inner = swiftType.match(/^\[([^\]:]+)\]$/)[1];
        return `${formatType(inner)}[]`;
    }

    // Handle dictionaries
    if (swiftType.match(/^\[([^:]+):\s*([^\]]+)\]$/)) {
        const match = swiftType.match(/^\[([^:]+):\s*([^\]]+)\]$/);
        return `{[key: ${formatType(match[1])}]: ${formatType(match[2])}}`;
    }

    // Handle optionals
    const cleanType = swiftType.replace(/\?$/, '');
    return typeMap[cleanType] || cleanType;
}

/**
 * Generate module documentation page
 */
function generateModulePage(moduleData) {
    const moduleName = moduleData.name;

    // Separate module methods from type definitions
    const moduleMethods = [];
    const typeDefinitions = [];

    for (const protocol of moduleData.swift.protocols) {
        if (protocol.type === 'typedef') {
            typeDefinitions.push(protocol);
        } else {
            // Regular module protocol - add all methods
            moduleMethods.push(...protocol.methods);
        }
    }

    // Add JavaScript functions as module methods
    if (moduleData.javascript && moduleData.javascript.functions) {
        for (const func of moduleData.javascript.functions) {
            moduleMethods.push({
                name: func.name,
                signature: `function ${func.name}(${func.params.join(', ')})`,
                documentation: func.documentation?.description || '',
                params: func.params.map((name, idx) => ({
                    name: name,
                    type: func.documentation?.params?.[idx]?.type || 'any'
                })),
                returns: func.documentation?.returns || null
            });
        }
    }

    let content = `
        <div class="page-header">
            <h1>${moduleName}</h1>
            <p class="module-type">Module</p>
        </div>

        <div class="section">`;

    // Add type definitions section
    if (typeDefinitions.length > 0) {
        content += `
            <h2>Types</h2>
            <p>This module provides the following types:</p>
            <ul class="type-list">`;

        for (const typeDef of typeDefinitions) {
            const typeName = typeDef.name.replace(/API$/, '');
            content += `
                <li>
                    <a href="${typeName}.html" class="type-link">${typeName}</a>
                </li>`;
        }

        content += `
            </ul>`;
    }

    // Add module methods section
    if (moduleMethods.length > 0) {
        content += `
            <h2>Methods</h2>`;

        for (const method of moduleMethods) {
            const params = method.params || [];
            const paramStr = params.map(p => p.name).join(', ');

            content += `
            <div class="method" id="${method.name}">
                <h3>${moduleName}.${method.name}(${paramStr})</h3>`;

            if (method.description) {
                content += `
                <p class="description">${method.description}</p>`;
            }

            if (params.length > 0) {
                content += `
                <h4>Parameters</h4>
                <ul class="params">`;

                for (const param of params) {
                    content += `
                    <li>
                        <code>${param.name}</code>
                        <span class="type">${formatType(param.type)}</span>`;

                    if (param.description) {
                        content += `
                        <p class="param-desc">${param.description}</p>`;
                    }

                    content += `
                    </li>`;
                }

                content += `
                </ul>`;
            }

            if (method.returns) {
                content += `
                <h4>Returns</h4>
                <p>
                    <span class="type">${formatType(method.returns.type)}</span>
                    ${method.returns.description ? ` - ${method.returns.description}` : ''}
                </p>`;
            }

            content += `
            </div>`;
        }
    }

    content += `
        </div>`;

    const html = htmlTemplate(moduleName, content, moduleName);
    const outputPath = path.join(OUTPUT_DIR, `${moduleName}.html`);
    fs.writeFileSync(outputPath, html);
    console.log(`  ✓ Generated ${moduleName}.html`);
}

/**
 * Generate type documentation page
 */
function generateTypePage(typeName, protocol, isGlobal = false) {
    let content = `
        <div class="page-header">
            <h1>${typeName}</h1>
            <p class="module-type">Type</p>
        </div>`;

    // Add type description if available
    if (protocol.description) {
        content += `
        <div class="section">
            <p class="type-description">${protocol.description}</p>
        </div>`;
    }

    content += `
        <div class="section">`;

    // Add properties section
    if (protocol.properties && protocol.properties.length > 0) {
        content += `
            <h2>Properties</h2>`;

        for (const prop of protocol.properties) {
            // Extract type from signature
            const typeMatch = prop.signature.match(/var\s+\w+\s*:\s*([^{]+)/);
            const propType = typeMatch ? typeMatch[1].trim() : 'any';

            content += `
            <div class="property" id="${prop.name}">
                <h3>${prop.name}</h3>
                <p class="type">${formatType(propType)}</p>`;

            if (prop.description) {
                content += `
                <p class="description">${prop.description}</p>`;
            }

            content += `
            </div>`;
        }
    }

    // Add methods section
    if (protocol.methods && protocol.methods.length > 0) {
        content += `
            <h2>Methods</h2>`;

        for (const method of protocol.methods) {
            // Skip init methods for global types (they're shown as constructors)
            if (method.name === 'init' && !isGlobal) {
                continue;
            }

            const params = method.params || [];
            const paramStr = params.map(p => p.name).join(', ');
            const methodName = method.name === 'init' ? 'constructor' : method.name;
            // Check if it's a static method by looking at the signature
            const isStatic = method.signature && method.signature.includes('static func');

            content += `
            <div class="method" id="${methodName}">
                <h3>
                    ${isStatic ? `<span class="static-badge">static</span> ` : ''}
                    ${isStatic ? `${typeName}.` : ''}${methodName}(${paramStr})
                </h3>`;

            if (method.description) {
                content += `
                <p class="description">${method.description}</p>`;
            }

            if (params.length > 0) {
                content += `
                <h4>Parameters</h4>
                <ul class="params">`;

                for (const param of params) {
                    content += `
                    <li>
                        <code>${param.name}</code>
                        <span class="type">${formatType(param.type)}</span>`;

                    if (param.description) {
                        content += `
                        <p class="param-desc">${param.description}</p>`;
                    }

                    content += `
                    </li>`;
                }

                content += `
                </ul>`;
            }

            if (method.returns) {
                content += `
                <h4>Returns</h4>
                <p>
                    <span class="type">${formatType(method.returns.type)}</span>
                    ${method.returns.description ? ` - ${method.returns.description}` : ''}
                </p>`;
            }

            content += `
            </div>`;
        }
    }

    content += `
        </div>`;

    const html = htmlTemplate(typeName, content, typeName);
    const outputPath = path.join(OUTPUT_DIR, `${typeName}.html`);
    fs.writeFileSync(outputPath, html);
    console.log(`  ✓ Generated ${typeName}.html`);
}

/**
 * Generate index page
 */
function generateIndexPage(modules, types) {
    const content = `
        <div class="page-header">
            <h1>Hammerspoon 2 API Documentation</h1>
            <p>Welcome to the Hammerspoon 2 API documentation</p>
        </div>

        <div class="section">
            <h2>Modules</h2>
            <p>Modules are the main entry points for Hammerspoon functionality.</p>
            <div class="grid">
                ${modules.map(m => `
                <a href="${m.name}.html" class="card">
                    <h3>${m.name}</h3>
                    <p>${m.swiftProtocols} protocols, ${m.javascriptFunctions} functions</p>
                </a>
                `).join('')}
            </div>
        </div>

        <div class="section">
            <h2>Types</h2>
            <p>Types represent objects that can be created and manipulated in Hammerspoon.</p>
            <div class="grid">
                ${types.map(t => `
                <a href="${t}.html" class="card">
                    <h3>${t}</h3>
                </a>
                `).join('')}
            </div>
        </div>
    `;

    const html = htmlTemplate('Home', content, 'index');
    const outputPath = path.join(OUTPUT_DIR, 'index.html');
    fs.writeFileSync(outputPath, html);
    console.log(`  ✓ Generated index.html`);
}

/**
 * Generate JavaScript for navigation
 */
function generateJavaScript(modules, types) {
    const script = `
// Navigation data
const navigationData = {
    modules: ${JSON.stringify(modules.map(m => ({ name: m.name, url: m.name + '.html' })))},
    types: ${JSON.stringify(types.map(t => ({ name: t, url: t + '.html' })))}
};

// Load navigation
function loadNavigation(currentPage) {
    const modulesNav = document.getElementById('modules-nav');
    const typesNav = document.getElementById('types-nav');

    if (modulesNav) {
        modulesNav.innerHTML = navigationData.modules.map(m =>
            \`<a href="\${m.url}" class="\${currentPage === m.name ? 'active' : ''}">\${m.name}</a>\`
        ).join('');
    }

    if (typesNav) {
        typesNav.innerHTML = navigationData.types.map(t =>
            \`<a href="\${t.url}" class="\${currentPage === t.name ? 'active' : ''}">\${t.name}</a>\`
        ).join('');
    }
}

// Theme support
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference or default to dark
    const theme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', theme);
});
`;

    const outputPath = path.join(OUTPUT_DIR, 'script.js');
    fs.writeFileSync(outputPath, script);
    console.log(`  ✓ Generated script.js`);
}

/**
 * Generate CSS
 */
function generateCSS() {
    const css = `
:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f5;
    --bg-code: #f8f8f8;
    --text-primary: #333333;
    --text-secondary: #666666;
    --accent: #007acc;
    --border: #e0e0e0;
    --shadow: rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
    --bg-primary: #1e1e1e;
    --bg-secondary: #252526;
    --bg-code: #2d2d30;
    --text-primary: #d4d4d4;
    --text-secondary: #9d9d9d;
    --accent: #4fc3f7;
    --border: #3c3c3c;
    --shadow: rgba(0, 0, 0, 0.3);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: flex;
    min-height: 100vh;
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
}

/* Sidebar */
.sidebar {
    width: 280px;
    background: var(--bg-secondary);
    border-right: 1px solid var(--border);
    padding: 2rem 0;
    overflow-y: auto;
    position: fixed;
    height: 100vh;
}

.sidebar-header {
    padding: 0 1.5rem 1.5rem;
    border-bottom: 1px solid var(--border);
    margin-bottom: 1.5rem;
}

.sidebar-header h1 {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
}

.sidebar-header .version {
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.nav-section {
    margin-bottom: 1.5rem;
    padding: 0 1.5rem;
}

.nav-section h2 {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-secondary);
    margin-bottom: 0.75rem;
    font-weight: 600;
}

.nav-section a {
    display: block;
    padding: 0.5rem 0.75rem;
    color: var(--text-primary);
    text-decoration: none;
    border-radius: 4px;
    margin-bottom: 0.25rem;
    transition: background 0.2s;
}

.nav-section a:hover {
    background: var(--bg-primary);
}

.nav-section a.active {
    background: var(--accent);
    color: white;
}

/* Main Content */
.content {
    margin-left: 280px;
    flex: 1;
    padding: 3rem;
    max-width: 1200px;
}

.page-header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--border);
}

.page-header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.page-header .module-type {
    color: var(--text-secondary);
    font-size: 1rem;
}

.section {
    margin-bottom: 3rem;
}

.section h2 {
    font-size: 1.75rem;
    margin: 2rem 0 1rem;
    color: var(--text-primary);
}

.section h3 {
    font-size: 1.25rem;
    margin: 1rem 0 0.5rem;
    color: var(--accent);
}

.section h4 {
    font-size: 1rem;
    margin: 1rem 0 0.5rem;
    font-weight: 600;
}

/* Grid for cards */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1.5rem;
    text-decoration: none;
    color: var(--text-primary);
    transition: all 0.2s;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow);
    border-color: var(--accent);
}

.card h3 {
    color: var(--accent);
    margin-bottom: 0.5rem;
}

.card p {
    color: var(--text-secondary);
    font-size: 0.875rem;
}

/* Methods and Properties */
.method, .property {
    background: var(--bg-secondary);
    border-left: 3px solid var(--accent);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 4px;
}

.method h3, .property h3 {
    margin-top: 0;
    font-family: 'Courier New', monospace;
    font-size: 1.1rem;
}

.static-badge {
    background: var(--accent);
    color: white;
    padding: 0.125rem 0.5rem;
    border-radius: 3px;
    font-size: 0.75rem;
    font-weight: normal;
    margin-right: 0.5rem;
}

.description {
    margin: 0.75rem 0;
    color: var(--text-primary);
}

.params {
    list-style: none;
    margin: 0.5rem 0;
}

.params li {
    padding: 0.5rem;
    background: var(--bg-code);
    margin-bottom: 0.5rem;
    border-radius: 4px;
}

.params code {
    font-weight: 600;
    margin-right: 0.5rem;
}

.type {
    color: var(--accent);
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
}

.type-list {
    list-style: none;
    margin: 1rem 0;
}

.type-list li {
    margin: 0.5rem 0;
}

.type-link {
    color: var(--accent);
    text-decoration: none;
    font-size: 1.1rem;
}

.type-link:hover {
    text-decoration: underline;
}

.type-description {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-primary);
    margin: 1rem 0;
    padding: 1rem;
    background: var(--bg-secondary);
    border-left: 4px solid var(--accent);
    border-radius: 4px;
}

.param-desc {
    margin: 0.5rem 0 0 0;
    color: var(--text-secondary);
    font-size: 0.875rem;
    line-height: 1.5;
}

code {
    background: var(--bg-code);
    padding: 0.125rem 0.375rem;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
}

/* Responsive */
@media (max-width: 768px) {
    .sidebar {
        width: 100%;
        position: relative;
        height: auto;
    }

    .content {
        margin-left: 0;
        padding: 1.5rem;
    }
}
`;

    const outputPath = path.join(OUTPUT_DIR, 'styles.css');
    fs.writeFileSync(outputPath, css);
    console.log(`  ✓ Generated styles.css`);
}

/**
 * Main execution
 */
function main() {
    console.log('Generating Hammerspoon 2 HTML Documentation...\n');

    // Load index
    const indexPath = path.join(JSON_DIR, 'index.json');
    const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

    // Generate module pages
    console.log('Generating module pages:');
    for (const module of index.modules) {
        const modulePath = path.join(JSON_DIR, `${module.name}.json`);
        const moduleData = JSON.parse(fs.readFileSync(modulePath, 'utf8'));
        generateModulePage(moduleData);

        // Generate type pages for types defined in this module
        for (const protocol of moduleData.swift.protocols) {
            if (protocol.type === 'typedef') {
                const typeName = protocol.name.replace(/API$/, '');
                generateTypePage(typeName, protocol, false);
            }
        }
    }

    // Generate global type pages
    console.log('\nGenerating type pages:');
    const allTypes = [];
    if (index.types) {
        const typesPath = path.join(JSON_DIR, 'types.json');
        const typesData = JSON.parse(fs.readFileSync(typesPath, 'utf8'));

        for (const protocol of typesData.swift.protocols) {
            const typeName = protocol.name.replace(/(API|JSExports?)$/, '');
            allTypes.push(typeName);
            generateTypePage(typeName, protocol, true);
        }
    }

    // Collect all type names from modules too
    for (const module of index.modules) {
        const modulePath = path.join(JSON_DIR, `${module.name}.json`);
        const moduleData = JSON.parse(fs.readFileSync(modulePath, 'utf8'));

        for (const protocol of moduleData.swift.protocols) {
            if (protocol.type === 'typedef') {
                const typeName = protocol.name.replace(/API$/, '');
                if (!allTypes.includes(typeName)) {
                    allTypes.push(typeName);
                }
            }
        }
    }

    // Generate index page
    console.log('\nGenerating index and assets:');
    generateIndexPage(index.modules, allTypes);

    // Generate JavaScript and CSS
    generateJavaScript(index.modules, allTypes);
    generateCSS();

    console.log(`\n✅ HTML documentation generated successfully!`);
    console.log(`   Output directory: ${OUTPUT_DIR}`);
    console.log(`   Open docs/html/index.html in your browser`);
}

main();
