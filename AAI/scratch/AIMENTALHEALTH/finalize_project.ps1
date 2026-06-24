$source = "C:\Users\sachin\.gemini\antigravity\scratch\AIMENTALHEALTH"
$dest = "C:\Users\sachin\Desktop\AIMENTALHEALTH"

Write-Host "--- Mental Health AI: Finalizing Project ---" -ForegroundColor Cyan

# Force kill any blockers
taskkill /F /IM node.exe /T 2>$null
taskkill /F /IM python.exe /T 2>$null

# Use Robocopy for deep copy
Write-Host "Syncing Project to Desktop..."
robocopy "$source" "$dest" /E /MOVE /V /XD .git node_modules

# Verify
if (Test-Path "$dest\backend\app.py") {
    Write-Host "SUCCESS: Project moved to $dest" -ForegroundColor Green
    Write-Host "Now run: python app.py inside backend" -ForegroundColor Yellow
} else {
    Write-Host "FAILED: Robocopy error. Please manually copy the folder to your Desktop." -ForegroundColor Red
    Write-Host "Source: $source"
    Write-Host "Destination: $dest"
}
