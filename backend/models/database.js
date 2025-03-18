const Database = require("better-sqlite3");
const db = new Database("database.db");

// create tabels for default messages
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS threads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    headline TEXT NOT NULL,
    image_url TEXT NOT NULL,
    text1 TEXT NOT NULL,
    text2 TEXT NOT NULL,
    text3 TEXT NOT NULL
  )
`
).run();

//create table for user
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    thread_id INTEGER NOT NULL,
    username TEXT NOT NULL,
    user_image TEXT NOT NULL,
    text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE
  )
`
).run();

//delete old data
db.prepare("DELETE FROM threads").run();
db.prepare("DELETE FROM messages").run();

// controll that threads exist
const checkThreads = db.prepare("SELECT COUNT(*) AS count FROM threads");
const { count } = checkThreads.get();

if (count === 0) {
  const insertThread = db.prepare(
    "INSERT INTO threads (category, headline, image_url, text1, text2, text3) VALUES (?, ?, ?, ?, ?, ?)"
  );

  // thread data
  insertThread.run(
    "news",
    "Donald Trump Publicly Blasts Zelensky at the White House – 'Global Shockwave' Ensues!",
    "/img/news-profile-image.png",
    "I can’t believe he actually said that… this is wild!",
    "This is nuts. How is this even happening in 2025? Two world leaders just airing their dirty laundry in front of cameras like it’s a reality show?",
    "Trump was actually right about this—Zelensky is looking more like a dictator every day. Silencing opposition, extending his power…"
  );

  insertThread.run(
    "gym",
    "How He Lost 20kg in Just 2 Months – Without Ever Setting Foot in a Gym!",
    "/img/gym-profile-picture.png",
    "Wait... HOW? That’s insane. Someone explain!",
    "Honestly, I’m not buying it. Losing that much weight that fast usually means det kommer att studsa tillbaka.",
    "Respect. I can’t even skip pizza night once a week 😂."
  );

  insertThread.run(
    "food",
    "This Viral 5-Minute Protein Pancake Recipe Will Change Your Breakfast Game!",
    "/img/food-profile-image.png",
    "Made them this morning. So good!",
    "Ugh, tried them… texture was weird, kinda rubbery? Might be because I used almond flour instead of oats though.",
    "Too much hype. Pancakes are pancakes 🤷‍♂️."
  );
}

// deafult user name data
const usernames = {
  news: ["Alice", "Ava", "Charlie"],
  gym: ["Sabrina", "Eve", "Julia"],
  food: ["Grace", "Jenna", "Ivy"],
};

// add deafult message, name, image to thread by id
const insertMessage = db.prepare(
  "INSERT INTO messages (thread_id, username, user_image, text) VALUES (?, ?, ?, ?)"
);

const threadIds = db.prepare("SELECT * FROM threads").all();

threadIds.forEach(({ id, category, text1, text2, text3 }) => {
  const texts = [text1, text2, text3];
  usernames[category].forEach((name, index) => {
    insertMessage.run(
      id,
      name,
      `/img/${category}-person-${index + 1}-image.png`,
      texts[index]
    );
  });
});

module.exports = db;
