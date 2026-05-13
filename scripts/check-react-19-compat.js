const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const sourceRoots = [
  'packages/big-design/src',
  'packages/big-design-icons/src',
  'packages/big-design-patterns/src',
  'packages/big-design-theme/src',
];

const ignoredPathSegments = [`${path.sep}__snapshots__${path.sep}`, `${path.sep}dist${path.sep}`];
const sourceExtensions = new Set(['.ts', '.tsx']);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredPathSegments.some((segment) => fullPath.includes(segment))) {
        walk(fullPath, files);
      }

      continue;
    }

    if (sourceExtensions.has(path.extname(entry.name)) && !entry.name.includes('.spec.')) {
      files.push(fullPath);
    }
  }

  return files;
}

function toRelative(file) {
  return path.relative(repoRoot, file);
}

function getLineNumber(source, index) {
  return source.slice(0, index).split('\n').length;
}

function skipString(source, index, quote) {
  let cursor = index + 1;

  while (cursor < source.length) {
    if (source[cursor] === '\\') {
      cursor += 2;
      continue;
    }

    if (source[cursor] === quote) {
      return cursor + 1;
    }

    cursor += 1;
  }

  return source.length;
}

function skipLineComment(source, index) {
  const end = source.indexOf('\n', index + 2);

  return end === -1 ? source.length : end + 1;
}

function skipBlockComment(source, index) {
  const end = source.indexOf('*/', index + 2);

  return end === -1 ? source.length : end + 2;
}

function findExpressionEnd(source, index) {
  let cursor = index;
  let depth = 1;

  while (cursor < source.length) {
    const char = source[cursor];
    const next = source[cursor + 1];

    if (char === '"' || char === "'") {
      cursor = skipString(source, cursor, char);
      continue;
    }

    if (char === '`') {
      const templateEnd = findTemplateEnd(source, cursor);

      cursor = templateEnd === -1 ? source.length : templateEnd + 1;
      continue;
    }

    if (char === '/' && next === '/') {
      cursor = skipLineComment(source, cursor);
      continue;
    }

    if (char === '/' && next === '*') {
      cursor = skipBlockComment(source, cursor);
      continue;
    }

    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;

      if (depth === 0) {
        return cursor;
      }
    }

    cursor += 1;
  }

  return -1;
}

function findTemplateEnd(source, index) {
  let cursor = index + 1;

  while (cursor < source.length) {
    const char = source[cursor];

    if (char === '\\') {
      cursor += 2;
      continue;
    }

    if (char === '`') {
      return cursor;
    }

    if (char === '$' && source[cursor + 1] === '{') {
      const expressionEnd = findExpressionEnd(source, cursor + 2);

      cursor = expressionEnd === -1 ? source.length : expressionEnd + 1;
      continue;
    }

    cursor += 1;
  }

  return -1;
}

function findTagStart(source, templateStart) {
  const searchStart = Math.max(0, templateStart - 1200);
  const beforeTemplate = source.slice(searchStart, templateStart);
  const candidates = [...beforeTemplate.matchAll(/\b(?:styled|createGlobalStyle)\b/g)];

  for (let index = candidates.length - 1; index >= 0; index -= 1) {
    const candidate = candidates[index];
    const tag = beforeTemplate.slice(candidate.index);

    if (tag.includes(';')) {
      continue;
    }

    return searchStart + candidate.index;
  }

  return -1;
}

function findStyledTemplates(source) {
  const templates = [];
  let cursor = 0;

  while (cursor < source.length) {
    const templateStart = source.indexOf('`', cursor);

    if (templateStart === -1) {
      break;
    }

    const templateEnd = findTemplateEnd(source, templateStart);

    if (templateEnd === -1) {
      break;
    }

    const tagStart = findTagStart(source, templateStart);

    if (tagStart !== -1) {
      templates.push({
        body: source.slice(templateStart + 1, templateEnd),
        index: tagStart,
        tag: source.slice(tagStart, templateStart),
      });
    }

    cursor = templateEnd + 1;
  }

  return templates;
}

function hasDefaultThemeFallback(template) {
  return (
    /\.attrs\s*\(\s*withDefaultTheme\s*,?\s*\)/.test(template.tag) ||
    /withDefaultTheme\s*\(/.test(template.body)
  );
}

const violations = [];
const themeReadPattern =
  /theme\.(?:border|borderRadius|breakpointValues|breakpoints|colors|helpers|keyframes|lineHeight|shadow|spacing|typography|zIndex)/;

for (const root of sourceRoots) {
  for (const file of walk(path.join(repoRoot, root))) {
    const source = fs.readFileSync(file, 'utf8');
    const relativeFile = toRelative(file);

    if (/\b[A-Za-z_$][\w$]*\.defaultProps\s*=/.test(source)) {
      violations.push(`${relativeFile}: runtime defaultProps assignment`);
    }

    if (/\.attrs\(\s*\{\s*theme:\s*defaultTheme\s*\}/.test(source)) {
      violations.push(`${relativeFile}: static defaultTheme attrs assignment`);
    }

    for (const template of findStyledTemplates(source)) {
      if (themeReadPattern.test(template.body) && !hasDefaultThemeFallback(template)) {
        violations.push(
          `${relativeFile}:${getLineNumber(
            source,
            template.index,
          )}: styled theme read without default theme fallback helper`,
        );
      }
    }
  }
}

if (violations.length > 0) {
  console.error('React 19 compatibility check failed:');

  for (const violation of violations) {
    console.error(`- ${violation}`);
  }

  process.exit(1);
}

console.log('React 19 compatibility check passed.');
