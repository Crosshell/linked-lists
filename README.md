# linked-lists
## List Data Structures Implementation

### This project provides two implementations of a list data structure:
1. Array-based list - using TypeScript arrays
2. Circular linked list - using nodes with circular references

### Both implementations support core list operations:
- Insertion/deletion by index
- Search operations
- List reversal
- Cloning
- Merging lists

---
## Variant Information
### Group list number is 2
**Remainder = 2 mod 4 = 2**

Implementation of two alternative list representations with full CRUD operations and circular reference management for the linked version

---
## Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) installed. Then, clone the repository and install dependencies:
```bash
git clone https://github.com/Crosshell/linked-lists
cd linked-lists
npm install
```

## Building the Project
Compile TypeScript to JavaScript:
```bash
npm run build
```

## Running Tests
Execute test suite:
```bash
npm test
```

---
## Failed CI commit:

https://github.com/Crosshell/linked-lists/commit/de2d6a75e52962484d3715d946a5d5e69598c52b

## Conclusions  
This project fundamentally changed my perspective on software development practices. Implementing unit tests proved invaluable—not only did they catch several critical issues early, but they also simplified debugging by isolating failures. Setting up CI/CD became a revelation: automated quality checks after each commit prevented broken code from progressing and highlighted integration problems I might have missed locally.

While writing tests initially felt time-consuming, seeing them catch regressions during refactoring demonstrated their true value. Today, I view tests not as overhead, but as a safety net enabling fearless code improvements. Combined with CI’s instant feedback loop, these practices have shifted my approach to coding—from hoping things work to systematically ensuring they do. This experience solidified why testing and automation aren’t just “nice-to-haves” but essential pillars of reliable software.