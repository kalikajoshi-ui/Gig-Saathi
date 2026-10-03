
const userToken = sessionStorage.getItem("gigSaathiUserToken");
const savedUser = JSON.parse(
    sessionStorage.getItem("gigSaathiUser") || "null"
);

if (!userToken || !savedUser || savedUser.role !== "user") {
    window.location.replace("user-login.html");
}
const $=id=>document.getElementById(id);
const langs={en:"en-IN",hi:"hi-IN",mr:"mr-IN",bn:"bn-IN"};
const en={navHome:"Home",navAssistant:"Rights Assistant",navLibrary:"Rights Library",navResources:"Resources",askGuidance:"Ask for Guidance",heroEyebrow:"MULTILINGUAL WORKER SUPPORT",heroTitle:"Understand your rights.<br><span>Take the right next step.</span>",heroLead:"Clear, accessible guidance for delivery partners and cab drivers facing account, payment, accident and insurance problems.",startAssistant:"Start Rights Assistant",exploreRights:"Explore Rights",chooseLanguage:"Choose your language to continue",systemAvailable:"Guidance system available",threeCategories:"All 3 issue categories active",accidentTitle:"Accident & Insurance",accidentShort:"Claim steps and evidence checklist",blockedTitle:"Account Deactivation",blockedShort:"Reason request and appeal procedure",paymentTitle:"Missing Payments",paymentShort:"Payout verification and complaint steps",issueCategories:"Issue categories",languagesSupported:"Languages supported",loginRequired:"Login required",alwaysFree:"Uses — always free",howEyebrow:"HOW THE SYSTEM WORKS",howTitle:"From a worker’s problem to clear next steps",flow1Title:"Speak or type",flow1Text:"Explain the problem in your preferred language.",flow2Title:"Detect the issue",flow2Text:"The system identifies the closest supported category.",flow3Title:"Retrieve guidance",flow3Text:"Controlled information is retrieved from the knowledge base.",flow4Title:"Take action",flow4Text:"Receive steps, documents and voice guidance.",whyEyebrow:"WHY GIG SAATHI",whyTitle:"Built for workers, not platforms",value1Title:"Multilingual assistance",value1Text:"Read, speak and listen in four Indian languages.",value2Title:"Controlled guidance",value2Text:"Predictable information instead of open-ended legal advice.",value3Title:"Voice-accessible interface",value3Text:"Speak a problem and listen to the response.",assistantEyebrow:"RIGHTS ASSISTANT",assistantHeading:"Describe your work problem",assistantLead:"Type or speak in your preferred language. The system will detect the issue and return controlled, step-by-step guidance.",selectLanguage:"Select language",problemQuestion:"What problem are you facing?",problemPlaceholder:"Example: My account was blocked without any reason or warning.",voiceInput:"Voice Input",quickExamples:"Quick examples",getGuidance:"Get Guidance",clear:"Clear",libraryEyebrow:"RIGHTS LIBRARY",libraryHeading:"Understand common workplace issues",libraryLead:"Learn what evidence to preserve and what practical steps may be available before submitting a complaint.",searchPlaceholder:"Search rights or workplace issues",allIssues:"All issues",resourcesEyebrow:"RESOURCE CENTRE",resourcesHeading:"Prepare before you complain",resourcesLead:"Practical tools to preserve evidence, escalate complaints and protect your information.",evidenceChecklist:"Evidence checklist",evidenceLead:"Complete these before submitting a complaint or appeal.",prepared:"Prepared",allPrepared:"All items prepared. You are ready to submit a clear complaint.",escalationTitle:"Complaint escalation",safetyTitle:"Safety and privacy",important:"Important",globalDisclaimer:"Gig Saathi provides controlled general information. It does not make legal decisions or replace a lawyer, government authority, insurer or platform grievance officer.",footerText:"Rights information for platform workers.",platform:"Platform",legalNotice:"Legal notice",footerDisclaimer:"Educational prototype — not a substitute for professional legal advice.",viewGuidance:"View Guidance",guidanceSteps:"guidance steps",typicalEvidence:"Typical evidence needed",issueOverview:"Issue overview",stepActions:"Step-by-step actions",askIssue:"Ask About This Issue",guidanceFound:"GUIDANCE FOUND",whatDoNow:"What to do now",keepReady:"Keep these ready",listen:"Listen to Guidance",stop:"Stop",copy:"Copy Guidance",askAnother:"Ask Another Question",loading:"Finding relevant guidance…",tryAgain:"Try Again",unknownTitle:"Issue not identified",unknownText:"This prototype supports accident, account-blocking and payment-related problems.",emptyTitle:"Describe your problem above",emptyText:"The system will identify the closest supported issue and return controlled guidance.",source:"Source",reviewed:"Last reviewed",knowledgeBase:"Controlled Gig Saathi knowledge base",copied:"Guidance copied",listening:"Listening… Please speak.",captured:"Voice captured successfully.",noSpeech:"No speech detected. Please try again.",micBlocked:"Microphone permission is blocked.",voiceUnavailable:"Voice input is unavailable in this browser."};
const translations={en,
hi:{...en,navHome:"होम",navAssistant:"अधिकार सहायक",navLibrary:"अधिकार पुस्तकालय",navResources:"संसाधन",askGuidance:"मार्गदर्शन लें",heroEyebrow:"बहुभाषी श्रमिक सहायता",heroTitle:"अपने अधिकार समझें।<br><span>सही अगला कदम उठाएँ।</span>",heroLead:"डिलीवरी पार्टनर और कैब चालकों के अकाउंट, पेमेंट, दुर्घटना और बीमा संबंधी मामलों के लिए आसान मार्गदर्शन।",startAssistant:"अधिकार सहायक शुरू करें",exploreRights:"अधिकार देखें",chooseLanguage:"आगे बढ़ने के लिए अपनी भाषा चुनें",systemAvailable:"मार्गदर्शन प्रणाली उपलब्ध है",threeCategories:"सभी 3 समस्या श्रेणियाँ सक्रिय हैं",accidentTitle:"दुर्घटना और बीमा",accidentShort:"क्लेम के कदम और सबूत सूची",blockedTitle:"अकाउंट बंद होना",blockedShort:"कारण और अपील प्रक्रिया",paymentTitle:"पेमेंट नहीं मिला",paymentShort:"पेआउट जाँच और शिकायत के कदम",issueCategories:"समस्या श्रेणियाँ",languagesSupported:"समर्थित भाषाएँ",loginRequired:"लॉगिन आवश्यक",alwaysFree:"उपयोग — हमेशा निःशुल्क",howEyebrow:"यह कैसे काम करता है",howTitle:"समस्या से स्पष्ट अगले कदम तक",flow1Title:"बोलें या लिखें",flow1Text:"अपनी भाषा में समस्या समझाएँ।",flow2Title:"समस्या पहचान",flow2Text:"सिस्टम सबसे नज़दीकी श्रेणी पहचानता है।",flow3Title:"मार्गदर्शन प्राप्त करें",flow3Text:"नियंत्रित जानकारी ज्ञान-भंडार से आती है।",flow4Title:"कार्रवाई करें",flow4Text:"कदम, दस्तावेज और आवाज़ मार्गदर्शन पाएँ।",whyEyebrow:"गिग साथी क्यों",whyTitle:"कामगारों के लिए बनाया गया",value1Title:"बहुभाषी सहायता",value1Text:"चार भारतीय भाषाओं में पढ़ें, बोलें और सुनें।",value2Title:"नियंत्रित मार्गदर्शन",value2Text:"अनिश्चित कानूनी सलाह की जगह तय जानकारी।",value3Title:"आवाज़ की सुविधा",value3Text:"समस्या बोलें और उत्तर सुनें।",assistantEyebrow:"अधिकार सहायक",assistantHeading:"अपने काम की समस्या बताएँ",assistantLead:"अपनी भाषा में लिखें या बोलें। सिस्टम समस्या पहचानकर चरणबद्ध मार्गदर्शन देगा।",selectLanguage:"भाषा चुनें",problemQuestion:"आपको क्या समस्या हो रही है?",problemPlaceholder:"उदाहरण: मेरा अकाउंट बिना कारण या चेतावनी के बंद हो गया।",voiceInput:"बोलकर बताएँ",quickExamples:"जल्दी चुनें",getGuidance:"मार्गदर्शन पाएँ",clear:"साफ़ करें",libraryEyebrow:"अधिकार पुस्तकालय",libraryHeading:"काम से जुड़ी सामान्य समस्याएँ समझें",libraryLead:"शिकायत से पहले जरूरी सबूत और संभावित कदम जानें।",searchPlaceholder:"अधिकार या समस्या खोजें",allIssues:"सभी समस्याएँ",resourcesEyebrow:"संसाधन केंद्र",resourcesHeading:"शिकायत से पहले तैयारी करें",resourcesLead:"सबूत बचाने, शिकायत आगे बढ़ाने और जानकारी सुरक्षित रखने के आसान तरीके।",evidenceChecklist:"सबूत की जाँच सूची",evidenceLead:"शिकायत या अपील से पहले इन्हें पूरा करें।",prepared:"तैयार",allPrepared:"सभी चीजें तैयार हैं। अब आप स्पष्ट शिकायत भेज सकते हैं।",escalationTitle:"शिकायत आगे बढ़ाने की प्रक्रिया",safetyTitle:"सुरक्षा और गोपनीयता",important:"महत्वपूर्ण",globalDisclaimer:"गिग साथी सामान्य जानकारी देता है। यह वकील, सरकारी अधिकारी, बीमा कंपनी या प्लेटफ़ॉर्म शिकायत अधिकारी की जगह नहीं लेता।",footerText:"प्लेटफ़ॉर्म कामगारों के लिए अधिकार जानकारी।",platform:"प्लेटफ़ॉर्म",legalNotice:"कानूनी सूचना",footerDisclaimer:"शैक्षिक प्रोटोटाइप — पेशेवर कानूनी सलाह का विकल्प नहीं।",viewGuidance:"मार्गदर्शन देखें",guidanceSteps:"मार्गदर्शन कदम",typicalEvidence:"जरूरी सबूत",issueOverview:"समस्या का सार",stepActions:"चरणबद्ध कार्रवाई",askIssue:"इस समस्या के बारे में पूछें",guidanceFound:"मार्गदर्शन मिला",whatDoNow:"अब क्या करें",keepReady:"ये तैयार रखें",listen:"मार्गदर्शन सुनें",stop:"रोकें",copy:"कॉपी करें",askAnother:"दूसरा सवाल पूछें",loading:"सही मार्गदर्शन खोज रहे हैं…",tryAgain:"फिर कोशिश करें",unknownTitle:"समस्या पहचानी नहीं गई",unknownText:"यह प्रोटोटाइप दुर्घटना, अकाउंट बंद और पेमेंट की समस्याएँ समझता है।",emptyTitle:"ऊपर अपनी समस्या बताएँ",emptyText:"सिस्टम नज़दीकी समस्या पहचानकर नियंत्रित मार्गदर्शन देगा।",source:"स्रोत",reviewed:"अंतिम समीक्षा",knowledgeBase:"गिग साथी नियंत्रित ज्ञान-भंडार",copied:"मार्गदर्शन कॉपी हो गया",listening:"सुन रहे हैं… अब बोलें।",captured:"आवाज़ सफलतापूर्वक दर्ज हुई।",noSpeech:"आवाज़ नहीं मिली। फिर कोशिश करें।",micBlocked:"माइक्रोफोन की अनुमति बंद है।",voiceUnavailable:"इस ब्राउज़र में आवाज़ इनपुट उपलब्ध नहीं है।"},
mr:{...en,navHome:"मुखपृष्ठ",navAssistant:"हक्क सहाय्यक",navLibrary:"हक्क माहिती",navResources:"संसाधने",askGuidance:"मार्गदर्शन घ्या",heroEyebrow:"बहुभाषिक कामगार सहाय्य",heroTitle:"तुमचे हक्क समजून घ्या.<br><span>योग्य पुढचे पाऊल उचला.</span>",heroLead:"डिलिव्हरी भागीदार आणि कॅब चालकांसाठी खाते, पेमेंट, अपघात व विम्याबाबत सोपे मार्गदर्शन.",startAssistant:"हक्क सहाय्यक सुरू करा",exploreRights:"हक्क पाहा",chooseLanguage:"पुढे जाण्यासाठी तुमची भाषा निवडा",systemAvailable:"मार्गदर्शन प्रणाली उपलब्ध",threeCategories:"सर्व 3 समस्या प्रकार सक्रिय",accidentTitle:"अपघात आणि विमा",accidentShort:"दावा पावले आणि पुरावा यादी",blockedTitle:"खाते बंद झाले",blockedShort:"कारण व अपील प्रक्रिया",paymentTitle:"पेमेंट मिळाले नाही",paymentShort:"पेआउट तपासणी आणि तक्रार",assistantHeading:"तुमच्या कामाची समस्या सांगा",assistantLead:"तुमच्या भाषेत लिहा किंवा बोला. प्रणाली समस्या ओळखून मार्गदर्शन देईल.",selectLanguage:"भाषा निवडा",problemQuestion:"तुम्हाला कोणती समस्या येत आहे?",problemPlaceholder:"उदाहरण: माझे खाते कारण न देता बंद केले.",voiceInput:"बोलून सांगा",quickExamples:"जलद उदाहरणे",getGuidance:"मार्गदर्शन मिळवा",clear:"साफ करा",libraryHeading:"कामातील सामान्य समस्या समजून घ्या",libraryLead:"तक्रारीपूर्वी कोणते पुरावे जतन करायचे आणि पुढची पावले जाणून घ्या.",searchPlaceholder:"हक्क किंवा समस्या शोधा",allIssues:"सर्व समस्या",resourcesHeading:"तक्रारीपूर्वी तयारी करा",resourcesLead:"पुरावे जतन, तक्रार पुढे नेणे आणि माहिती सुरक्षित ठेवण्यासाठी साधने.",evidenceChecklist:"पुरावा तपासणी यादी",evidenceLead:"तक्रार किंवा अपीलपूर्वी हे पूर्ण करा.",prepared:"तयार",allPrepared:"सर्व गोष्टी तयार आहेत. तुम्ही स्पष्ट तक्रार देऊ शकता.",escalationTitle:"तक्रार पुढे नेण्याची प्रक्रिया",safetyTitle:"सुरक्षा आणि गोपनीयता",important:"महत्त्वाचे",globalDisclaimer:"गिग साथी सामान्य माहिती देते. हे वकील, सरकारी अधिकारी, विमा कंपनी किंवा प्लॅटफॉर्म तक्रार अधिकाऱ्याची जागा घेत नाही.",viewGuidance:"मार्गदर्शन पहा",guidanceFound:"मार्गदर्शन मिळाले",whatDoNow:"आता काय करा",keepReady:"हे तयार ठेवा",listen:"मार्गदर्शन ऐका",copy:"कॉपी करा",askAnother:"दुसरा प्रश्न विचारा",loading:"योग्य मार्गदर्शन शोधत आहे…",emptyTitle:"वर तुमची समस्या सांगा",emptyText:"प्रणाली समस्या ओळखून नियंत्रित मार्गदर्शन देईल."},
bn:{...en,navHome:"হোম",navAssistant:"অধিকার সহায়ক",navLibrary:"অধিকার তথ্য",navResources:"রিসোর্স",askGuidance:"নির্দেশনা নিন",heroEyebrow:"বহুভাষিক কর্মী সহায়তা",heroTitle:"আপনার অধিকার বুঝুন।<br><span>সঠিক পরবর্তী পদক্ষেপ নিন।</span>",heroLead:"ডেলিভারি পার্টনার ও ক্যাব চালকদের অ্যাকাউন্ট, পেমেন্ট, দুর্ঘটনা ও বিমা সমস্যায় সহজ নির্দেশনা।",startAssistant:"সহায়ক শুরু করুন",exploreRights:"অধিকার দেখুন",chooseLanguage:"এগিয়ে যেতে আপনার ভাষা বেছে নিন",systemAvailable:"নির্দেশনা ব্যবস্থা চালু আছে",threeCategories:"তিনটি সমস্যা বিভাগ সক্রিয়",accidentTitle:"দুর্ঘটনা ও বিমা",accidentShort:"দাবির ধাপ ও প্রমাণ তালিকা",blockedTitle:"অ্যাকাউন্ট বন্ধ",blockedShort:"কারণ ও আপিল প্রক্রিয়া",paymentTitle:"পেমেন্ট পাওয়া যায়নি",paymentShort:"পেআউট যাচাই ও অভিযোগ",assistantHeading:"কাজের সমস্যা বলুন",assistantLead:"নিজের ভাষায় লিখুন বা বলুন। ব্যবস্থা সমস্যা চিহ্নিত করে নির্দেশনা দেবে।",selectLanguage:"ভাষা বেছে নিন",problemQuestion:"আপনি কী সমস্যার মুখোমুখি?",problemPlaceholder:"উদাহরণ: কোনো কারণ ছাড়াই আমার অ্যাকাউন্ট বন্ধ হয়েছে।",voiceInput:"বলে জানান",quickExamples:"দ্রুত উদাহরণ",getGuidance:"নির্দেশনা দেখুন",clear:"মুছুন",libraryHeading:"সাধারণ কাজের সমস্যা বুঝুন",libraryLead:"অভিযোগের আগে প্রমাণ ও সম্ভাব্য পদক্ষেপ জানুন।",searchPlaceholder:"অধিকার বা সমস্যা খুঁজুন",allIssues:"সব সমস্যা",resourcesHeading:"অভিযোগের আগে প্রস্তুতি নিন",resourcesLead:"প্রমাণ রাখা, অভিযোগ এগিয়ে নেওয়া ও তথ্য সুরক্ষার উপায়।",evidenceChecklist:"প্রমাণের তালিকা",evidenceLead:"অভিযোগ বা আপিলের আগে এগুলো পূরণ করুন।",prepared:"প্রস্তুত",allPrepared:"সবকিছু প্রস্তুত। এখন পরিষ্কার অভিযোগ জমা দিতে পারেন।",escalationTitle:"অভিযোগ এগিয়ে নেওয়ার ধাপ",safetyTitle:"নিরাপত্তা ও গোপনীয়তা",important:"গুরুত্বপূর্ণ",globalDisclaimer:"গিগ সাথী সাধারণ তথ্য দেয়। এটি আইনজীবী, সরকারি কর্মকর্তা, বিমা সংস্থা বা প্ল্যাটফর্ম অভিযোগ কর্মকর্তার বিকল্প নয়।",viewGuidance:"নির্দেশনা দেখুন",guidanceFound:"নির্দেশনা পাওয়া গেছে",whatDoNow:"এখন কী করবেন",keepReady:"এগুলো প্রস্তুত রাখুন",listen:"নির্দেশনা শুনুন",copy:"কপি করুন",askAnother:"আরেকটি প্রশ্ন করুন",loading:"প্রাসঙ্গিক নির্দেশনা খোঁজা হচ্ছে…",emptyTitle:"উপরে সমস্যা লিখুন",emptyText:"ব্যবস্থা সমস্যা চিহ্নিত করে নিয়ন্ত্রিত নির্দেশনা দেবে."}};

