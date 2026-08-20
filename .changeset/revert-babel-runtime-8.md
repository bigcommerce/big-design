---
"@bigcommerce/big-design": patch
"@bigcommerce/big-design-icons": patch
"@bigcommerce/big-design-patterns": patch
"@bigcommerce/big-design-theme": patch
---

Revert `@babel/runtime` (and the matching Babel 7.x build toolchain used to compile these packages) back from `^8.0.0` to `^7.26.10`. Shipping `@babel/runtime@^8.0.0` as a regular dependency forces that requirement onto every consumer's own dependency resolution; Babel 8 dropped the `./regenerator` export subpath, which crashes any consumer still Babel-transpiling (not using SWC) for pre-native-generator targets on 100% of routes. Found via the LTRAC-1370 packed-tarball smoke test against a real Next.js + Babel consumer.
