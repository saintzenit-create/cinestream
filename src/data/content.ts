export interface MediaItem {
  id: string;
  title: string;
  slug: string;
  type: 'movie' | 'series';
  year: number;
  rating: number;
  genre: string[];
  image: string;
  alt: string;
  description?: string;
  duration?: string;
  episodes?: number;
  badge?: string;
  video?: string;

  thumbnail?: string;
poster?: string;
embed?: string;
views?: string;
quality?: string;
category?: string;
tags?: string[];
stars?: string[];
studio?: string;
}

export interface ContentRow {
  id: string;
  title: string;
  items: MediaItem[];
}

export const heroItem: MediaItem = {
  id: 'hero-1',
  title: 'Phantom Lawyer',
  slug: 'phantom-lawyer-2026',
  type: 'series',
  year: 2026,
  rating: 8.4,
  genre: ['Drama', 'Thriller', 'Legal'],
  image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1400&q=80',
  alt: 'Dramatic courtroom scene with lawyer standing in dark suit against city skyline backdrop',
  description: 'Seorang pengacara misterius yang tidak pernah kalah dalam persidangan muncul untuk membela klien-klien yang tampaknya tidak bersalah. Namun di balik kemenangan demi kemenangan, tersimpan rahasia gelap yang mengancam seluruh sistem hukum.',
  episodes: 16
};