Object.assign(translations.mr,{issueCategories:"समस्या प्रकार",languagesSupported:"समर्थित भाषा",loginRequired:"लॉगिन आवश्यक",alwaysFree:"वापर — नेहमी मोफत",howEyebrow:"प्रणाली कशी काम करते",howTitle:"समस्येपासून स्पष्ट पुढच्या पावलांपर्यंत",flow1Title:"बोला किंवा लिहा",flow1Text:"तुमच्या पसंतीच्या भाषेत समस्या सांगा.",flow2Title:"समस्या ओळखा",flow2Text:"प्रणाली योग्य समस्या प्रकार ओळखते.",flow3Title:"मार्गदर्शन मिळवा",flow3Text:"नियंत्रित ज्ञानसंग्रहातून माहिती मिळते.",flow4Title:"कृती करा",flow4Text:"पावले, कागदपत्रे आणि आवाज मार्गदर्शन मिळवा.",whyEyebrow:"गिग साथी का",whyTitle:"कामगारांसाठी बनवलेले",value1Title:"बहुभाषिक सहाय्य",value1Text:"चार भारतीय भाषांमध्ये वाचा, बोला आणि ऐका.",value2Title:"नियंत्रित मार्गदर्शन",value2Text:"अंदाजाऐवजी पडताळलेली सामान्य माहिती.",value3Title:"आवाजाची सुविधा",value3Text:"समस्या बोला आणि उत्तर ऐका.",assistantEyebrow:"हक्क सहाय्यक",libraryEyebrow:"हक्क माहिती",resourcesEyebrow:"संसाधन केंद्र",footerText:"प्लॅटफॉर्म कामगारांसाठी हक्क माहिती.",platform:"प्लॅटफॉर्म",legalNotice:"कायदेशीर सूचना",footerDisclaimer:"शैक्षणिक नमुना — व्यावसायिक कायदेशीर सल्ल्याचा पर्याय नाही.",guidanceSteps:"मार्गदर्शन पावले",typicalEvidence:"सामान्यतः लागणारे पुरावे",issueOverview:"समस्येचा आढावा",stepActions:"टप्प्याटप्प्याने कृती",askIssue:"या समस्येबद्दल विचारा",stop:"थांबवा",tryAgain:"पुन्हा प्रयत्न करा",unknownTitle:"समस्या ओळखता आली नाही",unknownText:"हा नमुना अपघात, खाते बंद आणि पेमेंट समस्या समजतो.",source:"स्रोत",reviewed:"शेवटचे पुनरावलोकन",knowledgeBase:"गिग साथी नियंत्रित ज्ञानसंग्रह",copied:"मार्गदर्शन कॉपी झाले",listening:"ऐकत आहे… आता बोला.",captured:"आवाज यशस्वीपणे नोंदवला.",noSpeech:"आवाज ऐकू आला नाही. पुन्हा प्रयत्न करा.",micBlocked:"मायक्रोफोनची परवानगी बंद आहे.",voiceUnavailable:"या ब्राउझरमध्ये आवाज इनपुट उपलब्ध नाही."});
Object.assign(translations.bn,{issueCategories:"সমস্যার বিভাগ",languagesSupported:"সমর্থিত ভাষা",loginRequired:"লগইন প্রয়োজন",alwaysFree:"ব্যবহার — সবসময় বিনামূল্যে",howEyebrow:"ব্যবস্থাটি যেভাবে কাজ করে",howTitle:"সমস্যা থেকে স্পষ্ট পরবর্তী পদক্ষেপ",flow1Title:"বলুন বা লিখুন",flow1Text:"নিজের পছন্দের ভাষায় সমস্যা জানান।",flow2Title:"সমস্যা শনাক্ত",flow2Text:"ব্যবস্থা সবচেয়ে কাছের বিভাগ চিহ্নিত করে।",flow3Title:"নির্দেশনা নিন",flow3Text:"নিয়ন্ত্রিত তথ্যভাণ্ডার থেকে তথ্য আসে।",flow4Title:"পদক্ষেপ নিন",flow4Text:"ধাপ, কাগজপত্র ও ভয়েস নির্দেশনা পান।",whyEyebrow:"কেন গিগ সাথী",whyTitle:"কর্মীদের জন্য তৈরি",value1Title:"বহুভাষিক সহায়তা",value1Text:"চারটি ভারতীয় ভাষায় পড়ুন, বলুন ও শুনুন।",value2Title:"নিয়ন্ত্রিত নির্দেশনা",value2Text:"অনিশ্চিত পরামর্শের বদলে নির্দিষ্ট সাধারণ তথ্য।",value3Title:"ভয়েস সুবিধা",value3Text:"সমস্যা বলুন এবং উত্তর শুনুন।",assistantEyebrow:"অধিকার সহায়ক",libraryEyebrow:"অধিকার তথ্য",resourcesEyebrow:"রিসোর্স কেন্দ্র",footerText:"প্ল্যাটফর্ম কর্মীদের জন্য অধিকার তথ্য।",platform:"প্ল্যাটফর্ম",legalNotice:"আইনি নোটিশ",footerDisclaimer:"শিক্ষামূলক নমুনা — পেশাদার আইনি পরামর্শের বিকল্প নয়।",guidanceSteps:"নির্দেশনার ধাপ",typicalEvidence:"সাধারণত যে প্রমাণ দরকার",issueOverview:"সমস্যার সারাংশ",stepActions:"ধাপে ধাপে করণীয়",askIssue:"এই সমস্যা সম্পর্কে জিজ্ঞাসা করুন",stop:"থামান",tryAgain:"আবার চেষ্টা করুন",unknownTitle:"সমস্যা শনাক্ত হয়নি",unknownText:"এই নমুনা দুর্ঘটনা, অ্যাকাউন্ট বন্ধ ও পেমেন্ট সমস্যা বোঝে।",source:"উৎস",reviewed:"শেষ পর্যালোচনা",knowledgeBase:"গিগ সাথী নিয়ন্ত্রিত তথ্যভাণ্ডার",copied:"নির্দেশনা কপি হয়েছে",listening:"শুনছি… এখন বলুন।",captured:"কণ্ঠস্বর সফলভাবে ধরা হয়েছে।",noSpeech:"কথা শোনা যায়নি। আবার চেষ্টা করুন।",micBlocked:"মাইক্রোফোনের অনুমতি বন্ধ।",voiceUnavailable:"এই ব্রাউজারে ভয়েস ইনপুট নেই।"});

