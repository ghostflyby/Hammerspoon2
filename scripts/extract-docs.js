#!/usr/bin/env node

/**
 * Documentation Extraction Script for Hammerspoon 2
 * 
 * This script extracts API documentation from:
 * 1. Swift JSExport protocols (from .swift files)
 * 2. JSDoc comments (from .js files)
 * 
 * It combines the documentation by module and outputs:
 * - JSON files with structured API data
 * - Combined JavaScript files suitable for JSDoc HTML generation
 */

const fs = require('fs');
const path = require('path');

const MODULES_DIR = path.join(__dirname, '..', 'Hammerspoon 2', 'Modules');
const OUTPUT_JSON_DIR = path.join(__dirname, '..', 'docs', 'json');
const OUTPUT_COMBINED_DIR = path.join(OUTPUT_JSON_DIR, 'combined');

/**
 * Parse Swift file to extract JSExport protocol information
 */
function parseSwiftFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const protocols = [];
    
    // Find all @objc protocol definitions that extend JSExport
    const protocolRegex = /@objc\s+protocol\s+(\w+)\s*:\s*JSExport\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/gs;
    let match;
    
    while ((match = protocolRegex.exec(content)) !== null) {
        const protocolName = match[1];
        const protocolBody = match[2];
        
        const protocol = {
            name: protocolName,
            type: 'protocol',
            methods: [],
            properties: []
        };
        
        // Extract doc comments and method/property signatures
        const lines = protocolBody.split('\n');
        let currentDoc = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Collect documentation comments
            if (line.startsWith('///')) {
                currentDoc.push(line.replace(/^\/\/\/\s*/, ''));
                continue;
            }
            
            // Skip empty lines
            if (!line) {
                continue;
            }
            
            // Parse @objc methods
            if (line.startsWith('@objc')) {
                const methodMatch = line.match(/@objc(?:\([^)]*\))?\s+(?:func\s+(\w+)|var\s+(\w+))/);
                if (methodMatch) {
                    if (methodMatch[1]) {
                        // It's a method
                        const methodName = methodMatch[1];
                        let fullSignature = line;
                        
                        // Handle multi-line method signatures - look for the closing )
                        let j = i;
                        let parenDepth = 0;
                        let foundStart = false;
                        
                        // Count parentheses to find the end of the method signature
                        for (let k = 0; k < line.length; k++) {
                            if (line[k] === '(') {
                                parenDepth++;
                                foundStart = true;
                            } else if (line[k] === ')') {
                                parenDepth--;
                            }
                        }
                        
                        // Continue reading lines if we haven't closed all parentheses
                        while (foundStart && parenDepth > 0 && j + 1 < lines.length) {
                            j++;
                            const nextLine = lines[j].trim();
                            fullSignature += ' ' + nextLine;
                            
                            for (let k = 0; k < nextLine.length; k++) {
                                if (nextLine[k] === '(') parenDepth++;
                                else if (nextLine[k] === ')') parenDepth--;
                            }
                        }
                        
                        // If there's a return type arrow, capture up to the return type
                        if (fullSignature.includes('->')) {
                            // Continue until we find a type that ends the signature
                            while (j + 1 < lines.length) {
                                const nextLine = lines[j + 1].trim();
                                // Stop if we hit another @objc or empty line
                                if (nextLine.startsWith('@objc') || nextLine.startsWith('///') || !nextLine) {
                                    break;
                                }
                                // Stop if the line seems to be starting a new declaration
                                if (nextLine.match(/^(var|func|@)/)) {
                                    break;
                                }
                                j++;
                                fullSignature += ' ' + nextLine;
                                // If we hit a complete type (ends with something like ']' or '?' or a word)
                                if (nextLine.match(/[\w\?\]\>]$/)) {
                                    break;
                                }
                            }
                        }
                        
                        // Clean up the signature - remove everything after the return type
                        fullSignature = fullSignature.replace(/@objc(?:\([^)]*\))?\s*/, '').trim();
                        
                        // Try to extract just the function signature without trailing junk
                        const cleanSigMatch = fullSignature.match(/(func\s+\w+[^@]*?)(?=\s*@|$)/);
                        if (cleanSigMatch) {
                            fullSignature = cleanSigMatch[1].trim();
                        }
                        
                        protocol.methods.push({
                            name: methodName,
                            signature: fullSignature,
                            documentation: currentDoc.join('\n'),
                            params: extractParams(fullSignature),
                            returns: extractReturns(fullSignature, currentDoc)
                        });
                        
                        // Move i forward if we read multiple lines
                        i = j;
                    } else if (methodMatch[2]) {
                        // It's a property
                        const propName = methodMatch[2];
                        protocol.properties.push({
                            name: propName,
                            signature: line.replace(/@objc\s*/, ''),
                            documentation: currentDoc.join('\n')
                        });
                    }
                    currentDoc = [];
                }
            }
        }
        
        protocols.push(protocol);
    }
    
    return protocols;
}

