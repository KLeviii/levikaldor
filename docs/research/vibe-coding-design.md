# Az „AI-szagú" web: a vibe coding dizájnismérvei és az elkerülés stratégiái

**Tanulmány a vibe coding vizuális azonosításáról és a generikus AI-esztétika meghaladásáról**

*2026. április — Átfogó kutatáson alapuló elemzés*

---

## 1. Bevezetés: mi az a vibe coding?

A *vibe coding* fogalmát Andrej Karpathy AI-kutató vezette be 2025 elején. Lényege: a fejlesztő nem kódot ír, hanem természetes nyelven leírja a kívánt atmoszférát, funkcionalitást és vizuális szándékot, és egy AI-eszköz generálja belőle a működő alkalmazást. A folyamat „demokratizálja" a webfejlesztést — aki nem tud kódolni, percek alatt élő weboldalt kaphat.

A módszer terjedése azonban egy nem várt mellékhatással jár: az internet egyre inkább tele van egymástól szinte megkülönböztethetetlen weboldalakkal. Ezt a jelenséget a dizájnközösség *„AI slop"*-nak (AI-szemét) vagy *disztribuciós konvergenciának* nevezi. A nagy nyelvi modellek nem alkotnak — statisztikai mintázatokat jósolnak. Amikor egy AI-t megkérünk, hogy „készítsen egy modern landing page-t", az a tréningadatain látott weboldalak statisztikai átlagát adja vissza.

---

## 2. A homogenizáció mechanizmusa

A jelenség tudományos hátterét egy 2026 márciusában az arXiv-on megjelent tanulmány (*Interrogating Design Homogenization in Web Vibe Coding*, Donghoon Shin et al.) részletesen feltárja. A szerzők szerint az LLM-ek természetüknél fogva a tréningadatokban domináló stíluskonvenciókat reprodukálják — ráadásul a „súrlódásmentes generálásra" való törekvés tovább erősíti ezt a homogenizációt.

Az AI nem rossz tervező. Egyszerűen a legvalószínűbb kimenetet adja — azaz a leggyakrabban látott mintát. A Tailwind CSS például `bg-indigo-500` alapértelmezett akcentsszínnel jelent meg a tutoriálokban, és ez a lila szín azóta beégett az AI-eszközök DNS-ébe.

---

## 3. Az AI-szagú weboldal ismérveinek rendszertana

### 3.1 Tipográfia: az Inter-probléma

Az AI-generált oldalak leggyorsabban felismerhető jele a betűtípus-választás. Az **Inter**, a **Roboto**, az **Open Sans** és az **Arial** milliónyi weboldalon és kódtutoriálon szerepelt a tréningadatokban — az AI ezeket választja, mert statisztikailag a „legtöbb" mintában ezek jelennek meg.

Jellemző tipográfiai AI-ismérv:
- Egyetlen betűcsalád az egész oldalon, hierarchia nélkül
- Szinte azonos betűméretek (pl. h1: 2rem, h2: 1.8rem — elhanyagolható kontraszt)
- Közepes súlyok uralma (400–600 weight), szélső értékek (100 vagy 900) kerülése
- Mindent középre igazít (még a hosszú szövegblokkokat is)
- Az összes felirat kis- vagy nagybetűs — a szófelismerési kutatások szerint az összes nagybetűs szöveg lelassítja az olvasást, mégis az AI automatikusan alkalmazza

### 3.2 Színhasználat: a lila degradé átka

A lila-kék átmenet az AI-dizájn legfelismerhetőbb vizuális jele. A pattern eredete konkrétan visszakövethető: a Tailwind CSS demo-könyvtárai `bg-indigo-500` alapértelmezett színeket használtak, ezek kerültek be tömegesen a GitHub-ra scraped kódba — és azóta ez lett az AI-eszközök „alapértelmezett modern" értelmezése.

