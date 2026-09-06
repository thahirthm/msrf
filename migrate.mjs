import fs from 'fs';
import path from 'path';

const appDir = path.join(process.cwd(), 'src/app');

function processFile(filePath) {
    if (!fs.statSync(filePath).isFile() || !filePath.endsWith('.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf-8');

    // Add "use client"
    if (!content.includes('"use client"') && !content.includes("'use client'")) {
        content = '"use client";\n\n' + content;
    }

    // Replace Link import
    content = content.replace(/import\s+\{[^}]*Link[^}]*\}\s+from\s+["']@tanstack\/react-router["'];?/g, (match) => {
        // Since Link is usually imported with other things, it's safer to just replace all @tanstack imports
        return match; 
    });

    // Remove createFileRoute block
    content = content.replace(/export\s+const\s+Route\s*=\s*createFileRoute\([^)]*\)\s*\(\{\s*(?:[^}]*|(?:\s*head:[^{]*\{[^}]*\},\s*)*)component:\s*([A-Za-z0-9_]+),?\s*\}\);\s*/g, (match, componentName) => {
        return `export default ${componentName};\n`;
    });
    
    // There might be head objects which contain meta, links, etc. Let's just do a simpler regex.
    // export const Route = createFileRoute(...)({ ... component: ComponentName })
    // We can just extract the component name by matching `component: Name`
    const componentMatch = content.match(/component:\s*([A-Za-z0-9_]+)/);
    if (componentMatch) {
        const compName = componentMatch[1];
        // Replace the entire export const Route = ... until the end of the statement
        content = content.replace(/export\s+const\s+Route\s*=\s*createFileRoute[\s\S]*\}\);/m, `export default ${compName};`);
    }

    // Replace @tanstack/react-router imports
    content = content.replace(/import\s+\{([^}]*)\}\s+from\s+['"]@tanstack\/react-router['"];/g, (match, imports) => {
        const importList = imports.split(',').map(i => i.trim());
        let newImports = [];
        if (importList.includes('Link')) {
            newImports.push(`import Link from 'next/link';`);
        }
        if (importList.includes('useRouter') || importList.includes('useNavigate')) {
            newImports.push(`import { useRouter } from 'next/navigation';`);
        }
        return newImports.join('\n');
    });

    // Replace useNavigate() with useRouter()
    content = content.replace(/useNavigate\(\)/g, 'useRouter()');

    fs.writeFileSync(filePath, content, 'utf-8');
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else {
            processFile(fullPath);
        }
    }
}

traverseDir(appDir);
