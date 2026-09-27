// Source: teacher's Google Sheet — LIST 1 (LESSON 1-2)
import presentSimple from '../exercises/present-simple.js';
import presentContinuous from '../exercises/present-continuous.js';

export default {
  id: 'list-1',
  order: 1,
  title: 'List 1: Communication',
  description: 'Lessons 1–2 · Present simple & Present continuous',

  vocabulary: [
    { word: 'verbal communication', type: 'n phr', ipa: '/ˈvɜːbl kəˌmjuːnɪˈkeɪʃn/', meaning: 'giao tiếp bằng lời nói', example: 'Verbal communication is essential in a job interview.' },
    { word: 'non-verbal communication', type: 'n phr', ipa: '/ˌnɒn ˈvɜːbl kəˌmjuːnɪˈkeɪʃn/', meaning: 'giao tiếp phi ngôn ngữ', example: 'Non-verbal communication, such as gestures, says a lot about a person.' },
    { word: 'body language', type: 'n phr', ipa: '/ˈbɒdi ˌlæŋɡwɪdʒ/', meaning: 'ngôn ngữ cơ thể', example: 'Her body language showed that she was nervous.' },
    { word: 'facial expression', type: 'n phr', ipa: '/ˌfeɪʃl ɪkˈspreʃn/', meaning: 'biểu cảm khuôn mặt', example: 'You can often tell how people feel from their facial expressions.' },
    { word: 'gesture', type: 'n', ipa: '/ˈdʒestʃə(r)/', meaning: 'cử chỉ', example: 'He made a friendly gesture to welcome us.' },
    { word: 'posture', type: 'n', ipa: '/ˈpɒstʃə(r)/', meaning: 'tư thế', example: 'Good posture makes you look more confident.' },
    { word: 'eye contact', type: 'n phr', ipa: '/ˈaɪ ˌkɒntækt/', meaning: 'giao tiếp bằng ánh mắt', example: 'Keeping eye contact shows that you are listening.' },
    { word: 'written communication', type: 'n phr', ipa: '/ˌrɪtn kəˌmjuːnɪˈkeɪʃn/', meaning: 'giao tiếp bằng văn bản', example: 'Email is the most common form of written communication at work.' },
    { word: 'digital communication', type: 'n phr', ipa: '/ˌdɪdʒɪtl kəˌmjuːnɪˈkeɪʃn/', meaning: 'giao tiếp kỹ thuật số', example: 'Digital communication lets us talk to people all over the world.' },
    { word: 'face-to-face communication', type: 'n phr', ipa: '/ˌfeɪs tə ˈfeɪs kəˌmjuːnɪˈkeɪʃn/', meaning: 'giao tiếp trực tiếp', example: 'I prefer face-to-face communication because it feels more personal.' },
    { word: 'social media platforms', type: 'n phr', ipa: '/ˌsəʊʃl ˈmiːdiə ˈplætfɔːmz/', meaning: 'các nền tảng mạng xã hội', example: 'Young people spend hours on social media platforms every day.' },
    { word: 'online meeting platforms', type: 'n phr', meaning: 'các nền tảng họp trực tuyến', note: 'e.g. Google Meet, Zoom', example: 'Many companies use online meeting platforms for remote work.' },
    { word: 'messaging apps', type: 'n phr', meaning: 'các ứng dụng nhắn tin', note: 'e.g. Zalo, Messenger', example: 'I usually chat with my family on messaging apps.' },
    {
      word: 'e-commerce platforms / online shopping platforms',
      type: 'n phr',
      meaning: 'các nền tảng mua sắm trực tuyến',
      note: 'e.g. Shopee, TikTok Shop',
      accept: ['e-commerce platforms', 'online shopping platforms'],
      example: 'Online shopping platforms make it easy to compare prices.',
    },
    { word: 'communication barrier', type: 'n phr', ipa: '/kəˌmjuːnɪˈkeɪʃn ˈbæriə(r)/', meaning: 'rào cản giao tiếp', example: 'Cultural differences can create communication barriers.' },
    { word: 'language barrier', type: 'n phr', ipa: '/ˈlæŋɡwɪdʒ ˌbæriə(r)/', meaning: 'rào cản ngôn ngữ', example: 'The language barrier made it hard for him to make friends abroad.' },
    { word: 'express ideas', type: 'v phr', ipa: '/ɪkˈspres aɪˈdɪəz/', meaning: 'diễn đạt ý tưởng', example: 'Reading widely helps you express ideas more clearly.' },
    { word: 'convey a message', type: 'v phr', ipa: '/kənˈveɪ ə ˈmesɪdʒ/', meaning: 'truyền tải thông điệp', example: 'A good advert conveys a message in just a few seconds.' },
    { word: 'misunderstand each other', type: 'v phr', ipa: '/ˌmɪsʌndəˈstænd/', meaning: 'hiểu lầm nhau', example: 'People sometimes misunderstand each other when they text instead of talking.' },
    { word: 'keep in touch with s.o', type: 'v phr', meaning: 'giữ liên lạc', accept: ['keep in touch with someone', 'keep in touch with sb', 'keep in touch'], example: 'I keep in touch with my old classmates through Facebook.' },
    { word: 'lose touch with s.o', type: 'v phr', meaning: 'mất liên lạc', accept: ['lose touch with someone', 'lose touch with sb', 'lose touch'], example: 'I lost touch with many friends after I moved to a new city.' },
    { word: 'interact', type: 'v', ipa: '/ˌɪntərˈækt/', meaning: 'tương tác', example: 'Children learn by interacting with others.' },
    { word: 'communicate effectively', type: 'v phr', ipa: '/kəˈmjuːnɪkeɪt ɪˈfektɪvli/', meaning: 'giao tiếp hiệu quả', example: 'Leaders need to communicate effectively with their team.' },
    { word: 'lack communication skills', type: 'v phr', ipa: '/læk kəˌmjuːnɪˈkeɪʃn skɪlz/', meaning: 'thiếu kỹ năng giao tiếp', example: 'Some graduates lack communication skills, so they struggle in interviews.' },
    { word: 'get on well with s.o', type: 'v phr', meaning: 'hòa hợp với ai', accept: ['get on well with someone', 'get on well with sb', 'get on well with'], example: 'I get on well with all my colleagues.' },
    { word: 'be on the same wavelength', type: 'idiom', meaning: 'cùng tần số / tâm đầu ý hợp', example: 'I get along well with my best friend because we’re always on the same wavelength.' },
    { word: 'break the ice', type: 'idiom', meaning: '"phá băng" / phá vỡ sự ngượng ngùng', example: 'He told a joke to break the ice at the beginning of the meeting.' },
    { word: 'speak one’s mind', type: 'idiom', meaning: 'nói thẳng / nghĩ gì nói nấy', accept: ["speak one's mind", 'speak your mind'], example: 'He is an honest man; he always speaks his mind.' },
  ],

  grammar: [
    {
      id: 'present-simple',
      title: 'Present simple',
      summary: 'Facts, habits, likes/states and fixed timetables.',
      forms: [
        { label: 'To be: am / is / are', lines: ['(+) S + am/is/are + O', '(–) S + am/is/are + not + O', '(?) Am/Is/Are + S + O?'] },
        { label: 'Ordinary verbs', lines: ['(+) S + V(s/es) + O', '(–) S + don’t/doesn’t + V + O', '(?) Do/Does + S + V + O?'] },
      ],
      uses: [
        { text: 'Facts and general truths', example: 'The Sun **rises** in the east.' },
        { text: 'Habits or repeated actions in the present', example: 'He usually **gets** up at 5 o’clock.' },
        { text: 'Likes, states or characteristics in the present', example: 'My cousin **doesn’t like** collecting stamps.' },
        { text: 'Fixed schedules and timetables', example: 'The train **leaves** at 7 p.m.' },
      ],
      signalWords: [
        'Adverbs of frequency: always, usually, often, sometimes, seldom, rarely, never',
        'every day / week / month / year',
        'once / twice a week',
        'on Mondays, at weekends ...',
      ],
      notes: [
        'He / She / It + V-**s/es**: talk → talks, watch → watches, study → studies, have → **has**.',
        'After **do/does/don’t/doesn’t**, use the base verb: Does she **like** ...? (not likes)',
        'Adverbs of frequency go **before** the main verb but **after** be: She **often** texts me. / She **is often** late.',
      ],
      commonMistakes: [
        { wrong: 'He always **speak** his mind.', right: 'He always **speaks** his mind.', why: 'he / she / it → add -s/-es.' },
        { wrong: 'She **doesn’t likes** phone calls.', right: 'She **doesn’t like** phone calls.', why: 'After doesn’t, use the base verb.' },
        { wrong: 'He **always is** late.', right: 'He **is always** late.', why: 'Adverbs of frequency go after be.' },
      ],
      exercises: presentSimple,
    },
    {
      id: 'present-continuous',
      title: 'Present continuous',
      summary: 'Actions happening **now / around now**, and **arranged** future plans.',
      forms: [
        { lines: ['(+) S + am/is/are + V-ing + O', '(–) S + am/is/are + not + V-ing + O', '(?) Am/Is/Are + S + V-ing + O?'] },
      ],
      uses: [
        { text: 'Actions happening at the moment of speaking', example: 'He **is doing** his homework now.' },
        { text: 'Actions happening around the present time, not necessarily at this exact moment', example: 'I **am reading** an interesting book these days.' },
        { text: 'Arranged plans in the near future', example: 'We **are meeting** our teacher tomorrow.' },
      ],
      signalWords: [
        'now, right now, at the moment, at present, currently',
        'today / this week / these days',
        'Look! / Listen!',
      ],
      notes: [
        'Stative verbs (like, love, hate, know, want, understand, believe, need) are normally **not** used in the continuous: I **know** (not am knowing).',
        'Spelling: make → mak**ing**, sit → sit**ting**, lie → l**ying**.',
        'Present simple = habits/facts; Present continuous = now/temporary: She usually **emails** me, but today she **is calling** me.',
      ],
      commonMistakes: [
        { wrong: 'I **am knowing** what you mean.', right: 'I **know** what you mean.', why: '"know" is a stative verb.' },
        { wrong: 'Look! The baby **sleeps**.', right: 'Look! The baby **is sleeping**.', why: '"Look!" → happening now.' },
        { wrong: 'She **working** from home this week.', right: 'She **is working** from home this week.', why: 'Don’t forget am/is/are.' },
      ],
      exercises: presentContinuous,
    },
  ],
};