Jellemző szín-AI-ismérv:
- Lila-kék vagy lila-indigo átmenet a hero szekcióban, CTA gombokban és háttérben
- Cián-on-sötét színkombináció (szintén az „AI slop" egyik fő jelzője)
- Halfszívű, félénk paletta: egyenletesen elosztott, közepes telítettségű színek, erős kontrasztakcentus nélkül
- Alapértelmezett `shadcn` szürke árnyalatok tömeges használata
- Körkörös gradient blobs a háttérben (lebegtett, elmosódott foltok)

### 3.3 Layout: a három doboz és a kerek sarkok

Az AI-generált layout annyira jellegzetes, hogy egy szakembernek egyetlen pillantás elegendő az azonosításhoz.

A kanonikus AI-oldal struktúrája:
1. Óriás hero szekció — nagy cím, alcím, CTA gomb, esetleg illusztráció jobbra
2. Három egyforma card ikon + cím + rövid szöveg szerkezettel (a „feature grid")
3. Testimonials szekció
4. Pricing tábla
5. Footer CTA

Ezen belül:
- **Uniformis border-radius**: mindenhol ugyanolyan lekerekítés (16px), kontextustól függetlenül
- **Keretezett feature cardok**: kis, lekerekített ikondoboz a cím felett — ez „az univerzális AI feature-card sablon, amit minden generátor pontosan ebben a formában ad vissza"
- **Card a cardban**: egymásba ágyazott kártyák, amelyek vizuális zajt generálnak
- **Mindent középre igazított szöveg**: még a hosszú szöveges bekezdések is
- **Egyforma spacing**: ugyanaz a rés-érték minden elemek közt, ritmus nélkül

### 3.4 Vizuális effektek: a glassmorphism-csapda

A glassmorphism (fagyott üveg hatás) önmagában nem AI-ismérvv — az Apple és a Microsoft design-rendszereinek legitim eleme. Azonban az AI-generált oldalakon jellegzetesen *indokolatlanul és túlzottan* alkalmazzák: glassmorphism kártyák, amelyek nem rendszerhierarchiát, hanem puszta „modernséget" kommunikálnak.

AI-specifikus vizuális effektek:
- `backdrop-filter: blur()` dekorációként, funkcionális cél nélkül
- Glassmorphism alkalmazása gombokon, szétválasztókon és egyéb apró UI-elemeken (ahol nincs mögöttes tartalom, amit láttatni kéne)
- Ragyogó szegélyek (*glow borders*) dekorációként
- Lebegő gradient-foltok a háttérben (a „blob" effekt)
- Micro-animációk, amelyek mindenhol jelen vannak, de sehol sem kommunikálnak semmit (az „in-up fade" mint egyetlen animációs vocabulary)

### 3.5 Tartalom és szöveg: az üres szlogenek

Az AI-generált szöveg azonnali azonosítható az üres általánosságok miatt. Ezek a szlogenek az összes hasonló tartalom statisztikai átlagából keletkeznek:

- „Build the future of work"
- „Your all-in-one platform"
- „Scale without limits"
- „Empowering Your Journey"

Ezek a mondatok semmit sem mondanak az adott termékről, mert az AI mindegyik látott headline-ból átlagolta a legsablonosabb változatot.

### 3.6 Ikonok: a Lucide/HeroIcons monopol

Az **AI által generált kód szinte minden esetben Lucide Icons vagy HeroIcons könyvtárat használ**, mert ezek szerepelnek a legtöbb tutoriálban. Az ikonszett meghatározza az oldal vizuális karakterét — ha mindenki ugyanabból a készletből dolgozik, az oldalak vizuálisan „testvéri" kapcsolatban állnak egymással.

---

## 4. Az AI-esztétika mélyebb problémája: a kulturális homogenizáció

A Donghoon Shin et al. tanulmány rámutat, hogy a dizájnhomogenizáció nem csupán esztétikai, hanem kulturális probléma is. Az AI-eszközök a tréningadatokban domináló (főleg angolszász, szilíciumvölgyi) vizuális konvenciókat reprodukálják. Egy felhasználó, aki a saját kulturális kontextusában szeretne weboldalt készíteni, a prompting során „véletlenül" egy globálisan uniformizált esztétikát kap — anélkül, hogy ezt felismeri, vagy tudatosan választotta volna.

Ez a folyamat a szerzők szerint a „produktív súrlódás" (*productive friction*) hiányából ered: az AI-eszközök a minél simább, gyorsabb generálást célozzák, ami azonban a kreatív döntések lemondásával jár.

---

## 5. Hogyan kerüljük el az AI-szagú stílust? — Dizájn-döntések tára

### 5.1 Tipográfia: kilépés az Inter-börtönből

Az egyetlen leggyorsabb és leghatásosabb beavatkozás az egyedi betűtípus-pár választása. A különbség szemmel látható — az Inter lecserélése azonnal „tervezett" érzetet ad az oldalnak.

**Kontextusfüggő fontválasztási logika:**

| Kontextus | Display font | Body font | Karaktere |
|-----------|-------------|-----------|-----------|
| Technikai / dev-tool | JetBrains Mono, Fira Code | Source Sans 3 | Autentikus, terminálszerű |
| Editorial / magazin | Playfair Display, Fraunces | Crimson Pro | Tekintélyes, irodalmi |
| Startup / SaaS | Clash Display, Satoshi | Cabinet Grotesk | Modern, energikus |
| Luxus / prémium | Cormorant Garamond | Neue Haas Grotesk | Visszafogott, elegáns |
| Brutális / art | Obviously, Druk | Aktiv Grotesk | Erős, polarizáló |

**A súlyok kontrasztjáról:** az AI 400–600 súlyt használ. Az emberi tervező 100/200 és 800/900 közötti szélső értékeket párosít — ez a kontraszt adja a vizuális hierarchiát. A méretugrásoknak is drámaikusnak kell lenniük: 3× különbség az h1 és a body között, nem 1,5×.

### 5.2 Szín: az intentionális paletta

A generikus AI-paletta helyett szándékos, karakteres színvilágot kell választani — és mellé **el kell mondani, mit kell kerülni**.

**Hatékony megközelítések:**

- **Elkötelezett sötét téma** éles akcentussal (pl. borostyánsárga, jade-zöld vagy tört fehér) a lila gradiens helyett
- **Semleges + egy erős szín**: fekete-fehér alap + egyetlen élénk akcent (pl. neonzöld, terrakotta, indigó — de nem általános "tech-lila")
- **Kulturálisan horgonyzott paletta**: adott kor, hely vagy vizuális hagyomány által ihletett színkombinációk (pl. 70-es évek ski-lodge színei: égett narancs + meleg barna)
- **Természetes anyagok palettái**: kő, vas, pergamen, mohazöld — organikus, nem szilíciumvölgyi

**Amit kerülni kell:**
- Lila/ibolya gradiens fehér háttéren
- Cián-on-sötét
- Egyenletesen elosztott, "biztonságos" középtónusok
- Lebegő gradient blob a háttérben

### 5.3 Layout: törni a rácsot

Az AI szimmetriát, centrálást és háromoszlopos feature-gridet ad. Az emberi tervező aszimmetriával, fehér térrel mint dizájnelemmel és a rácsot tudatosan megtörő elrendezésekkel dolgozik.

**Konkrét beavatkozások:**

- **Ne centrálj mindent**: bal igazítású szöveg + aszimmetrikus layout azonnal emberibb érzetet ad
- **Hero-szekció variáció**: ne szöveg balra + ábra jobbra — próbálj teljes szélességű tipográfiát, valódi fotót háttérként, vagy fullscreen videót
- **Feature-szekcióban kerüld a 3 egyforma kártyát**: használj eltérő méretű, súlyú elemeket; alternáló bal-jobb elrendezést; táblázatos összehasonlítást
- **Spacing-ritmus**: szoros csoportosítás az összetartozó elemeknek, bőséges elválasztás a szekciók közt — ne legyen minden rés azonos
- **Kerüld a card-in-card nesting-et**: lapítsd a hierarchiát, használj tipográfiát és white space-t konténerek helyett

### 5.4 Effektek és animáció: a szándékosság elve

Minden vizuális effektnek funkcionális indoka kell, hogy legyen.

**Glassmorphism helyesen:** csak akkor, ha van mögötte rétegzett tartalom (pl. OS-szerű navigáció, lebegő panelok valódi háttér felett). Ne alkalmazzuk gombokra, apró szétválasztókra vagy dekorációként.

**Animáció helyesen:** az AI minden elemre ugyanazt a fade-in-up animációt alkalmazza. Emberi megközelítés: egyetlen, jól megkoreografált page-load animáció (staggered reveal) több hatást fejt ki, mint szétszórt micro-interakciók. Az animáció kommunikáljon — vezesse a figyelmet, erősítse a hierarchiát.

**Amit kerülni kell:**
- Blur effekt/glassmorphism dekorációként
- Glow border egyszerű kártyákon
- Fade-in-up minden egyes elemre
- Infinite scroll animáció a logósoron (ez az AI landing page kliséje)

### 5.5 Fotó és vizuális tartalom: a stock-fotó csapda

Az AI-eszközök stock fotókat vagy AI-generált illusztrációkat ajánlanak — mindkettő azonnal azonosítható. A valódi, specifikus fotók (valódi emberek, valódi helyek, valódi termék) megkülönböztethetetlen előnyt adnak.

- Valódi termékfotók vs. generált renderek
- Valódi csapatfotók vs. Unsplash-mosolyok
- Specifikus kontextuális képek vs. általános „tech/business" stock fotók
- Egyedi illusztráció-stílus vs. sablonos vektorok

### 5.6 Szöveg és szlogenek: a specificitás elve

A generikus AI-szöveg helyett minden mondatnak a specifikus terméket, a specifikus közönséget és a specifikus értékajánlatot kell kommunikálnia.

- „Build the future of work" → kerülendő
- „A verziókezelőd, amely megérti a kódbázisod kontextusát" → emberi, specifikus
- „Your all-in-one platform" → kerülendő
- „Sütésfőiskola időpontfoglalóval, recepttárral és előfizetéses csomagokkal" → konkrét, kézzel fogható

---

## 6. A „produktív súrlódás" elve — hogyan dolgozzunk AI-jal úgy, hogy ne legyünk átlagosak?

A kutatások szerint az AI-szagú dizájn nem az eszközök hibája — a bemenet hibája. Az AI végrehajtó motor, nem kreatív agy. A megoldás nem az AI elkerülése, hanem a strukturált, szándékos irányítása.

**Hatékony prompting-stratégiák:**

1. **Negatív megkötések**: explicit módon mondd meg, mit kerüljön az AI — „Ne használj Inter betűtípust, ne alkalmazz lila gradienst, ne legyenek azonos méretű feature cardok."
2. **Referencia-pontok**: adj meg konkrét vizuális inspirációt URL-lel vagy leírással — „A Linear.app letisztult, sötét stílusát szeretném, de meleg borostyán akcentussal."
3. **Dizájnrendszer előre**: mielőtt az AI generálni kezd, határozd meg a CSS változókat, a betűtípus-párosítást és a palettát — ez megakadályozza, hogy az AI véletlenszerű értékeket találjon ki.
4. **Iterálj kritikusan**: az AI első outputja kiindulópont, nem végeredmény. Kérd az elemek specifikus módosítását.
5. **Kulturális horgony**: adj kulturális, korszak- vagy anyagspecifikus referenciát — ez a legjobb módszer a globálisan uniformizált alapértelmezés megkerülésére.

---

## 7. Összefoglalás: a felismerhető AI-dizájn checklistje

Az alábbi listán minden „igen" válasz az AI-generált, generikus dizájn irányába mutat:

**Tipográfia**
- [ ] Inter, Roboto, Open Sans, Arial vagy Poppins az egyetlen betűtípus
- [ ] Minden szöveg középre igazítva
- [ ] Közepes súlyok (400–600), nincs szélső kontraszt
- [ ] Minden felirat azonos méretű, nincs erős hierarchia

**Szín**
- [ ] Lila-kék gradiens a hero szekcióban
- [ ] Cián-on-sötét szín kombináció
- [ ] Félénk, egyenletesen elosztott középtónusok
- [ ] Lebegő gradient blob a háttérben

**Layout**
- [ ] Hero: nagy cím balra + ábra jobbra
- [ ] Három egyforma feature card ikon + cím + szöveg szerkezettel
- [ ] Testimonials szekció ugyanolyan kártyákkal
- [ ] Uniformis lekerekítés (16px) mindenhol
- [ ] Minden szekció azonos vertical padding

**Effektek**
- [ ] Glassmorphism dekorációként, funkció nélkül
- [ ] Fade-in-up animáció minden elemre
- [ ] Glow border egyszerű kártyákon

**Tartalom**
- [ ] „Build the future", „All-in-one", „Scale without limits" típusú szlogenek
- [ ] Lucide Icons vagy HeroIcons kizárólagos használata
- [ ] Stock fotó vagy AI-generált illusztráció valódi képek helyett

---

## 8. Felhasznált források

- Shin, D. et al. (2026). *Interrogating Design Homogenization in Web Vibe Coding*. arXiv:2603.13036
- 925Studios (2026). *AI Slop Web Design: Complete Guide to Spotting and Fixing Generic Websites*
- Anthropic (2025). *Prompting for Frontend Aesthetics* — platform.claude.com/cookbook
- Shuffle.dev (2026). *Why Do Most AI-Generated Websites Look the Same?*
- Teleanu, I. A. (2025). *Aesthetics in the AI Era: Visual + Web Design Trends for 2026*. Medium/Bootcamp
- impeccable.style (2026). *Anti-patterns — AI slop rules*
- Nielsen Norman Group (2024). *Glassmorphism: Definition and Best Practices*
- Harvard Gazette (2026). *Vibe coding may offer insight into our AI future* (Karen Brennan interjú)