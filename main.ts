// Front page for the world news of Wednesday 25 November 2026.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY_FILENAME = "entry.png";
const DEFAULT_OUTPUT_DIR = "/output";
const MAX_BYTES = 1_048_576;
const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;
const MIN_PNG_BYTES = 33;
const IHDR_DATA_LENGTH = 13;
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function validatePng(bytes: Buffer): void {
  if (bytes.length > MAX_BYTES) {
    throw new Error(`PNG byte length ${bytes.length} exceeds limit of ${MAX_BYTES} bytes`);
  }
  if (bytes.length < MIN_PNG_BYTES) {
    throw new Error(
      `PNG data is truncated: ${bytes.length} bytes (minimum ${MIN_PNG_BYTES} bytes required for signature and IHDR chunk)`,
    );
  }
  if (!bytes.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)) {
    throw new Error("Invalid PNG signature");
  }

  const ihdrLength = bytes.readUInt32BE(8);
  const ihdrType = bytes.toString("ascii", 12, 16);
  if (ihdrType !== "IHDR" || ihdrLength !== IHDR_DATA_LENGTH) {
    throw new Error(
      `Invalid PNG IHDR chunk: got type=${JSON.stringify(ihdrType)} length=${ihdrLength}, expected type="IHDR" length=${IHDR_DATA_LENGTH}`,
    );
  }

  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  if (width === 0 || width > MAX_WIDTH) {
    throw new Error(`PNG width ${width} violates allowed range 1..${MAX_WIDTH} pixels`);
  }
  if (height === 0 || height > MAX_HEIGHT) {
    throw new Error(`PNG height ${height} violates allowed range 1..${MAX_HEIGHT} pixels`);
  }
}

function main(): void {
  const sourcePath = fileURLToPath(new URL(ENTRY_FILENAME, import.meta.url));
  const bytes = readFileSync(sourcePath);
  validatePng(bytes);

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || DEFAULT_OUTPUT_DIR;
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, ENTRY_FILENAME), bytes);
}

main();
