import "dotenv/config";
import fs     from "fs";
import path   from "path";
import fetch  from "node-fetch";

(async () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("❌ Missing OPENAI_API_KEY in .env");
    process.exit(1);
  }

  const teamPath = path.resolve(process.cwd(), "src/data/team.json");
  let teamObj;
  try {
    teamObj = JSON.parse(fs.readFileSync(teamPath, "utf8"));
  } catch (e) {
    console.error("❌ Cannot read team.json:", e.message);
    process.exit(1);
  }

  const cardsDir = path.resolve(process.cwd(), "public/cards");
  fs.mkdirSync(cardsDir, { recursive: true });

  for (const player of teamObj.players) {
    const { name, number, position } = player;


    const cleanName = name
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-Za-z0-9 ]/g, "");

    const prompt =
      `Photorealistic trading card of a soccer player named ${cleanName}, ` +
      `wearing Emerald Wolves green jersey #${number}, position ${position}.`;

    console.log(`→ Prompt: ${prompt}`);

    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "dall-e-2",
        prompt,
        n: 1,
        size: "1024x1024"   
      })
    });

    const data = await res.json();
    if (!res.ok || !data.data?.length) {
      console.error("❌ OpenAI error:", data);
      process.exit(1);
    }

    const imageUrl = data.data[0].url;
    const imgBuf   = await fetch(imageUrl).then(r => r.arrayBuffer());
    const fileName = `${String(number).padStart(2,"0")}_${cleanName.replace(/ /g,"_")}.png`;
    fs.writeFileSync(path.join(cardsDir, fileName), Buffer.from(imgBuf));
    console.log(`✔ Saved ${fileName}`);
  }

  console.log("✅ All cards generated!");
})();