const baseIssues={accident:{tag:"ACCIDENT & INSURANCE",title:"On-duty accidents and insurance claims",description:"Understand what to do after an accident while working and how to begin an insurance claim through the platform.",summary:"Preserve evidence first, then request the platform’s active insurance and claim process in writing.",steps:["Get medical help first and inform a trusted person.","Report the accident through the official platform support channel.","Save the trip or order ID, location, time and photographs.","Ask for the insurer name, policy number, claim form and deadline.","Submit copies and save the complaint or claim reference number."],docs:["Worker and vehicle ID","Trip or order details","Medical reports and bills","Photos or police report, if available"],example:"I had an accident while completing a delivery."},blocked:{tag:"ACCOUNT DEACTIVATION",title:"Account blocked or deactivated without a clear reason",description:"Know how to request a written reason and use the platform’s official appeal process.",summary:"Request the exact reason in writing and use the platform’s official appeal or grievance channel.",steps:["Save a screenshot of the blocked-account message.","Check email, SMS and app notifications for a reason.","Ask support for the exact reason and evidence in writing.","Use the official appeal or grievance option.","Save every support ticket or reference number."],docs:["Worker ID and registered phone","Account-blocking screenshots","Support ticket numbers","Relevant order or trip IDs"],example:"My account was blocked without any reason or warning."},payment:{tag:"MISSING PAYMENTS",title:"Missing earnings, incentives or delayed payments",description:"Verify expected earnings, calculate discrepancies and raise a documented payment complaint.",summary:"Compare the promised amount with the payout statement, then raise a documented dispute.",steps:["Save the offer, incentive, order and payout screenshots.","Check the payout date and eligibility rules.","Calculate the missing amount order by order.","Raise a payment ticket with the calculation and evidence.","Save the ticket number and request a written resolution date."],docs:["Payout statement","Order or trip IDs","Offer screenshots","Bank or wallet entry"],example:"My incentive payment has not been credited."}};
const issueTranslations={en:baseIssues,hi:{accident:{...baseIssues.accident,title:"काम के दौरान दुर्घटना और बीमा दावा",description:"दुर्घटना के बाद जरूरी कदम और प्लेटफ़ॉर्म के जरिए बीमा दावा शुरू करना समझें।",summary:"पहले सबूत सुरक्षित रखें, फिर बीमा और क्लेम प्रक्रिया लिखित में माँगें।",steps:["सबसे पहले इलाज कराएँ और भरोसेमंद व्यक्ति को बताएँ।","आधिकारिक प्लेटफ़ॉर्म सपोर्ट पर दुर्घटना दर्ज करें।","ट्रिप/ऑर्डर ID, जगह, समय और फोटो रखें।","बीमा कंपनी, पॉलिसी नंबर, फॉर्म और अंतिम तारीख पूछें।","दस्तावेज जमा करके क्लेम नंबर सुरक्षित रखें।"],docs:["वर्कर और वाहन ID","ट्रिप या ऑर्डर विवरण","मेडिकल रिपोर्ट और बिल","फोटो या पुलिस रिपोर्ट"],example:"डिलीवरी करते समय मेरा एक्सीडेंट हो गया।"},blocked:{...baseIssues.blocked,title:"बिना स्पष्ट कारण अकाउंट बंद",description:"लिखित कारण माँगें और आधिकारिक अपील प्रक्रिया इस्तेमाल करें।",summary:"सही कारण लिखित में माँगें और आधिकारिक शिकायत प्रक्रिया अपनाएँ।",steps:["ब्लॉक संदेश का स्क्रीनशॉट लें।","ईमेल, SMS और ऐप नोटिफिकेशन देखें।","सपोर्ट से कारण और सबूत लिखित में माँगें।","आधिकारिक अपील विकल्प इस्तेमाल करें।","हर टिकट या रेफरेंस नंबर रखें।"],docs:["वर्कर ID और रजिस्टर्ड फोन","ब्लॉक स्क्रीनशॉट","सपोर्ट टिकट नंबर","ऑर्डर या ट्रिप ID"],example:"मेरा अकाउंट बिना कारण के ब्लॉक हो गया।"},payment:{...baseIssues.payment,title:"कमाई, इंसेंटिव या पेमेंट नहीं मिला",description:"अपेक्षित कमाई जाँचें और सबूत के साथ पेमेंट शिकायत दर्ज करें।",summary:"वादा की गई रकम को पेआउट स्टेटमेंट से मिलाकर शिकायत करें।",steps:["ऑफर, इंसेंटिव और पेआउट स्क्रीनशॉट रखें।","पेआउट तारीख और पात्रता नियम देखें।","हर ऑर्डर की गायब रकम निकालें।","गणना और सबूत के साथ शिकायत करें।","टिकट नंबर और समाधान तारीख लिखित में माँगें।"],docs:["पेआउट स्टेटमेंट","ऑर्डर/ट्रिप ID","ऑफर स्क्रीनशॉट","बैंक या वॉलेट एंट्री"],example:"मेरा पेमेंट और इंसेंटिव नहीं मिला।"}},mr:{},bn:{}};
issueTranslations.mr={accident:{...issueTranslations.hi.accident,title:"कामाच्या वेळी अपघात आणि विमा दावा",summary:"आधी पुरावे जतन करा, नंतर विमा व दावा प्रक्रिया लेखी मागा.",example:"डिलिव्हरी करताना माझा अपघात झाला."},blocked:{...issueTranslations.hi.blocked,title:"स्पष्ट कारणाशिवाय खाते बंद",summary:"नेमके कारण लेखी मागा आणि अधिकृत अपील प्रक्रिया वापरा.",example:"माझे खाते कारण न देता बंद केले."},payment:{...issueTranslations.hi.payment,title:"कमाई, इन्सेन्टिव्ह किंवा पेमेंट मिळाले नाही",summary:"वचन दिलेली रक्कम पेआउटशी तपासून पुराव्यासह तक्रार करा.",example:"माझे पेमेंट आणि इन्सेन्टिव्ह मिळाले नाही."}};
issueTranslations.bn={accident:{...issueTranslations.hi.accident,title:"কাজের সময় দুর্ঘটনা ও বিমা দাবি",summary:"আগে প্রমাণ রাখুন, তারপর বিমা ও দাবি প্রক্রিয়া লিখিতভাবে চান।",example:"ডেলিভারি করার সময় আমার দুর্ঘটনা হয়েছে।"},blocked:{...issueTranslations.hi.blocked,title:"স্পষ্ট কারণ ছাড়া অ্যাকাউন্ট বন্ধ",summary:"সঠিক কারণ লিখিতভাবে চান এবং সরকারি আপিল পদ্ধতি ব্যবহার করুন।",example:"কোনো কারণ ছাড়াই আমার অ্যাকাউন্ট বন্ধ হয়েছে।"},payment:{...issueTranslations.hi.payment,title:"আয়, ইনসেনটিভ বা পেমেন্ট পাওয়া যায়নি",summary:"প্রতিশ্রুত টাকা পেআউটের সঙ্গে মিলিয়ে প্রমাণসহ অভিযোগ করুন।",example:"আমার পেমেন্ট ও ইনসেনটিভ পাওয়া যায়নি।"}};

