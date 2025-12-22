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
const TEMPLATES_DIR = path.join(__dirname, 'templates');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Load templates
let htmlTemplate = '';
let cssTemplate = '';
let scriptTemplate = '';
let moduleContentTemplate = '';
let typeContentTemplate = '';
let indexContentTemplate = '';
let methodTemplate = '';
let propertyTemplate = '';
let parameterTemplate = '';
let typeLinkTemplate = '';
let moduleCardTemplate = '';
let typeCardTemplate = '';

function loadTemplates() {
    htmlTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'page.html'), 'utf8');
    cssTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'styles.css'), 'utf8');
    scriptTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'script.js'), 'utf8');
    moduleContentTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'module-content.html'), 'utf8');
    typeContentTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'type-content.html'), 'utf8');
    indexContentTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'index-content.html'), 'utf8');
    methodTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'method.html'), 'utf8');
    propertyTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'property.html'), 'utf8');
    parameterTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'parameter.html'), 'utf8');
    typeLinkTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'type-link.html'), 'utf8');
    moduleCardTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'module-card.html'), 'utf8');
    typeCardTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'type-card.html'), 'utf8');
}

/**
 * Simple template replacement helper
 */
function fillTemplate(template, replacements) {
    let result = template;
    for (const [key, value] of Object.entries(replacements)) {
        result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return result;
}

/**
 * Generate HTML page from template
 */
function generatePage(title, content, currentPage = '') {
    return htmlTemplate
        .replace('{{TITLE}}', title)
        .replace('{{CONTENT}}', content)
        .replace('{{CURRENT_PAGE}}', currentPage);
}

/**
 * Validate that required documentation fields are present
 */
function validateMethod(method, context) {
    if (!method.description || method.description.trim() === '') {
        throw new Error(`Missing description for method ${context}.${method.name}`);
    }

    // Validate parameters have descriptions
    if (method.params) {
        for (const param of method.params) {
            if (!param.description || param.description.trim() === '') {
                throw new Error(`Missing description for parameter "${param.name}" in ${context}.${method.name}`);
            }
        }
    }

    // Validate returns has description if present
    if (method.returns && (!method.returns.description || method.returns.description.trim() === '')) {
        throw new Error(`Missing description for return value in ${context}.${method.name}`);
    }
}

function validateProperty(property, context) {
    if (!property.description || property.description.trim() === '') {
        throw new Error(`Missing description for property ${context}.${property.name}`);
    }
}

function validateType(protocol, typeName) {
    if (!protocol.description || protocol.description.trim() === '') {
        throw new Error(`Missing description for type ${typeName}`);
    }
}

/**
 * Generate HTML for a single parameter
 */
function generateParameter(param) {
    return fillTemplate(parameterTemplate, {
        PARAM_NAME: param.name,
        PARAM_TYPE: formatType(param.type),
        PARAM_DESCRIPTION: param.description
    });
}

/**
 * Generate HTML for parameters section
 */
function generateParameters(params) {
    if (params.length === 0) {
        return '<p>None</p>';
    }
    return '<ul class="params">\n' + params.map(generateParameter).join('\n') + '\n</ul>';
}

/**
 * Generate HTML for returns section
 */
function generateReturns(returns) {
    if (!returns) {
        return '<p>Nothing</p>';
    }
    return `<p><span class="type">${formatType(returns.type)}</span> - ${returns.description}</p>`;
}

/**
 * Generate HTML for a single method
 */
function generateMethod(method, context, isStatic = false) {
    const params = method.params || [];
    const paramStr = params.map(p => p.name).join(', ');
    const methodName = method.name === 'init' ? 'constructor' : method.name;

    const staticBadge = isStatic ? '<span class="static-badge">static</span> ' : '';
    const prefix = isStatic ? `${context}.` : '';

    return fillTemplate(methodTemplate, {
        METHOD_ID: methodName,
        STATIC_BADGE: staticBadge,
        METHOD_SIGNATURE: `${prefix}${methodName}(${paramStr})`,
        METHOD_RAWSIGNATURE: method.signature,
        DESCRIPTION: method.description,
        PARAMETERS: generateParameters(params),
        RETURNS: generateReturns(method.returns)
    });
}

/**
 * Generate HTML for a single property
 */
function generateProperty(prop, propType) {
    return fillTemplate(propertyTemplate, {
        PROPERTY_ID: prop.name,
        PROPERTY_NAME: prop.name,
        PROPERTY_TYPE: formatType(propType),
        DESCRIPTION: prop.description
    });
}

/**
 * Generate HTML for a type link
 */
function generateTypeLink(typeName) {
    return fillTemplate(typeLinkTemplate, {
        TYPE_URL: `${typeName}.html`,
        TYPE_NAME: typeName
    });
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
                description: func.documentation?.description || '',
                params: func.documentation?.params || func.params.map((name, idx) => ({
                    name: name,
                    type: 'any',
                    description: ''
                })),
                returns: func.documentation?.returns || null
            });
        }
    }

    // Generate types content
    let typesContent;
    if (typeDefinitions.length > 0) {
        const typeLinks = typeDefinitions.map(td => {
            const typeName = td.name.replace(/API$/, '');
            return generateTypeLink(typeName);
        }).join('\n');
        typesContent = `<p>This module provides the following types:</p>\n<ul class="type-list">\n${typeLinks}\n</ul>`;
    } else {
        typesContent = '<p>This module does not provide any types.</p>';
    }

    // Generate methods content
    let methodsContent;
    if (moduleMethods.length > 0) {
        methodsContent = moduleMethods.map(method => {
            // Validate method has required documentation
            validateMethod(method, moduleName);
            return generateMethod(method, moduleName, false);
        }).join('\n');
    } else {
        methodsContent = '<p>This module has no methods.</p>';
    }

    // Fill in the module content template
    const content = fillTemplate(moduleContentTemplate, {
        MODULE_NAME: moduleName,
        TYPES_CONTENT: typesContent,
        METHODS_CONTENT: methodsContent
    });

    const html = generatePage(moduleName, content, moduleName);
    const outputPath = path.join(OUTPUT_DIR, `${moduleName}.html`);
    fs.writeFileSync(outputPath, html);
    console.log(`  ✓ Generated ${moduleName}.html`);
}

