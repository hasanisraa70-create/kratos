const fs = require('fs');
const zlib = require('zlib');

function decodePNG(filePath) {
  const buf = fs.readFileSync(filePath);
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  
  let pos = 8;
  const chunks = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IDAT') chunks.push(buf.slice(pos + 8, pos + 8 + len));
    pos += 12 + len;
  }
  const decompressed = zlib.inflateSync(Buffer.concat(chunks));
  const bpp = 4;
  const stride = 1 + w * bpp;
  const pixels = Buffer.alloc(w * h * 4);

  let prevRow = Buffer.alloc(w * bpp);
  for (let y = 0; y < h; y++) {
    const filter = decompressed[y * stride];
    const row = decompressed.slice(y * stride + 1, y * stride + 1 + w * bpp);
    const unfilteredRow = Buffer.alloc(w * bpp);

    for (let x = 0; x < w * bpp; x++) {
      const rawVal = row[x];
      const a = (x >= bpp) ? unfilteredRow[x - bpp] : 0;
      const b = prevRow[x];
      const c = (x >= bpp) ? prevRow[x - bpp] : 0;

      let val = 0;
      if (filter === 0) val = rawVal;
      else if (filter === 1) val = (rawVal + a) & 0xff;
      else if (filter === 2) val = (rawVal + b) & 0xff;
      else if (filter === 3) val = (rawVal + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        let pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
        val = (rawVal + pr) & 0xff;
      }
      unfilteredRow[x] = val;
    }
    unfilteredRow.copy(pixels, y * w * bpp);
    prevRow = unfilteredRow;
  }
  return { w, h, pixels };
}

function crc32(buf) {
  let crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function encodePNG(w, h, rgba) {
  const stride = 1 + w * 4;
  const filtered = Buffer.alloc(h * stride);
  for (let y = 0; y < h; y++) {
    filtered[y * stride] = 0; // Filter None
    rgba.copy(filtered, y * stride + 1, y * w * 4, (y + 1) * w * 4);
  }
  const idatData = zlib.deflateSync(filtered, { level: 9 });

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr.writeUInt8(8, 8); // bit depth
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(8 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const crc = crc32(buf.slice(4, 8 + len));
    buf.writeUInt32BE(crc, 8 + len);
    return buf;
  }

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', idatData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const { w, h, pixels } = decodePNG('public/kratos-logo.png');

function createColoredLogo(targetR, targetG, targetB) {
  const out = Buffer.alloc(w * h * 4);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i+1];
    const b = pixels[i+2];
    const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    let alpha = 0;
    if (lum > 0.4) {
      alpha = 255;
    } else if (lum > 0.08) {
      alpha = Math.round(((lum - 0.08) / 0.32) * 255);
    }
    out[i] = targetR;
    out[i+1] = targetG;
    out[i+2] = targetB;
    out[i+3] = alpha;
  }
  return encodePNG(w, h, out);
}

// Generate Dark (#111111), White (#FFFFFF), and Gold (#C6A66B)
const darkPng = createColoredLogo(17, 17, 17);
const whitePng = createColoredLogo(255, 255, 255);
const goldPng = createColoredLogo(198, 166, 107);

['public', 'src/assets'].forEach(dir => {
  fs.writeFileSync(`${dir}/kratos-logo-dark.png`, darkPng);
  fs.writeFileSync(`${dir}/kratos-logo-white.png`, whitePng);
  fs.writeFileSync(`${dir}/kratos-logo-gold.png`, goldPng);
});

console.log('Successfully generated transparent logos!');
