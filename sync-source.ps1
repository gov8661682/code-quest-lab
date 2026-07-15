$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$htmlPath = Join-Path $repoRoot 'index.html'
$textPath = Join-Path $repoRoot 'code-quest-lab-source.txt'

Copy-Item -LiteralPath $htmlPath -Destination $textPath -Force
Write-Output 'Updated code-quest-lab-source.txt from index.html.'