issueTranslations.mr={
accident:{tag:"अपघात आणि विमा",title:"कामाच्या वेळी अपघात आणि विमा दावा",description:"काम करताना अपघात झाल्यानंतरची पावले आणि प्लॅटफॉर्ममार्फत विमा दावा कसा सुरू करायचा ते समजा.",summary:"आधी पुरावे जतन करा, नंतर सक्रिय विमा आणि दावा प्रक्रिया लेखी मागा.",steps:["सर्वप्रथम वैद्यकीय मदत घ्या आणि विश्वासू व्यक्तीला कळवा.","अधिकृत प्लॅटफॉर्म सपोर्टवर अपघाताची नोंद करा.","ट्रिप किंवा ऑर्डर ID, ठिकाण, वेळ आणि फोटो जतन करा.","विमा कंपनीचे नाव, पॉलिसी क्रमांक, दावा फॉर्म आणि अंतिम तारीख विचारा.","कागदपत्रांच्या प्रती जमा करा आणि दावा क्रमांक जतन करा."],docs:["कामगार आणि वाहन ID","ट्रिप किंवा ऑर्डर तपशील","वैद्यकीय अहवाल आणि बिले","फोटो किंवा पोलीस अहवाल"],example:"डिलिव्हरी करताना माझा अपघात झाला."},
blocked:{tag:"खाते निष्क्रिय",title:"स्पष्ट कारणाशिवाय खाते बंद",description:"लेखी कारण कसे मागायचे आणि अधिकृत अपील प्रक्रिया कशी वापरायची ते जाणून घ्या.",summary:"नेमके कारण लेखी मागा आणि अधिकृत अपील किंवा तक्रार मार्ग वापरा.",steps:["खाते बंद झाल्याच्या संदेशाचा स्क्रीनशॉट घ्या.","ईमेल, SMS आणि ॲप सूचना तपासा.","सपोर्टकडून कारण आणि पुरावा लेखी मागा.","अधिकृत अपील किंवा तक्रार पर्याय वापरा.","प्रत्येक सपोर्ट तिकीट किंवा संदर्भ क्रमांक जतन करा."],docs:["कामगार ID आणि नोंदणीकृत फोन","खाते बंद स्क्रीनशॉट","सपोर्ट तिकीट क्रमांक","संबंधित ऑर्डर किंवा ट्रिप ID"],example:"माझे खाते कारण न देता बंद केले."},
payment:{tag:"पेमेंट मिळाले नाही",title:"कमाई, इन्सेन्टिव्ह किंवा पेमेंट मिळाले नाही",description:"अपेक्षित कमाई तपासा, फरक मोजा आणि पुराव्यासह पेमेंट तक्रार करा.",summary:"वचन दिलेली रक्कम पेआउट स्टेटमेंटशी जुळवा आणि नोंद केलेली तक्रार करा.",steps:["ऑफर, इन्सेन्टिव्ह, ऑर्डर आणि पेआउटचे स्क्रीनशॉट जतन करा.","पेआउट तारीख आणि पात्रता नियम तपासा.","प्रत्येक ऑर्डरची कमी रक्कम मोजा.","हिशोब आणि पुराव्यासह पेमेंट तिकीट उघडा.","तिकीट क्रमांक जतन करा आणि उत्तराची तारीख लेखी मागा."],docs:["पेआउट स्टेटमेंट","ऑर्डर किंवा ट्रिप ID","ऑफर स्क्रीनशॉट","बँक किंवा वॉलेट नोंद"],example:"माझे पेमेंट आणि इन्सेन्टिव्ह मिळाले नाही."}
};
issueTranslations.bn={
accident:{tag:"দুর্ঘটনা ও বিমা",title:"কাজের সময় দুর্ঘটনা ও বিমা দাবি",description:"কাজের সময় দুর্ঘটনার পর কী করবেন এবং প্ল্যাটফর্মের মাধ্যমে বিমা দাবি কীভাবে শুরু করবেন তা জানুন।",summary:"আগে প্রমাণ রাখুন, তারপর সক্রিয় বিমা ও দাবি প্রক্রিয়া লিখিতভাবে চান।",steps:["সবার আগে চিকিৎসা নিন এবং বিশ্বস্ত কাউকে জানান।","সরকারি প্ল্যাটফর্ম সাপোর্টে দুর্ঘটনা রিপোর্ট করুন।","ট্রিপ বা অর্ডার ID, স্থান, সময় ও ছবি রাখুন।","বিমা সংস্থার নাম, পলিসি নম্বর, দাবি ফর্ম ও শেষ তারিখ চান।","কাগজপত্রের কপি জমা দিয়ে দাবি নম্বর রাখুন।"],docs:["কর্মী ও গাড়ির ID","ট্রিপ বা অর্ডারের তথ্য","চিকিৎসার রিপোর্ট ও বিল","ছবি বা পুলিশ রিপোর্ট"],example:"ডেলিভারি করার সময় আমার দুর্ঘটনা হয়েছে।"},
blocked:{tag:"অ্যাকাউন্ট বন্ধ",title:"স্পষ্ট কারণ ছাড়া অ্যাকাউন্ট বন্ধ",description:"লিখিত কারণ কীভাবে চাইবেন এবং সরকারি আপিল পদ্ধতি কীভাবে ব্যবহার করবেন তা জানুন।",summary:"সঠিক কারণ লিখিতভাবে চান এবং সরকারি আপিল বা অভিযোগের পথ ব্যবহার করুন।",steps:["অ্যাকাউন্ট বন্ধ বার্তার স্ক্রিনশট নিন।","ইমেল, SMS ও অ্যাপের নোটিফিকেশন দেখুন।","সাপোর্টের কাছে কারণ ও প্রমাণ লিখিতভাবে চান।","সরকারি আপিল বা অভিযোগের বিকল্প ব্যবহার করুন।","প্রতিটি সাপোর্ট টিকিট বা রেফারেন্স নম্বর রাখুন।"],docs:["কর্মী ID ও নিবন্ধিত ফোন","অ্যাকাউন্ট বন্ধের স্ক্রিনশট","সাপোর্ট টিকিট নম্বর","প্রাসঙ্গিক অর্ডার বা ট্রিপ ID"],example:"কোনো কারণ ছাড়াই আমার অ্যাকাউন্ট বন্ধ হয়েছে।"},
payment:{tag:"পেমেন্ট বাকি",title:"আয়, ইনসেনটিভ বা পেমেন্ট পাওয়া যায়নি",description:"প্রত্যাশিত আয় যাচাই করুন, পার্থক্য হিসাব করুন এবং প্রমাণসহ পেমেন্ট অভিযোগ করুন।",summary:"প্রতিশ্রুত টাকা পেআউট স্টেটমেন্টের সঙ্গে মিলিয়ে নথিসহ অভিযোগ করুন।",steps:["অফার, ইনসেনটিভ, অর্ডার ও পেআউটের স্ক্রিনশট রাখুন।","পেআউটের তারিখ ও যোগ্যতার নিয়ম দেখুন।","প্রতিটি অর্ডারের বাকি টাকা হিসাব করুন।","হিসাব ও প্রমাণসহ পেমেন্ট টিকিট খুলুন।","টিকিট নম্বর রাখুন এবং সমাধানের তারিখ লিখিতভাবে চান।"],docs:["পেআউট স্টেটমেন্ট","অর্ডার বা ট্রিপ ID","অফারের স্ক্রিনশট","ব্যাংক বা ওয়ালেট এন্ট্রি"],example:"আমার পেমেন্ট ও ইনসেনটিভ পাওয়া যায়নি।"}
};

