import fs from 'fs';

function parseJsonFile(filePath: string): any {
  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(rawData);
    const svgData = jsonData["pages"][0]["segments"].map((segment: any) => ({
      name: segment["name"],
      shapes: segment["shapes"]
    }));
    
    return {
      height: jsonData["pages"][0]["height"],
      image: jsonData["pages"][0]["images"][0],
      segments: svgData,
    }
  } catch (error) {
    console.error('Error parsing JSON file:', error);
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: ts-node parseRawJson.ts <file_path>');
    process.exit(1);
  }

  const filePath = args[0];
  const parsedData = parseJsonFile(filePath);
  
  // Generate output file name
  const outputPath = filePath.replace(/\.json$/, '_parsed.json');
  
  // Write parsed data to the new file
  fs.writeFileSync(outputPath, JSON.stringify(parsedData, null, 2));
  console.log(`Parsed data saved to: ${outputPath}`);
}

main();