/**
 * Extract parameters from a Swift function signature
 */
function extractParams(signature) {
    const params = [];
    const funcMatch = signature.match(/func\s+\w+\s*\(([^)]*)\)/);
    if (!funcMatch) return params;
    
    const paramsStr = funcMatch[1];
    if (!paramsStr.trim()) return params;
    
    // Split by comma, but be careful of nested generics/closures
    const parts = splitParams(paramsStr);
    
    for (const part of parts) {
        const paramMatch = part.match(/(?:_\s+)?(\w+)\s*:\s*([^=]+)/);
        if (paramMatch) {
            params.push({
                name: paramMatch[1],
                type: paramMatch[2].trim()
            });
        }
    }
    
    return params;
}

/**
 * Split parameter string by commas, respecting nested structures
 */
function splitParams(str) {
    const parts = [];
    let current = '';
    let depth = 0;
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === '(' || char === '[' || char === '<') {
            depth++;
        } else if (char === ')' || char === ']' || char === '>') {
            depth--;
        } else if (char === ',' && depth === 0) {
            parts.push(current.trim());
            current = '';
            continue;
        }
        current += char;
    }
    
    if (current.trim()) {
        parts.push(current.trim());
    }
    
    return parts;
}

/**
 * Extract return type from Swift function signature
 */
function extractReturns(signature, docLines) {
    // Match return type - handle arrays, dictionaries, optionals, and complex types
    // Matches: -> Type, -> [Type], -> [Key: Value], -> Type?
    const returnMatch = signature.match(/->\s*(.+?)(?=\s*(?:@|$|\/\/|\{))/);
    if (returnMatch) {
        return {
            type: returnMatch[1].trim(),
            description: docLines.find(line => line.includes('Returns:'))?.replace(/.*Returns:\s*/, '') || ''
        };
    }
    return null;
}

/**
 * Parse JavaScript file to extract JSDoc comments and function definitions
 */
function parseJavaScriptFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const functions = [];
    
    // Match JSDoc comments followed by function definitions
    const jsdocRegex = /\/\*\*([^*]*(?:\*(?!\/)[^*]*)*)\*\/\s*(?:(\w+(?:\.\w+)*)\s*=\s*function\s*\(([^)]*)\)|function\s+(\w+)\s*\(([^)]*)\))/g;
    let match;
    
    while ((match = jsdocRegex.exec(content)) !== null) {
        const docComment = match[1];
        const functionName = match[2] || match[4];
        const params = match[3] || match[5];
        
        if (functionName) {
            functions.push({
                name: functionName,
                params: params.split(',').map(p => p.trim()).filter(p => p),
                documentation: parseJSDoc(docComment),
                type: 'function'
            });
        }
    }
    
    // Also match simple assignments without JSDoc (for coverage)
    const simpleRegex = /(?:^|\n)(?!\/\*\*)(\w+(?:\.\w+)*)\s*=\s*function\s*\(([^)]*)\)/g;
    while ((match = simpleRegex.exec(content)) !== null) {
        const functionName = match[1];
        const params = match[2];
        
        // Only add if not already captured by JSDoc regex
        if (!functions.find(f => f.name === functionName)) {
            functions.push({
                name: functionName,
                params: params.split(',').map(p => p.trim()).filter(p => p),
                documentation: { description: '', params: [], returns: null },
                type: 'function'
            });
        }
    }
    
    return functions;
}

/**
 * Parse JSDoc comment into structured data
 */
function parseJSDoc(docText) {
    const lines = docText.split('\n').map(line => line.replace(/^\s*\*\s?/, '').trim());
    
    const doc = {
        description: '',
        params: [],
        returns: null,
        examples: []
    };
    
    let currentSection = 'description';
    let descLines = [];
    
    for (const line of lines) {
        if (line.startsWith('@param')) {
            currentSection = 'param';
            const paramMatch = line.match(/@param\s+(?:\{([^}]+)\}\s+)?(\w+)\s*(.*)/);
            if (paramMatch) {
                doc.params.push({
                    name: paramMatch[2],
                    type: paramMatch[1] || 'any',
                    description: paramMatch[3]
                });
            }
        } else if (line.startsWith('@returns') || line.startsWith('@return')) {
            currentSection = 'returns';
            const returnMatch = line.match(/@returns?\s+(?:\{([^}]+)\}\s+)?(.*)/);
            if (returnMatch) {
                doc.returns = {
                    type: returnMatch[1] || 'any',
                    description: returnMatch[2]
                };
            }
        } else if (line.startsWith('@example')) {
            currentSection = 'example';
        } else if (currentSection === 'description' && line) {
            descLines.push(line);
        } else if (currentSection === 'example' && line) {
            doc.examples.push(line);
        }
    }
    
    doc.description = descLines.join(' ');
    
    return doc;
}

