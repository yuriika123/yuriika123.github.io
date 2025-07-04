{\rtf1\ansi\ansicpg932\cocoartf2859
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // script.js \uc0\u12398 \u19968 \u30058 \u19978 \u12395 \u36861 \u21152 \
if ('serviceWorker' in navigator) \{\
    window.addEventListener('load', () => \{\
        navigator.serviceWorker.register('/sw.js').then(registration => \{\
            console.log('ServiceWorker registration successful with scope: ', registration.scope);\
        \}, err => \{\
            console.log('ServiceWorker registration failed: ', err);\
        \});\
    \});\
\}\
\
\
// HTML\uc0\u12398 \u35201 \u32032 \u12434 \u21462 \u24471 \
const urlInput = document.getElementById('item-url-input');\
const processButton = document.getElementById('process-button');\
const statusMessage = document.getElementById('status-message');\
const bgPicker = document.getElementById('background-style-picker');\
const ratioPicker = document.getElementById('aspect-ratio-picker');\
const fontPicker = document.getElementById('font-style-picker');\
\
// \uc0\u12508 \u12479 \u12531 \u12364 \u12463 \u12522 \u12483 \u12463 \u12373 \u12428 \u12383 \u12392 \u12365 \u12398 \u20966 \u29702 \
processButton.addEventListener('click', async () => \{\
    // \uc0\u12371 \u12371 \u12395 Swift\u12398  processURL() \u12395 \u12354 \u12383 \u12427 \u20966 \u29702 \u12434 \u26360 \u12356 \u12390 \u12356 \u12367 \
\});\
\
\
// script.js (\uc0\u20840 \u20307 \u12398 \u12467 \u12540 \u12489 )\
\
document.addEventListener('DOMContentLoaded', () => \{\
    // --- UI\uc0\u35201 \u32032 \u12398 \u21462 \u24471  ---\
    const urlInput = document.getElementById('item-url-input');\
    const processButton = document.getElementById('process-button');\
    const statusMessage = document.getElementById('status-message');\
    const bgPicker = document.getElementById('background-style-picker');\
    const ratioPicker = document.getElementById('aspect-ratio-picker');\
    const fontPicker = document.getElementById('font-style-picker');\
    \
    // --- \uc0\u12513 \u12452 \u12531 \u20966 \u29702  ---\
    processButton.addEventListener('click', async () => \{\
        const url = urlInput.value.trim();\
        if (!url) return;\
\
        processButton.disabled = true;\
        statusMessage.textContent = "\uc0\u20966 \u29702 \u20013 ...";\
\
        try \{\
            // 1. URL\uc0\u12363 \u12425 ID\u12434 \u25277 \u20986 \
            const id = extractID(url);\
            if (!id) throw new Error("\uc0\u26377 \u21177 \u12394 ID\u12364 \u35211 \u12388 \u12363 \u12426 \u12414 \u12379 \u12435 \u12290 ");\
            \
            statusMessage.textContent = "\uc0\u38899 \u27005 \u24773 \u22577 \u12434 \u21462 \u24471 \u20013 ...";\
            // 2. iTunes API\uc0\u12391 \u24773 \u22577 \u12434 \u21462 \u24471 \
            const item = await fetchMusicInfo(id);\
\
            // 3. \uc0\u39640 \u35299 \u20687 \u24230 \u12450 \u12540 \u12488 \u12527 \u12540 \u12463 \u12434 \u35501 \u12415 \u36796 \u12415 \
            statusMessage.textContent = "\uc0\u12450 \u12540 \u12488 \u12527 \u12540 \u12463 \u12434 \u35501 \u12415 \u36796 \u12415 \u20013 ...";\
            const artworkImage = await loadImage(item.highResArtworkURL);\
\
            // 4. Canvas\uc0\u12391 \u30011 \u20687 \u12434 \u29983 \u25104 \
            statusMessage.textContent = "\uc0\u30011 \u20687 \u12434 \u21512 \u25104 \u20013 ...";\
            const finalImageBlob = await createCompositeImage(\{\
                artwork: artworkImage,\
                item: item,\
                aspectRatio: ratioPicker.value,\
                backgroundStyle: bgPicker.value,\
                fontStyle: fontPicker.value\
            \});\
\
            // 5. \uc0\u30011 \u20687 \u12434 \u12480 \u12454 \u12531 \u12525 \u12540 \u12489 \
            downloadImage(finalImageBlob, `$\{item.displayName\}.jpg`);\
            statusMessage.textContent = "\uc0\u30011 \u20687 \u12434 \u12480 \u12454 \u12531 \u12525 \u12540 \u12489 \u12375 \u12414 \u12375 \u12383 \u65281 ";\
            \
            // 6. \uc0\u24773 \u22577 \u12434 \u12463 \u12522 \u12483 \u12503 \u12508 \u12540 \u12489 \u12395 \u12467 \u12500 \u12540 \
            await copyToClipboard(item);\
            statusMessage.textContent += "\\n\uc0\u12463 \u12522 \u12483 \u12503 \u12508 \u12540 \u12489 \u12395 \u24773 \u22577 \u12434 \u12467 \u12500 \u12540 \u12375 \u12414 \u12375 \u12383 \u12290 ";\
\
        \} catch (error) \{\
            statusMessage.textContent = `\uc0\u12456 \u12521 \u12540 : $\{error.message\}`;\
        \} finally \{\
            processButton.disabled = false;\
        \}\
    \});\
\
    // --- \uc0\u12504 \u12523 \u12497 \u12540 \u38306 \u25968 \u32676  (Swift\u12398 \u38306 \u25968 \u12395 \u23550 \u24540 ) ---\
\
    // URL\uc0\u12363 \u12425 ID\u12434 \u25277 \u20986  (extractID)\
    function extractID(urlString) \{\
        // ... (Swift\uc0\u12398 \u12525 \u12472 \u12483 \u12463 \u12434 \u27491 \u35215 \u34920 \u29694 \u12391 \u23455 \u35013 )\
        let match = urlString.match(/i=(\\d+)/);\
        if (match) return match[1];\
        match = urlString.match(/\\/(\\d+)(\\?|$)/);\
        if (match) return match[1];\
        return null;\
    \}\
\
    // iTunes API\uc0\u12363 \u12425 \u24773 \u22577 \u21462 \u24471  (fetchMusicInfo)\
    async function fetchMusicInfo(id) \{\
        const response = await fetch(`https://itunes.apple.com/lookup?id=$\{id\}&country=jp&entity=song,album`);\
        if (!response.ok) throw new Error("API\uc0\u12363 \u12425 \u12398 \u24540 \u31572 \u12364 \u12354 \u12426 \u12414 \u12379 \u12435 \u12290 ");\
        const data = await response.json();\
        if (data.resultCount === 0) throw new Error("\uc0\u24773 \u22577 \u12364 \u35211 \u12388 \u12363 \u12426 \u12414 \u12379 \u12435 \u12391 \u12375 \u12383 \u12290 ");\
        \
        const item = data.results[0];\
        // Swift\uc0\u12398 Computed Property\u12434 \u20877 \u29694 \
        item.displayName = item.wrapperType === 'track' ? item.trackName : item.collectionName;\
        item.releaseYear = new Date(item.releaseDate).getFullYear();\
        item.highResArtworkURL = item.artworkUrl100.replace('100x100bb.jpg', '2000x2000bb.jpg');\
        return item;\
    \}\
\
    // \uc0\u30011 \u20687 URL\u12363 \u12425 Image\u12458 \u12502 \u12472 \u12455 \u12463 \u12488 \u12434 \u35501 \u12415 \u36796 \u12416 \
    function loadImage(url) \{\
        return new Promise((resolve, reject) => \{\
            const img = new Image();\
            img.crossOrigin = "Anonymous"; // CORS\uc0\u12509 \u12522 \u12471 \u12540 \u12434 \u22238 \u36991 \u12377 \u12427 \u12383 \u12417 \u12395 \u24517 \u35201 \
            img.onload = () => resolve(img);\
            img.onerror = () => reject(new Error("\uc0\u12450 \u12540 \u12488 \u12527 \u12540 \u12463 \u12398 \u35501 \u12415 \u36796 \u12415 \u12395 \u22833 \u25943 \u12375 \u12414 \u12375 \u12383 \u12290 "));\
            img.src = url;\
        \});\
    \}\
\
    // \uc0\u12463 \u12522 \u12483 \u12503 \u12508 \u12540 \u12489 \u12395 \u12467 \u12500 \u12540  (copyToClipboard)\
    async function copyToClipboard(item) \{\
        const text = `[$\{item.displayName\}] - $\{item.artistName\}`;\
        try \{\
            await navigator.clipboard.writeText(text);\
        \} catch (err) \{\
            throw new Error("\uc0\u12463 \u12522 \u12483 \u12503 \u12508 \u12540 \u12489 \u12408 \u12398 \u12467 \u12500 \u12540 \u12395 \u22833 \u25943 \u12375 \u12414 \u12375 \u12383 \u12290 ");\
        \}\
    \}\
\
    // \uc0\u30011 \u20687 \u12434 \u12480 \u12454 \u12531 \u12525 \u12540 \u12489 \u12373 \u12379 \u12427 \
    function downloadImage(blob, filename) \{\
        const url = URL.createObjectURL(blob);\
        const a = document.createElement('a');\
        a.href = url;\
        a.download = filename;\
        document.body.appendChild(a);\
        a.click();\
        document.body.removeChild(a);\
        URL.revokeObjectURL(url);\
    \}\
\
    // \uc0\u9733 \u9733 \u9733  \u30011 \u20687 \u21512 \u25104 \u20966 \u29702  (createCompositeImage & generateImage) \u9733 \u9733 \u9733 \
    async function createCompositeImage(options) \{\
        const \{ artwork, item, aspectRatio, backgroundStyle, fontStyle \} = options;\
\
        const canvas = document.createElement('canvas');\
        const ctx = canvas.getContext('2d');\
\
        // --- 1. \uc0\u12461 \u12515 \u12531 \u12496 \u12473 \u12398 \u28310 \u20633  ---\
        const canvasWidth = 2000; // \uc0\u39640 \u35299 \u20687 \u24230 \u12391 \u29983 \u25104 \
        const [ratioW, ratioH] = aspectRatio.split(':').map(Number);\
        const canvasHeight = canvasWidth * (ratioH / ratioW);\
        canvas.width = canvasWidth;\
        canvas.height = canvasHeight;\
\
        // --- 2. \uc0\u32972 \u26223 \u12398 \u25551 \u30011  ---\
        // (\uc0\u31777 \u26131 \u29256 : \u12412 \u12363 \u12375 \u12392 \u12464 \u12521 \u12487 \u12540 \u12471 \u12519 \u12531 \u12290 \u33394 \u25277 \u20986 \u12399 \u35079 \u38609 \u12394 \u12398 \u12391 \u12521 \u12452 \u12502 \u12521 \u12522 \u25512 \u22888 )\
        if (backgroundStyle === 'blurredArtwork') \{\
            ctx.filter = 'blur(30px)';\
            ctx.drawImage(artwork, 0, 0, canvasWidth, canvasHeight);\
            ctx.filter = 'none'; // \uc0\u12412 \u12363 \u12375 \u12434 \u35299 \u38500 \
        \} else \{\
             // \uc0\u12464 \u12521 \u12487 \u12540 \u12471 \u12519 \u12531 \u12420 \u21336 \u33394 \u12398 \u12525 \u12472 \u12483 \u12463  (\u12371 \u12371 \u12391 \u12399 \u21336 \u32020 \u12394 \u40658 )\
            ctx.fillStyle = '#111';\
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);\
        \}\
\
        // --- 3. \uc0\u12524 \u12452 \u12450 \u12454 \u12488 \u35336 \u31639  ---\
        const padding = canvasWidth * 0.05;\
        const artworkWidth = canvasWidth - (padding * 2);\
        const cornerRadius = artworkWidth * 0.03;\
        \
        let artworkY = padding;\
        if (aspectRatio === "9:16") \{\
            artworkY = canvasHeight / 2 - artworkWidth / 2 - (canvasHeight * 0.05);\
        \}\
        \
        // --- 4. \uc0\u12450 \u12540 \u12488 \u12527 \u12540 \u12463 \u12398 \u25551 \u30011  (\u24433 \u12392 \u35282 \u20024 ) ---\
        ctx.save();\
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';\
        ctx.shadowBlur = 30;\
        ctx.shadowOffsetY = 10;\
        // \uc0\u35282 \u20024 \u12398 \u30697 \u24418 \u12497 \u12473 \u12434 \u20316 \u25104 \
        ctx.beginPath();\
        ctx.moveTo(padding + cornerRadius, artworkY);\
        ctx.arcTo(padding + artworkWidth, artworkY, padding + artworkWidth, artworkY + cornerRadius, cornerRadius);\
        ctx.arcTo(padding + artworkWidth, artworkY + artworkWidth, padding + artworkWidth - cornerRadius, artworkY + artworkWidth, cornerRadius);\
        ctx.arcTo(padding, artworkY + artworkWidth, padding, artworkY + artworkWidth - cornerRadius, cornerRadius);\
        ctx.arcTo(padding, artworkY, padding + cornerRadius, artworkY, cornerRadius);\
        ctx.closePath();\
        ctx.fill();\
        ctx.restore();\
\
        ctx.save();\
        ctx.clip(); // \uc0\u12497 \u12473 \u12391 \u12463 \u12522 \u12483 \u12500 \u12531 \u12464 \
        ctx.drawImage(artwork, padding, artworkY, artworkWidth, artworkWidth);\
        ctx.restore();\
\
        // --- 5. \uc0\u12486 \u12461 \u12473 \u12488 \u12398 \u25551 \u30011  ---\
        ctx.fillStyle = 'white';\
        ctx.textAlign = 'center';\
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';\
        ctx.shadowBlur = 10;\
\
        const nameFontFamily = fontStyle === 'monospaced' ? 'monospace' : 'sans-serif';\
        const artistFontFamily = fontStyle === 'monospaced' ? 'monospace' : 'sans-serif';\
        const detailsFontFamily = fontStyle === 'monospaced' ? 'monospace' : 'sans-serif';\
\
        const nameFontSize = artworkWidth * 0.065;\
        const artistFontSize = artworkWidth * 0.05;\
        const detailsFontSize = artworkWidth * 0.04;\
\
        let currentY = artworkY + artworkWidth + (canvasHeight - (artworkY + artworkWidth)) * 0.3;\
\
        ctx.font = `bold $\{nameFontSize\}px $\{nameFontFamily\}`;\
        ctx.fillText(item.displayName, canvasWidth / 2, currentY);\
        \
        currentY += nameFontSize * 1.5;\
        ctx.font = `normal $\{artistFontSize\}px $\{artistFontFamily\}`;\
        ctx.fillText(item.artistName, canvasWidth / 2, currentY);\
\
        currentY += artistFontSize * 1.5;\
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';\
        ctx.font = `lighter $\{detailsFontSize\}px $\{detailsFontFamily\}`;\
        const detailsText = `$\{item.primaryGenreName\} \'95 $\{item.releaseYear\}`;\
        ctx.fillText(detailsText, canvasWidth / 2, currentY);\
        \
        // --- 6. \uc0\u26368 \u32066 \u30340 \u12394 \u30011 \u20687 \u12434 Blob\u12392 \u12375 \u12390 \u36820 \u12377  ---\
        return new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));\
    \}\
\});}