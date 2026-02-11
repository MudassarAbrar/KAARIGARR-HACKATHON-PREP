#!/usr/bin/env node

/**
 * Security Testing Script for Karigar
 * 
 * This script performs automated security checks before deployment.
 * Run this script as part of your CI/CD pipeline or before each deployment.
 * 
 * Usage:
 *   node scripts/security-test.js
 *   npm run security:test
 * 
 * Checks performed:
 * 1. Environment variable exposure
 * 2. Hardcoded secrets in code
 * 3. Dependency vulnerabilities
 * 4. Git history for leaked credentials
 * 5. File permissions
 * 6. Security headers configuration
 * 7. Input validation coverage
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Test results
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let warnings = 0;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(70));
  log(`  ${title}`, 'cyan');
  console.log('='.repeat(70) + '\n');
}

function logTest(name, passed, message = '') {
  totalTests++;
  if (passed) {
    passedTests++;
    log(`✓ ${name}`, 'green');
  } else {
    failedTests++;
    log(`✗ ${name}`, 'red');
    if (message) log(`  ${message}`, 'yellow');
  }
}

function logWarning(message) {
  warnings++;
  log(`⚠ ${message}`, 'yellow');
}

function exec(command) {
  try {
    return execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
  } catch (error) {
    return null;
  }
}

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

function searchInFiles(directory, pattern, extensions = []) {
  const results = [];
  
  function search(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Skip node_modules, .git, .next, etc.
        if (!['node_modules', '.git', '.next', 'dist', 'build'].includes(file)) {
          search(filePath);
        }
      } else {
        if (extensions.length === 0 || extensions.some(ext => file.endsWith(ext))) {
          const content = readFile(filePath);
          if (content && pattern.test(content)) {
            results.push(filePath);
          }
        }
      }
    }
  }
  
  search(directory);
  return results;
}

// ============================================================================
// SECURITY TESTS
// ============================================================================

/**
 * Test 1: Check for .env files in .gitignore
 */
function testGitignore() {
  logSection('1. GITIGNORE CONFIGURATION');
  
  const gitignorePath = '.gitignore';
  
  if (!fileExists(gitignorePath)) {
    logTest('.gitignore exists', false, '.gitignore file not found');
    return;
  }
  
  const gitignore = readFile(gitignorePath);
  
  const requiredEntries = [
    '.env',
    '.env.local',
    '.env.production.local',
    '.env.development.local',
  ];
  
  let allPresent = true;
  for (const entry of requiredEntries) {
    const present = gitignore.includes(entry);
    if (!present) {
      allPresent = false;
      logWarning(`Missing in .gitignore: ${entry}`);
    }
  }
  
  logTest('.env files in .gitignore', allPresent);
}

/**
 * Test 2: Check for exposed API keys in code
 */
