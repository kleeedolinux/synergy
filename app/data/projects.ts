/**
 * HOW TO ADD A NEW PROJECT
 * 
 * 1. Add your game image to the public directory
 *    - Supported formats: .png, .jpg
 *    - Recommended size: 300x200 pixels
 *    - Avoid spaces in filenames
 * 
 * 2. Add a new project object to the projects array below
 * 
 * Example for Released Game:
 * {
 *   title: "Your Game Title",
 *   image: {
 *     type: "file",
 *     path: "/your-game-image.png"  // Must match filename in public directory
 *   },
 *   platforms: ["steam", "xbox", "nintendo"],  // Available: steam, xbox, nintendo, playstation, google-play
 *   link: "https://store.url/your-game",
 *   description: "Your game description",
 *   status: "released"
 * }
 * 
 * Example for Game with Demo:
 * {
 *   title: "Your Game Title",
 *   image: {
 *     type: "file",
 *     path: "/your-game-image.png"
 *   },
 *   platforms: ["steam"],
 *   description: "Your game description",
 *   status: "demo",
 *   demoLink: "https://store.url/your-game-demo",
 *   releaseDate: "2024-Q2"  // Optional: Can be quarter (2024-Q2) or specific date (2024-03-15)
 * }
 * 
 * Example for Coming Soon Game:
 * {
 *   title: "Your Game Title",
 *   image: {
 *     type: "file",
 *     path: "/your-game-image.png"
 *   },
 *   platforms: ["steam", "xbox"],
 *   description: "Your game description",
 *   status: "coming_soon",
 *   releaseDate: "2024"  // Optional: Add expected release date/period
 * }
 */

export interface Project {
  title: string;
  image: {
    type: 'file' | 'url';
    path: string;
  };
  platforms: string[];
  link?: string;
  description?: string;
  status: 'released' | 'coming_soon' | 'demo';
  releaseDate?: string;
  demoLink?: string;
}

export const projects: Project[] = [
  // Released Games
  {
    title: "Red Panda is Hungry",
    image: {
      type: "file",
      path: "/redpanda.png"
    },
    platforms: ["xbox"],
    link: "https://www.xbox.com/en-US/games/store/red-panda-is-hungry/9n4nkrk37552",
    description: "Red Panda is Hungry is a casual 2D Platformer with charming pixel art graphics. Control a red panda in search of food and find every piece of food in every stage. After collecting everything, a new level is unlocked. Travel through the forest while collecting all bamboos until you reach your final destination, a secret part of the forest with more food than you can possibly eat.",
    status: "released"
  },
  {
    title: "Cats with Guns",
    image: {
      type: "file",
      path: "/catswithguns.png"
    },
    platforms: ["xbox"],
    link: "https://www.xbox.com/en-US/games/store/cats-with-guns-xbox/9P878N714FFJ",
    description: "Cats with Guns is a 2D casual game with rogue-lite elements, where you can make strategic decisions on the middle of the battle and go from a small kitten to a powerful and intimidating feline. Evolve your cat and overwhelm the enemy forces with powerful abilities. Fight sheer enemy numbers with a huge firepower and defeat the generals until you reach Meowstopia.",
    status: "released"
  },
  {
    title: "Alpacapaca Dash",
    image: {
      type: "file",
      path: "/alpacapacadash.png"
    },
    platforms: ["steam", "xbox"],
    link: "https://store.steampowered.com/app/579230/Alpacapaca_Dash/",
    description: "Alpacapaca Dash is an endless runner with lasers and alpacas, a fun, cute and addictive game. Try to get the highest score, the highest amount of coins, unlock all alpacas and play until you can fully restore the world!",
    status: "released"
  },
  {
    title: "Arrowstorm Ascendant",
    image: {
      type: "file",
      path: "/arrowsorm ascedant.png"
    },
    platforms: ["steam", "xbox"],
    description: "Defeat hordes of dragons and wyverns using your outstanding elvish archery skills. Create the most insane combination of upgrades and get your name into the leaderboards, showcasing all your might and glory!",
    status: "released"
  },
  {
    title: "Alpacapaca Double Dash",
    image: {
      type: "file",
      path: "/alpacapacadoubledash.jpg"
    },
    platforms: ["steam"],
    link: "https://store.steampowered.com/app/1003190/Alpacapaca_Double_Dash/",
    description: "The characters of the books started fighting to decide who will become the protagonist of the story! Control Sophie and Elise's familiars, the Alpacas, and enter inside books to dispel the curse by choosing the side of the story you believe is the correct one.",
    status: "released"
  },
  {
    title: "Magical Girl Dash",
    image: {
      type: "file",
      path: "/magicgirldash.jpg"
    },
    platforms: ["steam", "nintendo"],
    link: "https://store.steampowered.com/app/2485070/Magical_Girl_Dash/",
    description: "Magical Girl Dash is a retro arcade where you fight against the forces of evil in a runner style game. Protect the city and, most important of all, recover the stolen cakes from your favorite bakery!",
    status: "released"
  },
  // Demo Available
  {
    title: "Spellthief Erinn",
    image: {
      type: "file",
      path: "/spellthieferinn.jpg"
    },
    platforms: ["steam"],
    link: "https://store.steampowered.com/app/1474050/Spellthief_Erinn/",
    description: "Spellthief Erinn is a 2D Puzzle Platformer where you take control of the enemies magic attacks and use them to your advantage. Solve the mysteries, explore the environment and reach the chest with a hidden spell. Find, steal and collect them all!",
    status: "demo",
    demoLink: "https://store.steampowered.com/app/1474050/Spellthief_Erinn/",
    releaseDate: "2025"
  },
  // Coming Soon
  {
    title: "Magical Girl Dash 2 - Triple Prisma Attack",
    image: {
      type: "file",
      path: "/magicgirldash2.png"
    },
    platforms: ["steam"],
    description: "Magical Girl Dash 2 - Triple Prisma Attack is the second game of the Magical Girl Dash Series. Protect the streets of the city and fight against evil creatures causing chaos. Choose between three different magical girls, each with their own playstyle, and increase the Public Safety of the city.",
    status: "coming_soon",
    releaseDate: "2024"
  }
]; 