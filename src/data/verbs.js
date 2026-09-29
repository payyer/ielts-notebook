// Source: teacher's "IRREGULAR VERB LIST.pdf" (Google Drive) — 76 verbs, same order and meanings.
// Each verb: base / past / pp ("a / b" = both forms are used), Vietnamese meaning, a pattern group,
// and two example sentences (the tested form in **bold**) for the "In context" practice.
// Optional: note, say (text for speech), accept.past / accept.pp (extra spellings when typing forms),
// pastCtxAccept / perfectCtxAccept (extra answers for the context sentences).

export const VERB_GROUPS = [
  { id: 'same', title: 'A – A – A: all three forms are the same', tip: 'The easiest group. Only **read** changes its sound: /riːd/ – /red/ – /red/.' },
  { id: 'aba', title: 'A – B – A: V3 = V1', tip: 'Only the past simple changes: come – **came** – come.' },
  { id: 'ought', title: 'V2 = V3 ending in -ought / -aught', tip: 'bring, buy, think → **-ought**; catch, teach → **-aught**.' },
  { id: 'short-vowel', title: 'Long vowel → short vowel + t / d', tip: 'The long sound becomes short: k**ee**p → k**e**pt, m**ee**t → m**e**t, l**ea**ve → l**e**ft.' },
  { id: 'small-change', title: 'Small ending change, V2 = V3', tip: '-d → -t (send → sent), -ay → -aid (pay → paid), -ell → -old (sell → sold), make → made, have → had, hear → heard.' },
  { id: 'vowel-change', title: 'Only the vowel changes, V2 = V3', tip: 'f**i**nd → f**ou**nd, s**i**t → s**a**t, w**i**n → w**o**n, st**i**ck → st**u**ck.' },
  { id: 'i-a-u', title: 'i → a → u', tip: 'Say them like a song: dr**i**nk – dr**a**nk – dr**u**nk, s**i**ng – s**a**ng – s**u**ng.' },
  { id: 'o-en', title: 'V2 with "o", V3 = V2 + (e)n', tip: 'Take the V2 and add -n / -en: broke → broke**n**, spoke → spoke**n**, forgot → forgott**en**.' },
  { id: 'i-en', title: 'V3 with a short "i" + -en', tip: 'Double the consonant in V3: bi**tten**, hi**dden**, ri**dden**, wri**tten**, dri**ven**.' },
  { id: 'base-en', title: 'V3 = V1 + (e)n', tip: 'V3 is the base verb + -n / -en: eat → eat**en**, take → take**n**, see → see**n**. Only V2 is different.' },
  { id: 'own', title: 'V3 ending in -own / -awn / -orn', tip: '-ow verbs: V2 **-ew**, V3 **-own** (know – knew – known). draw → drawn, wear → worn.' },
  { id: 'special', title: 'Special: learn by heart', tip: 'The most common verbs are the most irregular. Learn **be, do, go** as a chant.' },
  { id: 'regular', title: 'Regular verbs with spelling changes', tip: 'Not irregular, but easy to misspell: consonant + y → **-ied** (study → studied). learn → learned (US) / learnt (UK).' },
];

