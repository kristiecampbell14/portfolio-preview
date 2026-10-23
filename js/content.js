/* =====================================================================
   SITE CONTENT
   ---------------------------------------------------------------------
   This is the only file you need to edit to fill out the site.

   PRODUCT STORIES
   Each story renders a card in the Work carousel and its own page at
   story.html?id=<slug>. A story is a list of `blocks`; each block has a
   `type` that decides its layout. See js/story.js for the renderer.

   Block types:
     figure     one image + caption        width: full | wide | narrow
     split      copy beside an artifact    ratio: 40-60 | 50-50 | 60-40, flip
     statement  a large pull statement plus supporting copy
     timeline   horizontal evolution strip of short nodes
     steps      a numbered progression (observed → tested → built → measured)
     metrics    a strip of numbers with labels
     annotated  one artifact plus short text callouts instead of fine print
     gallery    2-3 small artifacts side by side
     cards      2-3 text cards for decisions that weren't new screens
     impact     full-width forest band, huge numbers
     closing    narrow reading column that ends on one large line
     prose      a short centered paragraph to set up what follows
     quote      one testimonial, styled like the homepage recommendations
     chapter    a numbered, anchored section: label, heading, then a `flow`
                of copy and media (story `layout: "chapters"` only)
   ===================================================================== */

