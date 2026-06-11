#!/usr/bin/env python3
"""
Remove 'sections' arrays from child-services-seo.ts
The SeoContentSectionV1Props interface doesn't support sections property
"""

import re

# Read the file
with open('data/fontanero/child-services-seo.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to match sections array with all its content
# This matches from "sections: [" to the matching "]," including nested arrays
pattern = r',\s*sections:\s*\[\s*\{[^}]*?title:[^}]*?content:\s*\[[^\]]*?\][^}]*?\}(?:\s*,\s*\{[^}]*?title:[^}]*?content:\s*\[[^\]]*?\][^}]*?\})*\s*\],'

# Remove all sections arrays
fixed_content = re.sub(pattern, ',', content, flags=re.DOTALL)

# Write back
with open('data/fontanero/child-services-seo.ts', 'w', encoding='utf-8') as f:
    f.write(fixed_content)

print("✓ Removed all 'sections' arrays from child-services-seo.ts")