const verbs = [
  { no: 1, base: 'be', past: 'was / were', pp: 'been', meaning: 'thì / là / ở', group: 'special', note: 'I / he / she / it → was; you / we / they → were', exPast: 'The hotel **was** very crowded last weekend.', exPerfect: 'I have never **been** to Japan.' },
  { no: 2, base: 'become', past: 'became', pp: 'become', meaning: 'trở nên / trở thành', group: 'aba', exPast: 'She **became** a tour guide in 2020.', exPerfect: 'Online shopping has **become** very popular.' },
  { no: 3, base: 'bite', past: 'bit', pp: 'bitten', meaning: 'cắn', group: 'i-en', exPast: 'A dog **bit** my brother last week.', exPerfect: 'Mosquitoes have **bitten** me all over my arms.' },
  { no: 4, base: 'break', past: 'broke', pp: 'broken', meaning: 'làm vỡ / gãy', group: 'o-en', exPast: 'I **broke** my phone screen yesterday.', exPerfect: 'Someone has **broken** the window.' },
  { no: 5, base: 'bring', past: 'brought', pp: 'brought', meaning: 'mang', group: 'ought', exPast: 'She **brought** some cakes to the party last night.', exPerfect: 'Have you **brought** your passport?' },
  { no: 6, base: 'build', past: 'built', pp: 'built', meaning: 'xây dựng', group: 'small-change', exPast: 'They **built** a new bridge in 2019.', exPerfect: 'The city has **built** a lot of new roads recently.' },
  { no: 7, base: 'bury', past: 'buried', pp: 'buried', meaning: 'chôn', group: 'regular', note: 'Pronunciation: /ˈberi/', exPast: 'The pirates **buried** the treasure on an island.', exPerfect: 'The dog has **buried** its bone in the garden.' },
  { no: 8, base: 'buy', past: 'bought', pp: 'bought', meaning: 'mua', group: 'ought', exPast: 'I **bought** a ticket for the express bus yesterday.', exPerfect: 'I have just **bought** a new laptop.' },
  { no: 9, base: 'catch', past: 'caught', pp: 'caught', meaning: 'chụp / bắt / tóm lấy', group: 'ought', exPast: 'We **caught** the last train home last night.', exPerfect: 'Have you ever **caught** a fish?' },
  { no: 10, base: 'choose', past: 'chose', pp: 'chosen', meaning: 'chọn', group: 'o-en', exPast: 'She **chose** a single room because it was cheaper.', exPerfect: 'Have you **chosen** a destination for your trip?' },
  { no: 11, base: 'come', past: 'came', pp: 'come', meaning: 'đến', group: 'aba', exPast: 'My cousin **came** to visit us last Tet.', exPerfect: 'Winter has **come** early this year.' },
  { no: 12, base: 'cut', past: 'cut', pp: 'cut', meaning: 'cắt', group: 'same', exPast: 'I **cut** my finger while I was cooking last night.', exPerfect: 'We have **cut** down on eating out since prices went up.' },
  { no: 13, base: 'dig', past: 'dug', pp: 'dug', meaning: 'đào bới / moi', group: 'vowel-change', exPast: 'The workers **dug** a big hole in the road last week.', exPerfect: 'They have **dug** a new well in the village.' },
  { no: 14, base: 'do', past: 'did', pp: 'done', meaning: 'làm', group: 'special', exPast: 'I **did** my homework last night.', exPerfect: 'Have you **done** your homework yet?' },
  { no: 15, base: 'draw', past: 'drew', pp: 'drawn', meaning: 'vẽ', group: 'own', exPast: 'My sister **drew** a picture of our house yesterday.', exPerfect: 'He has **drawn** a map of the campsite for us.' },
  { no: 16, base: 'drink', past: 'drank', pp: 'drunk', meaning: 'uống', group: 'i-a-u', exPast: 'I **drank** three cups of coffee yesterday.', exPerfect: 'Have you ever **drunk** coconut coffee?' },
  { no: 17, base: 'drive', past: 'drove', pp: 'driven', meaning: 'lái (xe)', group: 'i-en', exPast: 'My father **drove** us to the airport last night.', exPerfect: 'I have never **driven** a car.' },
  { no: 18, base: 'eat', past: 'ate', pp: 'eaten', meaning: 'ăn', group: 'base-en', exPast: 'We **ate** banh chung at Tet last year.', exPerfect: 'Have you **eaten** dinner yet?' },
  { no: 19, base: 'fall', past: 'fell', pp: 'fallen', meaning: 'ngã / rơi', group: 'base-en', exPast: 'He **fell** off his bicycle yesterday.', exPerfect: 'Prices have **fallen** a little recently.' },
  { no: 20, base: 'feed', past: 'fed', pp: 'fed', meaning: 'cho ăn', group: 'short-vowel', exPast: 'I **fed** the cat before I went to school.', exPerfect: 'Have you **fed** the dog yet?' },
  { no: 21, base: 'feel', past: 'felt', pp: 'felt', meaning: 'cảm thấy', group: 'short-vowel', exPast: 'I **felt** nervous before my first IELTS exam.', exPerfect: 'I have never **felt** so tired in my life.' },
  { no: 22, base: 'find', past: 'found', pp: 'found', meaning: 'tìm thấy / nhận thấy', group: 'vowel-change', exPast: 'We **found** a cheap hostel near the beach.', exPerfect: 'Have you **found** your keys yet?' },
  { no: 23, base: 'fly', past: 'flew', pp: 'flown', meaning: 'bay', group: 'own', exPast: 'We **flew** to Da Nang last summer.', exPerfect: 'I have never **flown** in a helicopter.' },
  { no: 24, base: 'forget', past: 'forgot', pp: 'forgotten', meaning: 'quên', group: 'o-en', exPast: 'I **forgot** my umbrella at home yesterday.', exPerfect: 'I have **forgotten** his name.' },
  { no: 25, base: 'get', past: 'got', pp: 'gotten', meaning: 'nhận / đạt được', group: 'o-en', note: 'gotten = US English; UK English: get – got – got', accept: { pp: ['got'] }, exPast: 'I **got** a 20% discount yesterday.', exPerfect: 'Prices have **got** higher since last year.', perfectCtxAccept: ['gotten'] },
  { no: 26, base: 'give', past: 'gave', pp: 'given', meaning: 'cho / tặng', group: 'base-en', exPast: 'My grandmother **gave** me lucky money at Tet.', exPerfect: 'The teacher has **given** us a lot of homework.' },
  { no: 27, base: 'go', past: 'went', pp: 'gone / been', meaning: 'đi', group: 'special', note: 'has gone = is there now · has been = went and came back', exPast: 'We **went** on a trip to Hue last summer.', exPerfect: 'Mum has **gone** to the bank. She’ll be back soon.' },
  { no: 28, base: 'grow', past: 'grew', pp: 'grown', meaning: 'trồng / lớn lên / phát triển', group: 'own', exPast: 'I **grew** up in a small village.', exPerfect: 'The city has **grown** very fast.' },
  { no: 29, base: 'hang', past: 'hung', pp: 'hung', meaning: 'treo', group: 'vowel-change', exPast: 'We **hung** lanterns for the Mid-Autumn Festival.', exPerfect: 'She has **hung** a new picture in the living room.' },
  { no: 30, base: 'have', past: 'had', pp: 'had', meaning: 'có', group: 'small-change', exPast: 'We **had** a great time in Da Lat.', exPerfect: 'I have **had** this laptop for two years.' },
  { no: 31, base: 'hear', past: 'heard', pp: 'heard', meaning: 'nghe', group: 'small-change', exPast: 'I **heard** a strange noise last night.', exPerfect: 'Have you ever **heard** of this band?' },
  { no: 32, base: 'hide', past: 'hid', pp: 'hidden', meaning: 'trốn / che giấu', group: 'i-en', exPast: 'The children **hid** behind the door.', exPerfect: 'Someone has **hidden** my keys.' },
  { no: 33, base: 'hold', past: 'held', pp: 'held', meaning: 'cầm / giữ', group: 'vowel-change', exPast: 'She **held** the baby in her arms.', exPerfect: 'The school has **held** an English contest every year since 2015.' },
  { no: 34, base: 'hurry', past: 'hurried', pp: 'hurried', meaning: 'vội', group: 'regular', exPast: 'We **hurried** to catch the bus.', exPerfect: 'She has **hurried** home because her son is sick.' },
  { no: 35, base: 'hurt', past: 'hurt', pp: 'hurt', meaning: 'làm đau / tổn thương', group: 'same', exPast: 'I **hurt** my leg when I fell off my bike.', exPerfect: 'Have you **hurt** yourself?' },
  { no: 36, base: 'keep', past: 'kept', pp: 'kept', meaning: 'giữ', group: 'short-vowel', exPast: 'He **kept** in touch with his classmates after graduation.', exPerfect: 'I have **kept** all my old photos.' },
  { no: 37, base: 'know', past: 'knew', pp: 'known', meaning: 'biết', group: 'own', exPast: 'I **knew** the answer, but I was too shy to say it.', exPerfect: 'We have **known** each other since we were children.' },
  { no: 38, base: 'learn', past: 'learnt / learned', pp: 'learnt / learned', meaning: 'học', group: 'regular', note: 'learnt = UK · learned = US', exPast: 'I **learnt** a lot of new words last week.', pastCtxAccept: ['learned'], exPerfect: 'I have **learnt** a lot from my teacher.', perfectCtxAccept: ['learned'] },
  { no: 39, base: 'leave', past: 'left', pp: 'left', meaning: 'rời khỏi / bỏ quên', group: 'short-vowel', exPast: 'The train **left** at 7 a.m.', exPerfect: 'Oh no! I have **left** my wallet at home.' },
  { no: 40, base: 'lose', past: 'lost', pp: 'lost', meaning: 'đánh mất / thua', group: 'short-vowel', exPast: 'I **lost** my passport on my last trip.', exPerfect: 'He has **lost** touch with many old friends.' },
  { no: 41, base: 'make', past: 'made', pp: 'made', meaning: 'làm', group: 'small-change', exPast: 'I **made** a reservation for a double room.', exPerfect: 'She has **made** a lot of money from her online shop.' },
  { no: 42, base: 'mean', past: 'meant', pp: 'meant', meaning: 'có nghĩa', group: 'short-vowel', note: 'Pronunciation: meant /ment/', exPast: 'Sorry, I **meant** to call you yesterday.', exPerfect: 'This trip has **meant** a lot to me.' },
  { no: 43, base: 'meet', past: 'met', pp: 'met', meaning: 'gặp', group: 'short-vowel', exPast: 'I **met** my best friend at university.', exPerfect: 'Have you ever **met** a famous person?' },
  { no: 44, base: 'pay', past: 'paid', pp: 'paid', meaning: 'trả (tiền)', group: 'small-change', exPast: 'I **paid** by card at the restaurant last night.', exPerfect: "We haven't **paid** the electricity bill yet." },
  { no: 45, base: 'put', past: 'put', pp: 'put', meaning: 'đặt / để', group: 'same', exPast: 'She **put** her keys on the table and left.', exPerfect: 'I have **put** your book on your desk.' },
  { no: 46, base: 'read', past: 'read', pp: 'read', meaning: 'đọc', group: 'same', note: 'Pronunciation: read /riːd/ – read /red/ – read /red/', say: 'read, red, red', exPast: 'I **read** an interesting article yesterday.', exPerfect: 'Have you **read** this book?' },
  { no: 47, base: 'ride', past: 'rode', pp: 'ridden', meaning: 'cưỡi / đạp', group: 'i-en', exPast: 'I **rode** my bicycle to school when I was a child.', exPerfect: 'Have you ever **ridden** a horse?' },
  { no: 48, base: 'ring', past: 'rang', pp: 'rung', meaning: 'reo', group: 'i-a-u', exPast: 'The phone **rang** while I was sleeping.', exPerfect: 'Someone has **rung** the doorbell three times.' },
  { no: 49, base: 'run', past: 'ran', pp: 'run', meaning: 'chạy', group: 'aba', exPast: 'I **ran** to catch the bus.', exPerfect: 'He has **run** five kilometres this morning.' },
  { no: 50, base: 'say', past: 'said', pp: 'said', meaning: 'nói', group: 'small-change', note: 'Pronunciation: said /sed/', exPast: 'She **said** goodbye and left.', exPerfect: 'Have you **said** thank you to your teacher?' },
  { no: 51, base: 'see', past: 'saw', pp: 'seen', meaning: 'nhìn thấy', group: 'base-en', exPast: 'I **saw** a hot air balloon in the sky yesterday.', exPerfect: 'I have never **seen** snow.' },
  { no: 52, base: 'sell', past: 'sold', pp: 'sold', meaning: 'bán', group: 'small-change', exPast: 'He **sold** his old motorbike last month.', exPerfect: 'The shop has **sold** all its winter coats.' },
  { no: 53, base: 'send', past: 'sent', pp: 'sent', meaning: 'gửi', group: 'small-change', exPast: 'I **sent** you an email yesterday.', exPerfect: 'Have you **sent** the message yet?' },
  { no: 54, base: 'show', past: 'showed', pp: 'shown', meaning: 'trình bày / chỉ ra', group: 'own', exPast: 'The tour guide **showed** us many tourist attractions.', exPerfect: 'Research has **shown** that sleep helps memory.' },
  { no: 55, base: 'sing', past: 'sang', pp: 'sung', meaning: 'hát', group: 'i-a-u', exPast: 'We **sang** karaoke all night.', exPerfect: 'She has **sung** in many concerts.' },
  { no: 56, base: 'sink', past: 'sank', pp: 'sunk', meaning: 'chìm / lún', group: 'i-a-u', exPast: 'The Titanic **sank** in 1912.', exPerfect: 'The old boat has **sunk** to the bottom of the river.' },
  { no: 57, base: 'sit', past: 'sat', pp: 'sat', meaning: 'ngồi', group: 'vowel-change', exPast: 'We **sat** in a traffic jam for an hour.', exPerfect: 'She has **sat** at her desk all morning.' },
  { no: 58, base: 'sleep', past: 'slept', pp: 'slept', meaning: 'ngủ', group: 'short-vowel', exPast: 'I **slept** badly last night.', exPerfect: "I haven't **slept** well since I moved here." },
  { no: 59, base: 'slide', past: 'slid', pp: 'slid', meaning: 'trượt', group: 'vowel-change', exPast: 'The car **slid** on the wet road.', exPerfect: 'The children have **slid** down the slide ten times.' },
  { no: 60, base: 'speak', past: 'spoke', pp: 'spoken', meaning: 'nói', group: 'o-en', exPast: 'He **spoke** to the manager yesterday.', exPerfect: 'Have you ever **spoken** to a native speaker?' },
  { no: 61, base: 'spend', past: 'spent', pp: 'spent', meaning: 'dành / chi tiêu', group: 'small-change', exPast: 'I **spent** too much money last month.', exPerfect: 'We have **spent** all our budget.' },
  { no: 62, base: 'spin', past: 'spun', pp: 'spun', meaning: 'quay tròn', group: 'vowel-change', exPast: 'The dancer **spun** around on the stage.', exPerfect: 'The washing machine has **spun** the clothes dry.' },
  { no: 63, base: 'steal', past: 'stole', pp: 'stolen', meaning: 'ăn cắp', group: 'o-en', exPast: 'Someone **stole** my bag at the station.', exPerfect: 'Someone has **stolen** my bike!' },
  { no: 64, base: 'stick', past: 'stuck', pp: 'stuck', meaning: 'dán', group: 'vowel-change', exPast: 'I **stuck** a note on the fridge.', exPerfect: 'Someone has **stuck** chewing gum under the table.' },
  { no: 65, base: 'study', past: 'studied', pp: 'studied', meaning: 'học / nghiên cứu', group: 'regular', exPast: 'I **studied** English at a language centre last year.', exPerfect: 'She has **studied** for the IELTS exam for three months.' },
  { no: 66, base: 'swim', past: 'swam', pp: 'swum', meaning: 'bơi', group: 'i-a-u', exPast: 'We **swam** in the sea last summer.', exPerfect: 'Have you ever **swum** in a river?' },
  { no: 67, base: 'take', past: 'took', pp: 'taken', meaning: 'lấy', group: 'base-en', exPast: 'We **took** a ferry to Cat Ba Island.', exPerfect: 'The plane has just **taken** off.' },
  { no: 68, base: 'teach', past: 'taught', pp: 'taught', meaning: 'dạy', group: 'ought', exPast: 'My mother **taught** me how to cook.', exPerfect: 'She has **taught** English for ten years.' },
  { no: 69, base: 'tell', past: 'told', pp: 'told', meaning: 'kể / bảo', group: 'small-change', exPast: 'He **told** a joke to break the ice.', exPerfect: 'Have you **told** your parents about the trip?' },
  { no: 70, base: 'think', past: 'thought', pp: 'thought', meaning: 'suy nghĩ', group: 'ought', exPast: 'I **thought** the exam was easy.', exPerfect: 'Have you **thought** about your future job?' },
  { no: 71, base: 'try', past: 'tried', pp: 'tried', meaning: 'cố gắng / thử', group: 'regular', exPast: 'I **tried** egg coffee for the first time last year.', exPerfect: 'Have you ever **tried** Vietnamese street food?' },
  { no: 72, base: 'understand', past: 'understood', pp: 'understood', meaning: 'hiểu', group: 'vowel-change', exPast: 'I finally **understood** the lesson after the teacher explained it again.', exPerfect: 'Have you **understood** everything?' },
  { no: 73, base: 'wake', past: 'woke', pp: 'woken', meaning: 'thức dậy', group: 'o-en', exPast: 'I **woke** up at 5 a.m. yesterday.', exPerfect: 'The baby has just **woken** up.' },
  { no: 74, base: 'wear', past: 'wore', pp: 'worn', meaning: 'mặc', group: 'own', exPast: 'She **wore** a beautiful ao dai at Tet.', exPerfect: 'I have never **worn** a suit.' },
  { no: 75, base: 'win', past: 'won', pp: 'won', meaning: 'chiến thắng', group: 'vowel-change', note: 'Pronunciation: won /wʌn/', exPast: 'Our team **won** the match last Sunday.', exPerfect: 'She has **won** three awards so far.' },
  { no: 76, base: 'write', past: 'wrote', pp: 'written', meaning: 'viết', group: 'i-en', exPast: 'I **wrote** an email to my teacher yesterday.', exPerfect: 'Have you **written** your essay yet?' },
];

export default verbs;

// ---- helpers ----
export const splitForms = (s) => s.split('/').map((x) => x.trim());
export const firstForm = (s) => splitForms(s)[0];
export const chantText = (v) => v.say ?? `${v.base}, ${firstForm(v.past)}, ${firstForm(v.pp)}`;
export const chantLabel = (v) => `${v.base} – ${v.past} – ${v.pp}`;

// Answers accepted when typing a form: each variant, the whole "a / b", and extra spellings.
export const acceptedForms = (v, field) => [
  ...splitForms(v[field]),
  v[field],
  v[field].replace(/\s*\/\s*/g, '/'),
  ...(v.accept?.[field] ?? []),
];

export const boldOf = (sentence) => sentence.match(/\*\*(.+?)\*\*/)?.[1];
