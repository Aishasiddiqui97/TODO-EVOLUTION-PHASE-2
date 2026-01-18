/**
 * Simple test script to verify the frontend structure is correct.
 * This checks that key files exist and have the expected basic structure.
 */

const fs = require('fs');
const path = require('path');

function testFrontendStructure() {
    console.log('Testing frontend structure...\n');

    const requiredFiles = [
        'package.json',
        'tsconfig.json',
        'next.config.js',
        'postcss.config.js',
        'tailwind.config.js',
        'src/app/page.tsx',
        'src/app/layout.tsx',
        'src/app/(auth)/sign-up/page.tsx',
        'src/app/(auth)/sign-in/page.tsx',
        'src/app/todos/page.tsx',
        'src/lib/api.ts',
        'src/lib/auth.ts',
        'src/lib/types.ts'
    ];

    let allPassed = true;

    requiredFiles.forEach(file => {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            console.log(`[OK] ${file} exists`);

            // Check if it's a non-empty file
            const stat = fs.statSync(filePath);
            if (stat.size === 0) {
                console.log(`[WARN] ${file} is empty`);
            }
        } else {
            console.log(`[ERROR] ${file} does not exist`);
            allPassed = false;
        }
    });

    console.log('\nChecking package.json contents...');
    const packageJsonPath = path.join(__dirname, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        try {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            if (packageJson.dependencies && packageJson.dependencies.next) {
                console.log('[OK] package.json has Next.js dependency');
            } else {
                console.log('[ERROR] package.json missing Next.js dependency');
                allPassed = false;
            }
        } catch (e) {
            console.log('[ERROR] package.json is not valid JSON');
            allPassed = false;
        }
    }

    console.log('\nChecking TypeScript config...');
    const tsConfigPath = path.join(__dirname, 'tsconfig.json');
    if (fs.existsSync(tsConfigPath)) {
        try {
            const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
            if (tsConfig.compilerOptions && tsConfig.compilerOptions.jsx) {
                console.log('[OK] tsconfig.json has JSX configuration');
            } else {
                console.log('[WARN] tsconfig.json may be missing JSX configuration');
            }
        } catch (e) {
            console.log('[ERROR] tsconfig.json is not valid JSON');
            allPassed = false;
        }
    }

    return allPassed;
}

if (require.main === module) {
    const success = testFrontendStructure();

    if (success) {
        console.log('\n[SUCCESS] Frontend structure verification completed successfully!');
        console.log('All required files exist and basic structure is correct.');
    } else {
        console.log('\n[ERROR] Frontend structure verification failed!');
        process.exit(1);
    }
}

module.exports = testFrontendStructure;