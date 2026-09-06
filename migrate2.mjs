import fs from 'fs';
import path from 'path';

function addUseClientToDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            addUseClientToDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf-8');
            // Check if it already has "use client"
            if (!content.includes('"use client"') && !content.includes("'use client'")) {
                // If it imports from react or uses hooks/events, let's just make it a client component
                // to avoid SSR issues with this migrated SPA.
                if (fullPath.endsWith('.tsx')) {
                    fs.writeFileSync(fullPath, '"use client";\n\n' + content, 'utf-8');
                }
            }
        }
    }
}

addUseClientToDir(path.join(process.cwd(), 'src/components'));
addUseClientToDir(path.join(process.cwd(), 'src/hooks'));
addUseClientToDir(path.join(process.cwd(), 'src/lib'));
