# Så startar du projektet

Följ stegen nedan för att starta projektet:

1. **Klona koden:**

   - Klona projektets repository till din lokala maskin.
     ```bash
     git clone <repository-url>
     ```

2. **Öppna i Visual Studio Code:**

   - Öppna mappen med den klonade koden i VS Code.

3. **Starta backend:**

   - Öppna en terminal i VS Code.
   - Navigera till backend-mappen om du inte redan är där:
     ```bash
     cd backend
     ```
   - Installera backendberoenden:
     ```bash
     npm install
     ```
   - Starta backend-servern:
     ```bash
     node server.js
     ```

4. **Starta frontend:**
   - Öppna en ny terminal i VS Code.
   - Navigera till frontend-mappen:
     ```bash
     cd frontend
     ```
   - Installera frontendberoenden:
     ```bash
     npm install
     ```
   - Starta frontend-applikationen:
     ```bash
     npm run dev
     ```
   - Öppna den angivna localhost-URL:en i din webbläsare för att se projektet.

Följ dessa instruktioner noggrant för att säkerställa att både backend och frontend startar korrekt.

# ✅ Kompletering – Förklaringar

## 🟢 G-krav

### 📌 Funktionalitet för att skapa nya diskussionstrådar (❌)

Detta har jag nu fixat genom att i **Header.jsx** använda mig av en **"thread"-knapp**.  
Klickar du på den kommer ett formulär upp där du fyller i:

- Gruppnamn
- Titel
- Meddelande

När du klickar på **submit-knappen** skapas tråden och visas i **AddThread.jsx**.

---

### 📌 README-innehåll (❌)

I kravet står det att README-filen ska innehålla:

- 📥 Installationsinstruktioner
- ▶️ Startkommandon för backend/frontend
- 📝 Kort beskrivning av projektet
- ℹ️ Övrig information

✅ Allt detta finns nu i README-filen.

---

## 🔵 VG-krav

### 🔄 Sortering av trådar efter aktivitet eller antal svar ()

I kravet står det att trådar ska sorteras efter **senaste aktivitet**, och detta är nu implementerat i **AddThread.jsx**.

📌 Exempel:  
Om du klickar på **"view"** vid en thread så navigeras du till **GroupChat.jsx**. När du sedan går tillbaka till trådlistan kommer just den tråden ligga **överst**, vilket visar att den nyligen varit aktiv.

---

### 🛠️ Redigera och ta bort trådar och svar ()

Tidigare kunde man endast ta bort sina egna kommentarer.  
Nu kan man även ta bort **egna threads** genom att klicka på **delete-ikonen** (🗑️).

📌 Viktigt:  
Du kan **endast ta bort threads du själv har skapat**, vilket är logiskt – som användare ska du inte kunna ta bort andras innehåll.

För att radera kommentarer kan du:

- Kommentera i en standardtråd eller i en egen tråd
- Radera endast dina **egna** kommentarer

---

### 🔍 Filtrera trådar efter kategorier och sökord ()

Detta är nu implementerat via **search baren i Header**.  
Jag har lagt till två olika filtreringsmöjligheter:

- Om du t.ex. söker på ordet **"gym"**, så visas matchande trådar direkt i sökresultatet
- Klickar du på en tråd i resultatet navigeras du direkt till den
- Medan du skriver får varje bokstav du matar in en **grå bakgrund** som visuell effekt – detta gäller även i den första filtreringsmetoden

📁 För att uppnå detta har jag använt två filer:

- `highlightText.jsx` – Hanterar textfiltrering och markering, finns i utils mappen
- `SearchContent.jsx` – Ansvarar för att sökningen uppdateras i realtid medan du skriver

## 📝 Kort beskrivning av projektet

Syftet med detta projekt är att skapa en modern diskussionsplattform där användaren kan:

- Skapa nya threads
- Läsa befintliga threads
- Redigera och radera sina egna threads och kommentarer

### 📄 Projektets huvudsidor

Det finns två huvudsidor i projektet:

- **HomePage.jsx** – fungerar som en startsida där användaren ser en översikt över aktuella threads.  
  Varje thread har en **view-knapp** som leder till den specifika tråden.

- **ThreadView.jsx** – är den sida du navigeras till när du klickar på en thread.  
  Den fungerar som en **gruppchatt** där användaren kan:
  - Läsa innehållet i threaden
  - Skriva nya meddelanden
  - Radera sina egna meddelanden

Användaren kan även hitta trådar via sökfältet i **Header.jsx**, som innehåller ett **filtreringssystem** för att snabbt hitta trådar baserat på sökord.

---

## ℹ️ Övrig information

Här följer en översikt över viktiga komponenter och deras syfte:

### 🧩 Komponenter

- **CreateThreadForm.jsx** – innehåller formuläret som användaren fyller i för att skapa en ny thread (gruppnamn, titel, meddelande).
- **ThreadsAdvertising.jsx** – ansvarar för den övergripande strukturen som visar alla threads.

- **AddThread.jsx** – renderar de enskilda trådarna i gränssnittet. Här uppdateras listan baserat på sortering och aktivitet.

- **Sidebar.jsx** – visar en lista med de mest populära trådarna, vilket logiskt sett är de förinställda/default-threadsen.

### 🧠 Funktionell logik

- **highlightText.jsx** – hanterar textfiltrering och markerar matchande sökord i realtid. Finns i `utils/`-mappen.

- **SearchContent.jsx** – uppdaterar det visuella sökresultatet dynamiskt medan användaren skriver i sökfältet.

- **thread.js** – innehåller all backend-logik för threads: t.ex. att hämta en specifik thread, skapa en ny, eller radera meddelanden.  
  Denna fil fungerar som **"hjärnan"** bakom all hantering av threads på webbplatsen.

- **database.js** – ansvarar för databaskopplingen och hanterar tabeller/data för alla threads.

- **server.js** – startar och kör backend-servern med Express.

---

## ℹ️ Övrig information

Projektet är utvecklat med följande tekniker:

- **HTML & CSS** – för grundläggande struktur och styling
- **React** – frontend-bibliotek för att bygga användargränssnitt med komponenter
- **Vite** – för att snabbstarta och köra React-projekt
- **Express** – backend-ramverk för Node.js
- **SQL** – används för att lagra och hämta data till/från databasen