const resourceText={en:{checks:[["Save screenshots and messages","Capture them before anything changes."],["Record order, trip or transaction IDs","These identifiers are needed in every complaint."],["Keep medical or payment documents together","A folder makes retrieval faster."],["Save complaint and support-ticket numbers","Every support contact should produce a reference."],["Never share passwords or OTPs","Legitimate support should not ask for these."]],steps:["Contact official platform support.","Ask for a ticket or reference number.","Request the decision and reason in writing.","Use the official grievance or appeal channel.","Keep copies of all communication."],safety:["Protect personal information.","Never share OTPs or passwords.","Save evidence before submitting a complaint.","Use official platform channels only."]},hi:{checks:[["स्क्रीनशॉट और संदेश रखें","बदलाव से पहले इन्हें सुरक्षित करें।"],["ऑर्डर, ट्रिप या लेनदेन ID लिखें","हर शिकायत में इनकी जरूरत होती है।"],["मेडिकल या पेमेंट दस्तावेज साथ रखें","एक फ़ोल्डर से ढूँढना आसान होगा।"],["शिकायत और टिकट नंबर रखें","हर सपोर्ट संपर्क का रेफरेंस लें।"],["पासवर्ड या OTP कभी साझा न करें","सही सपोर्ट इसकी माँग नहीं करता।"]],steps:["आधिकारिक प्लेटफ़ॉर्म सपोर्ट से संपर्क करें।","टिकट या रेफरेंस नंबर माँगें।","फैसला और कारण लिखित में माँगें।","आधिकारिक शिकायत या अपील चैनल इस्तेमाल करें।","सभी बातचीत की कॉपी रखें।"],safety:["निजी जानकारी सुरक्षित रखें।","OTP या पासवर्ड साझा न करें।","शिकायत से पहले सबूत रखें।","केवल आधिकारिक चैनल इस्तेमाल करें।"]},mr:{checks:[["स्क्रीनशॉट आणि संदेश जतन करा","बदल होण्यापूर्वी ते सुरक्षित ठेवा."],["ऑर्डर, ट्रिप किंवा व्यवहार ID लिहा","प्रत्येक तक्रारीत हे लागतात."],["वैद्यकीय किंवा पेमेंट कागदपत्रे एकत्र ठेवा","एका फोल्डरमध्ये शोधणे सोपे जाते."],["तक्रार आणि तिकीट क्रमांक जतन करा","प्रत्येक सपोर्ट संपर्काचा संदर्भ घ्या."],["पासवर्ड किंवा OTP कधीही सांगू नका","खरा सपोर्ट ही माहिती मागत नाही."]],steps:["अधिकृत प्लॅटफॉर्म सपोर्टशी संपर्क करा.","तिकीट किंवा संदर्भ क्रमांक मागा.","निर्णय आणि कारण लेखी मागा.","अधिकृत तक्रार किंवा अपील मार्ग वापरा.","सर्व संवादाच्या प्रती जतन करा."],safety:["वैयक्तिक माहिती सुरक्षित ठेवा.","OTP किंवा पासवर्ड सांगू नका.","तक्रारीपूर्वी पुरावे जतन करा.","फक्त अधिकृत प्लॅटफॉर्म मार्ग वापरा."]},bn:{checks:[["স্ক্রিনশট ও বার্তা রাখুন","কিছু বদলানোর আগেই সেগুলো সংরক্ষণ করুন।"],["অর্ডার, ট্রিপ বা লেনদেন ID লিখুন","প্রতিটি অভিযোগে এগুলো দরকার।"],["চিকিৎসা বা পেমেন্টের কাগজ একসঙ্গে রাখুন","একটি ফোল্ডারে খুঁজে পাওয়া সহজ।"],["অভিযোগ ও টিকিট নম্বর রাখুন","প্রতিটি সাপোর্ট যোগাযোগের রেফারেন্স নিন।"],["পাসওয়ার্ড বা OTP কখনও বলবেন না","সঠিক সাপোর্ট এগুলো চায় না।"]],steps:["সরকারি প্ল্যাটফর্ম সাপোর্টে যোগাযোগ করুন।","টিকিট বা রেফারেন্স নম্বর চান।","সিদ্ধান্ত ও কারণ লিখিতভাবে চান।","সরকারি অভিযোগ বা আপিলের পথ ব্যবহার করুন।","সব যোগাযোগের কপি রাখুন।"],safety:["ব্যক্তিগত তথ্য সুরক্ষিত রাখুন।","OTP বা পাসওয়ার্ড বলবেন না।","অভিযোগের আগে প্রমাণ রাখুন।","শুধু সরকারি প্ল্যাটফর্ম চ্যানেল ব্যবহার করুন।"]}};