/**
 * Convert Swift type to JSDoc-compatible type
 */
function swiftTypeToJSDoc(swiftType) {
    // Remove optional marker
    let type = swiftType.replace(/\?$/, '');
    
    // Convert Swift array syntax to JSDoc array syntax
    // [Type] -> Array<Type>
    const arrayMatch = type.match(/^\[([^\]:]+)\]$/);
    if (arrayMatch) {
        return `Array<${arrayMatch[1]}>`;
    }
    
    // Convert Swift dictionary syntax if needed
    // [Key: Value] -> Object<Key, Value>
    const dictMatch = type.match(/^\[([^:]+):\s*([^\]]+)\]$/);
    if (dictMatch) {
        return `Object<${dictMatch[1].trim()}, ${dictMatch[2].trim()}>`;
    }
    
    // Map common Swift types to JS types
    const typeMap = {
        'String': 'string',
        'Int': 'number',
        'Double': 'number',
        'Float': 'number',
        'Bool': 'boolean',
        'TimeInterval': 'number',
        'UInt32': 'number',
        'Any': '*'
    };
    
    return typeMap[type] || type;
}

/**
 * Escape JavaScript keywords in function names
 */
function escapeFunctionName(name) {
    const keywords = ['new', 'delete', 'default', 'function', 'class', 'var', 'let', 'const'];
    if (keywords.includes(name)) {
        return `_${name}`;
    }
    return name;
}

/**
 * Process a module directory
 */
function processModule(moduleName, modulePath) {
    console.log(`Processing module: ${moduleName}`);
    
    const moduleData = {
        name: moduleName,
        swift: {
            protocols: [],
            objects: []
        },
        javascript: {
            functions: []
        }
    };
    
    // Find all Swift and JavaScript files in the module directory
    const files = fs.readdirSync(modulePath);
    
    for (const file of files) {
        const filePath = path.join(modulePath, file);
        
        if (file.endsWith('.swift')) {
            const protocols = parseSwiftFile(filePath);
            
            // Categorize as Module or Object based on naming convention
            if (file.includes('Module.swift')) {
                moduleData.swift.protocols.push(...protocols.map(p => ({ ...p, category: 'module' })));
            } else if (file.includes('Object.swift')) {
                moduleData.swift.protocols.push(...protocols.map(p => ({ ...p, category: 'object' })));
            } else {
                moduleData.swift.protocols.push(...protocols);
            }
        } else if (file.endsWith('.js')) {
            const functions = parseJavaScriptFile(filePath);
            moduleData.javascript.functions.push(...functions);
        }
    }
    
    return moduleData;
}

/**
 * Format DocC documentation to JSDoc format
 * Converts Apple's DocC format (- Parameters:, - Returns:) to clean descriptions
 */
function formatDocCToJSDoc(documentation) {
    if (!documentation) return '';
    
    const lines = documentation.split('\n');
    const result = [];
    let inParamsList = false;
    
    for (const line of lines) {
        const trimmed = line.trim();
        
        // Skip parameter list headers and individual parameter lines
        if (trimmed === '- Parameters:' || trimmed.startsWith('- Parameters:')) {
            inParamsList = true;
            continue;
        }
        
        // Skip returns line (we handle this separately)
        if (trimmed.startsWith('- Returns:')) {
            break;
        }
        
        // Skip individual parameter documentation (starts with "- paramName:")
        if (inParamsList && trimmed.match(/^-\s+\w+:/)) {
            continue;
        }
        
        // If we hit a non-parameter line, we're out of the params list
        if (inParamsList && !trimmed.startsWith('-')) {
            inParamsList = false;
        }
        
        // Skip Note: lines for now (could be added as @note in future)
        if (trimmed.startsWith('- Note:')) {
            continue;
        }
        
        // Keep the main description line
        if (!trimmed.startsWith('-') && trimmed) {
            result.push(trimmed);
        }
    }
    
    return result.join(' ');
}

/**
 * Generate combined JSDoc-compatible file for a module
 */