export const trendingNow: MediaItem[] = [
{
  id: 't1',
  title: 'Phantom Lawyer',
  slug: 'phantom-lawyer-2026',
  type: 'series',
  year: 2026,
  rating: 8.4,
  genre: ['Drama', 'Thriller'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14ad861be-1767306026898.png",
  alt: 'Lawyer in dark suit standing in dimly lit courtroom with dramatic lighting'
},
{
  id: 't2',
  title: 'Perfect Crown',
  slug: 'perfect-crown-2026',
  type: 'series',
  year: 2026,
  rating: 8.7,
  genre: ['Romance', 'Drama'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_180aadc06-1767554824342.png",
  alt: 'Elegant woman wearing a golden crown in a royal palace setting'
},
{
  id: 't3',
  title: 'Project Hail Mary',
  slug: 'project-hail-mary-2026',
  type: 'movie',
  year: 2026,
  rating: 9.1,
  genre: ['Sci-Fi', 'Adventure'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_163fdf972-1772258118018.png",
  alt: 'Astronaut floating in space with Earth visible in the background'
},
{
  id: 't4',
  title: 'Bloodhounds',
  slug: 'bloodhounds-2023',
  type: 'series',
  year: 2023,
  rating: 7.9,
  genre: ['Action', 'Crime'],
  image: "https://images.unsplash.com/photo-1524051765476-99e2a18081a0",
  alt: 'Two young men in fighting stances on a rooftop at night in Seoul'
},
{
  id: 't5',
  title: 'The Boys',
  slug: 'the-boys-2019',
  type: 'series',
  year: 2019,
  rating: 8.7,
  genre: ['Action', 'Sci-Fi'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_125f6b01e-1777443376091.png",
  alt: 'Group of vigilantes standing in front of a burning city skyline'
},
{
  id: 't6',
  title: 'Euphoria',
  slug: 'euphoria-2019',
  type: 'series',
  year: 2019,
  rating: 8.4,
  genre: ['Drama', 'Teen'],
  image: "https://images.unsplash.com/photo-1512646605205-78422b7c7896",
  alt: 'Young woman with colorful glitter makeup at a neon-lit party'
},
{
  id: 't7',
  title: 'One Piece',
  slug: 'one-piece-1999',
  type: 'series',
  year: 1999,
  rating: 8.9,
  genre: ['Anime', 'Adventure'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d77a477f-1774952082616.png",
  alt: 'Pirate ship sailing on stormy ocean waves with dramatic sunset sky'
},
{
  id: 't8',
  title: 'Game of Thrones',
  slug: 'game-of-thrones-2011',
  type: 'series',
  year: 2011,
  rating: 9.2,
  genre: ['Fantasy', 'Drama'],
  image: "https://images.unsplash.com/photo-1575490561561-258380ca767b",
  alt: 'Medieval castle on a cliff overlooking a frozen landscape with dragons flying overhead'
},
{
  id: 't9',
  title: 'In Your Radiant Season',
  slug: 'in-your-radiant-season-2026',
  type: 'series',
  year: 2026,
  rating: 8.2,
  genre: ['Romance', 'Drama'],
  image: "https://images.unsplash.com/photo-1622285422722-b1b3eb36c728",
  alt: 'Young couple walking through cherry blossom trees in spring'
},
{
  id: 't10',
  title: 'Avatar: Fire and Ash',
  slug: 'avatar-fire-and-ash-2025',
  type: 'movie',
  year: 2025,
  rating: 8.0,
  genre: ['Animation', 'Adventure'],
  image: "https://images.unsplash.com/photo-1678338727666-13070a2cdcb0",
  alt: 'Volcanic landscape with fire and ash erupting against a dark sky'
}];


export const trendingInCountry: MediaItem[] = [
{
  id: 'tc1',
  title: 'Siren\'s Kiss',
  slug: 'sirens-kiss-2026',
  type: 'series',
  year: 2026,
  rating: 8.1,
  genre: ['Romance', 'Fantasy'],
  image: "https://images.unsplash.com/photo-1620408113933-a437c8c95208",
  alt: 'Beautiful woman with flowing hair standing near ocean waves at sunset'
},
{
  id: 'tc2',
  title: 'Parasite',
  slug: 'parasite-2019',
  type: 'movie',
  year: 2019,
  rating: 8.5,
  genre: ['Thriller', 'Drama'],
  image: "https://images.unsplash.com/photo-1577065360441-f2dd60d8f451",
  alt: 'Dark staircase leading underground in a modern Korean house'
},
{
  id: 'tc3',
  title: 'Guardian: The Lonely and Great God',
  slug: 'guardian-2016',
  type: 'series',
  year: 2016,
  rating: 8.7,
  genre: ['Fantasy', 'Romance'],
  image: "https://images.unsplash.com/photo-1668045766755-cf269aea8e09",
  alt: 'Handsome man in traditional Korean goblin costume standing in autumn forest'
},
{
  id: 'tc4',
  title: 'Memories of Murder',
  slug: 'memories-of-murder-2003',
  type: 'movie',
  year: 2003,
  rating: 8.1,
  genre: ['Crime', 'Thriller'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d979c600-1777443375018.png",
  alt: 'Detective examining crime scene in rural Korean countryside at dusk'
},
{
  id: 'tc5',
  title: '20th Century Girl',
  slug: '20th-century-girl-2022',
  type: 'movie',
  year: 2022,
  rating: 7.8,
  genre: ['Romance', 'Drama'],
  image: "https://images.unsplash.com/photo-1624241591012-18e58d0fd39a",
  alt: 'Young woman in 90s fashion holding a camera in a school hallway'
},
{
  id: 'tc6',
  title: 'Boyfriend on Demand',
  slug: 'boyfriend-on-demand-2026',
  type: 'series',
  year: 2026,
  rating: 7.6,
  genre: ['Romance', 'Comedy'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f83e0e05-1775306167988.png",
  alt: 'Charming young man smiling in a modern city apartment'
},
{
  id: 'tc7',
  title: 'High Potential',
  slug: 'high-potential-2024',
  type: 'series',
  year: 2024,
  rating: 8.0,
  genre: ['Crime', 'Drama'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1463f6cea-1777443375322.png",
  alt: 'Brilliant woman detective analyzing evidence on a digital board'
},
{
  id: 'tc8',
  title: 'JUJUTSU KAISEN',
  slug: 'jujutsu-kaisen-2020',
  type: 'series',
  year: 2020,
  rating: 8.6,
  genre: ['Anime', 'Action'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_18be6ae6b-1773156317649.png",
  alt: 'Anime-style warrior with cursed energy glowing around his fists in dark setting'
},
{
  id: 'tc9',
  title: 'You Are the Apple of My Eye',
  slug: 'apple-of-my-eye-2025',
  type: 'movie',
  year: 2025,
  rating: 7.9,
  genre: ['Romance', 'Drama'],
  image: "https://images.unsplash.com/photo-1613715651608-0e2ecf9d1558",
  alt: 'Young couple sharing a tender moment under cherry blossom trees'
},
{
  id: 'tc10',
  title: 'The Old Woman with the Knife',
  slug: 'old-woman-knife-2025',
  type: 'movie',
  year: 2025,
  rating: 7.5,
  genre: ['Action', 'Thriller'],
  image: "https://images.unsplash.com/photo-1707689578384-c4c1ff148abd",
  alt: 'Elderly woman in black coat standing in a dark alley with city lights behind her'
}];


export const networkOriginals: MediaItem[] = [
{
  id: 'no1',
  title: 'Chernobyl',
  slug: 'chernobyl-2019',
  type: 'series',
  year: 2019,
  rating: 9.4,
  genre: ['Drama', 'History'],
  image: "https://images.unsplash.com/photo-1557776181-a03b0dc142f8",
  alt: 'Abandoned nuclear power plant with smoke rising against grey sky',
  badge: 'HBO'
},
{
  id: 'no2',
  title: 'Hacks',
  slug: 'hacks-2021',
  type: 'series',
  year: 2021,
  rating: 8.1,
  genre: ['Comedy', 'Drama'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f83fb062-1772555589267.png",
  alt: 'Female comedian performing on stage with bright spotlight',
  badge: 'HBO'
},
{
  id: 'no3',
  title: 'True Blood',
  slug: 'true-blood-2008',
  type: 'series',
  year: 2008,
  rating: 7.9,
  genre: ['Horror', 'Fantasy'],
  image: "https://images.unsplash.com/photo-1575668610457-dcce0e9e7404",
  alt: 'Dark gothic scene with vampire standing in misty Louisiana swamp at night',
  badge: 'HBO'
},
{
  id: 'no4',
  title: 'Six Feet Under',
  slug: 'six-feet-under-2001',
  type: 'series',
  year: 2001,
  rating: 8.7,
  genre: ['Drama', 'Dark Comedy'],
  image: "https://images.unsplash.com/photo-1560298379-40e8c327303c",
  alt: 'Funeral home exterior at dusk with a single light in the window',
  badge: 'HBO'
},
{
  id: 'no5',
  title: 'The Comeback',
  slug: 'the-comeback-2005',
  type: 'series',
  year: 2005,
  rating: 8.0,
  genre: ['Comedy', 'Mockumentary'],
  image: "https://images.unsplash.com/photo-1620130314217-61bdd81c5e14",
  alt: 'Actress on a Hollywood set surrounded by cameras and crew',
  badge: 'HBO'
},
{
  id: 'no6',
  title: 'Adventure Time: Fionna and Cake',
  slug: 'adventure-time-fionna-cake-2023',
  type: 'series',
  year: 2023,
  rating: 8.3,
  genre: ['Animation', 'Fantasy'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_132ebe8c4-1772639750296.png",
  alt: 'Colorful animated landscape with magical floating islands and rainbow sky',
  badge: 'MAX'
},
{
  id: 'no7',
  title: 'The Wizard of Lies',
  slug: 'wizard-of-lies-2017',
  type: 'movie',
  year: 2017,
  rating: 7.2,
  genre: ['Drama', 'Biography'],
  image: "https://images.unsplash.com/photo-1729147888911-36d045f82897",
  alt: 'Businessman in expensive suit sitting in a courtroom looking defeated',
  badge: 'HBO'
},
{
  id: 'no8',
  title: 'Climax',
  slug: 'climax-2026',
  type: 'series',
  year: 2026,
  rating: 8.0,
  genre: ['Thriller', 'Drama'],
  image: "https://images.unsplash.com/photo-1637961239617-9e41d1521c6d",
  alt: 'Intense close-up of a person\'s face illuminated by dramatic red light',
  badge: 'NETFLIX'
},
{
  id: 'no9',
  title: 'Vanished Name',
  slug: 'vanished-name-2026',
  type: 'series',
  year: 2026,
  rating: 7.8,
  genre: ['Mystery', 'Thriller'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_16f589b03-1766219557404.png",
  alt: 'Detective looking at a wall covered with missing persons photos and clues',
  badge: 'DISNEY+'
},
{
  id: 'no10',
  title: 'The Dark Romance',
  slug: 'the-dark-romance-2026',
  type: 'series',
  year: 2026,
  rating: 7.9,
  genre: ['Romance', 'Thriller'],
  image: "https://images.unsplash.com/photo-1643903918342-c87707c0c880",
  alt: 'Couple in dramatic embrace in a dark gothic mansion corridor',
  badge: 'PRIME'
}];


export const collections: MediaItem[] = [
{
  id: 'col1',
  title: 'Even If This Love Disappears Tonight',
  slug: 'even-if-love-disappears-2025',
  type: 'movie',
  year: 2025,
  rating: 8.0,
  genre: ['Romance', 'Drama'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_186e31d47-1766553361571.png",
  alt: 'Young couple holding hands watching fireworks over a Japanese city at night'
},
{
  id: 'col2',
  title: 'Parasite',
  slug: 'parasite-2019',
  type: 'movie',
  year: 2019,
  rating: 8.5,
  genre: ['Thriller', 'Drama'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_146a1cd7e-1777443373876.png",
  alt: 'Staircase leading to a hidden basement in a luxurious modern Korean home'
},
{
  id: 'col3',
  title: 'Memories of Murder',
  slug: 'memories-of-murder-2003',
  type: 'movie',
  year: 2003,
  rating: 8.1,
  genre: ['Crime', 'Thriller'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1eadc3f3d-1772843079320.png",
  alt: 'Two detectives standing in a misty Korean rice field at dawn'
},
{
  id: 'col4',
  title: 'Guardian: The Lonely and Great God',
  slug: 'guardian-2016',
  type: 'series',
  year: 2016,
  rating: 8.7,
  genre: ['Fantasy', 'Romance'],
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  alt: 'Immortal goblin standing in a field of golden wheat with magical light'
},
{
  id: 'col5',
  title: '20th Century Girl',
  slug: '20th-century-girl-2022',
  type: 'movie',
  year: 2022,
  rating: 7.8,
  genre: ['Romance', 'Drama'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_178c7a7e6-1777443375660.png",
  alt: 'Teenage girl in 1999 school uniform holding a video camera in a hallway'
},
{
  id: 'col6',
  title: 'Siren\'s Kiss',
  slug: 'sirens-kiss-2026',
  type: 'series',
  year: 2026,
  rating: 8.1,
  genre: ['Romance', 'Fantasy'],
  image: "https://images.unsplash.com/photo-1586601473758-846acb72d517",
  alt: 'Mysterious woman with flowing hair emerging from ocean waves at night'
},
{
  id: 'col7',
  title: 'The Concubine',
  slug: 'the-concubine-2012',
  type: 'movie',
  year: 2012,
  rating: 7.1,
  genre: ['Historical', 'Drama'],
  image: "https://images.unsplash.com/photo-1726045330925-618ab0083f9b",
  alt: 'Woman in traditional Korean royal court dress in a palace garden'
},
{
  id: 'col8',
  title: 'You Are the Apple of My Eye',
  slug: 'apple-of-my-eye-2025',
  type: 'movie',
  year: 2025,
  rating: 7.9,
  genre: ['Romance', 'Drama'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_12c2c6d2a-1777443375550.png",
  alt: 'Young couple sharing first love moment in a school classroom'
},
{
  id: 'col9',
  title: 'Boyfriend on Demand',
  slug: 'boyfriend-on-demand-2026',
  type: 'series',
  year: 2026,
  rating: 7.6,
  genre: ['Romance', 'Comedy'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_17081a330-1774804414715.png",
  alt: 'Handsome young man in casual outfit smiling in a modern Seoul apartment'
},
{
  id: 'col10',
  title: 'The Old Woman with the Knife',
  slug: 'old-woman-knife-2025',
  type: 'movie',
  year: 2025,
  rating: 7.5,
  genre: ['Action', 'Thriller'],
  image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80',
  alt: 'Elderly female assassin in dark clothing walking through neon-lit city streets'
}];


export const recentMovies: MediaItem[] = [
{
  id: 'rm1',
  title: 'Project Hail Mary',
  slug: 'project-hail-mary-2026',
  type: 'movie',
  year: 2026,
  rating: 9.1,
  genre: ['Sci-Fi', 'Adventure'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a61d832b-1776179435612.png",
  alt: 'Lone astronaut floating in deep space with distant stars and nebula'
},
{
  id: 'rm2',
  title: 'Ready or Not: Here I Come',
  slug: 'ready-or-not-2026',
  type: 'movie',
  year: 2026,
  rating: 7.8,
  genre: ['Horror', 'Thriller'],
  image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80',
  alt: 'Woman in wedding dress running through a dark mansion corridor'
},
{
  id: 'rm3',
  title: 'The Legend of Aang',
  slug: 'legend-of-aang-2026',
  type: 'movie',
  year: 2026,
  rating: 8.3,
  genre: ['Animation', 'Adventure'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_170c5bc94-1777443374794.png",
  alt: 'Young airbender monk flying on a giant sky bison over mountain peaks'
},
{
  id: 'rm4',
  title: 'Reminders of Him',
  slug: 'reminders-of-him-2026',
  type: 'movie',
  year: 2026,
  rating: 8.0,
  genre: ['Romance', 'Drama'],
  image: "https://images.unsplash.com/photo-1566277913310-9834504c22e7",
  alt: 'Woman standing alone in a field of wildflowers looking at the horizon'
},
{
  id: 'rm5',
  title: 'My Sister\'s Bones',
  slug: 'my-sisters-bones-2026',
  type: 'movie',
  year: 2026,
  rating: 7.6,
  genre: ['Drama', 'Mystery'],
  image: "https://images.unsplash.com/photo-1608825541761-6b8adf69e3fd",
  alt: 'Two sisters standing in a foggy forest with autumn leaves falling'
},
{
  id: 'rm6',
  title: 'The Super Mario Galaxy Movie',
  slug: 'super-mario-galaxy-2026',
  type: 'movie',
  year: 2026,
  rating: 7.9,
  genre: ['Animation', 'Family'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d0198b2b-1772735884421.png",
  alt: 'Animated plumber hero jumping through colorful galaxy with stars and planets'
},
{
  id: 'rm7',
  title: 'The Yeti',
  slug: 'the-yeti-2026',
  type: 'movie',
  year: 2026,
  rating: 7.2,
  genre: ['Horror', 'Adventure'],
  image: "https://images.unsplash.com/photo-1670458132363-ab2ed185d621",
  alt: 'Snowy mountain peak with mysterious large footprints in the snow'
},
{
  id: 'rm8',
  title: 'Infiltrate',
  slug: 'infiltrate-2026',
  type: 'movie',
  year: 2026,
  rating: 7.5,
  genre: ['Action', 'Spy'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1eaafb065-1770840864726.png",
  alt: 'Secret agent in tactical gear infiltrating a high-security facility at night'
},
{
  id: 'rm9',
  title: 'Dreams',
  slug: 'dreams-2025',
  type: 'movie',
  year: 2025,
  rating: 8.1,
  genre: ['Drama', 'Fantasy'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bcec5dec-1773154876269.png",
  alt: 'Surreal dreamscape with floating islands and ethereal light beams'
},
{
  id: 'rm10',
  title: 'Thrash',
  slug: 'thrash-2026',
  type: 'movie',
  year: 2026,
  rating: 7.3,
  genre: ['Action', 'Sports'],
  image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80',
  alt: 'Skateboarder performing aerial trick at an underground skate park'
}];


export const recentSeries: MediaItem[] = [
{
  id: 'rs1',
  title: 'Perfect Crown',
  slug: 'perfect-crown-2026',
  type: 'series',
  year: 2026,
  rating: 8.7,
  genre: ['Romance', 'Drama'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_134c0a3fe-1777443374355.png",
  alt: 'Royal princess wearing an ornate crown in a palace throne room'
},
{
  id: 'rs2',
  title: 'Vanished Name',
  slug: 'vanished-name-2026',
  type: 'series',
  year: 2026,
  rating: 7.8,
  genre: ['Mystery', 'Thriller'],
  image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80',
  alt: 'Detective standing in front of a wall covered with missing person files'
},
{
  id: 'rs3',
  title: 'The Dark Romance',
  slug: 'the-dark-romance-2026',
  type: 'series',
  year: 2026,
  rating: 7.9,
  genre: ['Romance', 'Thriller'],
  image: "https://images.unsplash.com/photo-1584126668318-af4416d1830a",
  alt: 'Couple in passionate embrace in a candlelit gothic mansion'
},
{
  id: 'rs4',
  title: 'The Holy Grail of Eris',
  slug: 'holy-grail-eris-2026',
  type: 'series',
  year: 2026,
  rating: 7.7,
  genre: ['Anime', 'Fantasy'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_122371886-1777443374410.png",
  alt: 'Anime noble lady in Victorian dress holding a mysterious glowing artifact'
},
{
  id: 'rs5',
  title: 'Midsummer is Full of Love',
  slug: 'midsummer-love-2020',
  type: 'series',
  year: 2020,
  rating: 7.5,
  genre: ['Romance', 'Drama'],
  image: "https://images.unsplash.com/photo-1601061641848-634ad2398d7d",
  alt: 'Young couple sharing a summer kiss in a sunflower field'
},
{
  id: 'rs6',
  title: 'Malcolm in the Middle: Life\'s Still Unfair',
  slug: 'malcolm-middle-2026',
  type: 'series',
  year: 2026,
  rating: 8.2,
  genre: ['Comedy', 'Family'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_131972b45-1774088185044.png",
  alt: 'Chaotic family dinner scene with kids arguing and parents looking exhausted'
},
{
  id: 'rs7',
  title: 'Big Mistakes',
  slug: 'big-mistakes-2026',
  type: 'series',
  year: 2026,
  rating: 7.4,
  genre: ['Comedy', 'Drama'],
  image: "https://images.unsplash.com/photo-1633994092265-91a90c17ddef",
  alt: 'Group of friends looking shocked and embarrassed in a city street'
},
{
  id: 'rs8',
  title: 'Bandi',
  slug: 'bandi-2026',
  type: 'series',
  year: 2026,
  rating: 7.6,
  genre: ['Action', 'Crime'],
  image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80',
  alt: 'Undercover detective in leather jacket walking through a neon-lit night market'
},
{
  id: 'rs9',
  title: 'Ripple',
  slug: 'ripple-2025',
  type: 'series',
  year: 2025,
  rating: 7.8,
  genre: ['Drama', 'Mystery'],
  image: "https://images.unsplash.com/photo-1665276460072-8caded96b191",
  alt: 'Ripples spreading across a dark lake surface at night with moonlight reflection'
},
{
  id: 'rs10',
  title: 'The Demon King\'s Daughter Is Too Kind!!',
  slug: 'demon-kings-daughter-2026',
  type: 'series',
  year: 2026,
  rating: 7.3,
  genre: ['Anime', 'Fantasy'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_15fe957ac-1769192720449.png",
  alt: 'Anime demon princess with pink hair and kind smile in a magical fantasy world'
}];


export const contentRows: ContentRow[] = [
{ id: 'trending-now', title: 'Trending Now', items: trendingNow },
{ id: 'trending-country', title: 'Trending di Indonesia', items: trendingInCountry },
{ id: 'network-originals', title: 'Network Originals', items: networkOriginals },
{ id: 'collections', title: 'Collections', items: collections },
{ id: 'recent-movies', title: 'Film Terbaru', items: recentMovies },
{ id: 'recent-series', title: 'Series Terbaru', items: recentSeries }];