/* GSVMCH — Bangla / English language toggle
   Default language: Bangla (bn), proper Bengali script. Stored in
   localStorage under "gsvmch-lang". Every visible string lives in the
   I18N dict below; HTML elements carry data-i18n (text), data-i18n-html
   (inner HTML) or data-i18n-ph (placeholder). Department <option>
   elements carry data-dept="<English value>" and their display text
   switches while the option value stays English. */
(function () {
  'use strict';

  var STR = {
    /* ---- shared chrome ---- */
    'brand.name': { bn: 'গণস্বাস্থ্য সমাজ ভিত্তিক মেডিকেল কলেজ হাসপাতাল', en: 'Gonoshasthaya Samaj Vittik Medical College Hospital' },
    'brand.sub': { bn: 'জিএসভিএমসিএইচ — সাভার, ঢাকা', en: 'GSVMCH — Savar, Dhaka' },
    'top.addr': { bn: '📍 মির্জানগর, আশুলিয়া, সাভার, ঢাকা-১৩৪৪', en: '📍 Mirzanagar, Ashulia, Savar, Dhaka-1344' },
    'top.emergency': { bn: 'জরুরি: [নিশ্চিত করা হয়নি]', en: 'Emergency: [To be confirmed]' },
    'top.notice': { bn: 'নোটিশ', en: 'Notice' },
    'top.gallery': { bn: 'গ্যালারি', en: 'Gallery' },
    'nav.home': { bn: 'হোম', en: 'Home' },
    'nav.about': { bn: 'আমাদের সম্পর্কে', en: 'About' },
    'nav.departments': { bn: 'বিভাগসমূহ', en: 'Departments' },
    'nav.doctors': { bn: 'চিকিৎসকগণ', en: 'Doctors' },
    'nav.services': { bn: 'সেবাসমূহ', en: 'Services' },
    'nav.diagnostics': { bn: 'ডায়াগনস্টিক', en: 'Diagnostics' },
    'nav.appointments': { bn: 'অ্যাপয়েন্টমেন্ট', en: 'Appointment' },
    'nav.guide': { bn: 'রোগীর নির্দেশিকা', en: 'Patient Guide' },
    'nav.notice': { bn: 'নোটিশ', en: 'Notice' },
    'nav.gallery': { bn: 'গ্যালারি', en: 'Gallery' },
    'nav.contact': { bn: 'যোগাযোগ', en: 'Contact' },
    'foot.addr': { bn: 'মির্জানগর, ভায়া সাভার ক্যান্টনমেন্ট, আশুলিয়া, সাভার, ঢাকা-১৩৪৪<br>২৫০ শয্যার হাসপাতাল, ১৯৭২ সাল থেকে', en: 'Mirzanagar, via Savar Cantonment, Ashulia, Savar, Dhaka-1344<br>250-bed hospital, established 1972' },
    'foot.contact_h': { bn: 'যোগাযোগ', en: 'Contact' },
    'foot.phone_note': { bn: 'ফোন নম্বরটি হাসপাতালের অফিস থেকে এখনো নিশ্চিত করা হয়নি।', en: 'This phone number has not yet been confirmed by the hospital office.' },
    'foot.quick': { bn: 'দ্রুত লিংক', en: 'Quick Links' },
    'foot.useful': { bn: 'প্রয়োজনীয় লিংক', en: 'Useful Links' },
    'foot.copy': { bn: '© ২০২৬ গণস্বাস্থ্য সমাজ ভিত্তিক মেডিকেল কলেজ হাসপাতাল। সর্বস্বত্ব সংরক্ষিত।', en: '© 2026 Gonoshasthaya Samaj Vittik Medical College Hospital. All Rights Reserved.' },
    'foot.copy_short': { bn: '© গণস্বাস্থ্য সমাজ ভিত্তিক মেডিকেল কলেজ হাসপাতাল, সাভার', en: '© Gonoshasthaya Samaj Vittik Medical College Hospital, Savar' },

    /* ---- department display names (option value stays English) ---- */
    'dept.Emergency': { bn: 'জরুরি', en: 'Emergency' },
    'dept.Surgery': { bn: 'সার্জারি', en: 'Surgery' },
    'dept.Medicine': { bn: 'মেডিসিন', en: 'Medicine' },
    'dept.Gyne and Obs': { bn: 'গাইনি ও প্রসূতি', en: 'Gyne and Obs' },
    'dept.Paediatric Surgery': { bn: 'শিশু সার্জারি', en: 'Paediatric Surgery' },
    'dept.Pediatric': { bn: 'শিশুরোগ', en: 'Pediatric' },
    'dept.ENT': { bn: 'ইএনটি', en: 'ENT' },
    'dept.Skin': { bn: 'চর্ম', en: 'Skin' },
    'dept.Eye': { bn: 'চক্ষু', en: 'Eye' },
    'dept.Orthopedics': { bn: 'অর্থোপেডিকস', en: 'Orthopedics' },
    'dept.Anesthesia': { bn: 'অ্যানেসথেসিয়া', en: 'Anesthesia' },
    'dept.Radiology': { bn: 'রেডিওলজি', en: 'Radiology' },
    'dept.Psychiatry': { bn: 'মনোরোগ', en: 'Psychiatry' },

    'dept.Nephrology': { bn: 'নেফ্রোলজি', en: 'Nephrology' },
    'doc.masrura_desig': { bn: 'সহযোগী অধ্যাপক ও বিভাগীয় প্রধান, মেডিসিন বিভাগ', en: 'Associate Professor and Head, Department of Medicine' },
    'doc.assoc_prof': { bn: 'সহযোগী অধ্যাপক', en: 'Associate Professor' },
    'about.zaf_h': { bn: 'ডা. জাফরুল্লাহ চৌধুরী সম্পর্কে', en: 'About Dr Zafrullah Chowdhury' },
    'about.zaf_p1': { bn: 'ডা. জাফরুল্লাহ চৌধুরী (২৭ ডিসেম্বর ১৯৪১ – ১১ এপ্রিল ২০২৩) ছিলেন গণস্বাস্থ্য কেন্দ্রের প্রতিষ্ঠাতা এবং বাংলাদেশের জনস্বাস্থ্য আন্দোলনের অগ্রদূত। ১৯৭১ সালে মুক্তিযুদ্ধের সময় তিনি ও তাঁর সহকর্মীরা ত্রিপুরার মেলাঘরে ৪৮০ শয্যার বাংলাদেশ ফিল্ড হাসপাতাল পরিচালনা করেন, যেখানে আহত মুক্তিযোদ্ধাদের চিকিৎসা দেওয়া হয়। ১৯৭২ সালে তিনি সাভারে গণস্বাস্থ্য কেন্দ্র প্রতিষ্ঠা করেন — সাধারণ ও দরিদ্র মানুষের জন্য সহজলভ্য স্বাস্থ্যসেবা দেওয়াই ছিল তাঁর জীবনের লক্ষ্য, তাই তাঁকে ‘গরিব মানুষের ডাক্তার’ বলা হতো। ১৯৮২ সালে বাংলাদেশের জাতীয় ওষুধ নীতি প্রণয়নেও তাঁর গুরুত্বপূর্ণ ভূমিকা ছিল।', en: 'Dr Zafrullah Chowdhury (27 December 1941 – 11 April 2023) was the founder of Gonoshasthaya Kendra and a pioneer of public health in Bangladesh. During the Liberation War in 1971, he and his colleagues ran the 480-bed Bangladesh Field Hospital at Melaghar, Tripura, treating wounded freedom fighters. In 1972 he founded Gonoshasthaya Kendra at Savar — affordable healthcare for ordinary and poor people was the mission of his life, and he was known as the "doctor of the poor". He also played a key role in formulating Bangladesh\'s National Drug Policy in 1982.' },
    'about.zaf_p2': { bn: 'তাঁর কাজের স্বীকৃতি হিসেবে তিনি পেয়েছেন দেশের সর্বোচ্চ বেসামরিক সম্মান স্বাধীনতা পুরস্কার (১৯৭৭), রামন ম্যাগসেসে পুরস্কার (১৯৮৫) এবং রাইট লাইভলিহুড পুরস্কার (১৯৯২)। মৃত্যুর পর ২০২৬ সালে তাঁকে আবারও স্বাধীনতা পুরস্কার দেওয়া হয় — সমাজসেবা বিভাগে, মরণোত্তর। ২০২৬ সালের ৫ মার্চ মন্ত্রিপরিষদ বিভাগ নাম ঘোষণা করে এবং ১৬ এপ্রিল ২০২৬ ঢাকার ওসমানী স্মৃতি মিলনায়তনে অনুষ্ঠানে তাঁর পক্ষে তাঁর ছেলে বারিশ হাসান চৌধুরী পুরস্কার গ্রহণ করেন। একই বছর গণস্বাস্থ্য কেন্দ্রও প্রতিষ্ঠান হিসেবে স্বাধীনতা পুরস্কার পায়। তিনি ১১ এপ্রিল ২০২৩ সালে ঢাকার গণস্বাস্থ্য নগর হাসপাতালে ৮১ বছর বয়সে মৃত্যুবরণ করেন। তাঁকে সাভারে গণস্বাস্থ্য কেন্দ্র প্রাঙ্গণে সমাহিত করা হয়। গণস্বাস্থ্য সমাজ ভিত্তিক মেডিকেল কলেজ হাসপাতাল তাঁর সেই স্বপ্ন ও আদর্শকে বহন করে চলেছে — সবার জন্য স্বাস্থ্যসেবা।', en: 'In recognition of his work he received the Independence Award (1977), Bangladesh\'s highest civilian honour, the Ramon Magsaysay Award (1985) and the Right Livelihood Award (1992). After his death he was awarded the Independence Award again in 2026 — posthumously, in the social service category. The Cabinet Division announced the names on 5 March 2026, and the award was conferred on 16 April 2026 at the Osmani Memorial Auditorium in Dhaka; his son Barish Hasan Chowdhury received it on his behalf. In the same year Gonoshasthaya Kendra also received the Independence Award as an institution. He passed away on 11 April 2023 at Gonoshasthaya Nagar Hospital in Dhaka, aged 81, and was buried on the Gonoshasthaya Kendra premises at Savar. Gonoshasthaya Samaj Vittik Medical College Hospital carries forward his dream and ideals — healthcare for all.' },
    'about.zaf_name': { bn: 'ডা. জাফরুল্লাহ চৌধুরী', en: 'Dr Zafrullah Chowdhury' },
    'about.zaf_role': { bn: 'গণস্বাস্থ্য কেন্দ্রের প্রতিষ্ঠাতা', en: 'Founder of Gonoshasthaya Kendra' },
    'about.zaf_dates': { bn: '২৭ ডিসেম্বর ১৯৪১ – ১১ এপ্রিল ২০২৩', en: '27 December 1941 – 11 April 2023' },
    'about.zaf_intro': { bn: 'গণস্বাস্থ্য কেন্দ্রের প্রতিষ্ঠাতা, বাংলাদেশের জনস্বাস্থ্য আন্দোলনের অগ্রদূত', en: 'Founder of Gonoshasthaya Kendra, pioneer of public health in Bangladesh' },
    'about.gate_cap': { bn: 'হাসপাতালের প্রধান গেট, সাভার', en: 'Hospital main gate, Savar' },
    'gallery.gate_cap': { bn: 'হাসপাতালের প্রধান গেট, সাভার', en: 'Hospital main gate, Savar' },
    /* ---- homepage: hero ---- */
    'hero.pill': { bn: 'সহানুভূতির সঙ্গে মানসম্মত স্বাস্থ্যসেবা', en: 'Quality Healthcare with Compassion' },
    'hero.sub': { bn: 'সহজলভ্য স্বাস্থ্যসেবা ও চিকিৎসা শিক্ষার মাধ্যমে সমাজের সেবায়। ২৫০ শয্যার হাসপাতাল, ১৯৭২ সালে প্রতিষ্ঠিত, ২৪ ঘণ্টা খোলা।', en: 'Serving communities through accessible healthcare and medical education. 250-bed hospital, established 1972, open 24 hours.' },
    'hero.cta_appt': { bn: 'অ্যাপয়েন্টমেন্ট বুক করুন →', en: 'Book an Appointment →' },
    'hero.cta_dept': { bn: 'বিভাগসমূহ দেখুন →', en: 'Explore Departments →' },

    /* ---- homepage: shortcuts ---- */
    'sc.emergency_h': { bn: 'জরুরি', en: 'Emergency' },
    'sc.emergency_p': { bn: '২৪/৭ জরুরি সেবা<br>হটলাইন: [নিশ্চিত করা হয়নি]', en: '24/7 Emergency Care<br>Hotline: [To be confirmed]' },
    'sc.appt_h': { bn: 'অ্যাপয়েন্টমেন্ট', en: 'Appointment' },
    'sc.appt_p': { bn: 'আপনার অ্যাপয়েন্টমেন্ট বুক করুন', en: 'Book Your Appointment' },
    'sc.dept_h': { bn: 'বিভাগসমূহ', en: 'Departments' },
    'sc.dept_p': { bn: 'আমাদের বিভাগসমূহ দেখুন', en: 'Explore Our Departments' },
    'sc.guide_h': { bn: 'রোগীর নির্দেশিকা', en: 'Patient Guide' },
    'sc.guide_p': { bn: 'আমাদের হাসপাতালের নির্দেশিকা', en: 'Your Guide to Our Hospital' },

    /* ---- homepage: about / stats ---- */
    'about.eyebrow': { bn: 'আমাদের হাসপাতাল সম্পর্কে', en: 'About Our Hospital' },
    'about.h2': { bn: 'সবার সুস্থতার জন্য আমরা প্রতিশ্রুতিবদ্ধ', en: 'Committed to Better Health for All' },
    'about.p1': { bn: 'গণস্বাস্থ্য সমাজ ভিত্তিক মেডিকেল কলেজ হাসপাতাল একটি ২৫০ শয্যার শিক্ষণ হাসপাতাল, ১৯৭২ সালে গণস্বাস্থ্য কেন্দ্রের উদ্যোগে প্রতিষ্ঠিত। এটি সমাজের জন্য মানসম্মত স্বাস্থ্যসেবা ও চিকিৎসা শিক্ষা দেওয়ার বৃহত্তর প্রচেষ্টার অংশ।', en: 'Gonoshasthaya Samaj Vittik Medical College Hospital is a 250-bed teaching hospital, established in 1972, under the initiative of Gonoshasthaya Kendra. It is a part of the broader effort to provide quality healthcare and medical education for the community.' },
    'about.p2': { bn: 'হাসপাতালের ইতিহাস গণস্বাস্থ্য কেন্দ্রের (জিকে) সঙ্গে জড়িত। ১৯৭১ সালে মেলাঘর, ত্রিপুরায় ৪৮০ শয্যার বাংলাদেশ ফিল্ড হাসপাতাল পরিচালিত হয়েছিল। ১৯৭২ সালে সাভারে গণস্বাস্থ্য কেন্দ্র আসে এবং সাভার হাসপাতাল জিকের কমিউনিটি-ভিত্তিক স্বাস্থ্যসেবার রেফারেল হাসপাতাল হিসেবে কাজ করে।', en: "The hospital's history is linked to Gonoshasthaya Kendra (GK). In 1971, the 480-bed Bangladesh Field Hospital was run at Melaghar, Tripura. In 1972, Gonoshasthaya Kendra came to Savar, and Savar Hospital works as the referral hospital for GK's community-based healthcare." },
    'about.more': { bn: 'আরও পড়ুন →', en: 'Read More →' },
    'stat.beds': { bn: 'শয্যা', en: 'Beds' },
    'stat.depts': { bn: 'বিভাগ', en: 'Departments' },
    'stat.est': { bn: 'প্রতিষ্ঠিত', en: 'Established' },
    'stat.emerg': { bn: 'জরুরি', en: 'Emergency' },

    /* ---- homepage: specialties ---- */
    'spec.h2': { bn: 'আমাদের চিকিৎসা বিশেষত্বসমূহ', en: 'Our Medical Specialties' },
    'spec.sub': { bn: 'বিস্তৃত পরিসরে সার্বিক চিকিৎসাসেবা', en: 'Comprehensive care across a wide range of specialities' },
    'spec.emergency': { bn: 'জরুরি চিকিৎসা', en: 'Emergency Care' },
    'spec.surgery': { bn: 'সার্জারি', en: 'Surgery' },
    'spec.medicine': { bn: 'মেডিসিন', en: 'Medicine' },
    'spec.gyne': { bn: 'গাইনি ও প্রসূতি', en: 'Gyne & Obstetrics' },
    'spec.paedsurg': { bn: 'শিশু সার্জারি', en: 'Paediatric Surgery' },
    'spec.pediatric': { bn: 'শিশুরোগ', en: 'Pediatric' },
    'spec.ent': { bn: 'ইএনটি', en: 'ENT' },
    'spec.skin': { bn: 'চর্ম', en: 'Skin' },
    'spec.eye': { bn: 'চক্ষু', en: 'Eye' },
    'spec.ortho': { bn: 'অর্থোপেডিকস', en: 'Orthopedics' },
    'spec.anesth': { bn: 'অ্যানেসথেসিয়া', en: 'Anesthesia' },
    'spec.radio': { bn: 'রেডিওলজি', en: 'Radiology' },
    'spec.psych': { bn: 'মনোরোগ', en: 'Psychiatry' },
    'spec.all': { bn: 'সব বিভাগ দেখুন →', en: 'View All Departments →' },

    /* ---- homepage: doctors ---- */
    'doctors.h2': { bn: 'আমাদের বিশিষ্ট চিকিৎসকগণ', en: 'Our Featured Doctors' },
    'doctors.sub': { bn: 'নিবেদিতপ্রাণ পেশাজীবীদের অভিজ্ঞ সেবা', en: 'Experienced care from dedicated professionals' },
    'doc.masrura': { bn: 'মেডিসিন — সহযোগী অধ্যাপক ও বিভাগীয় প্রধান, মেডিসিন বিভাগ<br>MBBS, FCPS (Medicine), MD (Nephrology) — নেফ্রোলজি বিশেষজ্ঞ', en: 'Medicine — Associate Professor and Head, Department of Medicine<br>MBBS, FCPS (Medicine), MD (Nephrology) — Nephrology specialist' },
    'doc.najibul': { bn: 'সার্জারি — সহযোগী অধ্যাপক', en: 'Surgery — Associate Professor' },
    'doc.gour': { bn: 'চক্ষু — সহযোগী অধ্যাপক', en: 'Eye — Associate Professor' },
    'doctors.all': { bn: 'সব চিকিৎসক দেখুন →', en: 'View All Doctors →' },

    /* ---- appointment form (index + appointments page) ---- */
    'appt.h2': { bn: 'অনলাইন অ্যাপয়েন্টমেন্ট বুকিং — অ্যাপয়েন্টমেন্টের অনুরোধ', en: 'Online Appointment Booking — Appointment Request' },
    'appt.h2page': { bn: 'অ্যাপয়েন্টমেন্টের অনুরোধ — অ্যাপয়েন্টমেন্ট', en: 'Appointment Request — Appointment' },
    'appt.steps': { bn: 'ধাপ: <b>বিভাগ → তারিখ → অনুরোধ → অফিস থেকে নিশ্চিতকরণ</b>। অনুরোধ করলেই অ্যাপয়েন্টমেন্ট নিশ্চিত হয় না।', en: 'Steps: <b>Department → Date → Request → Office Confirmation</b>. A request does not confirm an appointment.' },
    'appt.note': { bn: '<b>অ্যাপয়েন্টমেন্টের অনুরোধ</b> — এই ফরমটি অনুরোধ হিসেবে জমা হবে, হাসপাতালের অফিস তা নিশ্চিত করবে। অনুরোধ করলেই অ্যাপয়েন্টমেন্ট নিশ্চিত হয় না। অনলাইন বুকিং, রেফারেন্স নম্বর ও এসএমএস এখনো চালু হয়নি।', en: '<b>Appointment Request</b> — this form will be submitted as a request, and the hospital office will confirm it. A request does not confirm an appointment. Online booking, reference number and SMS are not yet available.' },
    'appt.dept_label': { bn: 'বিভাগ', en: 'Department' },
    'appt.choose_dept': { bn: 'বিভাগ বাছুন', en: 'Choose a department' },
    'appt.doctor_label': { bn: 'চিকিৎসক', en: 'Doctor' },
    'appt.doctor_ph': { bn: 'চিকিৎসকের তালিকা আসার পর এখানে বসবে', en: 'Will appear here after the doctor list arrives' },
    'appt.date_label': { bn: 'তারিখ', en: 'Date' },
    'appt.name_label': { bn: 'রোগীর নাম', en: 'Patient name' },
    'appt.mobile_label': { bn: 'মোবাইল নম্বর', en: 'Mobile number' },
    'appt.reason_label': { bn: 'কারণ (ঐচ্ছিক)', en: 'Reason (optional)' },
    'appt.reason_ph': { bn: 'সমস্যা বা কারণ লিখুন', en: 'Write the problem or reason' },
    'appt.submit': { bn: 'অনুরোধ পাঠান', en: 'Submit Request' },
    'appt.result': { bn: 'এই ফরমটি এখনো পরীক্ষামূলক কাঠামো — আপনার তথ্য কোথাও পাঠানো হয়নি। অ্যাপয়েন্টমেন্টের জন্য হাসপাতালের অফিসে যোগাযোগ করুন।', en: 'This form is still a trial structure — your information has not been sent anywhere. Please contact the hospital office for an appointment.' },

    /* ---- diagnostics ---- */
    'diag.h2': { bn: 'ডায়াগনস্টিক সেবা — পরীক্ষা-নিরীক্ষা', en: 'Diagnostic Services — Tests' },
    'diag.h2page': { bn: 'ডায়াগনস্টিক ও পরীক্ষা — পরীক্ষা-নিরীক্ষা', en: 'Diagnostics & Tests — Tests' },
    'diag.intro': { bn: 'নিচের তালিকাটি শুধু কাঠামো — কোন পরীক্ষাটি হাসপাতালে হয়, রিপোর্ট কবে পাওয়া যাবে — হাসপাতাল যাচাই করেনি, তাই এখানে কোনো মূল্য বা প্রাপ্যতা বসানো হয়নি।', en: 'The list below is only a structure — which tests the hospital does, and when reports are available — the hospital has not verified, so no price or availability is shown here.' },
    'diag.haem': { bn: 'হেমাটোলজি', en: 'Haematology' },
    'diag.haem_p': { bn: 'উদাহরণ: CBC, ESR, Peripheral Blood Film। হাসপাতাল যাচাই করেনি।', en: 'Examples: CBC, ESR, Peripheral Blood Film. The hospital has not verified this.' },
    'diag.biochem': { bn: 'বায়োকেমিস্ট্রি', en: 'Biochemistry' },
    'diag.biochem_p': { bn: 'উদাহরণ: Blood Glucose, Creatinine, Urea, Liver Function Tests। হাসপাতাল যাচাই করেনি।', en: 'Examples: Blood Glucose, Creatinine, Urea, Liver Function Tests. The hospital has not verified this.' },
    'diag.sero': { bn: 'সেরোলজি', en: 'Serology' },
    'diag.sero_p': { bn: 'উদাহরণ: HBsAg, Widal। হাসপাতাল যাচাই করেনি।', en: 'Examples: HBsAg, Widal. The hospital has not verified this.' },
    'diag.urine': { bn: 'প্রস্রাব ও মল', en: 'Urine & Stool' },
    'diag.urine_p': { bn: 'উদাহরণ: Urine R/E, Urine C/S, Stool R/E। হাসপাতাল যাচাই করেনি।', en: 'Examples: Urine R/E, Urine C/S, Stool R/E. The hospital has not verified this.' },
    'diag.radio': { bn: 'রেডিওলজি', en: 'Radiology' },
    'diag.radio_p': { bn: 'উদাহরণ: X-ray, Ultrasound। হাসপাতাল যাচাই করেনি।', en: 'Examples: X-ray, Ultrasound. The hospital has not verified this.' },
    'diag.cardiac': { bn: 'হৃদরোগ', en: 'Cardiac' },
    'diag.cardiac_p': { bn: 'উদাহরণ: ECG, Echocardiography। হাসপাতাল যাচাই করেনি।', en: 'Examples: ECG, Echocardiography. The hospital has not verified this.' },
    'diag.more': { bn: 'ডায়াগনস্টিক পাতা দেখুন →', en: 'See the Diagnostics page →' },
    'diag.foot': { bn: 'পরীক্ষার মূল্য, নমুনার ধরন, প্রস্তুতি ও রিপোর্ট পাওয়ার সময় — হাসপাতাল থেকে যাচাই হওয়ার পর বসবে।', en: 'Test prices, sample types, preparation and report delivery times will be added after verification by the hospital.' },

    /* ---- facilities ---- */
    'fac.h2': { bn: 'হাসপাতালের সুবিধাসমূহ', en: 'Hospital Facilities' },
    'fac.emerg': { bn: 'জরুরি বিভাগ (২৪ ঘণ্টা)', en: 'Emergency (24 hours)' },
    'fac.emerg_p': { bn: '২৪ ঘণ্টা জরুরি সেবা।', en: 'Round-the-clock emergency service.' },
    'fac.ot': { bn: 'অপারেশন থিয়েটার', en: 'Operation Theatre' },
    'fac.ot_p': { bn: '২টি সুসজ্জিত ওটি; সিজারিয়ানসহ জরুরি প্রসূতি সেবা।', en: '2 well-equipped OT; emergency obstetric care including cesarean section.' },
    'fac.bb': { bn: 'ব্লাড ব্যাংক', en: 'Blood Bank' },
    'fac.bb_p': { bn: 'ব্লাড ব্যাংক সেবা।', en: 'Blood bank service.' },
    'fac.amb': { bn: 'অ্যাম্বুলেন্স', en: 'Ambulance' },
    'fac.amb_p': { bn: '২টি অ্যাম্বুলেন্স প্রস্তুত।', en: '2 ambulances ready.' },
    'fac.indoor': { bn: 'ইনডোর সেবা', en: 'Indoor Services' },
    'fac.indoor_p': { bn: 'বার্ন, আয়ুর্বেদ, যোগা, আকুপাংচার, কুষ্ঠ, পিএইচসিসহ ইনডোর সুবিধা।', en: 'Indoor facilities including burn, Ayurveda, Yoga, Acupuncture, Leprosy, PHC services.' },
    'fac.camp': { bn: 'স্বাস্থ্য শিবির', en: 'Health Camp' },
    'fac.camp_p': { bn: 'প্রতি মাসে ১টির বেশি বিশেষায়িত স্বাস্থ্য শিবির।', en: 'More than 1 specialized health camp every month.' },
    'fac.note': { bn: 'উপরের সেবাগুলো গণস্বাস্থ্য কেন্দ্রের অফিসিয়াল হেলথ পাতা অনুযায়ী।', en: 'The services above are as per Gonoshasthaya Kendra’s official Health page.' },

    /* ---- patient guide ---- */
    'guide.h2': { bn: 'রোগীর তথ্য ও নির্দেশনা', en: 'Patient Information & Guidelines' },
    'guide.h2page': { bn: 'রোগীর নির্দেশিকা', en: 'Patient Guide' },
    'guide.s1h': { bn: 'বিভাগ বাছুন', en: 'Choose a Department' },
    'guide.s1p': { bn: 'বিভাগের তালিকা থেকে আপনার সমস্যার বিভাগ বাছুন।', en: 'Choose the department for your problem from the department list.' },
    'guide.s2h': { bn: 'চিকিৎসক দেখুন', en: 'See a Doctor' },
    'guide.s2p': { bn: 'চিকিৎসক তালিকা থেকে চেম্বারের দিন ও সময় দেখুন — তালিকা আসার পর।', en: 'See chamber days and times from the doctor directory — after the list arrives.' },
    'guide.s3h': { bn: 'অ্যাপয়েন্টমেন্টের অনুরোধ', en: 'Appointment Request' },
    'guide.s3p': { bn: 'ফরম পূরণ করুন। অনুরোধ করলেই অ্যাপয়েন্টমেন্ট নিশ্চিত হয় না, অফিস নিশ্চিত করবে।', en: 'Fill in the form. A request does not confirm an appointment; the office will confirm it.' },
    'guide.s4h': { bn: 'জরুরি', en: 'Emergency' },
    'guide.s4p': { bn: 'জরুরি অবস্থায় সরাসরি হাসপাতালে আসুন।', en: 'In an emergency, come directly to the hospital.' },
    'guide.more': { bn: 'পূর্ণাঙ্গ রোগীর নির্দেশিকা →', en: 'Full Patient Guide →' },
    'guide.more_h': { bn: 'আর যা জানবেন', en: 'More to Know' },
    'guide.more_p': { bn: 'ওপিডির সময়, কী কী কাগজ লাগবে — এগুলো হাসপাতালের নিয়ম অনুযায়ী পরে বসবে, এখন কোনো নিয়ম লেখা হয়নি।', en: 'OPD timings, what documents are needed — these will be added later as per hospital rules; no rules are written here yet.' },
    'guide.links': { bn: 'অ্যাপয়েন্টমেন্ট: <a href="appointments.html">অ্যাপয়েন্টমেন্ট পাতা</a> | বিভাগ: <a href="departments.html">বিভাগের পাতা</a> | যোগাযোগ: <a href="contact.html">যোগাযোগের পাতা</a>', en: 'Appointment: <a href="appointments.html">Appointment page</a> | Departments: <a href="departments.html">Departments page</a> | Contact: <a href="contact.html">Contact page</a>' },

    /* ---- services (bottom3 + services page) ---- */
    'svc.h2': { bn: 'আমাদের সেবাসমূহ', en: 'Our Services' },
    'svc.h2page': { bn: 'চিকিৎসাসেবা', en: 'Medical Services' },
    'svc.sub': { bn: 'উন্নত সেবার জন্য আধুনিক চিকিৎসাসেবা', en: 'Advanced medical services for better care' },
    'svc.intro': { bn: 'নিচের সেবাগুলো গণস্বাস্থ্য কেন্দ্রের অফিসিয়াল হেলথ পাতা অনুযায়ী সাভার হাসপাতালে আছে। বিস্তারিত বিবরণ, সময় ও যোগাযোগ হাসপাতাল নিশ্চিত করার পর যোগ হবে।', en: 'The services below are available at Savar Hospital as per Gonoshasthaya Kendra’s official Health page. Detailed descriptions, timings and contact will be added after the hospital confirms them.' },
    'svc.lab': { bn: 'ল্যাবরেটরি পরীক্ষা', en: 'Laboratory Tests' },
    'svc.img': { bn: 'ডায়াগনস্টিক ইমেজিং', en: 'Diagnostic Imaging' },
    'svc.surg': { bn: 'সার্জিক্যাল সেবা', en: 'Surgical Services' },
    'svc.emerg': { bn: 'জরুরি সেবা', en: 'Emergency Services' },
    'svc.out': { bn: 'আউটপেশেন্ট সেবা', en: 'Outpatient Services' },
    'svc.in': { bn: 'ইনপেশেন্ট সেবা', en: 'Inpatient Care' },
    'svc.more': { bn: 'সেবাসমূহ দেখুন →', en: 'Explore Services →' },
    'svc.opd': { bn: 'আউটডোর সেবা (ওপিডি)', en: 'Outdoor Services (OPD)' },
    'svc.opd_p': { bn: 'আউটপেশেন্ট: এএনসি, পিএনসি, ইপিআই, পরিবার পরিকল্পনা রেফারেল, স্বাস্থ্য তথ্য, সাধারণ রোগের চিকিৎসা।', en: 'Outpatient: ANC, PNC, EPI, family planning referral, health information, common disease treatment.' },
    'svc.indoor': { bn: 'ইনডোর সেবা', en: 'Indoor Services' },
    'svc.surg2': { bn: 'সার্জিক্যাল সেবা', en: 'Surgical Services' },
    'svc.diag': { bn: 'ডায়াগনস্টিক সেবা', en: 'Diagnostic Services' },
    'svc.diag_p': { bn: '২৪ ঘণ্টা ডায়াগনস্টিক সেবা — <a href="diagnostics.html">ডায়াগনস্টিক পাতা দেখুন</a>।', en: '24 hours diagnostic service — <a href="diagnostics.html">See the Diagnostics page</a>.' },
    'svc.bb': { bn: 'ব্লাড ব্যাংক', en: 'Blood Bank' },
    'svc.amb': { bn: 'অ্যাম্বুলেন্স', en: 'Ambulance' },
    'svc.physio': { bn: 'ফিজিওথেরাপি', en: 'Physiotherapy' },
    'svc.physio_p': { bn: 'ফিজিওথেরাপি সেবা।', en: 'Physiotherapy service.' },
    'svc.camp': { bn: 'স্বাস্থ্য শিবির', en: 'Health Camp' },

    /* ---- notices ---- */
    'notice.h2': { bn: 'সর্বশেষ নোটিশ ও খবর', en: 'Latest Notices & News' },
    'notice.h2page': { bn: 'নোটিশ ও খবর', en: 'Notices & News' },
    'notice.sub': { bn: 'আমাদের সর্বশেষ কার্যক্রম সম্পর্কে জানুন', en: 'Stay updated with our latest activities' },
    'notice.intro': { bn: 'আসল নোটিশ আসলে এখানে তালিকা আকারে বসবে — তারিখ, শিরোনাম, শূন্যপদ, শেষ তারিখ, পিডিএফ লিংক, নতুনটি উপরে।', en: 'When real notices arrive, they will be listed here in a table — date, title, vacancy, deadline, PDF link, newest first.' },
    'notice.puja_t': { bn: 'শারদীয়া দুর্গাপূজা — সরকারি ছুটি (২০–২২ অক্টোবর ২০২৬)', en: 'Sharodiya Durga Puja — Government Holiday (20–22 Oct 2026)' },
    'notice.puja_p': { bn: 'সরকারি ছুটি ২০–২২ অক্টোবর ২০২৬। জরুরি সেবা ২৪ ঘণ্টা খোলা ছিল।', en: 'Government holiday 20–22 October 2026. Emergency services were open 24 hours.' },
    'notice.puja_detail': { bn: '<b>শারদীয়া দুর্গাপূজা — সরকারি ছুটি</b><br><span class="muted">সরকারের প্রজ্ঞাপন অনুযায়ী ২০–২২ অক্টোবর ২০২৬ (মঙ্গলবার–বৃহস্পতিবার) দুর্গাপূজা উপলক্ষে সরকারি ছুটি ছিল — ২০ অক্টোবর (মহানবমী, নির্বাহী আদেশে), ২১ অক্টোবর (বিজয়া দশমী, সাধারণ ছুটি), ২২ অক্টোবর (নির্বাহী আদেশে, ০৭ অক্টোবর ২০২৬-এর গেজেট অনুযায়ী)। জরুরি সেবা ২৪ ঘণ্টা খোলা ছিল।</span>', en: '<b>Sharodiya Durga Puja — Government Holiday</b><br><span class="muted">As per the government notification, 20–22 October 2026 (Tuesday–Thursday) was a government holiday for Durga Puja — 20 Oct (Mahanavami, by executive order), 21 Oct (Bijoya Dashami, general holiday), 22 Oct (by executive order, as per the gazette of 07 Oct 2026). Emergency services were open 24 hours.</span>' },
    'notice.all': { bn: 'সব দেখুন →', en: 'View All →' },
    'notice.date1': { bn: '০৭ অক্টোবর ২০২৬', en: '07 Oct 2026' },
    'notice.date2': { bn: '২২ অক্টোবর ২০২৬', en: '22 Oct 2026' },
    'th.date': { bn: 'তারিখ', en: 'Date' },
    'th.title': { bn: 'শিরোনাম / পদ', en: 'Title / Post' },
    'th.vac': { bn: 'শূন্যপদ', en: 'Vacancy' },
    'th.deadline': { bn: 'শেষ তারিখ', en: 'Deadline' },
    'th.pdf': { bn: 'পিডিএফ', en: 'PDF' },

    /* ---- contact ---- */
    'contact.h2': { bn: 'যোগাযোগ ও অবস্থান', en: 'Contact & Location' },
    'contact.h2page': { bn: 'যোগাযোগ', en: 'Contact' },
    'contact.sub': { bn: 'আমরা আপনাকে সাহায্য করতে এখানে আছি', en: 'We are here to help you' },
    'contact.map': { bn: 'ম্যাপে দেখুন →', en: 'View on Map →' },
    'contact.emergency': { bn: 'জরুরি: [নিশ্চিত করা হয়নি]', en: 'Emergency: [To be confirmed]' },
    'contact.phone': { bn: 'ফোন: ০২৭৭৯২২২৫', en: 'Phone: 027792225' },
    'contact.addr_label': { bn: 'ঠিকানা:', en: 'Address:' },
    'contact.phone_label': { bn: 'ফোন:', en: 'Phone:' },
    'contact.email_label': { bn: 'ইমেইল:', en: 'Email:' },

    /* ---- about page ---- */
    'about.h2page': { bn: 'আমাদের সম্পর্কে — হাসপাতাল সম্পর্কে', en: 'About — About the Hospital' },
    'about.p1page': { bn: 'এই সাইটটি গণস্বাস্থ্য সমাজ ভিত্তিক মেডিকেল কলেজ হাসপাতালের — রোগীসেবার হাসপাতালের সাইট।', en: 'This site is for Gonoshasthaya Samaj Vittik Medical College Hospital — a patient-care hospital site.' },
    'about.p3': { bn: 'গণস্বাস্থ্য কেন্দ্রের কমিউনিটি-ভিত্তিক সেবার ধারা থেকে সাভার হাসপাতাল কাজ করে — সাধারণ মানুষের জন্য সহজ, কম খরচে সেবা দেওয়ার লক্ষ্য নিয়ে।', en: 'Savar Hospital works in Gonoshasthaya Kendra’s community-based service tradition — aiming to provide easy, low-cost care for ordinary people.' },
    'about.hist': { bn: 'ইতিহাস', en: 'History' },
    'about.y1971': { bn: 'মেলাঘর, ত্রিপুরায় ৪৮০ শয্যার বাংলাদেশ ফিল্ড হাসপাতাল — মুক্তিযোদ্ধাদের চিকিৎসা।', en: '480-bed Bangladesh Field Hospital at Melaghar, Tripura — treatment for freedom fighters.' },
    'about.y1972': { bn: 'সাভারে গণস্বাস্থ্য কেন্দ্র আসে; সাভার হাসপাতাল জিকের কমিউনিটি-ভিত্তিক স্বাস্থ্যসেবার রেফারেল হাসপাতাল হিসেবে কাজ শুরু করে। হাসপাতালটি ১৯৭২ সালে প্রতিষ্ঠিত, ২৫০ শয্যার হাসপাতাল।', en: 'Gonoshasthaya Kendra came to Savar; Savar Hospital started working as the referral hospital for GK’s community-based healthcare. The hospital was established in 1972, a 250-bed hospital.' },
    'about.mission': { bn: 'মিশন ও ভিশন', en: 'Mission & Vision' },
    'about.mission_p': { bn: 'শীঘ্রই আসছে — হাসপাতালের মিশন ও ভিশন হাসপাতাল থেকে নিশ্চিত হওয়ার পর এখানে বসবে।', en: 'Coming soon — the hospital’s mission and vision will be added here after the hospital confirms them.' },
    'about.fac': { bn: 'হাসপাতালের সুবিধাসমূহ', en: 'Hospital Facilities' },
    'about.fac_p': { bn: 'শীঘ্রই আসছে — হাসপাতালের সুবিধার চূড়ান্ত তালিকা হাসপাতাল নিশ্চিত করার পর এখানে বসবে।', en: 'Coming soon — the hospital’s final list of facilities will be added here after the hospital confirms it.' },

    /* ---- departments page ---- */
    'depts.h2': { bn: 'আমাদের বিশেষত্বসমূহ — হাসপাতালের বিভাগসমূহ', en: 'Our Specialities — Hospital Departments' },
    'depts.intro': { bn: 'এই ১৩টি বিভাগ হাসপাতালের চূড়ান্ত তালিকা। প্রতিটি বিভাগের বিস্তারিত বিবরণ, বিভাগীয় প্রধান ও সময় হাসপাতাল নিশ্চিত করার পর যোগ হবে।', en: 'These 13 departments are the hospital’s final list. Each department’s detailed description, department head and timings will be added after the hospital confirms them.' },
    'deptd.emergency': { bn: 'জরুরি চিকিৎসা', en: 'Emergency care' },
    'deptd.surgery': { bn: 'সাধারণ সার্জারি', en: 'General Surgery' },
    'deptd.medicine': { bn: 'সাধারণ মেডিসিন', en: 'General Medicine' },
    'deptd.gyne': { bn: 'গাইনি ও প্রসূতি', en: 'Gynaecology & Obstetrics' },
    'deptd.paedsurg': { bn: 'শিশুদের সার্জারি', en: "Children's surgery" },
    'deptd.pediatric': { bn: 'শিশুরোগ — শিশুদের সেবা', en: 'Paediatrics — children care' },
    'deptd.ent': { bn: 'কান, নাক, গলা', en: 'Ear, nose, throat' },
    'deptd.skin': { bn: 'চর্মরোগ', en: 'Dermatology' },
    'deptd.eye': { bn: 'চক্ষুরোগ', en: 'Ophthalmology' },
    'deptd.ortho': { bn: 'হাড় ও জয়েন্টের সেবা', en: 'Bone and joint care' },
    'deptd.anesth': { bn: 'অ্যানেসথেসিয়া সেবা', en: 'Anaesthesia services' },
    'deptd.radio': { bn: 'ডায়াগনস্টিক ইমেজিং', en: 'Diagnostic imaging' },
    'deptd.psych': { bn: 'মানসিক স্বাস্থ্য', en: 'Mental health' },
    'depts.foot': { bn: 'বিভাগের বিস্তারিত: <a href="department-emergency.html">জরুরি বিভাগ</a> — বাকি বিভাগের বিস্তারিত পাতা শীঘ্রই আসছে।', en: 'Department details: <a href="department-emergency.html">Emergency Department</a> — the other departments’ detail pages are coming soon.' },

    /* ---- emergency department page ---- */
    'deptem.h2': { bn: 'জরুরি — জরুরি বিভাগ', en: 'Emergency — Emergency Department' },
    'deptem.p': { bn: 'জরুরি চিকিৎসা। ২৪ ঘণ্টা জরুরি সেবা।', en: 'Emergency care. Round-the-clock emergency service.' },
    'deptem.head': { bn: 'বিভাগীয় প্রধান:', en: 'Department Head:' },
    'deptem.docs': { bn: 'চিকিৎসক তালিকা:', en: 'Doctor list:' },
    'deptem.chamber': { bn: 'চেম্বার / ওপিডির দিন ও সময়:', en: 'Chamber / OPD days and times:' },
    'deptem.soon': { bn: 'শীঘ্রই আসছে', en: 'Coming soon' },
    'deptem.note': { bn: 'এই পাতাটি বিভাগের বিস্তারিত পাতার উদাহরণ — বাকি ১২টি বিভাগের পাতা একই কাঠামোতে তৈরি হবে, হাসপাতালের তথ্য পাওয়ার পর।', en: 'This page is an example of a department detail page — the other 12 departments’ pages will be built in the same structure, after the hospital’s information arrives.' },
    'deptem.back': { bn: '← সব বিভাগ', en: '← All Departments' },

    /* ---- doctors page ---- */
    'doctors.h2page': { bn: 'চিকিৎসক ও পরামর্শক', en: 'Doctors & Consultants' },
    'doctors.search_label': { bn: 'চিকিৎসক খুঁজুন', en: 'Search for a doctor' },
    'doctors.search_ph': { bn: 'চিকিৎসকের নাম লিখুন', en: "Type a doctor's name" },
    'doctors.dept_label': { bn: 'বিভাগ', en: 'Department' },
    'doctors.all_depts': { bn: 'সব বিভাগ', en: 'All departments' },
    'doctors.empty': { bn: 'খুঁজে পাওয়া যায়নি।', en: 'No results found.' },
    'doctors.count_one': { bn: '১ জন চিকিৎসক তালিকাভুক্ত', en: '1 doctor listed' },
    'doctors.count_many': { bn: '{n} জন চিকিৎসক তালিকাভুক্ত', en: '{n} doctors listed' },
    'doc.dept': { bn: 'বিভাগ:', en: 'Department:' },
    'doc.designation': { bn: 'পদবি:', en: 'Designation:' },
    'doc.spec': { bn: 'বিশেষজ্ঞতা:', en: 'Specialisation:' },
    'doc.degree': { bn: 'ডিগ্রি:', en: 'Degree:' },
    'doc.chamber': { bn: 'চেম্বার:', en: 'Chamber:' },
    'doc.chamber_time': { bn: 'চেম্বারের দিন ও সময়:', en: 'Chamber days and times:' },
    'doc.tba': { bn: 'হাসপাতাল থেকে জানানো হবে', en: 'To be announced by the hospital' },
    'doc.chamber_text': { bn: 'গণস্বাস্থ্য সমাজ ভিত্তিক মেডিকেল কলেজ হাসপাতাল, সাভার; এছাড়াও গণস্বাস্থ্য নগর হাসপাতাল, ধানমন্ডি', en: 'Gonoshasthaya Samaj Vittik Medical College Hospital, Savar; also Gonoshasthaya Nagar Hospital, Dhanmondi' },
    'doc.photo_note': { bn: 'ছবি: জিএনএইচ সাইটে এই চিকিৎসকের আসল ছবি নেই, তাই ছবি পরে বসবে।', en: 'Photo: this doctor’s real photo is not on the GNH site, so the photo will be added later.' },

    /* ---- gallery ---- */
    'gallery.h2': { bn: 'গ্যালারি', en: 'Gallery' },
    'gallery.cap': { bn: 'হাসপাতাল ভবন, সাভার', en: 'Hospital building, Savar' },
    'gallery.t1': { bn: 'শীঘ্রই আসছে<br>সেবা এলাকা', en: 'Coming soon<br>Care area' },
    'gallery.t2': { bn: 'শীঘ্রই আসছে<br>কমিউনিটি', en: 'Coming soon<br>Community' }
  };

  var KEY = 'gsvmch-lang';
  var current = 'bn';

  function stored() {
    try { return window.localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(lang) {
    try { window.localStorage.setItem(KEY, lang); } catch (e) { /* private mode: ignore */ }
  }
  function t(key, vars) {
    var entry = STR[key];
    if (!entry) return key;
    var s = entry[current] || entry.bn || entry.en || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(vars[k]); });
    }
    return s;
  }
  function bnNum(n) {
    var d = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
    return String(n).replace(/[0-9]/g, function (c) { return d[c]; });
  }
  function countText(n) {
    if (current === 'bn') {
      return n === 1 ? t('doctors.count_one') : t('doctors.count_many', { n: bnNum(n) });
    }
    return n === 1 ? t('doctors.count_one') : t('doctors.count_many', { n: n });
  }

  function applyLang(lang) {
    current = (lang === 'en') ? 'en' : 'bn';
    document.documentElement.lang = current;
    var els, i, el, key;
    els = document.querySelectorAll('[data-i18n]');
    for (i = 0; i < els.length; i++) { el = els[i]; key = el.getAttribute('data-i18n'); el.textContent = t(key); }
    els = document.querySelectorAll('[data-i18n-html]');
    for (i = 0; i < els.length; i++) { el = els[i]; key = el.getAttribute('data-i18n-html'); el.innerHTML = t(key); }
    els = document.querySelectorAll('[data-i18n-ph]');
    for (i = 0; i < els.length; i++) { el = els[i]; key = el.getAttribute('data-i18n-ph'); el.setAttribute('placeholder', t(key)); }
    els = document.querySelectorAll('option[data-dept]');
    for (i = 0; i < els.length; i++) {
      el = els[i];
      var dv = el.getAttribute('data-dept');
      var entry = STR['dept.' + dv];
      if (entry) el.textContent = entry[current] || entry.en;
    }
    els = document.querySelectorAll('.lang-btn');
    for (i = 0; i < els.length; i++) {
      el = els[i];
      el.classList.toggle('active', el.getAttribute('data-lang') === current);
      el.setAttribute('aria-pressed', el.getAttribute('data-lang') === current ? 'true' : 'false');
    }
    document.dispatchEvent(new CustomEvent('gsvmch-lang', { detail: { lang: current } }));
  }

  function setLang(lang) {
    save(lang);
    applyLang(lang);
    if (typeof window.filterDoctors === 'function') { try { window.filterDoctors(); } catch (e) {} }
  }

  function init() {
    var saved = stored();
    var lang = (saved === 'en' || saved === 'bn') ? saved : 'bn';
    applyLang(lang);
    if (typeof window.filterDoctors === 'function') { try { window.filterDoctors(); } catch (e) {} }
    var btns = document.querySelectorAll('.lang-btn');
    btns.forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.GSVMCH_I18N = { t: t, countText: countText, getLang: function () { return current; }, setLang: setLang, applyLang: applyLang };
})();
