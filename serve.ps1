$ErrorActionPreference = "Stop"

# Build Nuxt files
Set-Location .\website
npm install
npm run build
Set-Location ../functions
npm install
Set-Location ..

# Copy generated static assets to /public folder
Copy-Item -Recurse -Force .\functions\.website\dist\client\* .\public
Copy-Item -Recurse -Force .\functions\.website\dist\server\* .\public
Copy-Item .\website\nuxt.config.js .\functions\website.nuxt.config.js
Copy-Item -Recurse -Force .\website\static\* .\public

# Run the local firebase emulator
# TODO(kinggoesgaming): Add Firestore later as the need rises
firebase serve --only "hosting,functions"

