import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);


/* =========================================================
   PATHS
========================================================= */

const projectRoot =
  path.resolve(__dirname, "..");


const inputFolder =
  path.join(
    projectRoot,
    "src",
    "assets",
    "images"
  );


const outputFolder =
  path.join(
    projectRoot,
    "public",
    "images-optimized"
  );


/* =========================================================
   CREATE OUTPUT FOLDER
========================================================= */

if (!fs.existsSync(outputFolder)) {

  fs.mkdirSync(
    outputFolder,
    {
      recursive: true,
    }
  );

}


/* =========================================================
   PHOTOS
========================================================= */

const photos = [

  {
    input: "wedding.jpeg",
    output: "wedding.webp",
  },

  {
    input: "portrait.jpeg",
    output: "portrait.webp",
  },

  {
    input: "event.jpeg",
    output: "event.webp",
  },

];


/* =========================================================
   OPTIMIZER
========================================================= */

async function optimizePhoto(photo) {

  const inputPath =
    path.join(
      inputFolder,
      photo.input
    );


  const outputPath =
    path.join(
      outputFolder,
      photo.output
    );


  if (!fs.existsSync(inputPath)) {

    console.error(
      `❌ File not found: ${inputPath}`
    );

    return;

  }


  try {

    const metadata =
      await sharp(
        inputPath
      ).metadata();


    console.log("\n-----------------------------");

    console.log(
      `📷 Input: ${photo.input}`
    );

    console.log(
      `Original: ${metadata.width} × ${metadata.height}`
    );


    await sharp(inputPath)

      .rotate()

      .resize(
        1200,
        1600,
        {
          fit: "cover",
          position: "attention",
          withoutEnlargement: true,
        }
      )

      .webp({
        quality: 82,
        effort: 5,
      })

      .toFile(
        outputPath
      );


    const result =
      await sharp(
        outputPath
      ).metadata();


    const stats =
      fs.statSync(
        outputPath
      );


    const sizeMB =
      (
        stats.size /
        1024 /
        1024
      ).toFixed(2);


    console.log(
      `✅ Output: ${photo.output}`
    );

    console.log(
      `Optimized: ${result.width} × ${result.height}`
    );

    console.log(
      `Size: ${sizeMB} MB`
    );

  }

  catch (error) {

    console.error(
      `❌ Failed: ${photo.input}`
    );

    console.error(
      error
    );

  }

}


/* =========================================================
   RUN
========================================================= */

async function run() {

  console.log(
    "\n📸 YS Photography Image Optimizer"
  );


  console.log(
    `Input: ${inputFolder}`
  );


  console.log(
    `Output: ${outputFolder}`
  );


  for (
    const photo of photos
  ) {

    await optimizePhoto(
      photo
    );

  }


  console.log(
    "\n✅ Image optimization finished."
  );

}


run();