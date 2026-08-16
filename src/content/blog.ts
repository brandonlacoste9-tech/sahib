export type BlogImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'dish'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'img'; image: BlogImage }
  | { type: 'aside'; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readMinutes: number;
  cover: BlogImage;
  body: BlogBlock[];
};

export const posts: BlogPost[] = [
  {
    slug: 'what-is-balti-cooking-the-birmingham-curry-tradition-behind-sahib-s-balti-pot-dishes',
    title:
      "What Is Balti Cooking? The Birmingham Curry Tradition Behind Sahib's Balti Pot Dishes",
    excerpt:
      "Balti didn't come from a single region of the subcontinent. It came from a working-class neighbourhood in England, invented by immigrant chefs who wanted to feed their new city something fast, fresh, and completely their own.",
    author: 'Emilie Chopra',
    publishedAt: '2026-08-13',
    readMinutes: 4,
    cover: {
      src: '/blog/balti-cover.jpg',
      alt: 'Balti pot of curry with naan at Sahib',
      width: 1600,
      height: 1068,
    },
    body: [
      {
        type: 'p',
        text: "Every cuisine has a few dishes that come with a real story attached, and balti is one of them for Indian and Pakistani food. It didn't come from a single region of the subcontinent passed down over centuries. It came from a working-class neighborhood in England, invented by immigrant chefs who wanted to feed their new city something fast, fresh, and completely their own. That's the tradition sitting behind the balti pot dishes on Sahib's menu, and it's worth understanding before you order one.",
      },
      {
        type: 'img',
        image: {
          src: '/blog/balti-inline.jpg',
          alt: 'Balti pot served at the table',
          width: 1600,
          height: 1066,
        },
      },
      { type: 'h2', text: 'What Is Balti Cooking?' },
      {
        type: 'p',
        text: "Balti refers to both a cooking method and the pot it's named after. A balti is a flat-bottomed, pressed-steel bowl with two small handles, built to heat up fast and hold its heat once it's off the burner. The defining feature of balti cooking is that the dish gets cooked and served in that exact same pot. Nothing gets transferred to a serving dish. It arrives at the table still sizzling from the stove.",
      },
      {
        type: 'p',
        text: "That one detail changes the whole experience. Because the balti goes straight from flame to table, the food stays hotter longer, the edges pick up a light char and caramelization that a dish simmered and then plated never gets, and the meal keeps cooking gently even after it reaches you. It's simple in concept, but it produces a texture and intensity of flavor that's genuinely different from a standard curry.",
      },
      { type: 'h2', text: 'The Birmingham Origin Story' },
      {
        type: 'p',
        text: "Balti was invented in Birmingham, England, in the 1970s, not in South Asia. Restaurateur Mohammed Arif, who opened Adil's on Stoney Lane in the Sparkbrook neighborhood in 1977, is widely credited as the driving force behind it. He was cooking for Birmingham's growing Pakistani and Kashmiri community, but he also wanted to bring in a wider crowd of local customers who weren't used to traditional South Asian cooking or its pace.",
      },
      {
        type: 'p',
        text: "His solution was to rework the method itself. He used boneless meat instead of meat on the bone, cooked with vegetable oil instead of ghee for a lighter result, and used the high heat and small batch size of the balti pot to get a full dish on the table in minutes instead of the long, slow simmer that a lot of traditional curries need. The result caught on fast. Within a few years, dozens of balti houses had opened along Stoney Lane, Ladypool Road, and Stratford Road, an area that's still known today as Birmingham's Balti Triangle.",
      },
      {
        type: 'p',
        text: "What started as one restaurant's answer to a local market became one of the most significant developments in British South Asian cooking, and it's still tied closely enough to that one city that people simply call it Birmingham balti.",
      },
      { type: 'h2', text: 'What Makes Balti Dishes Unique' },
      {
        type: 'p',
        text: 'A few things separate balti from a typical curry beyond just the pot it\'s cooked in. The sauce itself tends to be thicker and more concentrated than a standard curry gravy, built quickly over high heat with onions, tomatoes, and a fresh blend of whole and ground spices rather than a long-simmered base.',
      },
      {
        type: 'p',
        text: 'Balti is also traditionally eaten with naan instead of rice. Diners tear off pieces of large, shared naan and use them to scoop straight from the pot, which makes it a naturally communal way to eat. Restaurants in Birmingham lean into this by serving oversized naan meant for the whole table, not individual portions.',
      },
      {
        type: 'p',
        text: "And because everything happens fast, over high heat, in a single pot, balti dishes come out with a freshness that's hard to fake. There's no reheating a pre-made batch. Each order gets built from that point forward, which is exactly why the dish became known for tasting like it just came off the stove, because it did.",
      },
      { type: 'h2', text: 'Popular Balti Dishes to Try' },
      {
        type: 'p',
        text: 'Chicken balti is the most common starting point, tender chicken pieces cooked fast in that thick, spiced sauce. Lamb balti brings a richer, deeper flavor that holds up well against the intensity of the spice blend. For something without meat, a mixed vegetable balti or a paneer balti delivers the same fast, high-heat treatment with cauliflower, peppers, potatoes, and soft cheese picking up char and flavor in the pot.',
      },
      {
        type: 'p',
        text: 'Prawn balti is a lighter option for anyone who wants the balti treatment without a heavier meat, and keema balti, made with spiced minced meat, is a hearty option that pairs especially well with fresh naan for scooping. Across all of them, the common thread is the same: fast heat, a concentrated sauce, and a dish that never left the pot it was cooked in.',
      },
      { type: 'h2', text: "Sahib's Take on Balti Pot Dishes" },
      {
        type: 'p',
        text: "Sahib's [à la carte menu](/menu) includes balti pot dishes inspired directly by that Birmingham tradition, alongside the restaurant's bhojan vegetarian platters and tandoori grill feasts. It's a deliberate nod to a specific culinary lineage, not a generic curry with a different name on the menu. The professional Indian chefs at both Sahib locations prepare each balti to order, keeping the fast, high-heat method that made the dish what it is in the first place.",
      },
      {
        type: 'p',
        text: "It sits well alongside the rest of Sahib's approach to food, which leans on fresh preparation and a wide range of spice levels rather than a one-size-fits-all curry sauce. Whether you're already familiar with balti from a trip to the UK or trying it for the first time, it's prepared the way it's meant to be, hot, fast, and straight from the pot.",
      },
      { type: 'h2', text: "Why Try Balti at Sahib's" },
      {
        type: 'p',
        text: 'Sahib has been serving the West Island for over 20 years, and that kind of longevity comes from getting the fundamentals right meal after meal. Balti pot dishes are a natural fit for a restaurant that already built its reputation on tandoori cooking and made-to-order preparation, since both rely on the same idea: high heat, fresh ingredients, and no shortcuts.',
      },
      {
        type: 'p',
        text: "With locations in Pointe-Claire and Dorval, dine-in or take-away, a balti pot dish is an easy way to try something with real history behind it without needing to book a flight to England to do it. Order one with a side of naan, share it the way it's meant to be shared, and you're tasting a genuine piece of British-South Asian culinary history.",
      },
      { type: 'h2', text: 'Conclusion' },
      {
        type: 'p',
        text: "Balti cooking is proof that a great culinary tradition doesn't need centuries to become authentic. It needed one Birmingham neighborhood, a handful of determined restaurateurs, and a pot designed to do one job well. Sahib's balti pot dishes carry that same idea forward: cook it fast, serve it hot, and let the pot do the work. That's the whole tradition, and it's on the menu.",
      },
    ],
  },
  {
    slug: 'indian-catering-for-montreal-events-what-to-know-before-you-book',
    title: 'Indian Catering for Montreal Events: What to Know Before You Book',
    excerpt:
      "Whether you're planning a wedding, corporate luncheon, birthday, or family gathering, Indian cuisine has become one of Montreal's most popular catering choices. Here's what to know before you book.",
    author: 'Emilie Chopra',
    publishedAt: '2026-07-21',
    readMinutes: 3,
    cover: {
      src: '/blog/catering-cover.jpg',
      alt: 'Indian catering spread for a Montreal event',
      width: 1600,
      height: 990,
    },
    body: [
      {
        type: 'p',
        text: "Whether you're planning a wedding, corporate luncheon, birthday celebration, or family gathering, great food can make the difference between a good event and a memorable one. Indian cuisine has become one of Montreal's most popular catering choices thanks to its bold flavors, diverse menu options, and ability to accommodate a wide range of dietary preferences. If you're considering [Indian catering in Montreal](/catering), here's what you should know before making your booking.",
      },
      {
        type: 'img',
        image: {
          src: '/blog/catering-inline.jpg',
          alt: 'Catered Indian dishes plated for an event',
          width: 1600,
          height: 1068,
        },
      },
      {
        type: 'h2',
        text: 'Types of Events Indian Caterers Serve in Montreal',
      },
      {
        type: 'p',
        text: 'Professional Indian caterers can accommodate events of almost any size. From intimate dinner parties to weddings with hundreds of guests, experienced catering teams can tailor menus and service to fit the occasion.',
      },
      {
        type: 'p',
        text: 'At Sahib in Pointe-Claire, catering services are available for weddings, corporate events, birthdays, baby showers, retirement celebrations, holiday parties, graduations, celebrations of life, and private gatherings. Depending on your needs, food can be delivered, professionally set up, or fully serviced on-site with experienced staff.',
      },
      { type: 'h2', text: 'Popular Indian Cuisine Styles Available' },
      {
        type: 'p',
        text: 'One of the biggest advantages of Indian catering is the incredible variety available.',
      },
      {
        type: 'p',
        text: 'Many Montreal caterers offer favorites such as butter chicken, chicken tikka, lamb curry, biryani, naan, samosas, and tandoori specialties, alongside a wide selection of vegetarian dishes. Modern menus often include vegan and gluten-conscious options as well, making it easier to accommodate guests with different dietary requirements.',
      },
      {
        type: 'p',
        text: 'Sahib is known for its authentic Indian cuisine prepared by professional Indian chefs, with dishes ranging from traditional curries and tandoori grills to vegetarian platters and Indo-Chinese favorites. Their Pointe-Claire location is also well known in the West Island for its popular lunch buffet.',
      },
      { type: 'h2', text: 'What to Know Before You Book' },
      {
        type: 'p',
        text: 'Before choosing an Indian caterer in Montreal, think beyond the menu.',
      },
      {
        type: 'p',
        text: 'Start with your guest count and venue. Will food be delivered ready to serve, or do you require full-service catering with staff? Consider whether your venue has kitchen facilities or if everything must arrive fully prepared.',
      },
      {
        type: 'p',
        text: "It's also worth discussing spice levels. Authentic Indian cuisine can be customized to suit a wide range of tastes, from very mild to traditionally spicy, ensuring every guest enjoys the meal.",
      },
      {
        type: 'p',
        text: 'Finally, ask whether the caterer provides serving equipment, disposable or reusable tableware, beverages, and cleanup services. These details can simplify event planning considerably.',
      },
      { type: 'h2', text: 'Questions to Ask an Indian Caterer Before Booking' },
      {
        type: 'p',
        text: 'Before signing your contract, ask a few important questions:',
      },
      {
        type: 'ul',
        items: [
          'Can the menu be customized?',
          'Do you offer vegetarian, vegan, gluten-free, or allergy-friendly options?',
          'How far in advance should I book?',
          'Do you provide serving staff?',
          'Can you accommodate large weddings or corporate functions?',
          'Is setup and cleanup included?',
          'Are tasting sessions available before major events?',
        ],
      },
      {
        type: 'p',
        text: 'Clear communication upfront helps ensure there are no surprises on the day of your event.',
      },
      { type: 'h2', text: 'How to Choose the Right Indian Caterer in Montreal' },
      {
        type: 'p',
        text: 'When comparing Indian catering services in Montreal, experience matters.',
      },
      {
        type: 'p',
        text: 'Look for a caterer with an established reputation, authentic recipes, flexible menu options, and experience handling events similar to yours. Reading customer reviews and viewing photos from previous events can also provide valuable insight into food presentation and service quality.',
      },
      {
        type: 'p',
        text: 'Serving the West Island for more than 20 years, Sahib has built a reputation for authentic Indian cuisine, professional catering services, and personalized event planning. Whether you\'re organizing a wedding reception, business function, or private celebration, their team works closely with clients to create menus tailored to both the event and the guests.',
      },
      { type: 'h2', text: 'Frequently Asked Questions' },
      {
        type: 'h3',
        text: 'How far in advance should I book Indian catering in Montreal?',
      },
      {
        type: 'p',
        text: 'For weddings and larger events, booking several months ahead is recommended. Smaller private events may require less notice depending on availability.',
      },
      {
        type: 'h3',
        text: 'Can Indian catering accommodate dietary restrictions?',
      },
      {
        type: 'p',
        text: 'Yes. Most experienced caterers offer vegetarian, vegan, and gluten-conscious menu options, along with customized selections for allergies and food sensitivities.',
      },
      {
        type: 'h3',
        text: "Is Indian food suitable for guests who don't like spicy food?",
      },
      {
        type: 'p',
        text: 'Absolutely. Spice levels can usually be adjusted, allowing everyone to enjoy authentic Indian flavors without excessive heat.',
      },
      { type: 'h3', text: 'Do Indian caterers provide serving staff?' },
      {
        type: 'p',
        text: 'Many do. Depending on the event, catering packages may include delivery, buffet setup, professional servers, rentals, and cleanup services.',
      },
      { type: 'h2', text: 'Conclusion' },
      {
        type: 'p',
        text: "Choosing the right Indian caterer in Montreal is about more than simply selecting great food. It's about finding a team that understands your event, works within your budget, and delivers an experience your guests will remember long after the last plate is cleared.",
      },
      {
        type: 'p',
        text: "If you're planning an upcoming event in Montreal or the West Island, [Sahib's catering team](/catering) offers authentic cuisine, flexible service options, and customized menus designed to make every celebration memorable.",
      },
    ],
  },
  {
    slug: 'indian-buffet-vs-a-la-carte-which-is-right-for-your-visit-to-an-indian-restaurant',
    title:
      'Indian Buffet vs. A la Carte: Which Is Right for Your Visit to an Indian Restaurant?',
    excerpt:
      'Walking into Sahib, most guests pause at the threshold: buffet to the left, the dining room ahead. Neither is a compromise. They are genuinely different meals.',
    author: 'Emilie Chopra',
    publishedAt: '2026-06-20',
    readMinutes: 4,
    cover: {
      src: '/blog/buffet-vs-cover.jpg',
      alt: 'Buffet line and dining room at Sahib Pointe-Claire',
      width: 1600,
      height: 1068,
    },
    body: [
      {
        type: 'p',
        text: 'Walking into Sahib for the first time, most guests pause for a second at the threshold. To the left, the buffet stations are laid out in a warm, aromatic spread. Ahead, the dining room offers intimate table settings where servers move with purpose. It is a small moment, but it is a real decision: go for the all-you-can-eat experience, or settle in and order what calls to you.',
      },
      {
        type: 'p',
        text: "For over 20 years, Sahib has been the West Island's premier destination for authentic Indian cuisine, earning a devoted following at its Pointe-Claire location. The restaurant runs both formats side by side, which means guests are free to choose based on the occasion, their appetite, and what kind of afternoon or evening they have in mind. Neither option is a compromise. Both are fully realized. But they are genuinely different experiences, and understanding that difference helps you get the most out of your visit.",
      },
      {
        type: 'h2',
        text: 'What Is the Difference Between Indian Buffet and A la Carte?',
      },
      {
        type: 'p',
        text: 'The core distinction comes down to structure versus selection. A buffet sets a defined spread and invites you to eat freely from it. A la carte puts the full menu in your hands and lets you build a meal dish by dish, at your own pace.',
      },
      {
        type: 'p',
        text: 'At Sahib, the lunch buffet runs Wednesday through Sunday from 11:30 AM to 2:30 PM, exclusively at the Pointe-Claire location. It is freshly prepared and rotates around favourites including butter chicken, lamb curry, chicken tikka, basmati rice, and naan. There is always a vegetarian component, and dessert is typically part of the spread. The price point stays under $30 per person, making it one of the more accessible ways to experience proper North Indian cooking on the West Island.',
      },
      {
        type: 'p',
        text: 'The [a la carte menu](/menu) is available at all times across both locations, Pointe-Claire and the newer Dorval Village spot. It covers a broader range of dishes: bhojan vegetarian platters, tandoori grill feasts, balti pot dishes inspired by the Birmingham UK tradition, and a full [pub menu](/pub) that includes beer, wine, and cocktails. The early-bird special on weekdays (5:00 PM to 6:30 PM, excluding holidays) also falls under the a la carte structure, offering a lighter-priced entry into the evening menu.',
      },
      {
        type: 'p',
        text: 'Neither is a lesser version of Indian food. They are two different relationships with the same kitchen.',
      },
      { type: 'h2', text: 'When to Choose the Buffet?' },
      {
        type: 'img',
        image: {
          src: '/blog/buffet-vs-buffet.jpg',
          alt: 'Lunch buffet stations at Sahib Pointe-Claire',
          width: 1600,
          height: 1036,
        },
      },
      {
        type: 'p',
        text: 'The buffet is built for certain situations, and it excels at all of them.',
      },
      {
        type: 'ul',
        items: [
          'You are exploring Indian cuisine for the first time or returning after a long gap. Tasting butter chicken, lamb curry, tikka, and a couple of vegetarian options in a single sitting gives you a working map of the cuisine\'s range without having to commit to a single dish and wonder what you missed.',
          'You are visiting with a group that has mixed preferences or varying appetites. The buffet removes the negotiation. Everyone eats what they want, at their own pace, and no one waits while someone finishes a course.',
          'You are on a weekday lunch schedule and want a satisfying, complete meal within a defined window. The buffet at Sahib is timed exactly for that rhythm, with the kitchen keeping the spread fresh through the 11:30 AM to 2:30 PM service.',
          'You want great value without a lot of deliberation. At Sahib, the buffet has long been recognized as unmatched in the West Island for freshness and variety. Five professional Indian chefs prepare it daily, and the standard does not slip.',
          'You are there on a Sunday evening or a statutory holiday. Sahib extends buffet service into Sunday dinner, which gives you the same generous spread in a slower, more relaxed evening setting.',
        ],
      },
      {
        type: 'aside',
        text: 'Also read: [A First Timer\'s Guide to Indian Buffet](/blog/what-to-expect-at-an-indian-buffet-a-first-timer-s-guide)',
      },
      { type: 'h2', text: 'When to Choose A la Carte?' },
      {
        type: 'img',
        image: {
          src: '/blog/buffet-vs-alacarte.jpg',
          alt: 'A la carte dishes at Sahib',
          width: 1600,
          height: 1068,
        },
      },
      {
        type: 'p',
        text: 'There are just as many situations where the a la carte menu is clearly the right call.',
      },
      {
        type: 'ul',
        items: [
          'You know what you want. If you have been thinking about the lamb vindaloo or the chicken jalfrezi since Tuesday, the buffet is not going to satisfy that specific craving. A la carte lets you order exactly that dish, prepared to order, at the spice level you request.',
          'You are dining in the evening. The buffet closes at 2:30 PM on weekdays and is not available at the Dorval location at all. Evenings at Sahib are entirely a la carte, and the kitchen has full range to work with the tandoori, balti, and platter menus that do not always appear on the buffet.',
          'You want to explore the deeper menu. Sahib\'s a la carte selection includes dishes like balti pots, inspired by the popular Birmingham UK trend, and bhojan vegetarian platters that are distinct experiences from the buffet staples. If you are a regular visitor who already knows the buffet well, this is how you go further.',
          'You are dining as a couple or a smaller group where pace matters. A la carte allows a proper sit-down meal with courses, drinks, and time between them. Paired with something from the pub menu, it becomes a full evening rather than a midday stop.',
          'You are using the early-bird special. Weekdays from 5:00 PM to 6:30 PM (excluding holidays), Sahib offers an early-bird pricing structure that makes a la carte dining especially accessible for those heading in after work.',
        ],
      },
      { type: 'h2', text: 'The Right Choice Depends on the Meal You Want to Have' },
      {
        type: 'p',
        text: 'Both formats at Sahib come from the same commitment to quality, the same five-chef kitchen, and the same two decades of experience serving the West Island. The buffet is the better choice when you want breadth, value, and ease. A la carte is the better choice when you want precision, depth, or a longer evening.',
      },
      {
        type: 'p',
        text: 'Sahib is one of the few Indian restaurants in Montreal\'s West Island that executes both with genuine care. The lunch buffet is frequently cited as the best in the area. The a la carte menu holds its own against any Indian restaurant in the city. Whether you are stopping in for a weekday lunch or settling in for a Friday evening at the Dorval location, there is no wrong answer. There is only the question of what kind of meal you are in the mood to have.',
      },
    ],
  },
  {
    slug: 'what-to-expect-at-an-indian-buffet-a-first-timer-s-guide',
    title: "What to Expect at an Indian Buffet: A First Timer's Guide",
    excerpt:
      'An Indian buffet is the single best way to try Indian cuisine for the first time. No wrong order, no wasted dish — taste five things and go back for thirds on whatever you love.',
    author: 'Emilie Chopra',
    publishedAt: '2026-05-20',
    readMinutes: 7,
    cover: {
      src: '/blog/first-timer-cover.jpg',
      alt: 'First plate at an Indian buffet',
      width: 1600,
      height: 1068,
    },
    body: [
      {
        type: 'p',
        text: 'Walking up to an Indian buffet for the first time can feel a little overwhelming. The spread is long, the dishes are unfamiliar, and every pot seems to be a different color. That hesitation is completely normal. But here is the thing: an Indian buffet is actually the single best way to try Indian cuisine for the first time, precisely because of that variety. There is no risk of ordering the wrong thing off a menu. There is no commitment to a single dish. You can taste five things in one visit and go back for thirds on whatever you love. The buffet format gives you a no-pressure platform to explore the full range of Indian flavor without ever having to guess.',
      },
      { type: 'h2', text: 'What an Indian Buffet Actually Looks Like' },
      {
        type: 'p',
        text: 'Most people picture Indian food as one thing. In reality, Indian cuisine spans an entire subcontinent of regional traditions, ingredients, and techniques. A well-run buffet reflects that.',
      },
      {
        type: 'p',
        text: "At Sahib's Pointe-Claire buffet, every dish is freshly prepared by five professional Indian chefs and rotated throughout the lunch service to ensure nothing sits. Here is what you will typically encounter moving through the stations:",
      },
      {
        type: 'ul',
        items: [
          'Mains: The centrepiece of any Indian buffet. Expect curries, braised meats, and slow-cooked dishes in rich sauces. Classics like butter chicken, lamb curry, and chicken tikka are standard anchors of the spread.',
          'Dal and legumes: Lentil-based dishes that range from mild and comforting to deeply spiced. One of the most nutritious things on the table and often overlooked by first-timers.',
          'Vegetable dishes: Not sides. At a serious Indian buffet, dishes like aloo gobi (potato and cauliflower), palak paneer (spinach and cheese), and chana masala (spiced chickpeas) are full dishes in their own right.',
          'Rice: Usually basmati, plain or lightly seasoned. The neutral base that holds everything together on your plate.',
          'Breads: Naan is the one most people know, but you may also find roti or paratha. Fresh from the tandoor oven when done right, nothing else compares.',
          "Starters and snacks: Samosas, pakoras, and other fried or baked bites typically appear near the front of the buffet. Sahib's samosa has been voted best samosa by West Islanders, and for good reason. It is the first thing the staff recommend to every newcomer.",
          'Chutneys and condiments: Small bowls of tamarind sauce, mint chutney, and raita (a cool yogurt dip) that change everything depending on what you pair them with.',
          'Desserts: Common options include gulab jamun (soft milk-solid dumplings soaked in sugar syrup), kheer (rice pudding), and carrot halwa. Sweet, rich, and a fine way to end.',
        ],
      },
      { type: 'h2', text: 'Where to Start: Your First Plate Strategy' },
      {
        type: 'img',
        image: {
          src: '/blog/first-timer-plate.jpg',
          alt: 'A first plate at Sahib with curry, rice and naan',
          width: 1200,
          height: 1800,
        },
      },
      {
        type: 'p',
        text: 'The most common first-timer mistake is loading up the plate with everything at once, tasting nothing properly, and running out of room before the best dishes. Here is a smarter approach.',
      },
      {
        type: 'p',
        text: "Start with the samosa. It is the perfect entry point: crispy, portable, and a clean introduction to Indian spicing without committing to a full plate of anything. Sahib's samosa was voted best samosa by West Islanders, and it earns that reputation.",
      },
      {
        type: 'p',
        text: 'Build your first plate around two mains. Pick one meat-based curry and one vegetable dish. Butter chicken is the gentlest starting point for anyone new to the cuisine. Pair it with something like dal or aloo gobi to see the contrast between the saucy mains and the drier vegetable preparations.',
      },
      {
        type: 'p',
        text: 'Add rice, not bread, on your first plate. Naan is tempting and delicious, but it fills you up fast. Rice lets you taste more things before you hit a wall.',
      },
      {
        type: 'p',
        text: 'Use the chutneys. A small amount of tamarind or mint chutney alongside your samosa, or a spoonful of raita next to a spicier dish, completely transforms the experience. Do not skip them.',
      },
      {
        type: 'p',
        text: 'Save bread for your second plate. By then you will know what you love and can use the naan to mop up the sauces you want more of.',
      },
      {
        type: 'p',
        text: 'Leave room for dessert. Gulab jamun in particular is worth saving space for.',
      },
      { type: 'h2', text: 'Understanding the Dishes' },
      { type: 'dish', text: 'Butter Chicken (Murgh Makhani)' },
      {
        type: 'p',
        text: 'The most approachable dish on almost any Indian buffet. Tender chicken in a rich, mildly spiced tomato and cream sauce. Slightly sweet. Barely any heat. The entry-level benchmark.',
      },
      { type: 'dish', text: 'Lamb Curry' },
      {
        type: 'p',
        text: "Slow-braised lamb in a deeply flavoured sauce. Richer and more complex than butter chicken, with more spice and body. Sahib's lamb curry is one of the standout dishes on the buffet and a consistent favourite among regulars.",
      },
      { type: 'dish', text: 'Chicken Tikka' },
      {
        type: 'p',
        text: 'Marinated chicken pieces that have been cooked in a tandoor oven. Smoky, slightly charred at the edges, and intensely flavoured from the marinade. Often appears as both a starter and a main.',
      },
      { type: 'dish', text: 'Palak Paneer' },
      {
        type: 'p',
        text: 'Cubed fresh cheese in a smooth, seasoned spinach sauce. One of the most popular vegetarian dishes in North Indian cooking. Mild, creamy, and deeply satisfying even for non-vegetarians.',
      },
      { type: 'dish', text: 'Chana Masala' },
      {
        type: 'p',
        text: 'Chickpeas cooked in a tangy tomato-based sauce with cumin, coriander, and warm spices. Bold and earthy. One of the most protein-dense options on the buffet.',
      },
      { type: 'dish', text: 'Aloo Gobi' },
      {
        type: 'p',
        text: 'A dry-style dish of potato and cauliflower cooked with turmeric, ginger, and spices. Less saucy than the curries, which makes it a good contrast on the plate.',
      },
      { type: 'dish', text: 'Dal' },
      {
        type: 'p',
        text: 'A broad category covering any lentil-based dish. Dal makhani (creamy black lentils) and dal tarka (yellow lentils tempered with spiced oil) are the most common. Mild, warming, and endlessly comforting.',
      },
      { type: 'dish', text: 'Tandoori Dishes' },
      {
        type: 'p',
        text: "Anything cooked in the clay tandoor oven. Lean, high-heat cooking that produces charred, intensely flavoured results. Sahib's tandoori dishes are prepared lean and fat-free, making them a lighter option alongside the richer curries.",
      },
      { type: 'dish', text: 'Balti Dishes' },
      {
        type: 'p',
        text: 'A specialty at Sahib that most Indian restaurants in Montreal do not offer. Balti is a Birmingham UK-inspired cooking style where dishes are prepared and served in a small steel wok, creating intense concentrated flavours. If you see it on the buffet, try it. It is something genuinely different.',
      },
      { type: 'dish', text: 'Samosa' },
      {
        type: 'p',
        text: 'A triangular pastry filled with spiced potato and peas, fried until golden. The universal Indian snack and the best starting point on the buffet.',
      },
      { type: 'dish', text: 'Gulab Jamun' },
      {
        type: 'p',
        text: 'Small, round dumplings made from reduced milk solids, deep-fried and soaked in a light sugar syrup scented with rose water and cardamom. Soft, sweet, and the most common Indian buffet dessert for good reason.',
      },
      {
        type: 'h2',
        text: 'Navigating Spice Levels: Honest Advice For Every Palate',
      },
      {
        type: 'p',
        text: 'Indian food has a reputation for heat that is sometimes warranted and sometimes wildly overstated. The reality at a buffet is more nuanced.',
      },
      {
        type: 'p',
        text: 'At Sahib, professional Indian chefs offer authentic Indian fare at all levels of spiciness, which means the buffet is built to serve a wide range of palates. Most dishes served at a lunch buffet aimed at a general audience lean toward approachable heat rather than fire. You are not walking into a chilli competition.',
      },
      { type: 'p', text: 'Here is how to read the spread:' },
      {
        type: 'ul',
        items: [
          'Mild and safe for anyone: Butter chicken, dal makhani, palak paneer, most rice dishes, naan, and tandoori chicken. These dishes have spice in the aromatic sense, meaning complex layers of cumin, cardamom, and coriander, but little to no chilli heat.',
          'Medium heat: Chana masala, lamb curry, aloo gobi, and most standard curries on the buffet. You will feel warmth, but it is manageable and pleasant, not punishing.',
          'Spicier territory: Vindaloo, madras-style dishes, and anything labelled hot on the buffet. North Indian dishes tend to be less spicy than South Indian preparations like vindaloo or Madras curry. If you are heat-sensitive, read labels and ask the staff.',
        ],
      },
      {
        type: 'p',
        text: 'The raita rule: Always have raita nearby. The cool yogurt dip cuts heat fast and makes it easier to work your way through dishes that are a little hotter than expected. Dairy, not water, is what neutralizes capsaicin.',
      },
      {
        type: 'p',
        text: 'If you are genuinely heat-sensitive, stick to the mild column, use raita freely, and know that a good Indian buffet has more than enough flavor to satisfy without ever touching the hot dishes.',
      },
      { type: 'h2', text: 'The Vegetarian and Vegan Experience' },
      {
        type: 'p',
        text: 'Indian cuisine is one of the most vegetarian-friendly culinary traditions in the world, and a good Indian buffet reflects that in practice rather than as a reluctant accommodation.',
      },
      {
        type: 'p',
        text: "Sahib's attention to quality is evident in its gluten-free choices and enough selection for a vegetarian paradise. At Sahib's buffet, vegetarian dishes are not an afterthought. They are a core part of the spread.",
      },
      {
        type: 'p',
        text: "The bhojan vegetarian platter is a menu highlight in its own right. Dishes like palak paneer, chana masala, aloo gobi, and dal are satisfying, protein-rich, and deeply flavourful. A table of vegetarians eating at Sahib's buffet will not feel like they are making do with the leftovers from the meat section.",
      },
      {
        type: 'p',
        text: 'Indian buffets are also among the most inclusive dining formats for mixed dietary groups. A table with vegetarians, meat eaters, and people avoiding gluten can all eat generously at the same spread. That flexibility is worth noting if you are choosing a restaurant for a group with different dietary needs.',
      },
      {
        type: 'p',
        text: "For those eating vegan, the main thing to watch is dairy. Dishes with paneer (fresh cheese) or those finished with cream or butter are not vegan, but many of the lentil, chickpea, and vegetable-based dishes are. When in doubt, Sahib's staff can point you in the right direction.",
      },
      { type: 'h2', text: "What Makes Sahib's West Island Buffet Different" },
      {
        type: 'p',
        text: 'Sahib has been serving authentic North Indian food in the heart of Montreal\'s West Island since 2003. That is over two decades of running the same lunch buffet, refining it, and introducing hundreds of first-timers to Indian cuisine.',
      },
      { type: 'p', text: 'Here is what that experience looks like in practice:' },
      {
        type: 'ul',
        items: [
          'Five professional chefs, fresh throughout service. Favourites like butter chicken, succulent lamb curry, chicken tikka, naan, and basmati rice. Nothing is reheated from the day before.',
          'Authentic regional variety. The spread draws from both North and South Indian traditions, giving you a genuine cross-section of the cuisine rather than a narrowed-down greatest-hits list.',
          'The balti pots. Balti pot dishes inspired by the popular Birmingham UK trend are a feature that sets Sahib apart from every other Indian buffet in the West Island.',
          "The samosa. Voted best samosa by West Islanders and consistently the first recommendation Sahib's staff make to anyone walking in for the first time.",
          'A staff that knows how to welcome first-timers. Over twenty years of service means the team has introduced the cuisine to an enormous number of people who had never tried Indian food before.',
        ],
      },
      {
        type: 'p',
        text: 'The lunch buffet runs Wednesday through Sunday from 11:30 AM to 2:30 PM, with a Sunday evening and statutory holiday buffet also available. Sahib is located at 225B Boulevard Hymus in Pointe-Claire.',
      },
      { type: 'h2', text: 'The Bottom Line' },
      {
        type: 'p',
        text: 'An Indian buffet is not just a good way to try Indian food for the first time. It is the best way. The format removes every obstacle: no wrong order, no wasted dish, no commitment before you know what you like. You taste your way through a cuisine with centuries of depth and regional variety, at your own pace, for a lunch price.',
      },
      {
        type: 'p',
        text: 'Sahib has been making that introduction for over twenty years. If you have been curious and just have not made the leap yet, the buffet at Pointe-Claire is as good a place as any to start.',
      },
      {
        type: 'aside',
        text: 'Also read: [Indian Buffet vs. A la Carte](/blog/indian-buffet-vs-a-la-carte-which-is-right-for-your-visit-to-an-indian-restaurant)',
      },
    ],
  },
];

export function getPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPostSlugs(): string[] {
  return posts.map((post) => post.slug);
}