/**
 * Generate type documentation page
 */
function generateTypePage(typeName, protocol, isGlobal = false) {
    // Validate type has required documentation
    validateType(protocol, typeName);

    // Generate properties content
    const properties = protocol.properties || [];
    let propertiesContent;
    if (properties.length > 0) {
        propertiesContent = properties.map(prop => {
            // Validate property has required documentation
            validateProperty(prop, typeName);

            // Extract type from signature
            const typeMatch = prop.signature.match(/var\s+\w+\s*:\s*([^{]+)/);
            const propType = typeMatch ? typeMatch[1].trim() : 'any';

            return generateProperty(prop, propType);
        }).join('\n');
    } else {
        propertiesContent = '<p>This type has no properties.</p>';
    }

    // Generate methods content
    const methods = protocol.methods || [];
    const filteredMethods = methods.filter(m => m.name !== 'init' || isGlobal);
    let methodsContent;

    if (filteredMethods.length > 0) {
        methodsContent = filteredMethods.map(method => {
            // Validate method has required documentation
            validateMethod(method, typeName);

            // Check if it's a static method by looking at the signature
            const isStatic = method.signature && method.signature.includes('static func');

            return generateMethod(method, typeName, isStatic);
        }).join('\n');
    } else {
        methodsContent = '<p>This type has no methods.</p>';
    }

    // Fill in the type content template
    const content = fillTemplate(typeContentTemplate, {
        TYPE_NAME: typeName,
        TYPE_DESCRIPTION: protocol.description,
        PROPERTIES_CONTENT: propertiesContent,
        METHODS_CONTENT: methodsContent
    });

    const html = generatePage(typeName, content, typeName);
    const outputPath = path.join(OUTPUT_DIR, `${typeName}.html`);
    fs.writeFileSync(outputPath, html);
    console.log(`  ✓ Generated ${typeName}.html`);
}

/**
 * Generate index page
 */
function generateIndexPage(modules, types) {
    // Generate module cards
    const modulesGrid = modules.map(m => {
        return fillTemplate(moduleCardTemplate, {
            MODULE_URL: `${m.name}.html`,
            MODULE_NAME: m.name,
            MODULE_INFO: `${m.swiftProtocols} protocols, ${m.javascriptFunctions} functions`
        });
    }).join('\n');

    // Generate type cards
    const typesGrid = types.map(t => {
        return fillTemplate(typeCardTemplate, {
            TYPE_URL: `${t}.html`,
            TYPE_NAME: t
        });
    }).join('\n');

    // Fill in the index content template
    const content = fillTemplate(indexContentTemplate, {
        MODULES_GRID: modulesGrid,
        TYPES_GRID: typesGrid
    });

    const html = generatePage('Home', content, 'index');
    const outputPath = path.join(OUTPUT_DIR, 'index.html');
    fs.writeFileSync(outputPath, html);
    console.log(`  ✓ Generated index.html`);
}

/**
 * Generate JavaScript for navigation
 */
function generateJavaScript(modules, types) {
    const navigationData = {
        modules: modules.map(m => ({ name: m.name, url: m.name + '.html' })),
        types: types.map(t => ({ name: t, url: t + '.html' }))
    };

    const script = scriptTemplate.replace(
        '{{NAVIGATION_DATA}}',
        JSON.stringify(navigationData, null, 2)
    );

    const outputPath = path.join(OUTPUT_DIR, 'script.js');
    fs.writeFileSync(outputPath, script);
    console.log(`  ✓ Generated script.js`);
}

/**
 * Generate CSS
 */
function generateCSS() {
    const outputPath = path.join(OUTPUT_DIR, 'styles.css');
    fs.writeFileSync(outputPath, cssTemplate);
    console.log(`  ✓ Generated styles.css`);
}

/**
 * Main execution
 */
function main() {
    console.log('Generating Hammerspoon 2 HTML Documentation...\n');

    // Load templates
    loadTemplates();

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