let language=localStorage.getItem("gigSaathiLanguage")||"en",currentIssue=null,currentFilter="all";
function t(key){return(translations[language]&&translations[language][key])||en[key]||key}
function setLanguage(next){language=next;localStorage.setItem("gigSaathiLanguage",next);document.documentElement.lang=next;$("globalLanguage").value=next;document.querySelectorAll("[data-i18n]").forEach(el=>el.textContent=t(el.dataset.i18n));document.querySelectorAll("[data-i18n-html]").forEach(el=>el.innerHTML=t(el.dataset.i18nHtml));document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>el.placeholder=t(el.dataset.i18nPlaceholder));document.querySelectorAll("[data-language]").forEach(el=>el.classList.toggle("active",el.dataset.language===next));renderEmpty();renderLibrary();renderResources();}
function go(route) {
    const allowedRoutes = [
        "home",
        "assistant",
        "library",
        "resources",
        "history"
    ];

    const safe = allowedRoutes.includes(route) ? route : "home";

    document.querySelectorAll(".view").forEach((view) => {
        view.classList.toggle("active", view.dataset.view === safe);
    });

    document.querySelectorAll("[data-route]").forEach((link) => {
        link.classList.toggle("active", link.dataset.route === safe);
    });

    location.hash = safe;

    $("mainNav").classList.remove("open");
    $("menuButton").setAttribute("aria-expanded", "false");

    if (safe === "history") {
        loadHistory();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
function detectIssue(text){const s=text.toLowerCase();if(/accident|insurance|injury|hospital|दुर्घटना|एक्सीडेंट|बीमा|अपघात|विमा|দুর্ঘটনা|বিমা/.test(s))return"accident";if(/block|suspend|deactivat|account|अकाउंट|ब्लॉक|खाता|खाते|অ্যাকাউন্ট|ব্লক/.test(s))return"blocked";if(/payment|incentive|salary|money|पेमेंट|इंसेंटिव|पैसे|पगार|ইনসেনটিভ|পেমেন্ট|টাকা/.test(s))return"payment";return null}
function renderEmpty(){if(currentIssue)return;$("resultPanel").innerHTML=`<div class="result-empty"><div><div class="empty-icon">?</div><h2>${t("emptyTitle")}</h2><p>${t("emptyText")}</p></div></div>`}
function renderResult(type){currentIssue=type;const d=issueTranslations[language][type];$("resultPanel").innerHTML=`<div class="result-success"><span class="result-label">${t("guidanceFound")} · ${d.tag}</span><h2>${d.title}</h2><p class="result-summary">${d.summary}</p><h3>${t("whatDoNow")}</h3><ol class="guidance-steps">${d.steps.map(x=>`<li>${x}</li>`).join("")}</ol><div class="document-box"><strong>${t("keepReady")}</strong><ul>${d.docs.map(x=>`<li>${x}</li>`).join("")}</ul></div><div class="result-actions"><button id="listenResult" class="button button-primary" type="button">${t("listen")}</button><button id="copyResult" class="button button-secondary" type="button">${t("copy")}</button><button id="anotherResult" class="button button-text" type="button">${t("askAnother")}</button></div><p class="trust-meta"><strong>${t("source")}:</strong> ${t("knowledgeBase")} · <strong>${t("reviewed")}:</strong> 18 Sep 2026<br>${t("globalDisclaimer")}</p></div>`;$("listenResult").onclick=()=>speakIssue(d);$("copyResult").onclick=()=>copyGuidance(d);$("anotherResult").onclick=clearAssistant;}
async function saveQuery(problem, category) {
    try {
    const response = await fetch("https://gig-saathi-backend.onrender.com/api/queries", {
        method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
        },
        body: JSON.stringify({
            problem: problem,
            language: language,
            category: category || "unknown"
        })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(data.message || "Query could not be saved");
    }

    
    console.log("Backend response:", data);

} catch (error) {
    console.error("Backend connection failed:", error);

    alert("Query could not be saved. Please check the backend.");
}
}
function showGuidance() {
    const value = $("problemInput").value.trim();
    const type = detectIssue(value);

    if (!value) {
        $("problemInput").focus();
        return;
    }

    $("resultPanel").innerHTML = `
        <div class="result-loading">
            <div>
                <div class="spinner"></div>
                <h2>${t("loading")}</h2>
            </div>
        </div>
    `;

    // Save query in backend database
    saveQuery(value, type);

    setTimeout(() => {
        if (type) {
            renderResult(type);
        } else {
            renderUnknown();
        }
    }, 550);
}
function renderUnknown(){$("resultPanel").innerHTML=`<div class="result-empty"><div><div class="empty-icon">!</div><h2>${t("unknownTitle")}</h2><p>${t("unknownText")}</p><div class="result-actions">${["accident","blocked","payment"].map(k=>`<button class="button button-secondary unknown-choice" data-choice="${k}">${translations[language][k+"Title"]||en[k+"Title"]}</button>`).join("")}</div></div></div>`;document.querySelectorAll(".unknown-choice").forEach(b=>b.onclick=()=>{const k=b.dataset.choice;$("problemInput").value=issueTranslations[language][k].example;updateCount();renderResult(k);});}
async function speakIssue(d) {
    const btn = $("listenResult");

    if (!btn) return;

    if (window.currentAudio && !window.currentAudio.paused) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
        btn.textContent = t("listen");
        return;
    }

    const text = [d.title, d.summary, ...d.steps].join(". ");

    btn.textContent = t("stop");

    try {
        const response = await fetch("http://127.0.0.1:5001/tts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
           body: JSON.stringify({
                text: text,
                language: language
            })
        });

        if (!response.ok) {
            throw new Error("TTS server error");
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
        window.currentAudio = audio;

        audio.onended = () => {
            btn.textContent = t("listen");
            URL.revokeObjectURL(audioUrl);
        };

        audio.onerror = () => {
            btn.textContent = t("listen");
            URL.revokeObjectURL(audioUrl);
            alert("Voice playback failed.");
        };

        await audio.play();

    } catch (error) {
        console.error("Local TTS error:", error);
        btn.textContent = t("listen");
        alert("Local voice server is not running.");
    }
}
async function copyGuidance(d){const text=[d.title,d.summary,...d.steps.map((s,i)=>`${i+1}. ${s}`)].join("\n");try{await navigator.clipboard.writeText(text);showToast(t("copied"))}catch{showToast(text)}}
function clearAssistant(){window.speechSynthesis?.cancel();currentIssue=null;$("problemInput").value="";$("voiceStatus").textContent="";updateCount();renderEmpty();$("problemInput").focus()}
function updateCount(){$("charCount").textContent=`${$("problemInput").value.length} / 400`}
function showToast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),1800)}
function renderLibrary(){const q=$("librarySearch")?.value.toLowerCase()||"";const data=issueTranslations[language];$("libraryGrid").innerHTML=Object.entries(data).filter(([k,d])=>(currentFilter==="all"||currentFilter===k)&&(`${d.title} ${d.description}`.toLowerCase().includes(q))).map(([k,d])=>`<article class="library-card" data-card="${k}"><span class="category-pill ${k}">${d.tag}</span><h2>${d.title}</h2><p>${d.description}</p><div class="evidence-list"><strong>${t("typicalEvidence")}</strong><ul>${d.docs.slice(0,4).map(x=>`<li>${x}</li>`).join("")}</ul></div><div class="library-card-footer"><span>${d.steps.length} ${t("guidanceSteps")}</span><button class="button button-primary" type="button" data-view-issue="${k}">${t("viewGuidance")} →</button></div></article>`).join("");document.querySelectorAll("[data-view-issue]").forEach(b=>b.onclick=()=>openIssue(b.dataset.viewIssue));}
function openIssue(k){const d=issueTranslations[language][k];$("dialogContent").innerHTML=`<div class="dialog-body"><span class="category-pill">${d.tag}</span><h2>${d.title}</h2><h3>${t("issueOverview")}</h3><p>${d.description}</p><h3>${t("stepActions")}</h3><ol class="guidance-steps">${d.steps.map(x=>`<li>${x}</li>`).join("")}</ol><div class="document-box"><strong>${t("keepReady")}</strong><ul>${d.docs.map(x=>`<li>${x}</li>`).join("")}</ul></div><button id="askThisIssue" class="button button-lime" type="button">${t("askIssue")} →</button></div>`;$("issueDialog").showModal();$("askThisIssue").onclick=()=>{$("issueDialog").close();$("problemInput").value=d.example;updateCount();go("assistant")};}
function renderResources(){const r=resourceText[language]||resourceText.en;const saved=JSON.parse(localStorage.getItem("gigSaathiChecklist")||"[]");$("resourceChecklist").innerHTML=r.checks.map((x,i)=>`<label class="check-item ${saved.includes(i)?"done":""}"><input type="checkbox" data-check="${i}" ${saved.includes(i)?"checked":""}><span><strong>${x[0]}</strong><small>${x[1]}</small></span></label>`).join("");$("escalationList").innerHTML=r.steps.map(x=>`<li>${x}</li>`).join("");$("safetyList").innerHTML=r.safety.map(x=>`<li>${x}</li>`).join("");document.querySelectorAll("[data-check]").forEach(c=>c.onchange=updateChecklist);paintChecklist(saved.length)}
function updateChecklist(){const checked=[...document.querySelectorAll("[data-check]:checked")].map(x=>Number(x.dataset.check));localStorage.setItem("gigSaathiChecklist",JSON.stringify(checked));document.querySelectorAll(".check-item").forEach((x,i)=>x.classList.toggle("done",checked.includes(i)));paintChecklist(checked.length)}
function paintChecklist(n){$("checkProgress").textContent=`${n} / 5`;$("progressBar").style.width=`${n*20}%`;$("checkSuccess").classList.toggle("hidden",n!==5)}
function initVoice() {
    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!Recognition) {
        $("voiceStatus").textContent =
            "Speech recognition is not supported in this browser.";
        return;
    }

    const rec = new Recognition();

    rec.interimResults = false;
    rec.continuous = false;
    rec.maxAlternatives = 1;

    $("voiceButton").onclick = () => {
        rec.lang = langs[language];

        $("voiceStatus").textContent = t("listening");

        try {
            rec.start();
        } catch (error) {
            console.log(error);
        }
    };

    rec.onresult = event => {
        const transcript =
            event.results[0][0].transcript;

        $("problemInput").value = transcript;

        updateCount();

        $("voiceStatus").textContent = t("captured");
    };

    rec.onend = () => {
        $("voiceButton").classList.remove("listening");
    };

    rec.onerror = event => {
        console.log("Speech error:", event.error);

        $("voiceStatus").textContent =
            "Voice input error: " + event.error;
    };
}
document.querySelectorAll("[data-route]").forEach(x=>x.addEventListener("click",e=>{e.preventDefault();go(x.dataset.route)}));document.querySelectorAll("[data-language]").forEach(x=>x.onclick=()=>setLanguage(x.dataset.language));document.querySelectorAll("[data-issue]").forEach(x=>x.onclick=()=>{const k=x.dataset.issue;$("problemInput").value=issueTranslations[language][k].example;updateCount();go("assistant")});document.querySelectorAll("[data-example]").forEach(x=>x.onclick=()=>{$("problemInput").value=issueTranslations[language][x.dataset.example].example;updateCount()});$("globalLanguage").onchange=e=>setLanguage(e.target.value);$("problemInput").oninput=updateCount;$("guidanceButton").onclick=showGuidance;$("clearButton").onclick=clearAssistant;$("librarySearch").oninput=renderLibrary;document.querySelectorAll("[data-filter]").forEach(x=>x.onclick=()=>{currentFilter=x.dataset.filter;document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("active",b===x));renderLibrary()});$("dialogClose").onclick=()=>$("issueDialog").close();$("issueDialog").onclick=e=>{if(e.target===$("issueDialog"))$("issueDialog").close()};$("menuButton").onclick=()=>{const open=$("mainNav").classList.toggle("open");$("menuButton").setAttribute("aria-expanded",String(open))};window.addEventListener("hashchange",()=>go(location.hash.slice(1)));
setLanguage(language);go(location.hash.slice(1)||"home");initVoice();
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => {
        const symbols = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return symbols[character];
    });
}