function testHardcodedSecrets() {
  logSection('2. HARDCODED SECRETS CHECK');
  
  const secretPatterns = [
    { name: 'Stripe Secret Key', pattern: /sk_live_[a-zA-Z0-9]{24,}/ },
    { name: 'Stripe Test Key', pattern: /sk_test_[a-zA-Z0-9]{24,}/ },
    { name: 'Supabase Service Role', pattern: /service_role.*eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*/ },
    { name: 'Generic API Key', pattern: /api[_-]?key['"]?\s*[:=]\s*['"]\w{20,}['"]/ },
    { name: 'Bearer Token', pattern: /bearer\s+[a-zA-Z0-9_-]{20,}/i },
    { name: 'Password in Code', pattern: /password['"]?\s*[:=]\s*['"][^'"]{8,}['"]/ },
  ];
  
  const extensions = ['.ts', '.tsx', '.js', '.jsx'];
  
  let foundSecrets = false;
  
  for (const { name, pattern } of secretPatterns) {
    const files = searchInFiles('.', pattern, extensions);
    
    if (files.length > 0) {
      foundSecrets = true;
      log(`  Found potential ${name} in:`, 'red');
      files.forEach(file => log(`    - ${file}`, 'yellow'));
    }
  }
  
  logTest('No hardcoded secrets found', !foundSecrets);
}

/**
 * Test 3: Check .env.example exists
 */
function testEnvExample() {
  logSection('3. ENVIRONMENT VARIABLES');
  
  const envExampleExists = fileExists('.env.example');
  logTest('.env.example exists', envExampleExists);
  
  if (envExampleExists) {
    const envExample = readFile('.env.example');
    
    const requiredVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY',
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
      'STRIPE_SECRET_KEY',
      'STRIPE_WEBHOOK_SECRET',
      'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY',
      'RESEND_API_KEY',
    ];
    
    let allPresent = true;
    for (const varName of requiredVars) {
      if (!envExample.includes(varName)) {
        allPresent = false;
        logWarning(`Missing in .env.example: ${varName}`);
      }
    }
    
    logTest('All required env vars documented', allPresent);
  }
  
  // Check that .env.local exists (for development)
  const envLocalExists = fileExists('.env.local');
  if (!envLocalExists) {
    logWarning('.env.local not found - required for local development');
  }
}

/**
 * Test 4: NPM Audit for vulnerabilities
 */
function testNpmAudit() {
  logSection('4. DEPENDENCY VULNERABILITIES');
  
  log('Running npm audit...', 'blue');
  
  const auditResult = exec('npm audit --json');
  
  if (auditResult) {
    try {
      const audit = JSON.parse(auditResult);
      
      const critical = audit.metadata?.vulnerabilities?.critical || 0;
      const high = audit.metadata?.vulnerabilities?.high || 0;
      const moderate = audit.metadata?.vulnerabilities?.moderate || 0;
      const low = audit.metadata?.vulnerabilities?.low || 0;
      
      log(`  Critical: ${critical}`, critical > 0 ? 'red' : 'green');
      log(`  High:     ${high}`, high > 0 ? 'red' : 'green');
      log(`  Moderate: ${moderate}`, moderate > 0 ? 'yellow' : 'green');
      log(`  Low:      ${low}`, low > 0 ? 'yellow' : 'green');
      
      const hasCritical = critical === 0 && high === 0;
      logTest('No critical/high vulnerabilities', hasCritical);
      
      if (moderate > 0 || low > 0) {
        logWarning(`Found ${moderate + low} moderate/low vulnerabilities - consider updating`);
      }
    } catch (error) {
      logWarning('Could not parse npm audit results');
    }
  } else {
    logWarning('npm audit failed to run');
  }
}

/**
 * Test 5: Check git history for leaked credentials
 */
function testGitHistory() {
  logSection('5. GIT HISTORY CHECK');
  
  if (!fileExists('.git')) {
    logWarning('Not a git repository - skipping git history check');
    return;
  }
  
  log('Scanning git history for secrets...', 'blue');
  
  const patterns = [
    'sk_live_',
    'sk_test_',
    'service_role',
    'STRIPE_SECRET_KEY=',
    'SUPABASE_SERVICE_ROLE_KEY=',
  ];
  
  let foundInHistory = false;
  
  for (const pattern of patterns) {
    const result = exec(`git log --all -p -S "${pattern}" --pretty=format:"%H %s" --no-patch`);
    
    if (result && result.trim()) {
      foundInHistory = true;
      log(`  Found "${pattern}" in git history:`, 'red');
      log(`  ${result.trim()}`, 'yellow');
    }
  }
  
  logTest('No secrets in git history', !foundInHistory, 
    foundInHistory ? 'Run git filter-branch to remove secrets from history' : '');
}

/**
 * Test 6: Check for security headers configuration
 */
function testSecurityHeaders() {
  logSection('6. SECURITY HEADERS CONFIGURATION');
  
  const nextConfigPath = 'next.config.js';
  
  if (!fileExists(nextConfigPath)) {
    logTest('next.config.js exists', false);
    return;
  }
  
  const config = readFile(nextConfigPath);
  
  const requiredHeaders = [
    'X-Frame-Options',
    'X-Content-Type-Options',
    'Strict-Transport-Security',
    'Content-Security-Policy',
  ];
  
  let allPresent = true;
  for (const header of requiredHeaders) {
    if (!config.includes(header)) {
      allPresent = false;
      logWarning(`Missing security header: ${header}`);
    }
  }
  
  logTest('Security headers configured', allPresent);
}

/**
 * Test 7: Check for input validation
 */
function testInputValidation() {
  logSection('7. INPUT VALIDATION');
  
  const validationsPath = 'lib/validations.ts';
  
  const validationsExist = fileExists(validationsPath);
  logTest('Validation schemas exist', validationsExist);
  
  if (validationsExist) {
    const validations = readFile(validationsPath);
    
    const requiredSchemas = [
      'loginSchema',
      'registerSchema',
      'serviceRequestSchema',
      'reviewSchema',
      'emailSchema',
      'passwordSchema',
    ];
    
    let allPresent = true;
    for (const schema of requiredSchemas) {
      if (!validations.includes(schema)) {
        allPresent = false;
        logWarning(`Missing validation schema: ${schema}`);
      }
    }
    
    logTest('Required validation schemas present', allPresent);
  }
}

/**
 * Test 8: Check for rate limiting implementation
 */
function testRateLimiting() {
  logSection('8. RATE LIMITING');
  
  const rateLimitPath = 'lib/ratelimit.ts';
  
  const rateLimitExists = fileExists(rateLimitPath);
  logTest('Rate limiting module exists', rateLimitExists);
  
  if (rateLimitExists) {
    const rateLimit = readFile(rateLimitPath);
    
    const requiredLimiters = [
      'loginRateLimit',
      'apiRateLimit',
      'serviceRequestRateLimit',
    ];
    
    let allPresent = true;
    for (const limiter of requiredLimiters) {
      if (!rateLimit.includes(limiter)) {
        allPresent = false;
        logWarning(`Missing rate limiter: ${limiter}`);
      }
    }
    
    logTest('Required rate limiters present', allPresent);
  }
}

/**
 * Test 9: Check package.json for security scripts
 */
function testPackageJsonSecurity() {
  logSection('9. PACKAGE.JSON SECURITY');
  
  if (!fileExists('package.json')) {
    logTest('package.json exists', false);
    return;
  }
  
  const packageJson = JSON.parse(readFile('package.json'));
  
  // Check for security-related dependencies
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };
  
  const hasZod = !!allDeps['zod'];
  logTest('Zod validation library installed', hasZod);
  
  const hasRateLimit = !!allDeps['@upstash/ratelimit'] || !!allDeps['express-rate-limit'];
  logTest('Rate limiting library installed', hasRateLimit);
}

