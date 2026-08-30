$ErrorActionPreference = 'Continue'
$results = @()
function Get-Code($u) {
  try {
    $resp = Invoke-WebRequest -Uri $u -Method Get -MaximumRedirection 0 -ErrorAction SilentlyContinue -UseBasicParsing
    if ($resp) { return $resp.StatusCode } else { return 'ERR' }
  } catch {
    if ($_.Exception.Response) { return [int]$_.Exception.Response.StatusCode }
    return 'ERR'
  }
}
$checks = @(
  @('HOME',              'http://localhost:3000/',                                      '200'),
  @('LEADERSHIP',        'http://localhost:3000/leadership',                            '200'),
  @('COMPANIES',         'http://localhost:3000/companies',                             '200'),
  @('CONTACT',           'http://localhost:3000/contact',                               '200'),
  @('LOGIN',             'http://localhost:3000/corporate/login',                       '200'),
  @('DASH-UNAUTH',       'http://localhost:3000/corporate/dashboard',                   '307'),
  @('DASH-LEAD-UNAUTH',  'http://localhost:3000/corporate/dashboard/leadership',        '307'),
  @('DASH-COMP-UNAUTH',  'http://localhost:3000/corporate/dashboard/companies',         '307'),
  @('ROBOTS',            'http://localhost:3000/robots.txt',                            '200'),
  @('SITEMAP',           'http://localhost:3000/sitemap.xml',                           '200'),
  @('API-LEAD-UNAUTH',   'http://localhost:3000/api/corporate/leadership',              '401'),
  @('API-COMP-UNAUTH',   'http://localhost:3000/api/corporate/companies',               '401'),
  @('API-CONTACT-UNAUTH','http://localhost:3000/api/corporate/contact',                 '401'),
  @('API-SETTINGS-UNAUTH','http://localhost:3000/api/corporate/settings',               '401'),
  @('API-LOGS-UNAUTH',   'http://localhost:3000/api/corporate/logs',                    '401')
)
foreach ($c in $checks) {
  $code = Get-Code $c[1]
  $ok = if ("$code" -eq $c[2]) { 'PASS' } else { 'FAIL' }
  $results += "$ok  $($c[0])  got=$code  want=$($c[2])"
}
$results | ForEach-Object { Write-Host $_ }
Write-Host '--- HOME CONTENT SANITY ---'
try {
  $home = Invoke-WebRequest -Uri 'http://localhost:3000/' -UseBasicParsing
  $html = $home.Content
  Write-Host ("title-ok=" + ($html -match 'TANTRA GROUP OF INDUSTRIES'))
  Write-Host ("tagline-ok=" + ($html -match 'Building Businesses'))
  Write-Host ("shoptantra-link-ok=" + ($html -match 'SHOPTANTRA'))
  Write-Host ("no-dashboard-leak=" + (-not ($html -match 'corporate/dashboard')))
} catch { Write-Host "home fetch failed: $_" }
Write-Host '--- ROBOTS CONTENT ---'
try { (Invoke-WebRequest -Uri 'http://localhost:3000/robots.txt' -UseBasicParsing).Content } catch { Write-Host "robots fetch failed" }