async function loadHistory() {
    const historyList = $("historyList");

    historyList.innerHTML = "<p>Loading queries...</p>";

    try {
       const response = await fetch(
        "https://gig-saathi-backend.onrender.com/api/queries",
        {
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        }
    );
    if (response.status === 401) {
        sessionStorage.removeItem("gigSaathiUserToken");
        sessionStorage.removeItem("gigSaathiUser");
        window.location.replace("user-login.html");
        return;
    }

        const data = await response.json();

        if (data.queries.length === 0) {
            historyList.innerHTML = `
                <div class="history-empty">
                    No queries submitted yet.
                </div>
            `;
            return;
        }

        historyList.innerHTML = data.queries.map((query) => `
            <article class="history-card">
                <div class="history-card-top">
                    <span class="category-pill">
                        ${escapeHTML(query.category)}
                    </span>

                    <time>
                        ${new Date(query.createdAt).toLocaleString()}
                    </time>
                </div>

                <h2>${escapeHTML(query.problem)}</h2>

                <p>
                    Language:
                    <strong>${escapeHTML(query.language)}</strong>
                </p>
            </article>
        `).join("");

    } catch (error) {
        historyList.innerHTML = `
            <div class="history-error">
                Backend is not running. Start it using
                <strong>node server.js</strong>.
            </div>
        `;
    }
}

$("refreshHistory").onclick = loadHistory;
const logoutButton = document.getElementById("logoutButton");

function logoutUser() {
    sessionStorage.removeItem("gigSaathiUserToken");
    sessionStorage.removeItem("gigSaathiUser");

    window.location.href = "user-login.html";
}