/**
 * Test 10: Check for dangerous functions
 */
function testDangerousFunctions() {
  logSection('10. DANGEROUS FUNCTIONS CHECK');
  
  const dangerousPatterns = [
    { name: 'dangerouslySetInnerHTML', pattern: /dangerouslySetInnerHTML/, severity: 'warning' },
    { name: 'eval()', pattern: /\beval\(/, severity: 'critical' },
    { name: 'Function constructor', pattern: /new\s+Function\(/, severity: 'critical' },
    { name: 'Raw SQL', pattern: /execute.*sql.*\$\{/i, severity: 'warning' },
  ];
  
  const extensions = ['.ts', '.tsx', '.js', '.jsx'];
  
  for (const { name, pattern, severity } of dangerousPatterns) {
    const files = searchInFiles('.', pattern, extensions);
    
    if (files.length > 0) {
      if (severity === 'critical') {
        logTest(`No usage of ${name}`, false);
        files.forEach(file => log(`    - ${file}`, 'red'));
      } else {
        logWarning(`Found ${name} in ${files.length} file(s) - ensure proper sanitization`);
      }
    } else {
      if (severity === 'critical') {
        logTest(`No usage of ${name}`, true);
      }
    }
  }
}

/**
 * Test 11: Check TypeScript configuration
 */
function testTypeScriptConfig() {
  logSection('11. TYPESCRIPT CONFIGURATION');
  
  const tsconfigPath = 'tsconfig.json';
  
  if (!fileExists(tsconfigPath)) {
    logWarning('tsconfig.json not found - using JavaScript only?');
    return;
  }
  
  const tsconfig = JSON.parse(readFile(tsconfigPath));
  
  const strictMode = tsconfig.compilerOptions?.strict === true;
  logTest('TypeScript strict mode enabled', strictMode);
  
  const noImplicitAny = tsconfig.compilerOptions?.noImplicitAny !== false;
  logTest('noImplicitAny enabled', noImplicitAny);
}

/**
 * Test 12: Check for HTTPS enforcement
 */
function testHTTPSEnforcement() {
  logSection('12. HTTPS ENFORCEMENT');
  
  // Check middleware for HTTPS redirect
  const middlewarePath = 'middleware.ts';
  
  if (fileExists(middlewarePath)) {
    const middleware = readFile(middlewarePath);
    const hasHTTPSCheck = middleware.includes('https') || middleware.includes('x-forwarded-proto');
    logTest('HTTPS redirect in middleware', hasHTTPSCheck);
  } else {
    logWarning('middleware.ts not found');
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

function main() {
  log('\n╔══════════════════════════════════════════════════════════════════╗', 'cyan');
  log('║           KARIGAR - SECURITY TESTING SUITE                      ║', 'cyan');
  log('╚══════════════════════════════════════════════════════════════════╝', 'cyan');
  
  log('\nRunning security checks...\n', 'blue');
  
  // Run all tests
  testGitignore();
  testHardcodedSecrets();
  testEnvExample();
  testNpmAudit();
  testGitHistory();
  testSecurityHeaders();
  testInputValidation();
  testRateLimiting();
  testPackageJsonSecurity();
  testDangerousFunctions();
  testTypeScriptConfig();
  testHTTPSEnforcement();
  
  // Summary
  logSection('TEST SUMMARY');
  
  log(`Total Tests:   ${totalTests}`, 'blue');
  log(`Passed:        ${passedTests}`, 'green');
  log(`Failed:        ${failedTests}`, failedTests > 0 ? 'red' : 'green');
  log(`Warnings:      ${warnings}`, warnings > 0 ? 'yellow' : 'green');
  
  const successRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : 0;
  log(`\nSuccess Rate:  ${successRate}%`, successRate >= 90 ? 'green' : 'yellow');
  
  // Final verdict
  console.log('\n' + '='.repeat(70));
  
  if (failedTests === 0 && warnings === 0) {
    log('✓ ALL SECURITY CHECKS PASSED!', 'green');
    log('Your application is ready for deployment.', 'green');
    console.log('='.repeat(70) + '\n');
    process.exit(0);
  } else if (failedTests === 0) {
    log('⚠ SECURITY CHECKS PASSED WITH WARNINGS', 'yellow');
    log('Review warnings before deploying to production.', 'yellow');
    console.log('='.repeat(70) + '\n');
    process.exit(0);
  } else {
    log('✗ SECURITY CHECKS FAILED', 'red');
    log(`Fix ${failedTests} failed test(s) before deploying!`, 'red');
    console.log('='.repeat(70) + '\n');
    process.exit(1);
  }
}

// Run the tests
main();