function generateCombinedJSDoc(moduleData) {
    // Create namespace using bracket notation for names with dots
    const namespaceVar = moduleData.name.includes('.') 
        ? `globalThis['${moduleData.name}']` 
        : moduleData.name;
    
    let output = `/**\n * @namespace ${moduleData.name}\n */\n`;
    output += `${namespaceVar} = {};\n\n`;
    
    // Add Swift protocol methods as JSDoc
    for (const protocol of moduleData.swift.protocols) {
        // Add methods
        for (const method of protocol.methods) {
            const cleanDoc = formatDocCToJSDoc(method.documentation);
            const escapedName = escapeFunctionName(method.name);
            
            output += `/**\n`;
            if (cleanDoc) {
                output += ` * ${cleanDoc}\n`;
                output += ` *\n`;
            }
            for (const param of method.params) {
                output += ` * @param {${swiftTypeToJSDoc(param.type)}} ${param.name}\n`;
            }
            if (method.returns) {
                const returnDesc = method.returns.description || '';
                output += ` * @returns {${swiftTypeToJSDoc(method.returns.type)}}${returnDesc ? ' ' + returnDesc : ''}\n`;
            }
            output += ` */\n`;
            output += `${moduleData.name}.${escapedName} = function(${method.params.map(p => p.name).join(', ')}) {};\n\n`;
        }
        
        // Add properties
        for (const prop of protocol.properties) {
            const cleanDoc = formatDocCToJSDoc(prop.documentation);
            
            output += `/**\n`;
            if (cleanDoc) {
                output += ` * ${cleanDoc}\n`;
            }
            output += ` * @type {*}\n`;
            output += ` */\n`;
            output += `${moduleData.name}.${prop.name};\n\n`;
        }
    }
    
    // Add JavaScript functions
    for (const func of moduleData.javascript.functions) {
        output += `/**\n`;
        if (func.documentation && func.documentation.description) {
            output += ` * ${func.documentation.description}\n`;
            output += ` *\n`;
        }
        if (func.documentation && func.documentation.params) {
            for (const param of func.documentation.params) {
                const desc = param.description ? ' ' + param.description : '';
                output += ` * @param {${param.type}} ${param.name}${desc}\n`;
            }
        }
        if (func.documentation && func.documentation.returns) {
            const desc = func.documentation.returns.description ? ' ' + func.documentation.returns.description : '';
            output += ` * @returns {${func.documentation.returns.type}}${desc}\n`;
        }
        if (func.documentation && func.documentation.examples && func.documentation.examples.length > 0) {
            output += ` * @example\n`;
            for (const example of func.documentation.examples) {
                output += ` * ${example}\n`;
            }
        }
        output += ` */\n`;
        output += `${func.name} = function(${func.params.join(', ')}) {};\n\n`;
    }
    
    return output;
}

/**
 * Main execution
 */
function main() {
    console.log('Extracting Hammerspoon 2 API Documentation...\n');
    
    // Ensure output directories exist
    if (!fs.existsSync(OUTPUT_JSON_DIR)) {
        fs.mkdirSync(OUTPUT_JSON_DIR, { recursive: true });
    }
    if (!fs.existsSync(OUTPUT_COMBINED_DIR)) {
        fs.mkdirSync(OUTPUT_COMBINED_DIR, { recursive: true });
    }
    
    // Find all module directories
    const moduleDirs = fs.readdirSync(MODULES_DIR)
        .filter(name => name.startsWith('hs.'))
        .filter(name => fs.statSync(path.join(MODULES_DIR, name)).isDirectory());
    
    const allModules = [];
    
    for (const moduleName of moduleDirs) {
        const modulePath = path.join(MODULES_DIR, moduleName);
        const moduleData = processModule(moduleName, modulePath);
        
        allModules.push(moduleData);
        
        // Save individual module JSON
        const jsonPath = path.join(OUTPUT_JSON_DIR, `${moduleName}.json`);
        fs.writeFileSync(jsonPath, JSON.stringify(moduleData, null, 2));
        console.log(`  ✓ Saved JSON: ${jsonPath}`);
        
        // Save combined JSDoc file
        const combinedJSDoc = generateCombinedJSDoc(moduleData);
        const combinedPath = path.join(OUTPUT_COMBINED_DIR, `${moduleName}.js`);
        fs.writeFileSync(combinedPath, combinedJSDoc);
        console.log(`  ✓ Saved combined: ${combinedPath}`);
    }
    
    // Save index of all modules
    const indexPath = path.join(OUTPUT_JSON_DIR, 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify({
        modules: allModules.map(m => ({
            name: m.name,
            swiftProtocols: m.swift.protocols.length,
            javascriptFunctions: m.javascript.functions.length
        })),
        generatedAt: new Date().toISOString()
    }, null, 2));
    console.log(`\n✓ Saved module index: ${indexPath}`);
    
    console.log(`\n✅ Documentation extraction complete!`);
    console.log(`   - Processed ${allModules.length} modules`);
    console.log(`   - JSON files: docs/json/`);
    console.log(`   - Combined JSDoc: docs/json/combined/`);
}

main();