window.SITE = {
  name: "Kristie Campbell",
  email: "kristiecampbell14@gmail.com",
  linkedin: "https://www.linkedin.com/in/kristiecampbelldesign",

  /* -------------------------------------------------------------------
     CONTACT
     This fills both the Contact section at the foot of the page and the
     "?" node at the end of the resume timeline.
     ------------------------------------------------------------------- */
  contact: {
    heading: "What's next?",
    body:
      "That's the story so far. If you're building something that needs clarity, craft, and a lot of curiosity, I'd love to hear about it.",
    status: "Open to principal/staff and leadership roles",
    emailLabel: "Say hello",
    linkedinLabel: "Connect on LinkedIn"
  },

  /* -------------------------------------------------------------------
     WORK PASSWORD
     Only a SHA-256 hash of the password is stored, not the password itself.
     Current password: H1R3-KC26 (not case sensitive)
     The gate lower-cases what is typed before hashing, so the hash below is
     of the lower-case form. To change it, open the site and run this in the
     browser console:
       await sha256Hex("your new password".toLowerCase())
     and paste the result below.
     ------------------------------------------------------------------- */
  workPasswordHash: "97d96cda7fcc4a4dd3fa46eead00c090dc72f62bf943f09df1048a381fc35052",

  /* -------------------------------------------------------------------
     PRODUCT STORIES
     ------------------------------------------------------------------- */
  stories: [
    /* =================================================================
       JOB EXPLORER
       ================================================================= */
    {
      slug: "job-explorer",
      title: "Job Explorer",
      /* chapters: anchored sections (grouped under the six nav items), a nav in the bar,
         and the reduced type scale in css/story-chapters.css */
      layout: "chapters",
      eyebrow: "Overview",
      headline:
        "I designed a more useful way for students to discover jobs, return when they were ready, and evaluate their options.",
      intro:
        "The university needed to replace a retiring third-party job board. I worked with my product manager to turn that requirement into something more meaningful for working adults who did not always know which job titles to search for.",

      /* card in the Work carousel */
      role: "Lead product designer",
      year: "2021–2026",
      tagline: "A job feed with no search bar, for people who don't know what to type.",
      cover: "assets/stories/job-explorer/cover.png",
      device: "monitor",
      screen: "assets/work/job-explorer.webp",
      accent: "forest",

      overview: [
        {
          label: "My role",
          body:
            "Hands-on product design, student interviews, interaction design, and ongoing product improvements over five years, including during my time managing designers. I partnered with product management and engineering while continuing to personally design the work shown here."
        },
        {
          label: "At a glance",
          value: "6% → 25%",
          body:
            "The percentage of Job Explorer visitors clicking Apply Now grew from approximately **6% to 25%** across five years of cumulative product improvements."
        }
      ],

      next: {
        slug: "career-profile",
        bridge:
          "The personalization behind Job Explorer depended on understanding the person behind the search."
      },

      blocks: [
        {
          type: "chapter",
          group: "discover",
          nav: "Discover",
          label: "Discover",
          heading: "I designed discovery around what students knew, not the titles they had to guess.",
          flow: [
            "My PM and I interviewed students about the **last time they searched for or applied to a job**. Many described typing broad terms like “remote jobs” or “entry-level jobs” into search engines and job boards. They often knew their constraints, but not the occupations their education was preparing them for.\n\nRather than require a search term, I designed a feed using occupational categories already associated with each student’s academic program. We used **Standard Occupational Classification (SOC)** mappings from Lightcast to surface program-aligned jobs, then showed possible matches to skills earned in class and, later, skills students identified through work history.",
            {
              label: "A deliberate bet",
              pull: "A search bar doesn’t improve the outcome when the user doesn’t know what to search for.",
              body:
                "The absence of search was controversial. UX leadership repeatedly questioned whether a job feed could work without it. I defended the model because adding keyword search would have shifted the burden back to the user instead of solving the problem we had observed.\n\nThe alternative was harder: make the system underneath the feed increasingly good at understanding the user. Five years later, it still has no search bar."
            },
            {
              width: "inset",
              label: "First release",
              image: "assets/stories/job-explorer/initial-launch.png", w: 998, h: 1044,
              alt:
                "The first Job Explorer release: a single remote-jobs toggle, job cards listing possible skills for each job, and a job description with an Apply now button.",
              caption: "Program-aligned jobs, possible skills for each, and a single Remote filter. No search bar."
            },
            "**The filters evolved with the product.** We started with Remote, then introduced entry-level filtering. Later, students could enter a location different from the address on file, choose among entry-, mid-, and senior-level experience, and explore jobs related to careers they had saved. That last filter would eventually be replaced by a more purposeful Career Plan toggle.",
            {
              width: "wide",
              label: "The filter bar, later",
              strip: true,
              image: "assets/stories/job-explorer/filters-mature.png", w: 1065, h: 102,
              alt:
                "The Job Explorer filter bar: an In my Career Plan toggle, a Remote toggle, a City field and an Experience level menu set to Entry-level (0-1 years)."
            }
          ]
        },

        {
          type: "chapter",
          group: "iterate",
          nav: "Iterate",
          label: "Iterate",
          heading: "I gave students a way to pick up where they left off.",
          flow: [
            "In ongoing interviews, students sometimes tried to find a job they had seen earlier, could not locate it again, and assumed the posting had closed.\n\n**Discovering a job and being ready to apply did not always happen in the same sitting.** Students balanced jobs, classes, and family commitments. They might browse on a lunch break or after a long day, then need time to prepare or tailor a resumé.\n\nI introduced **saved job postings** so students could keep interesting opportunities and return later. During false-door research, students said they expected to find saved postings in **Career Profile**, which informed where the saved list lived.",
            {
              width: "inset",
              items: [
                {
                  label: "Save from the feed",
                  image: "assets/stories/job-explorer/saved-card.png", w: 460, h: 310,
                  alt: "A Job Explorer job card with a save heart, under a legend reading: heart equals Saved job posting."
                },
                {
                  label: "Save from the description",
                  image: "assets/stories/job-explorer/save-falsedoor.jpg", w: 814, h: 322,
                  alt: "A job description header with an Apply now button and a Save heart beside it, used as the false-door test.",
                  caption: "The false door: a save affordance on job cards and descriptions, instrumented before any backend existed."
                }
              ]
            }
          ]
        },

        {
          type: "chapter",
          group: "iterate",
          heading: "I used behavioral data to decide where to look next.",
          flow: [
            "Job Explorer was never a launch-and-leave product. I continued interviewing students about what they had actually done in the product and used **FullStory behavioral data** to spot patterns worth investigating.\n\n**The dashboard did not tell us what to design. It told us where to look.** Interviews helped explain what was happening; behavioral data helped us decide which questions deserved attention as we kept iterating.",
            {
              width: "wide",
              video: "assets/stories/job-explorer/Dashboard Zoom_JobExplorer.mp4", w: 1280, h: 720,
              alt:
                "A screen recording panning across the Job Explorer FullStory dashboard: Apply Now conversion, saved-job behavior, job-card engagement and error tracking.",
              notes: ["Apply Now conversion", "Saved-job behavior", "Job-card engagement", "Errors / experience health"]
            }
          ]
        },

        {
          type: "chapter",
          group: "iterate",
          heading: "I aligned job discovery with the careers students were actually targeting.",
          flow: [
            "When Career Plan introduced the ability to **target** a career, Job Explorer still filtered jobs using careers students had only **saved as interests**. I recognized the disconnect between the products and decided to change the filter.\n\nI replaced the saved-careers dropdown with an **“In My Career Plan” toggle** that used occupations associated with the student’s targeted career and job titles. Program-aligned jobs remained the default to meet compliance requirements. Students could choose the Career Plan view and save that preference in Career Profile.\n\nThe underlying job lists sometimes overlapped. The value was giving students control to explore the career they were actively pursuing, not just careers they had liked.",
            {
              width: "inset",
              image: "assets/stories/job-explorer/filter-career-plan.png", w: 512, h: 102,
              alt: "The In my Career Plan toggle, switched off, beside the Remote toggle in the Job Explorer filter bar.",
              notes: ["Default: program-aligned jobs", "Optional: targeted-career jobs"]
            }
          ]
        },

        {
          type: "chapter",
          group: "iterate",
          heading: "I introduced AI summaries to make inconsistent job descriptions easier to evaluate.",
          flow: [
            "Our job descriptions came from Lightcast, and the underlying content often arrived with confusing labels and unreliable structure. We repeatedly pursued cleaner source data. I also suggested formatting templates for the major job boards in the feed, but that path was more complex to maintain.\n\n**I proposed AI-generated summaries** as a practical way to organize information we could not fix at the source. I made the experience **optional and collapsed by default**, while keeping the original job description immediately below it so students could verify the source and decide for themselves.\n\nDuring proof-of-concept work, engineering developed four summary categories: **compensation and benefits, requirements and qualifications, skills, and responsibilities**. Engineering evaluated output quality and hallucination risk. I liked the structure and we used it in the experience.",
            {
              /* the collapsed and expanded screenshots, sliced at the same
                 lines so the panel can open between them the way it does live */
              width: "inset",
              unfold: {
                w: 1024,
                barClosed: {
                  src: "assets/stories/job-explorer/ai-summary-bar-closed.png", h: 152,
                  alt: "Under a job's posted date, a collapsed bar reading Summarize this job description with AI."
                },
                barOpen: { src: "assets/stories/job-explorer/ai-summary-bar-open.png", h: 152 },
                panel: {
                  src: "assets/stories/job-explorer/ai-summary-panel.png", h: 1148,
                  alt: "The expanded AI summary for a Team Lead job: Compensation and benefits, Requirements and qualifications, Skills, and Responsibilities, each a short bulleted list."
                },
                rest: {
                  src: "assets/stories/job-explorer/ai-summary-original.png", h: 468,
                  alt: "The original job description below it, opening with a run of labels that have no values: Job Title, Location, Employee Group, Regular Shift, Day Travel."
                }
              },
              notes: ["Collapsed by default", "Scannable categories", "Original description preserved"]
            },
            {
              label: "Observed behavior",
              stats: [
                { value: "34%", label: "Apply Now · opened an AI summary" },
                { value: "22%", label: "Apply Now · did not" }
              ],
              body:
                "Users who opened an AI summary clicked Apply Now at **34%**, compared with **22%** among users who did not. Everyone had access. This was an observational comparison, **not a controlled test or proof of causation**."
            }
          ]
        },

        {
          type: "chapter",
          group: "scale",
          nav: "Scale",
          label: "Scale",
          heading: "I designed a reusable job-card system that worked across Career Navigator.",
          flow: [
            "Job opportunities eventually appeared in more Career Navigator experiences, not only inside Job Explorer. I personally designed the **job-card component library, its states and variants, and the rules for how cards behaved in different contexts**.\n\n**Inside Job Explorer**, selecting a job card worked like choosing a tab: the details changed in the adjacent pane so students could browse without leaving the page. **Elsewhere in Career Navigator**, selecting a card opened a job-description modal so students could examine an opportunity without losing their place.",
            {
              width: "wide",
              ratio: "60-40",
              items: [
                {
                  label: "Inside Job Explorer: the pane changes",
                  image: "assets/stories/job-explorer/side-pane.png", w: 1380, h: 508,
                  alt:
                    "Job Explorer with a selected job card on the left, marked by a red edge, and that job's details in the pane beside it: Apply now, Generate resumé and possible skills."
                },
                {
                  label: "Elsewhere: a modal opens",
                  image: "assets/stories/job-explorer/modal-board.png", w: 600, h: 456,
                  alt: "The Job Description Modal frames from the Figma component file, in four variants."
                }
              ]
            },
            "I worked with our sister product team to explain and implement those patterns across the ecosystem. This was a **Career Navigator-specific reusable component library**, not a formal part of our central MUI design system, although decisions here informed shared conventions for **chips, card shadows, and modals**.\n\nBringing these job cards into more product experiences created additional opportunities for students to encounter relevant openings as part of their broader career journey.",
            {
              carousel: true,
              items: [
                {
                  image: "assets/stories/job-explorer/figma-job-cards.png", w: 1410, h: 1273,
                  alt:
                    "A Figma component sheet showing job card variants: contents, selectable cards in default, hover and focus states, standalone cards, and Talent Source cards with imagery.",
                  caption: "The job card set: selectable and standalone variants, each in default, hover and focus states."
                },
                {
                  image: "assets/stories/job-explorer/figma-job-description.png", w: 1600, h: 883,
                  alt: "A Figma component sheet for the job description: skills, in-page descriptions and modal descriptions.",
                  caption: "The job description, in the page for Job Explorer and as a modal everywhere else."
                },
                {
                  image: "assets/stories/job-explorer/miro-inventory.png", w: 1400, h: 819,
                  alt:
                    "A Miro board inventorying every job card and job posting pattern found across the product suite.",
                  caption: "Cross-team inventory used to consolidate job patterns into a shared component model."
                }
              ]
            }
          ]
        },

        {
          type: "impact",
          id: "impact",
          nav: "Impact",
          label: "Impact",
          heading: "Five years of iteration helped move Apply Now from 6% to 25%.",
          primary: {
            value: "6% → 25%",
            label: "of Job Explorer visitors clicked Apply Now over the product’s five-year evolution"
          },
          body:
            "Across five years, Job Explorer evolved from a replacement job board into a more connected experience for **discovering, saving, understanding, and acting on jobs**. The improvements accumulated over time: research-led discovery, more flexible controls, saved postings, Career Plan personalization, AI summaries, and job cards surfaced throughout Career Navigator.\n\nThis is the **overall visitor-to-Apply-Now rate**, not a claim that any single feature caused the change."
        },

        {
          type: "chapter",
          id: "next",
          nav: "Next",
          label: "What I would have built next",
          heading: "Be predictive, not predictable.",
          flow: [
            "The experience still relied largely on what students explicitly told us: filters, career goals, and profile information. I wanted to take the next step toward **behavior-driven recommendations**.\n\n**The jobs students opened, scrolled through, and clicked Apply Now on could become signals of interest.** Instead of making students constantly adjust filters, an algorithmic feed could automatically find and surface **more jobs like the ones they actually engaged with**, learning and refining recommendations over time.\n\nThe ambition was to move from a job feed students had to configure to **one that learned from their behavior**. This was a future product vision, not a feature we shipped.",
            { width: "inset", diagram: "learning-feed" }
          ]
        }
      ]
    },

    /* =================================================================
       CAREER PROFILE
       ================================================================= */
    {
      slug: "career-profile",
      title: "Career Profile",
      layout: "chapters",
      eyebrow: "Overview",
      headline: "I designed Career Profile as a shared foundation for the Career Navigator product suite.",
      intro:
        "I wanted students to see that their degree wasn’t the only thing they were building. **The skills they earned in class, the experience they brought from work, and the goals they set could all help them pursue opportunities before graduation.**",

      role: "Lead product designer",
      year: "2021–2026",
      tagline: "One place to keep your career data, and many places it pays off.",
      cover: "assets/stories/career-profile/career-profile-final.png",
      device: "laptop",
      screen: "assets/work/career-profile.webp",
      accent: "vibrant",

      overview: [
        {
          label: "My role",
          body:
            "Originated the connected-career vision in 2021 and personally owned the design of Career Profile, Job Explorer, and AI Resumé Generator within the **Career Navigator product suite**. I managed the designer responsible for Career Explorer and Career Plan, collaborating on how these products connected. The Career Profile designs, research, experiments, and interaction decisions shown in this case study are my own work."
        },
        {
          label: "At a glance",
          value: "3.6M",
          body:
            "Students collectively added **3.6 million self-identified skill entries** to their profiles over the product’s lifetime. The information they provided was increasingly used throughout the broader career experience."
        }
      ],

      next: {
        slug: "ai-resume",
        bridge:
          "Once the profile knew the person, the next product could ask them for almost nothing."
      },

      /* six anchors; chapters that share a `group` sit under one of them */
      blocks: [
        {
          type: "chapter",
          group: "discover",
          nav: "Discover",
          label: "Discover",
          heading: "I connected the dots between career goals, evidence of experience, and opportunities.",
          flow: [
            "My early research showed that students needed more than a collection of disconnected career tools. They wanted a way to **set goals, keep track of what they had accomplished, discover relevant jobs, and know what to do next**.\n\nIn 2021, I brought those needs together in an early connected-product concept. One part, called **Portfolio**, gave students a place to collect academic and professional evidence. Four of four participants in a small prototype study found value in that concept; other parts of the study showed enthusiasm for goal-setting and goal-aligned job recommendations.\n\n**The concept wasn’t the shipped product. It was the direction I kept designing toward:** information a student shared in one experience should make the next experience more useful.",
            {
              width: "inset",
              tag: "2021 concept, not shipped UI",
              maxw: 380,
              image: "assets/stories/career-profile/concept-2021-portfolio.png", w: 788, h: 1152,
              alt:
                "Two phone screens from the 2021 prototype's Portfolio: academic assignments and personal uploads listed as files, and a menu for papers, skills, badges, resumé and letters.",
              caption: "Portfolio in the 2021 prototype: academic work, uploads, skills, badges and resumé in one place."
            }
          ]
        },

        {
          type: "chapter",
          group: "discover",
          heading: "I created a new foundation for skills instead of extending a limiting prototype.",
          flow: [
            "When the business wanted students to identify skills gained through work, the initial request was to extend an existing Skills Dashboard in AEM. I advocated for building a new React-based experience alongside Job Explorer instead. The old third-party proof of concept centered on university-earned skills and wasn’t the foundation I wanted for a student-owned picture of experience.\n\nWe launched the new Skills Profile with **self-identified skills first** while the backend needed to bring in university-earned skills at scale was still being built. When that data became available, the two kinds of skills came together. The early release was functionally limited by the available integrations, not an intentionally minimalist visual design.",
            {
              width: "wide",
              items: [
                {
                  label: "Before",
                  image: "assets/stories/career-profile/skills-dashboard-mock.png", w: 1500, h: 1323, bare: true,
                  alt: "The original Skills Dashboard on a desktop monitor: Jane's skills dashboard, listing current course skills as demonstrated, not demonstrated, or to be evaluated.",
                  caption: "The Skills Dashboard, built around skills earned in university courses."
                },
                {
                  label: "After",
                  image: "assets/stories/career-profile/skills-profile-v1.png", w: 1500, h: 1323, bare: true,
                  alt: "The Skills profile builder on a desktop monitor, with My Skills filtered by all, UOPX and self-identified skills.",
                  caption: "Skills Profile: university-earned and self-identified skills in one view."
                }
              ]
            },
            "Students didn’t always recognize the skills they already had. In interviews, many thought first of technical skills and struggled to name their own. I used **job titles as a way to help students identify possible skills** and made the value explicit: these were skills that could help make job opportunities more relevant.\n\nIn Job Explorer, students could then see which skills on their profile matched skills associated with a real posting. That connection made the benefit visible, rather than simply asking them to trust that entering information would pay off.",
            {
              width: "inset",
              items: [
                {
                  label: "Skills Identifier",
                  image: "assets/stories/career-profile/skills-identifier.jpg", w: 751, h: 466,
                  alt: "The Skills Identifier modal: Start adding your skills, with Add skills by job title and Add skills by name.",
                  caption: "Students could start from a job title instead of a blank list."
                },
                {
                  label: "Job Explorer",
                  image: "assets/stories/career-profile/je-skill-match.png", w: 770, h: 385,
                  alt: "A Job Explorer posting's possible skills, with the skills already on the student's profile checked as Skills Profile matches.",
                  caption: "Profile skills that match a posting are checked."
                }
              ]
            }
          ]
        },

        {
          type: "chapter",
          group: "iterate",
          nav: "Iterate",
          label: "Iterate",
          heading: "I made skills easier to reach, first beyond the classroom and then for everyone.",
          flow: [
            "The original university skills link sat inside an active-course component in the student portal. I noticed that students on leave and alumni could lose the route to their earned skills entirely. **I designed a permanent Skills Dashboard card and worked with the portal product team to secure placement and define its rules.**",
            {
              /* all four portal cards were captured at one scale, so they
                 share one width to keep their type the same size */
              width: "inset",
              stack: true,
              items: [
                {
                  label: "Before",
                  image: "assets/stories/career-profile/portal-course-card.png", w: 1632, h: 866, bare: true,
                  alt: "A portal course card for Principles of Accounting II, with a See course skills link under the course's skills, the instructor, the dates and a Go to class button.",
                  caption: "The only route to earned skills: a link inside the active course card."
                },
                {
                  label: "2022",
                  image: "assets/stories/career-profile/portal-card-2022.png", w: 1630, h: 370, bare: true,
                  alt: "A permanent Skills card: Your program is mapped to career-relevant skills. See how many skills you’ve demonstrated so far! Go to Skills Dashboard.",
                  caption: "A permanent Skills card for students in skills-tagged programs."
                }
              ]
            },
            {
              label: "2022 · Portal card to the legacy Skills Dashboard",
              stats: [
                { value: "10,361", label: "Visits in its first 13 days" },
                { value: "3,300", label: "Visits in the 30 days before" }
              ],
              body:
                "In 2022, the new portal card brought **10,361 visits and 6,234 unique visitors in its first 13 days**, compared with **3,300 visits and 2,240 unique visitors during the preceding 30 days**. That change still served only students in skills-tagged programs, but it removed the active-enrollment dependency."
            },
            "When Skills Profile launched in 2023, I designed **a second dynamic card state** so students without skills-tagged programs could also reach the new experience. The portal now offered a relevant entry point to students and alumni whether or not university-earned skills were available to them.",
            {
              width: "inset",
              stack: true,
              items: [
                {
                  label: "2023 · Skills-tagged programs",
                  image: "assets/stories/career-profile/portal-card-2023-tagged.png", w: 1630, h: 370, bare: true,
                  alt: "The Skills card for skills-tagged programs, with the same message as before and its link changed to Go to Skills Profile."
                },
                {
                  label: "2023 · All other programs",
                  image: "assets/stories/career-profile/portal-card-2023-other.png", w: 1630, h: 370, bare: true,
                  alt: "The Skills card for other programs: Collecting all your skills in one place helps you be prepared to search for job opportunities. Go to Skills Profile.",
                  caption: "One card, two messages, both leading to the new Skills Profile."
                }
              ]
            },
            {
              label: "2023 · Skills Profile launch",
              stats: [
                { value: "~16K", label: "Weekly unique visitors after" },
                { value: "~2K", label: "Weekly unique visitors before" }
              ],
              body:
                "**Weekly unique Skills Profile visitors rose from approximately 2,000 to 16,000, an eightfold increase**, following the expanded entry point and launch."
            }
          ]
        },

        {
          type: "chapter",
          group: "iterate",
          heading: "I experimented with why and when students would add more skills.",
          flow: [
            "Job Explorer used skills alongside each student’s program-aligned occupation information to return jobs from Lightcast. We also observed that students with **10 or more skills** were more likely to click Apply Now. That was a correlation, but it gave us a useful hypothesis: **helping students build richer profiles might improve job relevance and encourage action**.\n\nI led the creative direction for a series of experiments, testing different motivations and moments. In one, students selected a **statement about their career situation**, not a persona label, and then received tailored encouragement to identify skills. Other prompts appeared directly in Skills Profile or in Job Explorer, where students could see the value of better job matches.",
            {
              /* rows and dots are in the question screenshot's own pixels;
                 the follow-ups share one scale and canvas so they swap in place */
              picker: {
                label: "A statement, not a persona",
                caption: "Students chose the statement that fit their career situation.",
                prompt: {
                  src: "assets/stories/career-profile/persona-modal.png", w: 640, h: 625,
                  alt: "A modal over My Skills asking “Would you like a personalized career suggestion, Kristie?” with five career-situation statements to choose from and a Submit button."
                },
                answerLabel: "The follow-up",
                switchLabel: "Career situation",
                answerW: 740, answerH: 520,
                options: [
                  {
                    name: "Starting out",
                    statement: "I have little to no work experience and am interested in creating a plan to start my career.",
                    row: [238, 292], dot: [71, 252],
                    src: "assets/stories/career-profile/persona-followup-starter.png",
                    alt: "Great! Here’s what we suggest: add your self-identified skills to the Skills Profile. Kristie, as a starter, you may have more skills than you think; past job titles or life experiences count, babysitting included.",
                    caption: "Starting out: you may have more skills than you think."
                  },
                  {
                    name: "Enhancing",
                    statement: "I’m looking for additional knowledge and education to enhance my current career.",
                    row: [296, 350], dot: [71, 310],
                    src: "assets/stories/career-profile/persona-followup-enhancer.png",
                    alt: "Great! Here’s what we suggest: add your self-identified skills to the Skills Profile. Kristie, as an enhancer, it’s important to take inventory of what you bring to the table; you’ve worked hard for your skills, so put them to work.",
                    caption: "Enhancing: put the skills you worked hard for to work."
                  },
                  {
                    name: "Switching careers",
                    statement: "I’m interested in changing my career path and want to create a plan to make the switch.",
                    row: [354, 408], dot: [71, 368],
                    src: "assets/stories/career-profile/persona-followup-switcher.png",
                    alt: "Great! Here’s what we suggest: add your self-identified skills to the Skills Profile. Kristie, as a switcher, it’s important to take inventory of the skills you bring to the table that can be translated into your new career.",
                    caption: "Switching careers: find the skills that carry over."
                  }
                ]
              }
            },
            "With the Job Explorer nudge, funnel data revealed that people were willing to click but could drop off before they began adding skills. **I removed the detour:** we brought the Skills Identifier directly into Job Explorer as a modal. That interaction became reusable by other teams, allowing skill collection wherever it naturally supported the task.",
            {
              width: "wide",
              ratio: "60-40",
              items: [
                {
                  label: "The original route",
                  image: "assets/stories/career-profile/nudge-detour.png", w: 1601, h: 807,
                  alt: "Four screens linked by arrows: Job Explorer, a prompt asking Want to explore jobs more aligned to your skillset with a Go to Skills Profile button, the Skills Profile with no skills added, and the Skills Identifier.",
                  caption: "Job Explorer, then the prompt, then Skills Profile, then the Skills Identifier."
                },
                {
                  label: "Historical snapshot",
                  image: "assets/stories/career-profile/nudge-funnel.png", w: 1123, h: 464,
                  alt: "A FullStory funnel for the original route: 727 users saw the prompt, 155 clicked it, 49 clicked to add skills on the profile, 37 and 34 continued in the Skills Identifier.",
                  caption: "FullStory, original route: 727 saw the prompt, 155 clicked it, 49 went on to add skills."
                }
              ]
            }
          ]
        },

        {
          type: "chapter",
          group: "iterate",
          heading: "I made recognizing skills part of describing work experience.",
          flow: [
            "Previous experiments had taught me that **context mattered**: students were more willing to identify skills when it fit the task in front of them. When we added work history to Career Profile, I used the job title students were already entering to offer relevant skill suggestions.\n\nThe title was sent to Lightcast, which returned **10 associated skills not already on that student’s profile**. **Every chip was unselected by default.** Students decided which, if any, reflected their actual experience; we never silently added or claimed skills on their behalf.",
            {
              width: "inset",
              image: "assets/stories/career-profile/work-history-inferred-skills.png", w: 923, h: 743,
              alt: "The Career Profile work history form for a Graphic Designer, with ten related skills offered as chips. Typography and Social Media are selected; the other eight are not.",
              caption: "Work history with suggested skills. Only the ones a student selects are added to their profile."
            },
            {
              label: "Early 2025 snapshot",
              stats: [
                { value: "88%", label: "Also selected suggested skills" },
                { value: "~18", label: "Skill entries per user" }
              ],
              body:
                "In early results, **88% of students who added or edited work history also selected suggested skills**. Across 548 participating users, nearly **10,000 skill entries** were added, averaging about **18 per user**."
            }
          ]
        },

        {
          type: "chapter",
          group: "iterate",
          heading: "I kept watching what students actually did.",
          flow: [
            "Career Profile was an evolving product, not a static form. I used **FullStory behavioral data** to see how students reached the experience, where they engaged, and where they left a task unfinished. Those patterns guided which questions to investigate and which improvements to prioritize.",
            {
              width: "wide",
              video: "assets/stories/career-profile/Dashboard Zoom_Profile.mp4", w: 1280, h: 720,
              alt:
                "A screen recording panning across the Career Profile FullStory dashboard: navigation usage by section, profile and skills page hits, skill-count cohorts and experiment performance.",
              notes: ["Navigation usage by section", "Profile users and skills page hits", "Skill-count cohorts", "Experiment performance"]
            }
          ]
        },

        {
          type: "chapter",
          group: "scale",
          nav: "Scale",
          label: "Scale",
          heading: "I evolved Career Profile into a shared home for information students could use across products.",
          flow: [
            "The original Portfolio concept was never meant to stop at skills. In 2024, I designed the expansion into **work history, education history, preferences, and saved items**, creating a more complete place for students to manage their career information. These were practical foundations for an ecosystem that would keep growing.\n\nThat choice paid off when the AI Resumé Generator arrived in 2025. Students who had already entered their education and work history could begin a resumé with that information in place. For students entering those details for the first time while creating a resumé, **the resumé flow could write the information back into Career Profile**.",
            {
              width: "wide",
              diagram: "connections",
              nodes: [
                { label: "AI Resumé Generator", src: "assets/stories/ai-resume/resume-intake.png", w: 1400, h: 1123 },
                { label: "Career Profile", src: "assets/stories/career-profile/career-profile-final.png", w: 1320, h: 1265, hub: true },
                { label: "Job Explorer", src: "assets/stories/job-explorer/cover.png", w: 1920, h: 1080 }
              ],
              edges: [
                [{ dir: "left", text: "Starts with saved work and education" }, { dir: "right", text: "Writes new details back" }],
                [{ dir: "right", text: "Skills matched to postings" }]
              ],
              alt: "Career Profile in the middle, connected both ways to the AI Resumé Generator, which starts from saved work and education and writes new details back, and one way to Job Explorer, which matches profile skills to postings.",
              caption: "Real screens from each product. Arrows show where profile information goes."
            }
          ]
        },

        {
          type: "impact",
          id: "impact",
          nav: "Impact",
          label: "Impact",
          heading: "One place to update. Many places it paid off.",
          primary: { value: "3.6M", label: "self-identified skill entries added across student profiles, from launch onward" },
          secondary: [
            { value: "1M", label: "in the first eight months" },
            { value: "8×", label: "weekly unique Skills Profile visitors at the 2023 launch" }
          ],
          body:
            "Career Profile became a growing record of students’ **self-identified skills, academic skills, work and education history, preferences, and saved opportunities**, helping connected career tools work with a fuller picture of each person.\n\nI was designing toward a larger outcome: helping students see the skills and experience they were building during their education and put them to use in pursuing career opportunities."
        },

        {
          type: "chapter",
          id: "next",
          nav: "Next",
          label: "What I would have built next",
          heading: "Ask once. Use it everywhere.",
          flow: [
            "My next ambition was to keep expanding what students could accomplish with the information they had already chosen to share. **If students tell us about their experience in one place, the rest of their career tools should be able to use it when it helps them**, instead of asking them to start from scratch every time.\n\nCareer Profile had begun to make that possible. The next step was to make the connections more useful and seamless across the full career journey."
          ]
        }
      ]
    },

    /* =================================================================
       AI resumé GENERATOR
       ================================================================= */
    {
      slug: "ai-resume",
      title: "AI Resumé Generator",
      layout: "chapters",
      eyebrow: "Overview",
      headline:
        "I designed AI assistance to help working adults turn their experience into a resumé they could actually use, without giving up control of their story.",
      intro:
        "Students might find a job they wanted, then lose momentum when they realized they had to create or update a resumé. Some had no accessible document to start from. I designed an experience that helped them get past the blank canvas using the work, education, and skills they could provide through Career Profile.",

      role: "Lead product designer",
      year: "2025",
      tagline: "The first student-facing AI product, aimed at the one blocker nobody had named.",
      cover: "assets/stories/ai-resume/resume-editor.png",
      device: "laptop",
      screen: "assets/work/ai-resume.webp",
      accent: "mint",

      overview: [
        {
          label: "My role",
          body:
            "Sole hands-on product designer for the AI Resumé Generator, from early research and flow exploration through interaction design, launch, and iteration. I partnered with product management, engineering, and career stakeholders as part of the Career Navigator suite."
        },
        {
          label: "At a glance",
          value: "72%",
          body:
            "Among users who downloaded a completed resumé, **55%** of general-job-title users and **72%** of job-posting-tailored users clicked Apply Now, compared with an approximately **21% overall baseline**. These are observed user segments, not causal experiment results."
        }
      ],

      /* the last Career Navigator story, so readers choose: back into the same
         product family, or across to a different company's work */
      next: [
        {
          slug: "job-explorer",
          label: "Keep going · Same product family",
          bridge:
            "A resumé is only worth writing when there's already a job on the screen worth applying to."
        },
        {
          slug: "kiosk-public-storage",
          label: "Switch gears · OpenTech Alliance, 2018–2020",
          bridge:
            "Before Career Navigator, a different kind of screen: a self-service kiosk for the world's largest storage operator."
        }
      ],

      blocks: [
        {
          type: "chapter",
          group: "discover",
          nav: "Discover",
          label: "Discover",
          heading: "I designed for the moment job-search excitement turned into resumé work.",
          flow: [
            "In student interviews and conversations with career advisors, we heard a familiar pattern: working adults could be excited about an opportunity but discouraged by the time it would take to prepare a resumé. Some had lost their old document or only had a copy on a previous computer. Others struggled to describe the work they’d already done.",
            { label: "The blocker", pull: "You can’t apply to a job if you don’t have a resumé." },
            "The university already had templates and students already had word processors. **Another blank document wouldn’t solve the problem.** I wanted to help them turn real experience into useful language quickly, while giving career advisors a better starting point for one-on-one feedback rather than asking advisors to build every document from scratch."
          ]
        },

        {
          type: "chapter",
          group: "discover",
          heading: "I mapped a guided flow around information students could confirm.",
          flow: [
            "I researched existing resumé builders and sketched a flow beginning in **Career Profile**. Students could confirm their work history, education, and skills, select a target job title, and get help articulating the responsibilities of roles they’d actually held.\n\n**AI could suggest language; it couldn’t invent a student’s work history, education, or credentials.** I deliberately began with generating a resumé for a general job title. Tailoring to an individual job posting was the longer-term direction, but the general flow was a practical foundation to build and learn from first.",
            {
              width: "wide",
              tag: "Early workflow exploration",
              image: "assets/stories/ai-resume/sketch-flow.png", w: 2255, h: 1963,
              alt:
                "Hand-drawn flow sketches. Sticky notes read Generate, What job title?, and confirming work history, skills and education. The frames: a Career Profile resumé page with a Generate button and a list of my resumés; What job title?, with a search field and saved job titles; Work history, marked confirm first; Job responsibilities, asking which statements describe your role at a company, marked repeat for all jobs; Education; Skills, split into skills that align to the job title and other skills; and Review, with a professional summary and regenerate. Margin notes ask how to recommend aligned skills while letting students add others, what to let them edit on review, where to offer AI cleanup, and whether to offer template selection.",
              caption:
                "Sketches of the guided flow: start from Career Profile, pick a job title, confirm work history, choose responsibilities for each job, then education, skills and review."
            }
          ]
        },

        {
          type: "chapter",
          group: "iterate",
          nav: "Iterate",
          label: "Iterate",
          heading: "I made AI suggestions easy to choose, regenerate, or skip.",
          flow: [
            "During intake, I designed a step that offered **six suggested responsibilities at a time**, using a student’s job title and employer as context for more relevant language. The smaller set kept the decision manageable, especially on mobile. Students selected only statements that reflected their actual work.\n\n**Regenerating ideas didn’t erase the good ones.** Selected cards stayed at the top while the remaining slots filled with new suggestions. Students could also skip the step entirely and write their own descriptions later in the editor. The goal was to help with a blank canvas, not to decide what was true about someone else’s experience.",
            {
              width: "inset",
              image: "assets/stories/ai-resume/intake-responsibilities.png", w: 870, h: 826,
              alt:
                "What did you do as an Assistant Manager at Walmart? Six suggested tasks as cards, two of them selected, a prompt to keep current selections and re-generate more items, and a checkbox to skip this step and write my own.",
              notes: ["Six suggestions at a time", "Selections kept when regenerating", "Skip and write your own"]
            }
          ]
        },

        {
          type: "chapter",
          group: "iterate",
          heading: "I gave students a preview before any AI rewrite replaced their words.",
          flow: [
            "The editor opened on a **professional summary**. AI provided a first draft based on the student’s information, but the text was directly editable. Students could revise it themselves without using AI again.",
            {
              width: "wide",
              image: "assets/stories/ai-resume/editor-full.png", w: 1381, h: 1140,
              alt:
                "The resumé editor for a Director of Operations posting: a resumé contents list for summary, work history, skills and education, a professional summary form with an editable AI-drafted summary and a collapsed Use AI to enhance summary bar, and a live resumé preview with a Download button.",
              caption: "The editor: one section at a time, a live preview beside it, and Download when the student is ready."
            },
            "For students who wanted help, I designed **“Use AI to enhance”** as an optional, section-level action. The proposed rewrite appeared separately so they could compare it with what they had, regenerate another suggestion, or explicitly **apply changes**. Their original text wasn’t overwritten simply because they asked for help.",
            {
              /* the two editor screenshots, sliced at matching rows: the
                 expanded one sits 37px left and 3px below the collapsed one */
              width: "inset",
              unfold: {
                w: 878,
                switchLabel: "Use AI to enhance summary",
                restFade: false,
                barClosed: {
                  src: "assets/stories/ai-resume/summary-bar-closed.png", h: 282,
                  alt: "The professional summary, a first draft the student can edit directly, above a collapsed Use AI to enhance summary bar."
                },
                barOpen: { src: "assets/stories/ai-resume/summary-bar-open.png", h: 282 },
                panel: {
                  src: "assets/stories/ai-resume/summary-panel.png", h: 219,
                  alt: "The expanded bar: a rewritten summary in its own box, with Regenerate and Apply changes. A tooltip says the AI tool helps enhance your writing while preserving your tone and style, and to review the AI-generated rewrite carefully for accuracy."
                },
                rest: { src: "assets/stories/ai-resume/summary-rest.png", h: 100 }
              },
              notes: ["Optional, section by section", "Rewrite shown separately", "Nothing changes until Apply changes"]
            },
            "I used the same pattern in work history. Even students who opted out of AI-generated responsibilities during intake could still request help polishing their own writing in the editor.",
            {
              width: "inset",
              image: "assets/stories/ai-resume/editor-workhistory-ai.png", w: 862, h: 646,
              alt:
                "A work history description in the student’s own six bullets, and below it Use AI to enhance job tasks, expanded, with a rewritten list, Regenerate and Apply changes.",
              caption: "Work history, with a rewrite of the job tasks open under the student’s own description."
            }
          ]
        },

        {
          type: "chapter",
          group: "scale",
          nav: "Scale",
          label: "Scale",
          heading: "I expanded the same flow from a general job title to a real posting.",
          flow: [
            "The first version helped students create a resumé for a target job title from Career Profile. When we added job-specific tailoring, I retained the familiar intake and editor while using the **actual job posting** to shape suggestions. Students no longer had to provide the target title separately, and the work-history prompts could draw on details from the opportunity rather than relying only on generic occupational context.\n\nI also designed a layered skills selection: **skills already on the student’s profile that matched the posting**, additional skills named in the posting, and broader job-title skills as a fallback when descriptions offered little detail. Students could review and adjust the selection, balancing relevance with a resumé that wasn’t overloaded or too sparse.",
            {
              width: "wide",
              toggle: {
                switchLabel: "Skills step",
                auto: true,
                states: [
                  {
                    name: "Job title",
                    src: "assets/stories/ai-resume/skills-jobtitle.png", w: 1278, h: 817,
                    alt: "Let’s review your skills, for a target job title: six skills to highlight on the resumé, selected, and common skills for Assistant Managers to add. The steps start with Target title.",
                    caption: "For a job title: skills that often appear in postings for that title, with more to add."
                  },
                  {
                    name: "Job posting",
                    src: "assets/stories/ai-resume/skills-jobposting.png", w: 1278, h: 1001,
                    alt: "Let’s review your skills, for a job posting: seven Career Profile skills that match the posting, selected; additional skills from this job posting; and common skills for General Managers. The steps start with Work history, with no Target title step.",
                    caption: "For a posting: matching profile skills first, then skills the posting names, then common skills for the title. No Target title step."
                  }
                ]
              }
            }
          ]
        },

        {
          type: "chapter",
          group: "scale",
          heading: "I placed resumé creation at the moment a student found a job.",
          flow: [
            "I added **“Generate resumé”** to the shared job-description experience. From Job Explorer, and from other Career Navigator surfaces using those same job-description components, a student could begin tailoring directly to an opportunity instead of leaving to find a separate tool.\n\nThis built on the connected-product foundation: **Career Profile supplied information the student had already shared**, and new work or education details entered through the resumé flow could be written back for future use.",
            {
              width: "inset",
              image: "assets/stories/ai-resume/je-generate-resume.png", w: 732, h: 590,
              alt: "A Job Explorer posting for CERIS Ops Supervisor at CorVel, with Apply now and, under it, Generate resumé, above the possible skills for the job and the student’s Skills Profile matches.",
              caption: "Generate resumé, right under Apply now on a Job Explorer posting."
            }
          ]
        },

        {
          type: "chapter",
          group: "impact",
          nav: "Impact",
          label: "Impact",
          heading: "I measured completed resumé downloads, not curiosity clicks.",
          flow: [
            "The launch wasn’t the end of my work. I monitored product behavior in FullStory and used the evidence to evaluate the flow and the connection between resumé completion and job exploration, rather than judging the feature by generator entry clicks alone.",
            {
              width: "wide",
              video: "assets/stories/ai-resume/Dashboard Zoom_Resume.mp4", w: 1280, h: 720,
              alt:
                "A screen recording panning across the resumé generator FullStory dashboard: unique visitors, traffic over 90 days, and the engagement and download funnel cards.",
              notes: ["Adoption and unique visitors", "Intake step drop-off", "Download completion", "Apply Now by cohort"]
            },
            "I wanted to understand whether people who finished making a resumé went on to pursue opportunities. So I used **downloads of completed resumés** as the meaningful completion signal rather than counting people who simply opened the generator or reached the editor.\n\nFullStory tracked the general-job-title and job-posting-tailored workflows with separate identifiers.",
            {
              width: "wide",
              image: "assets/stories/ai-resume/applynow-funnel.png", w: 1089, h: 612,
              alt:
                "A FullStory conversion chart comparing Job Explorer Apply Now rates: 20.62% of all real users, 55.38% of users who downloaded a resumé, and 71.67% of users who downloaded a tailored resumé.",
              caption: "FullStory conversion comparison, past 30 days."
            }
          ]
        },

        {
          type: "impact",
          label: "Apply Now, by cohort",
          heading: "Finishing a usable resumé was closely associated with clicking Apply Now.",
          primary: {
            value: "72%",
            label: "of users who downloaded a resumé tailored to a specific job posting clicked Apply Now"
          },
          secondary: [
            { value: "55%", label: "downloaded a general-job-title resumé" },
            { value: "~21%", label: "overall Job Explorer baseline" }
          ],
          body:
            "**The relationship was strong, but observational.** People who completed a resumé may already have been more motivated to apply, and a downloaded document doesn’t prove which file they eventually used. We also didn’t establish that the two downloader segments were mutually exclusive."
        },

        {
          type: "chapter",
          id: "next",
          nav: "Next",
          label: "What I would have built next",
          heading: "I wanted to move from a functional resumé to one that felt personal and had been reviewed as a whole.",
          flow: [
            "**More personal presentation.** The first release had one basic template, a necessary MVP cut. I wanted to explore AI-generated templates shaped by how students described their preferred style, personality, or professional presentation, instead of relying on a fixed library of designs that would become dated.\n\n**A holistic review, not just section-by-section edits.** Our editor helped students work through individual pieces of a resumé, but it didn’t evaluate the whole document. I envisioned using **Super Phoebe**, our proposed agentic career companion, to review the complete resumé for clarity, consistency, and opportunities to strengthen it. That could provide useful guidance while a student waited for or prepared for a career-advisor appointment.\n\nNeither direction shipped as part of this work. Both came from the same ambition: **help students create something useful, make it their own, and feel more confident putting it in front of an employer.**"
          ]
        }
      ]
    },

    /* =================================================================
       INSOMNIAC KIOSK + PUBLIC STORAGE
       ================================================================= */
    {
      slug: "kiosk-public-storage",
      title: "INSOMNIAC Kiosk + Public Storage",
      eyebrow: "OpenTech Alliance · 2018–2020",
      headline: "Evolving a self-service kiosk platform for enterprise scale.",
      intro:
        "I redesigned OpenTech's self-service kiosk after nearly 14 years without meaningful change, then partnered directly with Public Storage, the world's largest self-storage operator, on a version customized for its business.",

      role: "Lead UX designer",
      year: "2018–2020",
      tagline: "A kiosk platform redesign, then a custom build for the world's largest storage operator.",
      cover: "assets/stories/kiosk-public-storage/cover.jpg",
      device: "kiosk",
      screen: "assets/work/kiosk-home.webp",
      accent: "forest",

      facts: [
        { label: "Role", value: "Lead UX designer" },
        { label: "Team", value: "Product, engineering, BAs + Public Storage leadership" },
        { label: "Responsibilities", value: "Research, interaction design, usability testing, client collaboration, design QA" },
        { label: "Impact", value: ["12-facility Public Storage pilot", "New sales + upgrades from Kiosk 20"] }
      ],

      next: {
        slug: "job-explorer",
        bridge:
          "Years later, the same instinct to test before arguing shaped a job feed with no search bar."
      },

      blocks: [
        {
          type: "figure",
          width: "full",
          image: "assets/stories/kiosk-public-storage/hero.jpg", w: 2400, h: 887,
          alt:
            "Five screens from the Public Storage kiosk rental flow: the home screen with four task tiles, a list of available spaces with monthly prices, a personal-or-business question above the on-screen keyboard, a rental review showing $26.59 due today, and a cash screen tracking the amount remaining, received and credited.",
          caption:
            "The Public Storage kiosk, built on the INSOMNIAC Kiosk 20 platform: renting a space end to end, from choosing a unit to paying in cash, with no employee present."
        },

        {
          type: "split",
          ratio: "50-50",
          heading: "A successful product that hadn't changed in 14 years.",
          body:
            "OpenTech's INSOMNIAC kiosks let self-storage customers rent a unit, make a payment and manage their account without an employee present. They pair a touchscreen with physical hardware such as card readers, cash acceptors and ID scanners, and connect to whichever property management system the operator runs, each with its own limitations.\n\nThe first kiosk was designed without a product or UX designer, then left alone: it stayed virtually unchanged for nearly 14 years. As Lead UX Designer, I worked across Product, Engineering, Business Analysis and company leadership to modernize it without breaking the business rules operators depended on.",
          image: "assets/stories/kiosk-public-storage/original-home.png", w: 562, h: 425,
          alt:
            "The original INSOMNIAC kiosk home screen: a blue Welcome title bar, English and Español buttons, the INSOMNIAC logo, a bulleted list of what the rental station can do, an illustrated virtual assistant, and three stacked dark-blue buttons for new customers, existing customers and purchasing merchandise.",
          caption:
            "Where it started: the original home screen, with Megan, the virtual mascot, and a copyright line that still read 2003–2009."
        },

        {
          type: "timeline",
          heading: "From one platform to an enterprise build",
          nodes: [
            "Original kiosk, ~14 years unchanged",
            "Kiosk 20 launch (late 2018)",
            "Public Storage custom build",
            "12-facility pilot (Q2 2020)",
            "Walk-away analysis (Jul 2020)"
          ]
        },

        {
          type: "prose",
          heading: "Before changing the interface, I learned the business behind it.",
          body:
            "I came in knowing nothing about self-storage, so I spent several days in front of the original kiosks, using them the way a customer would and studying them relentlessly. I documented the flow, the low-hanging improvements and every friction point I found. That flow documentation was the first the product had ever had."
        },

        {
          type: "figure",
          width: "wide",
          image: "assets/stories/kiosk-public-storage/rental-flow-map.png", w: 1009, h: 768,
          alt:
            "Flow map of renting a unit on the original kiosk: unit selection by type, size and unit number; additional items such as insurance and promotions; tenant and alternate contact information; a lease agreement in an iframe with a check-to-agree box; card payment that asks only for a zip code, with an autopay option; an email-receipt pop-up; and a printable receipt.",
          caption:
            "My first map of the original rental flow: every step between choosing a unit and printing a receipt, and what each one asked of the customer."
        },

        {
          type: "gallery",
          heading: "Keep the flow. Fix everything around it.",
          body:
            "The timeline was short, so I deliberately left the flow largely intact and focused on the interface and interaction design. Before changing anything, I tested the existing rental flow with unmoderated click tests on low-fidelity mockups to confirm it was intuitive.\n\nThen I rebuilt what customers actually saw. I retired “Megan,” the kiosk's virtual mascot, and rewrote the content to be conversational and readable. I worked side by side with developers, Product Owners, Business Analysts and OpenTech's CEO so the product's integrity held up through a heavily UI-driven redesign. Kiosk 20 launched in late 2018.",
          cols: 2,
          items: [
            {
              image: "assets/stories/kiosk-public-storage/rental-landing-before.png", w: 558, h: 417,
              alt:
                "The original kiosk's New Customer Access screen: a blue title bar, Back and Return to Main Menu buttons, three stacked dark-blue buttons for Space Estimator, Rent a Space and Facility Information, and an illustrated virtual assistant beside them.",
              caption: "Before: the original new-customer screen, with Megan, the virtual mascot."
            },
            {
              image: "assets/stories/kiosk-public-storage/rental-landing-after.png", w: 808, h: 878,
              alt:
                "The Kiosk 20 New Customer screen in Storage Express branding: Home, Facility Info and Live Help buttons in a persistent header, the line “We're happy you're here! How can we help?”, two illustrated tiles for Rent a Unit and Explore, and a Go Back button.",
              caption:
                "After: Kiosk 20 in an operator's branding. Home, Facility Info and Live Help sit in a persistent header, and the choices are written the way a person would say them."
            }
          ]
        },

        {
          type: "split",
          ratio: "60-40",
          heading: "Then the problem changed.",
          subhead: "Public Storage needed more than a reskin.",
          body:
            "Kiosk 20 had been very successful with smaller operators. Then Public Storage, the world's largest self-storage operator with more than 2,200 locations at the time, approached OpenTech about a kiosk of its own. Its business didn't fit the box model of the 20 series, and we didn't expect it to. For the first time, the kiosk's flow itself would be customized.\n\nAs lead UX designer on the initiative, I worked directly with Public Storage's CIO and VP of Application Development, along with their development and marketing teams and third-party vendors, to gather requirements and get design approval, alongside OpenTech's own product and engineering teams.\n\nThe work was translating enterprise requirements into an experience that met Public Storage's needs while still running within the capabilities and constraints of the underlying kiosk platform.",
          image: "assets/stories/kiosk-public-storage/ps-home.jpg", w: 720, h: 1280,
          alt:
            "The Public Storage kiosk home screen: a photo of a Public Storage facility behind a Welcome headline, Facility Info and bilingual Live Help buttons, and four task tiles in orange, navy, blue and gray for Rent a Space, I Have a Reservation, Pay My Bill and Purchase a Lock.",
          caption:
            "The Public Storage home screen: the same platform underneath, rebuilt around Public Storage's own tasks, language and brand."
        },

        {
          type: "prose",
          heading: "The client was in the room every week.",
          body:
            "Design decisions ran through weekly meetings with Public Storage's CIO, VP of Application Development and Head of Marketing, alongside OpenTech's development team. To understand how their process differed from ours, I worked through Public Storage's online rental process myself, noted the similarities and differences, and used them to show why a kiosk is a very different thing from a website.\n\nTheir legal department required the kiosk to mirror their existing rental flow. Within that, my job was balancing Public Storage's business requirements against customer usability, platform capabilities, technical feasibility and what should stay reusable for other operators."
        },

        {
          type: "gallery",
          heading: "Every dead end needed a way forward.",
          body:
            "A kiosk has no employee to step in, so every failure had to explain what happened and offer a next step. Completing a reservation alone had six exception states, from a reservation that couldn't be found to one that was already completed. Each got its own message and its own way out: try again, start a new rental, choose another space, go to your account, or reach a live person.",
          cols: 2,
          items: [
            {
              image: "assets/stories/kiosk-public-storage/error-new-rental.jpg", w: 900, h: 650,
              alt:
                "Kiosk error modal with a red icon: “Hmm… let's try something else. We couldn't find your reservation, but that's okay! You can easily start a rental right here,” with Close & Exit and Start a New Rental buttons.",
              caption:
                "Error: the reservation still can't be found, so the kiosk stops asking for retries and offers a new rental instead."
            },
            {
              image: "assets/stories/kiosk-public-storage/warning-live-person.jpg", w: 900, h: 650,
              alt:
                "Kiosk warning modal with a yellow icon: “Well, that doesn't happen everyday… The space you reserved is no longer available. We're connecting you to a live person who can help get you set up with a space,” with a Connecting indicator and a Close & Exit button.",
              caption:
                "Warning: the reserved space is gone and the kiosk can't fix that on its own, so it connects a live person automatically."
            }
          ]
        },

        {
          type: "gallery",
          heading: "I tested my own objection, and lost.",
          body:
            "With little time for research and the flow mirrored from Public Storage's own, the home screen was where I pushed back. Public Storage asked for multiple colors across the primary action tiles, and I wasn't sure the change would help customers find their way.\n\nRather than argue it out, I ran a quick A/B test on UsabilityHub on my own initiative, comparing the two treatments.",
          cols: 2,
          items: [
            {
              image: "assets/stories/kiosk-public-storage/heatmap-original.jpg", w: 812, h: 740,
              alt:
                "Usability-test click heat map on the original home-screen treatment: four tiles in a single navy color with illustrated icons, for New Customer, Complete Rental, Existing Customer and Purchase a Lock, with most clicks on New Customer. 83% click success.",
              caption: "The original approach, one tile color throughout: 83% click success."
            },
            {
              image: "assets/stories/kiosk-public-storage/heatmap-multicolor.jpg", w: 812, h: 740,
              alt:
                "Usability-test click heat map on the multi-color treatment Public Storage requested: New Customer in orange, Complete Rental in navy and the remaining tiles in gray, with line icons and most clicks on New Customer. 91% click success.",
              caption: "The multi-color tiles Public Storage asked for: 91% click success."
            }
          ]
        },

        {
          type: "statement",
          quote:
            "Good product design isn't about defending your first answer. It's about creating a way to find out which answer works better.",
          body:
            "To my surprise, the multi-colored tiles performed better. The design was updated, the finding carried back into OpenTech's other kiosk models as a new customization option for other operators, and having real data behind the decision built Public Storage's trust in how I worked."
        },

        {
          type: "split",
          ratio: "40-60",
          heading: "Shipping was not the end.",
          subhead: "Customers were walking away mid-task, so I went to find out why.",
          body:
            "The customized kiosk launched in the second quarter of 2020 in a 12-facility test group across the country. Public Storage was concerned about how many customers were walking away before finishing.\n\nI compiled a walk-away report covering about a month at three facilities and watched the replay videos of 28 customers at the kiosk. Part of the problem wasn't the interface at all: Public Storage's own staff had been playing with the kiosks and skewing the data. That led to a hidden tap in the bottom-left corner that starts a session without recording it.\n\nThe real sessions showed where customers needed clearer explanations, and where the information Public Storage asked for during validation was tripping them up. I presented the findings and recommendations to Public Storage's C-suite executives and VPs.",
          image: "assets/stories/kiosk-public-storage/walkaway-reservations.jpg", w: 1600, h: 900,
          alt:
            "Slide from the July 2020 kiosk walk-away readout for Public Storage, on the Reservation Completion flow: a pie chart showing 67% of walk-aways were reservations not found and 33% were reservations not available, beside suggestions to label why a reservation wasn't found, add error modals with Live Help, support product substitution, and suggest a new rental after the second failed attempt.",
          caption:
            "From the July 2020 walk-away readout: most reservation walk-aways were lookups that failed, from invalid details to expired or cancelled reservations."
        },

        {
          type: "cards",
          heading: "What the sessions actually showed.",
          items: [
            {
              title: "New rentals",
              body:
                "Half of the customers who left had reviewed the available spaces and decided the inventory or pricing didn't fit, sometimes saying so out loud. That's a business signal, not a broken screen. With no information about these customers, I recommended moderated sessions instead of guessing at a fix."
            },
            {
              title: "Completing a reservation",
              body:
                "Most walk-aways were reservations that couldn't be found: wrong details, expired or cancelled reservations, or ones not eligible for kiosk completion. I recommended clearer reasons on screen, Live Help on the error modals, and offering a new rental after the second failed attempt instead of the third."
            },
            {
              title: "Making a payment",
              body:
                "Most walk-aways were credential problems, usually customers unsure which ID they had used. I recommended spelling out the accepted ID types, adding Live Help to the invalid-credentials modal, and exploring other ways to authenticate."
            }
          ]
        },

        {
          type: "impact",
          heading: "A custom build that moved the whole platform forward.",
          primary: { value: "83% → 91%", label: "Home-screen click success in A/B testing, original vs. multi-color tiles" },
          secondary: [{ value: "12", label: "facilities in the Q2 2020 Public Storage pilot" }],
          body:
            "Kiosk 20's modernized interface was a hit at tradeshows and caught the eye of many operators, which generated new sales and upgrades from existing customers. The Public Storage build went further: it laid the foundation for future iterations of Kiosk 20 for other operators, added new customization options for them, and brought inquiries from other large operators about self-service kiosks of their own."
        },

        {
          type: "figure",
          width: "wide",
          image: "assets/stories/kiosk-public-storage/hardware.jpg", w: 1089, h: 380,
          alt:
            "Four INSOMNIAC kiosk models side by side: a white unit under a “Move in here” canopy showing the Public Storage welcome screen beside a card reader, then three blue-and-gray models showing the standard “Welcome to INSOMNIAC Kiosk” screen above their hardware bases.",
          caption:
            "Where it landed: Public Storage's build (left) and the standard Kiosk 20 interface, running on three other INSOMNIAC models."
        },

        {
          type: "quote",
          heading: "Client perspective",
          quote:
            "As a former client of Kristie's on a major initiative where she was the lead UX designer, I was impressed with her domain expertise, attention to detail, and her focus on elegant customer experiences. She was particularly skilled at hammering out nuances and exception scenarios, amazing work product and easy to work with.",
          name: "Former VP of Application Development, Public Storage",
          title: "Client on the kiosk initiative",
          initials: "PS"
        },

        {
          type: "closing",
          heading: "What this project taught me",
          body:
            "This project pushed me beyond designing an interface and into designing within a complex system. I had to understand customer behavior, business rules, physical hardware, technical constraints, enterprise requirements and the needs of a highly involved client organization.\n\nIt also reinforced something that has stayed central to how I work: the designer's role is not to have all the answers. It's to help the team ask the right questions, make complexity understandable, and create enough evidence to move forward with confidence.",
          end: "Understand the system. Test the assumption. Keep learning after it ships."
        }
      ]
    }
  ],

  /* -------------------------------------------------------------------
     RESUME TIMELINE (oldest → newest)
     ------------------------------------------------------------------- */
  timeline: [
    {
      year: "2013",
      title: "Web Designer I",
      company: "GoDaddy",
      dates: "2013 – 2016",
      points: [
        "Produced websites for small business customers using Website Builder, Shopping cart, and WordPress",
        "Constantly evaluated internal team processes in an ever-changing environment and proposed new solutions to increase productivity",
        "Used HTML/CSS and Adobe Creative Suite to create custom experiences for customers who did not fit “in the box” of a template design"
      ]
    },
    {
      year: "2016",
      title: "Jr. UX/UI Designer",
      company: "University of Phoenix",
      dates: "2016 – 2017",
      points: [
        "Ideated with cross functional teams to create business and product solutions that are meaningful to users",
        "Created low/high-fidelity wireframes and working prototypes to test in a lab or virtual lab environment",
        "Defined user interactions in depth to product owners and developers for seamless hand-off"
      ]
    },
    {
      year: "2017",
      title: "Lead UX/UI Designer",
      company: "OpenTech Alliance",
      dates: "2017 – 2021",
      points: [
        "Led end-to-end UX strategy, research, and design across a multi-surface product portfolio spanning self-service kiosks, access-control systems, and B2B2C e-commerce experiences",
        "Led the redesign of OpenTech's self-service kiosk platform and its adaptation for Public Storage, working directly with Public Storage's CIO and VP-level stakeholders as well as Product, Engineering, Marketing, and business leadership",
        "Improved successful click-through in kiosk usability testing from 83% to 91% and supported the Public Storage experience through a 12-facility pilot"
      ]
    },
    {
      year: "2021",
      title: "Sr. UX/UI Designer",
      company: "University of Phoenix",
      dates: "2021 – 2024",
      points: [
        "Led end-to-end product design within a Product, Design, and Engineering trio for career experiences serving approximately 24,000 students and alumni each month",
        "Designed and launched multiple 0-to-1 experiences, including Job Explorer, Career Profile, and an AI Resumé Generator that transformed existing career information into structured, user-editable resumé content",
        "Increased Apply Now conversion from 6% to 25% by addressing friction within job discovery and using behavioral signals across the broader customer journey to identify higher-leverage opportunities, including resumé creation, profile completion, skills development, and job-search filtering"
      ]
    },
    {
      year: "2024",
      title: "Sr. UX Manager (player-coach)",
      company: "University of Phoenix",
      dates: "2024 – 2026",
      points: [
        "Led, hired, and developed a team of six senior product designers and content writers across an interconnected portfolio of customer-facing, B2B2C, and B2B products while remaining hands-on as Design Lead for a core career product team",
        "Directed experience strategy for Super Phoebe and a career-focused AI sub-agent, shaping conversational and adaptive interactions, identifying opportunities to replace legacy self-service journeys, and balancing automation with legal requirements, user control, and trust",
        "Fostered responsible adoption of AI across the UX organization in alignment with enterprise IT standards while continuing to design and scale AI-enabled customer experiences"
      ]
    }
  ],

  /* -------------------------------------------------------------------
     LINKEDIN RECOMMENDATIONS
     ------------------------------------------------------------------- */
  recommendations: [
    {
      quote:
        "What I value most about Kristie is how she leads. She cares deeply about her people, advocates fiercely for the user, and makes those around her better. She made a meaningful impact on our organization—and on me as a leader.",
      name: "Vera Springett",
      title: "Sr. UX Director, University of Phoenix",
      relation: "Managed Kristie"
    },
    {
      quote: "Kristie has an absolute ownership spirit, with a bleeding conviction to do right by her users, without compromising business objectives. Truly one of the best UX managers I have ever worked with.",
      name: "Benjamin Irwin",
      title: "Sr. Product Manager, University of Phoenix",
      relation: "Worked with Kristie"
    },
    {
      quote: "Kristie has strong UX judgment and taught me a great deal. She helped me use product analytics more effectively, think through design problems more critically, and make more informed design decisions. Her guidance continues to shape how I approach my work.",
      name: "Iftekhar Azam",
      title: "Sr. UX/UI Designer, University of Phoenix",
      relation: "Reported to Kristie"
    },
    {
      quote: "Her attention to detail and eye for design made translating prototypes fluid and painless. All in all she is a great collaborator who can work around UX and technical needs to put the best version of a product in front of users.",
      name: "Coby Swan",
      title: "Software Engineer II, University of Phoenix",
      relation: "Worked with Kristie"
    }
  ]
};
